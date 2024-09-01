import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '~/common/config/database.config';
import { MessageService } from '~/message/message.service';
import { OfferModule } from '~/offer/offer.module';

@Module({
	imports: [OfferModule, ConfigModule.forFeature(databaseConfig)],
	providers: [MessageService],
	exports: [MessageService],
})
export class MessageModule {}
