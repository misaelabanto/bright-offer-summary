import { ConfigType, getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { dbMock } from '~/common/config/database-mock.config';
import databaseConfig from '~/common/config/database.config';
import { messages } from '~/drizzle-schema';
import { MessageService } from '~/message/message.service';
import { MESSAGE_MOCK } from '~/message/mock/message.mock';
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

	it('should create a new message', async () => {
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
			const messageId = randomUUID();
			vi.spyOn(db.query.messages, 'findFirst').mockResolvedValue({
				id: messageId,
				...MESSAGE_MOCK,
				createdAt: new Date().toISOString(),
				offer: 'offerId',
				sendAt: new Date().toISOString(),
			});
			await service.updateMessage(messageId, MESSAGE_MOCK);
			expect(db.query.messages.findFirst).toBeCalledWith({
				where: eq(messages.id, messageId),
				with: { offer: true },
			});
			expect(db.update(messages).set).toBeCalledWith({
				offer: MESSAGE_MOCK.offer,
				phoneNumber: MESSAGE_MOCK.phoneNumber,
				sendAt: MESSAGE_MOCK.sendAt.toISOString(),
			});
		});
	});
});
