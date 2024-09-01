import { CreateMessageDto } from '~/message/dto/create-message.dto';
import { OFFER_MOCK } from '~/offer/mock/offer.mock';

export const MESSAGE_MOCK: CreateMessageDto = {
	offer: OFFER_MOCK,
	phoneNumber: '1234567890',
	sendAt: new Date('2024-10-01T15:00:00.000Z'),
};
