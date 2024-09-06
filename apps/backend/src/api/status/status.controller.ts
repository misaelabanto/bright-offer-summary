import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatusDto } from '~/api/status/dto/status.dto';

@Controller('status')
@ApiTags('status')
export class StatusController {
	@Get()
	@ApiOkResponse({ type: StatusDto })
	getStatus(): Promise<StatusDto> {
		return Promise.resolve({ status: 'ok' });
	}
}
