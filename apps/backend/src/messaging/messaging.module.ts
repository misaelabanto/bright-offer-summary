import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import whatsappConfig from '~/common/config/whatsapp.config';
import { FakeMessagingProvider } from '~/messaging/providers/fake.provider';
import { WhatsAppMessagingProvider } from '~/messaging/providers/whatsapp.provider';

@Module({
	imports: [ConfigModule.forFeature(whatsappConfig)],
	providers: [FakeMessagingProvider, WhatsAppMessagingProvider],
	exports: [FakeMessagingProvider, WhatsAppMessagingProvider],
})
export class MessagingModule {}
