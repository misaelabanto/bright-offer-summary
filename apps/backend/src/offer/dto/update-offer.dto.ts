import { IUpdateOfferDto } from '@bright-offer-summary/shared';
import { PartialType } from '@nestjs/swagger';
import { CreateOfferDto } from '~/offer/dto/create-offer.dto';

export class UpdateOfferDto
	extends PartialType(CreateOfferDto)
	implements IUpdateOfferDto {}
