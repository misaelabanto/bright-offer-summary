import { useMessage } from '@/message/hooks/use-message';
import { IMessage } from '@bright-offer-summary/shared';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import { MessageIdPage } from './page';

vi.mock('react-router-dom', () => ({
	useParams: vi.fn(),
}));

vi.mock('@/message/hooks/use-message', () => ({
	useMessage: vi.fn(),
}));

describe('MessageIdPage', () => {
	it('renders loading state', () => {
		(useParams as Mock).mockReturnValue({ id: '123' });
		(useMessage as Mock).mockReturnValue({
			isLoading: true,
			message: null,
			error: null,
		});

		render(<MessageIdPage />);

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('renders error state', () => {
		(useParams as Mock).mockReturnValue({ id: '123' });
		(useMessage as Mock).mockReturnValue({
			isLoading: false,
			message: null,
			error: { message: 'Error occurred' },
		});

		render(<MessageIdPage />);

		expect(screen.getByText('Error occurred')).toBeInTheDocument();
	});

	it('renders message view', () => {
		(useParams as Mock).mockReturnValue({ id: '123' });
		(useMessage as Mock).mockReturnValue({
			isLoading: false,
			message: {
				id: '123',
				offer: {
					monthlyPayment: 1200,
					annualEscalator: 4.5,
					initialDeposit: 1000,
					id: '1',
					panelQuantity: 20,
					panelType: 'PREMIUM',
					systemSize: 5,
				},
				phoneNumber: '123456789',
				createdAt: new Date(),
				sendAt: new Date(),
				status: 'sent',
			} as IMessage,
			error: null,
		});

		render(<MessageIdPage />);

		expect(screen.getByText('PREMIUM')).toBeInTheDocument();
	});
});
