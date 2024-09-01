import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusDto } from '~/api/status/dto/status.dto';

@Controller('status')
@ApiTags('status')
export class StatusController {
	@Get()
	getStatus(): Promise<StatusDto> {
		return Promise.resolve({ status: 'ok' });
	}
}
