import { Injectable, Logger } from '@nestjs/common';
import { IMessagingProvider } from '~/messaging/messaging.provider';
import { WhatsAppMessagingProvider } from '~/messaging/providers/whatsapp.provider';

@Injectable()
export class FakeProvider implements IMessagingProvider {
	logger = new Logger(WhatsAppMessagingProvider.name);

	sendMessage(phoneNumber: string, message: string): Promise<void> {
		this.logger.log(`Sending message to ${phoneNumber}: ${message}`);
		return Promise.resolve();
	}
}
