import { ICreateOfferDto } from '../../offer/dto/create-offer.dto';
import { IMessage } from '../message';

export interface ICreateMessageDto
	extends Omit<IMessage, 'id' | 'createdAt' | 'offer'> {
	offer: ICreateOfferDto;
}
