import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from '~/api/message/message.controller';
import { MessageService } from '~/message/message.service';
import { MESSAGE_MOCK } from '~/message/mock/message.mock';

describe('MessageController', () => {
	let controller: MessageController;
	let messageService: MessageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MessageController,
				{
					provide: MessageService,
					useValue: {
						createMessage: vi.fn(),
						updateMessage: vi.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<MessageController>(MessageController);
		messageService = module.get<MessageService>(MessageService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create a message', async () => {
		const dto = { ...MESSAGE_MOCK };
		await controller.createMessage(dto);
		expect(messageService.createMessage).toBeCalledWith(dto);
	});
});
