import { ConfigType, getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { dbMock } from '~/common/config/database-mock.config';
import databaseConfig from '~/common/config/database.config';
import { messages, offers } from '~/drizzle-schema';
import { MessageService } from '~/message/message.service';
import { MESSAGE_MOCK } from '~/message/mock/message.mock';
import { OFFER_MOCK } from '~/offer/mock/offer.mock';
import { OfferServiceMock } from '~/offer/mock/offer.service.mock';
import { OfferService } from '~/offer/offer.service';

describe('MessageService', () => {
	let service: MessageService;
	let offerService: OfferService;
	let db: ConfigType<typeof databaseConfig>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MessageService,
				{
					provide: getConfigToken('database'),
					useValue: dbMock,
				},
				{
					provide: OfferService,
					useClass: OfferServiceMock,
				},
			],
		}).compile();

		service = module.get<MessageService>(MessageService);
		offerService = module.get<OfferService>(OfferService);
		db = module.get(getConfigToken('database'));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get all messages', async () => {
		const [offer] = await db
			.insert(offers)
			.values([
				{
					...OFFER_MOCK,
				},
			])
			.returning();
		await db.insert(messages).values([
			{
				...MESSAGE_MOCK,
				sendAt: MESSAGE_MOCK.sendAt.toISOString(),
				offer: offer.id,
			},
		]);
		const foundMessages = await service.getMessages();
		expect(foundMessages).toHaveLength(1);
	});

	it('should create a new message', async () => {
		const [foundOffer] = await db
			.insert(offers)
			.values([
				{
					...OFFER_MOCK,
				},
			])
			.returning();
		vi.spyOn(offerService, 'createOffer').mockResolvedValue({
			...OFFER_MOCK,
			id: foundOffer.id,
		});
		const message = await service.createMessage(MESSAGE_MOCK);
		expect(offerService.createOffer).toBeCalledWith(MESSAGE_MOCK.offer);
		expect(message.id).toBeDefined();
		expect(message.phoneNumber).toBe('1234567890');
		expect(message.createdAt).toBeDefined();
		expect(message.createdAt).toBeInstanceOf(Date);
	});

	describe('updateMessage', () => {
		it('should throw error if message not found', async () => {
			await expect(
				service.updateMessage(randomUUID(), MESSAGE_MOCK)
			).rejects.toThrow('Message not found');
		});

		it('should update a message', async () => {
			const [foundOffer] = await db
				.insert(offers)
				.values([
					{
						...OFFER_MOCK,
					},
				])
				.returning();
			vi.spyOn(offerService, 'createOffer').mockResolvedValue({
				...OFFER_MOCK,
				id: foundOffer.id,
			});
			const message = await service.createMessage(MESSAGE_MOCK);
			const updatedMessage = await service.updateMessage(message.id, {
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
						...OFFER_MOCK,
					},
				])
				.returning();
			vi.spyOn(offerService, 'createOffer').mockResolvedValue({
				...OFFER_MOCK,
				id: foundOffer.id,
			});
			const message = await service.createMessage(MESSAGE_MOCK);
			await service.updateMessage(message.id, {
				offer: {
					...OFFER_MOCK,
					systemSize: 7.7,
				},
			});
			expect(offerService.updateOffer).toBeCalledWith(foundOffer.id, {
				...OFFER_MOCK,
				systemSize: 7.7,
			});
		});
	});
});
