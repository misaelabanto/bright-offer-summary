import { Module } from '@nestjs/common';
import { WhatsAppMessagingProvider } from '~/messaging/providers/whatsapp.provider';

@Module({
	providers: [WhatsAppMessagingProvider],
})
export class MessagingModule {}
