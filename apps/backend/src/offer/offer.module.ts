import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '~/common/config/database.config';
import { OfferService } from '~/offer/offer.service';

@Module({
	imports: [ConfigModule.forFeature(databaseConfig)],
	providers: [OfferService],
	exports: [OfferService],
})
export class OfferModule {}
