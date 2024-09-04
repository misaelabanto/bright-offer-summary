import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '~/common/config/database.config';
import frontendConfig from '~/common/config/frontend.config';
import { MessageService } from '~/message/message.service';
import { MessagingModule } from '~/messaging/messaging.module';
import { OfferModule } from '~/offer/offer.module';

@Module({
	imports: [
		MessagingModule,
		OfferModule,
		ConfigModule.forFeature(databaseConfig),
		ConfigModule.forFeature(frontendConfig),
	],
	providers: [MessageService],
	exports: [MessageService],
})
export class MessageModule {}
