import { Controller, Get } from '@nestjs/common';
import { StatusDto } from '~/api/status/dto/status.dto';

@Controller('status')
export class StatusController {
	@Get()
	getStatus(): Promise<StatusDto> {
		return Promise.resolve({ status: 'ok' });
	}
}
