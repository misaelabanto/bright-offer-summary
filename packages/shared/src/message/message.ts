import { IOffer } from '../offer/offer';
import { MessageStatus } from './message-status';

export interface IMessage {
	id: string;
	phoneNumber: string;
	sendAt: Date;
	offer: string | IOffer;
	createdAt: Date;
	status: MessageStatus;
}
