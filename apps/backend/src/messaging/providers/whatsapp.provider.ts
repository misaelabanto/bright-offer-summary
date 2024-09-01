import { Injectable, Logger } from '@nestjs/common';
import { IMessagingProvider } from '~/messaging/messaging.provider';

@Injectable()
export class WhatsAppMessagingProvider implements IMessagingProvider {
	logger = new Logger(WhatsAppMessagingProvider.name);

	sendMessage(phoneNumber: string, message: string): Promise<void> {
		this.logger.log(`Sending message to ${phoneNumber}: ${message}`);
		return Promise.resolve();
	}
}
