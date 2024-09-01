import { ICreateMessageDto } from '@bright-offer-summary/shared';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { Message } from '~/message/message.schema';
import { CreateOfferDto } from '~/offer/dto/create-offer.dto';

export class CreateMessageDto
	extends OmitType(Message, ['id', 'createdAt', 'offer'])
	implements ICreateMessageDto
{
	@ApiProperty({ type: CreateOfferDto })
	@Type(() => CreateOfferDto)
	@ValidateNested()
	@IsObject()
	offer: CreateOfferDto;
}
