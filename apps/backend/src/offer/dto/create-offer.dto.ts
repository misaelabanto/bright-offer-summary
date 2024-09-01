import { ICreateOfferDto } from '@bright-offer-summary/shared';
import { OmitType } from '@nestjs/swagger';
import { Offer } from '~/offer/offer.schema';

export class CreateOfferDto
	extends OmitType(Offer, ['id'])
	implements ICreateOfferDto {}
