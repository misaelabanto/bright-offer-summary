import { ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Mock } from 'vitest';
import whatsappConfig from '~/common/config/whatsapp.config';
import { WhatsAppMessagingProvider } from './whatsapp.provider';

describe('WhatsAppMessagingProvider', () => {
	let provider: WhatsAppMessagingProvider;
	let fetchMock: Mock;
	let config: ConfigType<typeof whatsappConfig>;

	beforeEach(async () => {
		fetchMock = vi.fn();
		config = {
			url: 'https://api.whatsapp.com/send',
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WhatsAppMessagingProvider,
				{
					provide: 'FetchService',
					useValue: fetchMock,
				},
				{
					provide: whatsappConfig.KEY,
					useValue: config,
				},
			],
		}).compile();

		provider = module.get<WhatsAppMessagingProvider>(WhatsAppMessagingProvider);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});

	it('should send a POST request with the correct URL and body', async () => {
		const phoneNumber = '1234567890';
		const text = 'Hello, World!';

		await provider.sendMessage(phoneNumber, text);

		expect(fetchMock).toHaveBeenCalledWith(config.url, {
			method: 'POST',
			body: {
				phoneNumber,
				text,
			},
		});
	});
});
