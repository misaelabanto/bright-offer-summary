import { Injectable } from '@nestjs/common';
import { OfferService } from '~/offer/offer.service';

@Injectable()
export class OfferServiceMock implements Readonly<OfferService> {
	createOffer: OfferService['createOffer'] = vi.fn();

	updateOffer: OfferService['updateOffer'] = vi.fn();
}
