import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FakeProvider } from './fake.provider';

describe('FakeProvider', () => {
	let provider: FakeProvider;
	let logger: Logger;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FakeProvider],
		}).compile();

		provider = module.get<FakeProvider>(FakeProvider);
		logger = new Logger(FakeProvider.name);
		vi.spyOn(logger, 'log').mockImplementation(() => {});
		provider.logger = logger;
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});

	it('should log the correct message and resolve', async () => {
		const phoneNumber = '1234567890';
		const message = 'Hello, World!';
		const logSpy = vi.spyOn(logger, 'log');

		await provider.sendMessage(phoneNumber, message);

		expect(logSpy).toHaveBeenCalledWith(
			`Sending message to ${phoneNumber}: ${message}`
		);
	});
});
