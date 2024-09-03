import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from '~/api/message/message.controller';
import { MessageService } from '~/message/message.service';
import { MESSAGE_MOCK } from '~/message/mock/message.mock';
import { MessageServiceMock } from '~/message/mock/message.service.mock';

describe('MessageController', () => {
	let controller: MessageController;
	let messageService: MessageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MessageController,
				{
					provide: MessageService,
					useClass: MessageServiceMock,
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
		expect(messageService.create).toBeCalledWith(dto);
	});

	it('should update a message', async () => {
		const dto = { ...MESSAGE_MOCK };
		const id = '1';
		await controller.updateMessage(id, dto);
		expect(messageService.update).toBeCalledWith(id, dto);
	});
});
