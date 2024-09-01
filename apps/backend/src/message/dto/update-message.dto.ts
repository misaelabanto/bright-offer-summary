import { IUpdateMessageDto } from '@bright-offer-summary/shared';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateMessageDto } from '~/message/dto/create-message.dto';
import { CreateOfferDto } from '~/offer/dto/create-offer.dto';
import { UpdateOfferDto } from '~/offer/dto/update-offer.dto';

export class UpdateMessageDto
	extends PartialType(OmitType(CreateMessageDto, ['offer']))
	implements IUpdateMessageDto
{
	@ValidateNested()
	@Type(() => CreateOfferDto)
	@ApiProperty({ type: CreateOfferDto })
	offer: UpdateOfferDto;
}
