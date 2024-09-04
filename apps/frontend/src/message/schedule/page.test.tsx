import { useCreateMessage } from '@/message/hooks/use-create-message';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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

		render(<MessageSchedulePage />);

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

		render(<MessageSchedulePage />);

		// Simulate form submission
		const form = screen.getByRole('form');
		fireEvent.submit(form);

		// Check if createMessage is called
		expect(mockCreateMessage).toHaveBeenCalled();
	});
});
