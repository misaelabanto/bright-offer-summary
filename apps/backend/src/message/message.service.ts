import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import databaseConfig from '~/common/config/database.config';
import { messages } from '~/drizzle-schema';
import { CreateMessageDto } from '~/message/dto/create-message.dto';
import { UpdateMessageDto } from '~/message/dto/update-message.dto';
import { Message } from '~/message/message.schema';
import { Offer } from '~/offer/offer.schema';
import { OfferService } from '~/offer/offer.service';

@Injectable()
export class MessageService {
	constructor(
		@Inject(databaseConfig.KEY)
		private readonly db: ConfigType<typeof databaseConfig>,
		private readonly offerService: OfferService
	) {}

	async getMessages(): Promise<Message[]> {
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
		}));
	}

	async createMessage(dto: CreateMessageDto): Promise<Message> {
		const offer = await this.offerService.createOffer(dto.offer);
		const [messageCreated] = await this.db
			.insert(messages)
			.values([
				{
					phoneNumber: dto.phoneNumber,
					sendAt: dto.sendAt.toISOString(),
					offer: offer.id,
				},
			])
			.returning();
		return {
			...messageCreated,
			sendAt: new Date(messageCreated.sendAt),
			createdAt: new Date(messageCreated.createdAt),
		};
	}

	async updateMessage(id: string, dto: UpdateMessageDto): Promise<Message> {
		const originalMessage = await this.db.query.messages.findFirst({
			where: eq(messages.id, id),
			with: {
				offer: true,
			},
		});
		if (!originalMessage) {
			throw new Error('Message not found');
		}
		if (dto.offer) {
			await this.offerService.updateOffer(
				(originalMessage.offer as Offer).id,
				dto.offer
			);
		}
		const [message] = await this.db
			.update(messages)
			.set({
				phoneNumber: dto.phoneNumber || originalMessage.phoneNumber,
				sendAt: dto.sendAt?.toISOString() || originalMessage.sendAt,
			})
			.where(eq(messages.id, id))
			.returning();
		return {
			...message,
			offer: { ...(originalMessage.offer as Offer), ...(dto.offer || {}) },
			sendAt: new Date(message.sendAt),
			createdAt: new Date(message.createdAt),
		};
	}
}
