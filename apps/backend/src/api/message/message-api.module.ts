import { Module } from '@nestjs/common';
import { MessageController } from '~/api/message/message.controller';
import { MessageModule } from '~/message/message.module';

@Module({
	imports: [MessageModule],
	controllers: [MessageController],
})
export class MessageApiModule {}
