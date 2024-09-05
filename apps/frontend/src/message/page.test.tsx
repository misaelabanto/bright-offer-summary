import { useMessages } from '@/message/hooks/use-messages';
import { IMessage, IOffer } from '@bright-offer-summary/shared';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { MessagesPage } from './page';

// Mock the useMessages hook
vi.mock('@/message/hooks/use-messages');

describe('MessagesPage', () => {
	it('displays loading state when messages are null', () => {
		// Mock the return value of useMessages
		(useMessages as Mock).mockReturnValue({ messages: null });

		render(<MessagesPage />);

		// Check if the loading text is displayed
		expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
	});

	it('displays MessagesTable when messages are available', () => {
		const mockMessages: IMessage[] = [
			{
				id: '1',
				createdAt: new Date(),
				offer: {} as IOffer,
				phoneNumber: '1234567890',
				sendAt: new Date(),
				status: 'pending',
			},
			{
				id: '2',
				createdAt: new Date(),
				offer: {} as IOffer,
				phoneNumber: '1234567890',
				sendAt: new Date(),
				status: 'sent',
			},
		];

		// Mock the return value of useMessages
		(useMessages as Mock).mockReturnValue({ messages: mockMessages });

		render(<MessagesPage />);

		// Check if the MessagesTable is displayed
		expect(screen.getByText(/Scheduled messages/i)).toBeInTheDocument();
		expect(screen.getByText(/pending/i)).toBeInTheDocument();
		expect(screen.getByText(/sent/i)).toBeInTheDocument();
	});
});
