import type { ICreateMessageDto } from '@bright-offer-summary/shared';
import {
	Button,
	DateInput,
	NumberInput,
	TextInput,
	TimeInput,
} from '@bright-offer-summary/ui';
import { FC } from 'react';
import { z, type ZodType } from 'zod';

export interface MessageFormProps {
	onSubmit: (message: ICreateMessageDto) => Promise<void>;
	isLoading: boolean;
}

const createMessageDtoSchema = z.object({
	offer: z.object({
		systemSize: z.number(),
		annualEscalator: z.number(),
		initialDeposit: z.number(),
		monthlyPayment: z.number(),
		panelQuantity: z.number(),
		panelType: z.string(),
	}),
	phoneNumber: z.string(),
	sendAt: z.date(),
}) satisfies ZodType<ICreateMessageDto>;

export const MessageForm: FC<MessageFormProps> = ({
	onSubmit,
	isLoading = false,
}) => {
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const dto = createMessageDtoSchema.parse({
			offer: {
				systemSize: Number(form.systemSize.value),
				annualEscalator: Number(form.annualEscalator.value),
				initialDeposit: Number(form.initialDeposit.value),
				monthlyPayment: Number(form.monthlyPayment.value),
				panelQuantity: Number(form.panelQuantity.value),
				panelType: form.panelType.value,
			},
			phoneNumber: form.phoneNumber.value,
			sendAt: new Date(`${form.sendAtDate.value}T${form.sendAtTime.value}`),
		});
		await onSubmit(dto);

		// form.reset();
	};

	return (
		<form className="form-control" onSubmit={handleSubmit}>
			<div className="grid md:grid-cols-3 sm:grid-cols-2">
				<TextInput name="phoneNumber" label="Phone Number" />
				<DateInput name="sendAtDate" label="Fecha de envío" />
				<TimeInput name="sendAtTime" label="Hora de envío" />
			</div>
			<div className="my-4">Offer details:</div>
			<div className="grid md:grid-cols-3 sm:grid-cols-2">
				<NumberInput name="systemSize" min={0} label="System Size" />
				<NumberInput name="panelQuantity" min={0} label="Panel Quantity" />
				<TextInput name="panelType" label="Panel Type" />
				<NumberInput name="monthlyPayment" min={0} label="Monthly Payment" />
				<NumberInput name="initialDeposit" min={0} label="Initial Deposit" />
				<NumberInput name="annualEscalator" min={0} label="Annual Escalator" />
			</div>
			<Button type="submit" isLoading={isLoading}>
				Schedule!
			</Button>
		</form>
	);
};
