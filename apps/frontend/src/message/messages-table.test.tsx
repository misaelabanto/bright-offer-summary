import { IMessage, IOffer } from '@bright-offer-summary/shared';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MessagesTable } from './messages-table';

const mockMessages: IMessage[] = [
	{
		id: '1',
		createdAt: new Date('2024-10-10'),
		sendAt: new Date('2024-10-11'),
		phoneNumber: '1234567890',
		status: 'pending',
		offer: {} as IOffer,
	},
	{
		id: '2',
		createdAt: new Date('2024-10-12'),
		sendAt: new Date('2024-10-13'),
		phoneNumber: '0987654321',
		status: 'sent',
		offer: {} as IOffer,
	},
	{
		id: '3',
		createdAt: new Date('2024-10-14'),
		sendAt: new Date('2024-10-15'),
		phoneNumber: '1122334455',
		status: 'failed',
		offer: {} as IOffer,
	},
];

describe('MessagesTable', () => {
	it('renders table headers correctly', () => {
		render(
			<BrowserRouter>
				<MessagesTable messages={mockMessages} />
			</BrowserRouter>
		);
		expect(screen.getByText('Created at')).toBeInTheDocument();
		expect(screen.getByText('Scheduled at')).toBeInTheDocument();
		expect(screen.getByText('Phone Number')).toBeInTheDocument();
		expect(screen.getByText('Status')).toBeInTheDocument();
	});

	it('renders the correct number of rows', () => {
		render(
			<BrowserRouter>
				<MessagesTable messages={mockMessages} />
			</BrowserRouter>
		);
		const rows = screen.getAllByRole('row');
		// Including header row
		expect(rows).toHaveLength(mockMessages.length + 1);
	});

	it('renders each cell with correct data', () => {
		render(
			<BrowserRouter>
				<MessagesTable messages={mockMessages} />
			</BrowserRouter>
		);
		mockMessages.forEach(message => {
			expect(
				screen.getByText(new Date(message.createdAt).toLocaleString())
			).toBeInTheDocument();
			expect(
				screen.getByText(new Date(message.sendAt).toLocaleString())
			).toBeInTheDocument();
			expect(screen.getByText(message.phoneNumber)).toBeInTheDocument();
			expect(screen.getByText(message.status)).toBeInTheDocument();
		});
	});

	it('applies correct class based on message status', () => {
		render(
			<BrowserRouter>
				<MessagesTable messages={mockMessages} />
			</BrowserRouter>
		);
		mockMessages.forEach(message => {
			const statusElement = screen.getByText(message.status);
			if (message.status === 'pending') {
				expect(statusElement).toHaveClass('bg-yellow-500');
			} else if (message.status === 'sent') {
				expect(statusElement).toHaveClass('bg-green-500');
			} else if (message.status === 'failed') {
				expect(statusElement).toHaveClass('bg-red-500');
			}
		});
	});

	it('renders a message when there are no messages', () => {
		render(<MessagesTable messages={[]} />);
		expect(screen.getByText('No messages available')).toBeInTheDocument();
	});

	it('renders a link to the message details', () => {
		render(
			<BrowserRouter>
				<MessagesTable messages={mockMessages} />
			</BrowserRouter>
		);
		mockMessages.forEach(message => {
			const linkElement = screen.getByRole('button', { name: message.id });
			expect(linkElement.parentElement).toHaveAttribute(
				'href',
				`/messages/${message.id}`
			);
		});
	});
});
