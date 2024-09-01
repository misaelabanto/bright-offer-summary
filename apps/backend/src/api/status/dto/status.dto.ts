import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
	@ApiProperty({ example: 'ok' })
	status: string;
}
