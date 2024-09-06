import { useToast } from '@/common/hooks/use-toast';
import type { ICreateMessageDto } from '@bright-offer-summary/shared';
import {
	Button,
	DateInput,
	NumberInput,
	TextInput,
	TimeInput,
} from '@bright-offer-summary/ui';
import { FC, useRef } from 'react';
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
	const formRef = useRef<HTMLFormElement>(null);
	const showToast = useToast();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(formRef.current!).entries());
		const dto = await createMessageDtoSchema
			.parseAsync({
				offer: {
					systemSize: Number(data.systemSize),
					annualEscalator: Number(data.annualEscalator),
					initialDeposit: Number(data.initialDeposit),
					monthlyPayment: Number(data.monthlyPayment),
					panelQuantity: Number(data.panelQuantity),
					panelType: data.panelType,
				},
				phoneNumber: data.phoneNumber,
				sendAt: new Date(`${data.sendAtDate}T${data.sendAtTime}`),
			})
			.catch(error => {
				showToast({
					message: error.errors[0].message,
					level: 'error',
				});
				throw error;
			});
		await onSubmit(dto);
		showToast({
			message: 'Message scheduled successfully!',
			level: 'success',
		});
		// form.reset();
	};

	return (
		<form
			className="form-control"
			onSubmit={handleSubmit}
			ref={formRef}
			name="scheduleMessage"
			aria-label="Schedule message"
		>
			<div className="grid md:grid-cols-3 sm:grid-cols-2">
				<TextInput name="phoneNumber" label="Phone Number" />
				<DateInput name="sendAtDate" label="Send date" />
				<TimeInput name="sendAtTime" label="Send time" />
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
				<span className="text-base-100">Schedule!</span>
			</Button>
		</form>
	);
};
