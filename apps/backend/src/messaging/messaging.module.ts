import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import whatsappConfig from '~/common/config/whatsapp.config';
import { WhatsAppMessagingProvider } from '~/messaging/providers/whatsapp.provider';

@Module({
	imports: [ConfigModule.forFeature(whatsappConfig)],
	providers: [WhatsAppMessagingProvider],
})
export class MessagingModule {}
