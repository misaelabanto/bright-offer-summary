import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateMessageDto } from '~/message/dto/create-message.dto';
import { Message } from '~/message/message.schema';
import { MessageService } from '~/message/message.service';

@Controller('messages')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Post()
	@ApiCreatedResponse({ type: Message })
	createMessage(
		@Body()
		dto: CreateMessageDto
	): Promise<Message> {
		return this.messageService.createMessage(dto);
	}

	@Patch(':id')
	@ApiOkResponse({ type: Message })
	updateMessage(
		@Param('id') id: string,
		@Body() dto: CreateMessageDto
	): Promise<Message> {
		return this.messageService.updateMessage(id, dto);
	}
}
