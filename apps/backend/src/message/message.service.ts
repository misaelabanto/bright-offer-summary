import { MessageStatus } from '@bright-offer-summary/shared';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import databaseConfig from '~/common/config/database.config';
import frontendConfig from '~/common/config/frontend.config';
import { messages } from '~/drizzle-schema';
import { CreateMessageDto } from '~/message/dto/create-message.dto';
import { UpdateMessageDto } from '~/message/dto/update-message.dto';
import { MESSAGE_TEXT, SEND_MESSAGE_EVENT } from '~/message/message.constant';
import { Message } from '~/message/message.schema';
import { FakeMessagingProvider } from '~/messaging/providers/fake.provider';
import { Offer } from '~/offer/offer.schema';
import { OfferService } from '~/offer/offer.service';
import { CronSchedulingProvider } from '~/scheduling/providers/cron-scheduling.provider';

@Injectable()
export class MessageService {
	private readonly logger = new Logger(MessageService.name);

	// eslint-disable-next-line max-params
	constructor(
		@Inject(databaseConfig.KEY)
		private readonly db: ConfigType<typeof databaseConfig>,
		@Inject(frontendConfig.KEY)
		private readonly frontend: ConfigType<typeof frontendConfig>,
		private readonly offerService: OfferService,
		private readonly cron: CronSchedulingProvider,
		private readonly fakeMessagingProvider: FakeMessagingProvider
	) {
		this.cron.register(SEND_MESSAGE_EVENT, this.send);
		this.setupPending();
	}

	async findAll(): Promise<Message[]> {
		const messages = await this.db.query.messages.findMany({
			with: {
				offer: true,
			},
		});
		return messages.map(message => ({
			...message,
			offer: message.offer as Offer,
			sendAt: new Date(message.sendAt),
			createdAt: new Date(message.createdAt),
			status: message.status as MessageStatus,
		}));
	}

	async findById(id: string): Promise<Message> {
		const message = await this.db.query.messages.findFirst({
			where: eq(messages.id, id),
			with: {
				offer: true,
			},
		});
		if (!message) {
			throw new NotFoundException('Message not found');
		}
		return {
			...message,
			status: message.status as MessageStatus,
			offer: message.offer as Offer,
			sendAt: new Date(message.sendAt),
			createdAt: new Date(message.createdAt),
		};
	}

	async create(dto: CreateMessageDto): Promise<Message> {
		const offer = await this.offerService.createOffer(dto.offer);
		const [messageCreated] = await this.db
			.insert(messages)
			.values([
				{
					phoneNumber: dto.phoneNumber,
					sendAt: dto.sendAt.toISOString(),
					offer: offer.id,
					status: 'pending',
				},
			])
			.returning();
		this.cron.schedule(SEND_MESSAGE_EVENT, dto.sendAt, {
			messageId: messageCreated.id,
		});
		return {
			...messageCreated,
			status: messageCreated.status as MessageStatus,
			sendAt: new Date(messageCreated.sendAt),
			createdAt: new Date(messageCreated.createdAt),
		};
	}

	async update(id: string, dto: UpdateMessageDto): Promise<Message> {
		const originalMessage = await this.db.query.messages.findFirst({
			where: eq(messages.id, id),
			with: {
				offer: true,
			},
		});
		if (!originalMessage) {
			throw new NotFoundException('Message not found');
		}
		if (dto.offer) {
			await this.offerService.updateOffer(
				(originalMessage.offer as Offer).id,
				dto.offer
			);
		}
		this.cron.cancel({ messageId: id });
		const [message] = await this.db
			.update(messages)
			.set({
				phoneNumber: dto.phoneNumber || originalMessage.phoneNumber,
				sendAt: dto.sendAt?.toISOString() || originalMessage.sendAt,
				status: 'pending',
			})
			.where(eq(messages.id, id))
			.returning();
		this.cron.schedule(SEND_MESSAGE_EVENT, new Date(message.sendAt), {
			messageId: message.id,
		});
		return {
			...message,
			status: message.status as MessageStatus,
			offer: { ...(originalMessage.offer as Offer), ...(dto.offer || {}) },
			sendAt: new Date(message.sendAt),
			createdAt: new Date(message.createdAt),
		};
	}

	/**
	 * This function schedules pending messages in case of restart
	 * the container or application
	 **/
	private async setupPending(): Promise<void> {
		const pendingMessages = await this.db.query.messages.findMany({
			where: eq(messages.status, 'pending'),
		});
		for (const message of pendingMessages) {
			this.cron.schedule(SEND_MESSAGE_EVENT, new Date(message.sendAt), {
				messageId: message.id,
			});
		}
	}

	async send(messageId: string): Promise<void> {
		const message = await this.findById(messageId);
		const link = `${this.frontend.url}/messages/${message.id}`;
		const text = MESSAGE_TEXT(link);
		try {
			await this.fakeMessagingProvider.sendMessage(message.phoneNumber, text);
			await this.db
				.update(messages)
				.set({
					status: 'sent',
				})
				.where(eq(messages.id, messageId))
				.execute();
		} catch (error) {
			this.logger.error(error);
			await this.db
				.update(messages)
				.set({
					status: 'failed',
				})
				.where(eq(messages.id, messageId))
				.execute();
		}
	}
}
