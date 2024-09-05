import { randomUUID } from 'crypto';
import { CreateMessageDto } from '~/message/dto/create-message.dto';
import { Message } from '~/message/message.schema';
import { CREATE_OFFER_DTO_MOCK, OFFER_MOCK } from '~/offer/mock/offer.mock';

export const CREATE_MESSAGE_DTO_MOCK: CreateMessageDto = {
	offer: CREATE_OFFER_DTO_MOCK,
	phoneNumber: '1234567890',
	sendAt: new Date('2024-10-01T15:00:00.000Z'),
};

export const MESSAGE_MOCK: Message = {
	...CREATE_MESSAGE_DTO_MOCK,
	offer: OFFER_MOCK,
	id: randomUUID(),
	createdAt: new Date('2024-10-01T15:00:00.000Z'),
	status: 'pending',
};
