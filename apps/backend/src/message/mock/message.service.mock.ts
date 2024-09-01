import { Injectable } from '@nestjs/common';
import { MessageService } from '~/message/message.service';

@Injectable()
export class MessageServiceMock implements Readonly<MessageService> {
	getMessages: MessageService['getMessages'] = vi.fn();

	createMessage: MessageService['createMessage'] = vi.fn();

	updateMessage: MessageService['updateMessage'] = vi.fn();
}
