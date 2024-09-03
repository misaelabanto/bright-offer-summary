import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from '~/message/dto/create-message.dto';
import { Message } from '~/message/message.schema';
import { MessageService } from '~/message/message.service';

@Controller('messages')
@ApiTags('messages')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Post()
	@ApiCreatedResponse({ type: Message })
	create(
		@Body()
		dto: CreateMessageDto
	): Promise<Message> {
		return this.messageService.create(dto);
	}

	@Patch(':id')
	@ApiOkResponse({ type: Message })
	update(
		@Param('id') id: string,
		@Body() dto: CreateMessageDto
	): Promise<Message> {
		return this.messageService.update(id, dto);
	}

	@Get()
	@ApiOkResponse({ type: [Message] })
	findAll(): Promise<Message[]> {
		return this.messageService.findAll();
	}

	@Get(':id')
	findById(@Param('id') id: string): Promise<Message> {
		return this.messageService.findById(id);
	}
}
