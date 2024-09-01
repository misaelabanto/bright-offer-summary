import { IMessage } from '@bright-offer-summary/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { Offer } from '~/offer/offer.schema';

export class Message implements IMessage {
	@ApiProperty({ description: 'The unique identifier of the message' })
	id: string;

	@ApiProperty({ description: 'The phone number to send message to' })
	@IsString()
	phoneNumber: string;

	@ApiProperty({
		format: 'date-time',
		description: 'The date to send the scheduled message',
	})
	@Type(() => Date)
	@IsDate()
	sendAt: Date;

	@ApiProperty({ type: Offer })
	offer: string | Offer;

	@ApiProperty({
		format: 'date-time',
		description: 'The creation date of the message',
	})
	createdAt: Date;
}
