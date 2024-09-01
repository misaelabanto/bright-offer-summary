import { Module } from '@nestjs/common';
import { StatusController } from '~/api/status/status.controller';

@Module({
	controllers: [StatusController],
})
export class StatusApiModule {}
