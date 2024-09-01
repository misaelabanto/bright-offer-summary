import { IUpdateOfferDto } from '../../offer/dto/update-offer.dto';
import { ICreateMessageDto } from './create-message.dto';

export interface IUpdateMessageDto
	extends Partial<Omit<ICreateMessageDto, 'offer'>> {
	offer?: IUpdateOfferDto;
}
