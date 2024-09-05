import { Injectable, Logger } from '@nestjs/common';
import { IMessagingProvider } from '~/messaging/messaging.provider';

@Injectable()
export class FakeMessagingProvider implements IMessagingProvider {
	private readonly logger = new Logger(FakeMessagingProvider.name);

	sendMessage(phoneNumber: string, message: string): Promise<void> {
		this.logger.log(`Sending message to ${phoneNumber}: ${message}`);
		return Promise.resolve();
	}
}
