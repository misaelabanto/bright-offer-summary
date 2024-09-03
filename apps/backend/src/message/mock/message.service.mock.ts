import { Injectable } from '@nestjs/common';
import { MessageService } from '~/message/message.service';

@Injectable()
export class MessageServiceMock implements Readonly<MessageService> {
	findById: MessageService['findById'] = vi.fn();

	findAll: MessageService['findAll'] = vi.fn();

	create: MessageService['create'] = vi.fn();

	update: MessageService['update'] = vi.fn();
}
