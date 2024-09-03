import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import type { $Fetch } from 'ofetch';
import whatsappConfig from '~/common/config/whatsapp.config';
import { IMessagingProvider } from '~/messaging/messaging.provider';

@Injectable()
export class WhatsAppMessagingProvider implements IMessagingProvider {
	constructor(
		@Inject('FetchService')
		private readonly fetch: $Fetch,
		@Inject(whatsappConfig.KEY)
		private readonly config: ConfigType<typeof whatsappConfig>
	) {}

	async sendMessage(phoneNumber: string, text: string): Promise<void> {
		await this.fetch(this.config.url, {
			method: 'POST',
			body: {
				phoneNumber,
				text,
			},
		});
	}
}
