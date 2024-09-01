import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from '~/api/status/status.controller';

describe('StatusController', () => {
	let controller: StatusController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [StatusController],
		}).compile();

		controller = module.get<StatusController>(StatusController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return status ok', async () => {
		const status = await controller.getStatus();
		expect(status).toEqual({ status: 'ok' });
	});
});
