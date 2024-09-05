import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CREATE_OFFER_DTO_MOCK } from '~/offer/mock/offer.mock';
import { Offer } from '~/offer/offer.schema';
import { OfferService } from '~/offer/offer.service';

@Injectable()
export class OfferServiceMock implements Readonly<OfferService> {
	createOffer: OfferService['createOffer'] = vi.fn().mockResolvedValue({
		...CREATE_OFFER_DTO_MOCK,
		id: randomUUID(),
	} satisfies Offer);

	updateOffer: OfferService['updateOffer'] = vi.fn().mockResolvedValue({
		...CREATE_OFFER_DTO_MOCK,
		id: randomUUID(),
	} satisfies Offer);
}
