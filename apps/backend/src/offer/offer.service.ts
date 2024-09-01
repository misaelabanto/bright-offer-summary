import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import databaseConfig from '~/common/config/database.config';
import { offers } from '~/drizzle-schema';
import { CreateOfferDto } from '~/offer/dto/create-offer.dto';
import { UpdateOfferDto } from '~/offer/dto/update-offer.dto';
import { Offer } from '~/offer/offer.schema';

@Injectable()
export class OfferService {
	constructor(
		@Inject(databaseConfig.KEY)
		private readonly db: ConfigType<typeof databaseConfig>
	) {}

	async createOffer(dto: CreateOfferDto): Promise<Offer> {
		const [offer] = await this.db.insert(offers).values([dto]).returning();
		return offer;
	}

	async updateOffer(id: string, dto: UpdateOfferDto): Promise<Offer> {
		const [offer] = await this.db
			.update(offers)
			.set(dto)
			.where(eq(offers.id, id))
			.returning();
		return offer;
	}
}
