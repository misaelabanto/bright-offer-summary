import { IOffer } from '../offer/offer';

export interface IMessage {
	id: string;
	phoneNumber: string;
	sendAt: Date;
	offer: string | IOffer;
	createdAt: Date;
}
