import { IOffer } from '@bright-offer-summary/shared';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsInt,
	IsNumber,
	IsPositive,
	IsString,
	Min,
	MinLength,
} from 'class-validator';

export class Offer implements IOffer {
	@ApiProperty({ description: 'The unique identifier of the offer' })
	id: string;

	@ApiProperty({ description: 'Expressed in kW', example: 6.6 })
	@IsPositive()
	systemSize: number;

	@ApiProperty({ description: 'Number of panels', example: 12 })
	@IsPositive()
	@IsInt()
	panelQuantity: number;

	@ApiProperty({
		description: 'Description of the panel',
		example: 'Premium Panels 550W',
	})
	@IsString()
	@MinLength(1)
	panelType: string;

	@ApiProperty({ description: 'Monthly payment in MXN', example: 2140 })
	@Min(0)
	monthlyPayment: number;

	@ApiProperty({ description: 'Initial deposit in MXN', example: 0 })
	@Min(0)
	initialDeposit: number;

	@ApiProperty({ description: 'Annual escalator in percentage', example: 4.5 })
	@IsNumber()
	annualEscalator: number;
}
