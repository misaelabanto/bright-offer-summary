import { ConfigType, getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { dbMock } from '~/common/config/database-mock.config';
import databaseConfig from '~/common/config/database.config';
import { messages, offers } from '~/drizzle-schema';
import { SEND_MESSAGE_EVENT } from '~/message/message.constant';
import { MessageService } from '~/message/message.service';
import {
	CREATE_MESSAGE_DTO_MOCK,
	MESSAGE_MOCK,
} from '~/message/mock/message.mock';
import { FakeMessagingProvider } from '~/messaging/providers/fake.provider';
import { FakeMessagingProviderMock } from '~/messaging/providers/mock/fake.provider.mock';
import { CREATE_OFFER_DTO_MOCK, OFFER_MOCK } from '~/offer/mock/offer.mock';
import { OfferServiceMock } from '~/offer/mock/offer.service.mock';
import { OfferService } from '~/offer/offer.service';
import { CronSchedulingProvider } from '~/scheduling/providers/cron-scheduling.provider';
import { CronSchedulingProviderMock } from '~/scheduling/providers/mock/cron-scheduling.provider.mock';

describe('MessageService', () => {
	let service: MessageService;
	let offerService: OfferService;
	let db: ConfigType<typeof databaseConfig>;
	let cron: CronSchedulingProvider;
	let fakeMessagingProvider: FakeMessagingProvider;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MessageService,
				{
					provide: getConfigToken('database'),
					useValue: dbMock,
				},
				{
					provide: getConfigToken('frontend'),
					useValue: {
						url: 'http://example.com',
					},
				},
				{
					provide: OfferService,
					useClass: OfferServiceMock,
				},
				{
					provide: CronSchedulingProvider,
					useClass: CronSchedulingProviderMock,
				},
				{
					provide: FakeMessagingProvider,
					useClass: FakeMessagingProviderMock,
				},
			],
		}).compile();

		service = module.get<MessageService>(MessageService);
		offerService = module.get<OfferService>(OfferService);
		db = module.get(getConfigToken('database'));
		cron = module.get<CronSchedulingProvider>(CronSchedulingProvider);
		fakeMessagingProvider = module.get<FakeMessagingProvider>(
			FakeMessagingProvider
		);
	});

	it('should be defined', async () => {
		expect(service).toBeDefined();
	});

	it('should find all messages', async () => {
		const [offer] = await db
			.insert(offers)
			.values([
				{
					...CREATE_OFFER_DTO_MOCK,
				},
			])
			.returning();
		await db.insert(messages).values([
			{
				...CREATE_MESSAGE_DTO_MOCK,
				sendAt: CREATE_MESSAGE_DTO_MOCK.sendAt.toISOString(),
				offer: offer.id,
				status: 'pending',
			},
		]);
		const foundMessages = await service.findAll();
		expect(foundMessages).toHaveLength(1);
	});

	it('should create a new message', async () => {
		const [foundOffer] = await db
			.insert(offers)
			.values([
				{
					...CREATE_OFFER_DTO_MOCK,
				},
			])
			.returning();
		vi.spyOn(offerService, 'createOffer').mockResolvedValue({
			...CREATE_OFFER_DTO_MOCK,
			id: foundOffer.id,
		});
		const message = await service.create(CREATE_MESSAGE_DTO_MOCK);
		expect(offerService.createOffer).toBeCalledWith(
			CREATE_MESSAGE_DTO_MOCK.offer
		);
		expect(message.id).toBeDefined();
		expect(message.phoneNumber).toBe('1234567890');
		expect(message.createdAt).toBeDefined();
		expect(message.createdAt).toBeInstanceOf(Date);
	});

	describe('updateMessage', () => {
		it('should throw error if message not found', async () => {
			await expect(
				service.update(randomUUID(), CREATE_MESSAGE_DTO_MOCK)
			).rejects.toThrow('Message not found');
		});

		it('should update a message', async () => {
			const [foundOffer] = await db
				.insert(offers)
				.values([
					{
						...CREATE_OFFER_DTO_MOCK,
					},
				])
				.returning();
			vi.spyOn(offerService, 'createOffer').mockResolvedValue({
				...CREATE_OFFER_DTO_MOCK,
				id: foundOffer.id,
			});
			const message = await service.create(CREATE_MESSAGE_DTO_MOCK);
			const updatedMessage = await service.update(message.id, {
				sendAt: new Date('2025-01-01'),
			});
			expect(updatedMessage.sendAt).toEqual(new Date('2025-01-01'));
			expect(updatedMessage.offer).toBeDefined();
		});

		it('should update offer if it is present in dto', async () => {
			const [foundOffer] = await db
				.insert(offers)
				.values([
					{
						...CREATE_OFFER_DTO_MOCK,
					},
				])
				.returning();
			vi.spyOn(offerService, 'createOffer').mockResolvedValue({
				...CREATE_OFFER_DTO_MOCK,
				id: foundOffer.id,
			});
			const message = await service.create(CREATE_MESSAGE_DTO_MOCK);
			await service.update(message.id, {
				offer: {
					...CREATE_OFFER_DTO_MOCK,
					systemSize: 7.7,
				},
			});
			expect(offerService.updateOffer).toBeCalledWith(foundOffer.id, {
				...CREATE_OFFER_DTO_MOCK,
				systemSize: 7.7,
			});
		});
	});

	describe('findById', () => {
		it('should throw error if message not found', async () => {
			await expect(service.findById(randomUUID())).rejects.toThrow(
				'Message not found'
			);
		});

		it('should find message by id', async () => {
			const [offer] = await db
				.insert(offers)
				.values([
					{
						...CREATE_OFFER_DTO_MOCK,
					},
				])
				.returning();
			const [insertedMessage] = await db
				.insert(messages)
				.values([
					{
						...CREATE_MESSAGE_DTO_MOCK,
						sendAt: CREATE_MESSAGE_DTO_MOCK.sendAt.toISOString(),
						offer: offer.id,
						status: 'pending',
					},
				])
				.returning();
			const foundMessage = await service.findById(insertedMessage.id);
			expect(foundMessage.sendAt).toStrictEqual(CREATE_MESSAGE_DTO_MOCK.sendAt);
		});
	});

	describe('setupPending', () => {
		it('should schedule pending messages', async () => {
			const pendingMessages = [
				{
					...MESSAGE_MOCK,
					sendAt: MESSAGE_MOCK.sendAt.toISOString(),
					createdAt: new Date().toISOString(),
					offer: OFFER_MOCK.id,
				},
			];
			vi.spyOn(db.query.messages, 'findMany').mockResolvedValue(
				pendingMessages
			);

			await service['setupPending']();

			expect(cron.schedule).toHaveBeenCalledWith(
				SEND_MESSAGE_EVENT,
				new Date(pendingMessages[0].sendAt),
				{ messageId: pendingMessages[0].id }
			);
		});
	});

	describe('send', () => {
		it('should send a message and update status to sent', async () => {
			vi.spyOn(service, 'findById').mockResolvedValue(MESSAGE_MOCK);
			vi.spyOn(db, 'update');
			vi.spyOn(fakeMessagingProvider, 'sendMessage').mockResolvedValue(
				undefined
			);

			await service['send'](MESSAGE_MOCK.id);

			expect(fakeMessagingProvider.sendMessage).toHaveBeenCalledWith(
				MESSAGE_MOCK.phoneNumber,
				expect.any(String)
			);
			expect(db.update).toHaveBeenCalled();
		});

		it('should handle message sending failure and update status to failed', async () => {
			vi.spyOn(service, 'findById').mockResolvedValue(MESSAGE_MOCK);
			vi.spyOn(db, 'update');
			vi.spyOn(fakeMessagingProvider, 'sendMessage').mockRejectedValue(
				new Error('Failed to send')
			);

			await service['send'](MESSAGE_MOCK.id);

			expect(fakeMessagingProvider.sendMessage).toHaveBeenCalledWith(
				MESSAGE_MOCK.phoneNumber,
				expect.any(String)
			);
			expect(db.update).toHaveBeenCalled();
		});
	});
});
