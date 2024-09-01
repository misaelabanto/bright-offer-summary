import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { OFFER_MOCK } from '~/offer/mock/offer.mock';
import { Offer } from '~/offer/offer.schema';
import { OfferService } from '~/offer/offer.service';

@Injectable()
export class OfferServiceMock implements Readonly<OfferService> {
	createOffer: OfferService['createOffer'] = vi.fn().mockResolvedValue({
		...OFFER_MOCK,
		id: randomUUID(),
	} satisfies Offer);

	updateOffer: OfferService['updateOffer'] = vi.fn().mockResolvedValue({
		...OFFER_MOCK,
		id: randomUUID(),
	} satisfies Offer);
}
