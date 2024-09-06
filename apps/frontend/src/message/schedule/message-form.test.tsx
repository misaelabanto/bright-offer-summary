import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MessageForm, MessageFormProps } from './message-form';

test('handleSubmit calls onSubmit with correct data', async () => {
	const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
	const props: MessageFormProps = {
		onSubmit: mockOnSubmit,
		isLoading: false,
	};

	render(<MessageForm {...props} />);

	// Fill out the form fields
	fireEvent.change(screen.getByLabelText(/Phone Number/i), {
		target: { value: '1234567890' },
	});
	fireEvent.change(screen.getByLabelText(/Send Date/i), {
		target: { value: '2023-10-10' },
	});
	fireEvent.change(screen.getByLabelText(/Send Time/i), {
		target: { value: '10:00' },
	});
	fireEvent.change(screen.getByLabelText(/System Size/i), {
		target: { value: '5' },
	});
	fireEvent.change(screen.getByLabelText(/Panel Quantity/i), {
		target: { value: '20' },
	});
	fireEvent.change(screen.getByLabelText(/Panel Type/i), {
		target: { value: 'Type A' },
	});
	fireEvent.change(screen.getByLabelText(/Monthly Payment/i), {
		target: { value: '100' },
	});
	fireEvent.change(screen.getByLabelText(/Initial Deposit/i), {
		target: { value: '500' },
	});
	fireEvent.change(screen.getByLabelText(/Annual Escalator/i), {
		target: { value: '2' },
	});

	// Submit the form
	fireEvent.submit(screen.getByRole('button', { name: /Schedule!/i }));

	// Wait for the async function to be called
	await screen.findByRole('button', { name: /Schedule!/i });

	// Verify the onSubmit function is called with the correct data
	expect(mockOnSubmit).toHaveBeenCalledWith({
		offer: {
			systemSize: 5,
			annualEscalator: 2,
			initialDeposit: 500,
			monthlyPayment: 100,
			panelQuantity: 20,
			panelType: 'Type A',
		},
		phoneNumber: '1234567890',
		sendAt: new Date('2023-10-10T10:00'),
	});
});
