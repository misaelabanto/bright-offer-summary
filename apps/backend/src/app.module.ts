import { Module } from '@nestjs/common';
import { MessageApiModule } from '~/api/message/message-api.module';
import { StatusApiModule } from '~/api/status/status-api.module';
import { HttpModule } from '~/http/http.module';
import { MessageModule } from '~/message/message.module';
import { MessagingModule } from '~/messaging/messaging.module';
import { OfferModule } from '~/offer/offer.module';

@Module({
	imports: [
		HttpModule,
		MessageModule,
		OfferModule,
		MessagingModule,
		MessageApiModule,
		StatusApiModule,
	],
})
export class AppModule {}
