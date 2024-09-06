import { useCreateMessage } from '@/message/hooks/use-create-message';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Mock } from 'vitest';
import { MessageSchedulePage } from './page';

// Mock the useCreateMessage hook
vi.mock('@/message/hooks/use-create-message');

describe('MessageSchedulePage', () => {
	it('displays the heading and form', () => {
		// Mock the return value of useCreateMessage
		(useCreateMessage as Mock).mockReturnValue({
			trigger: vi.fn(),
			isLoading: false,
		});

		render(
			<BrowserRouter>
				<MessageSchedulePage />
			</BrowserRouter>
		);

		// Check if the heading is displayed
		expect(screen.getByText(/Schedule message/i)).toBeInTheDocument();

		// Check if the form is displayed
		expect(screen.getByRole('form')).toBeInTheDocument();
	});

	it('calls createMessage on form submission', async () => {
		const mockCreateMessage = vi.fn();
		// Mock the return value of useCreateMessage
		(useCreateMessage as Mock).mockReturnValue({
			trigger: mockCreateMessage,
			isLoading: false,
		});

		render(
			<BrowserRouter>
				<MessageSchedulePage />
			</BrowserRouter>
		);

		// Simulate form submission
		const form = screen.getByRole('form');

		fireEvent.change(screen.getByLabelText(/Phone Number/i), {
			target: { value: '1234567890' },
		});
		fireEvent.change(screen.getByLabelText(/Send date/i), {
			target: { value: '2023-10-10' },
		});
		fireEvent.change(screen.getByLabelText(/Send time/i), {
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

		fireEvent.submit(form);

		await screen.findByRole('button', { name: /Schedule!/i });

		// Check if createMessage is called
		expect(mockCreateMessage).toHaveBeenCalled();
	});
});
