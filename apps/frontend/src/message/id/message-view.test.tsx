import { IMessage, IOffer } from '@bright-offer-summary/shared';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MessageView, MessageViewProps } from './message-view';

describe('MessageView', () => {
	const mockMessage: IMessage = {
		id: '1',
		phoneNumber: '1234567890',
		createdAt: new Date(),
		sendAt: new Date(),
		status: 'sent',
		offer: {
			systemSize: 5,
			panelQuantity: 20,
			panelType: 'Monocrystalline',
			monthlyPayment: 150.75,
			initialDeposit: 1000.0,
			annualEscalator: 2.5,
		} as IOffer,
	};

	const renderComponent = (props: Partial<MessageViewProps> = {}) => {
		const defaultProps: MessageViewProps = {
			message: mockMessage,
			...props,
		};
		return render(<MessageView {...defaultProps} />);
	};

	it('renders the correct system size', () => {
		renderComponent();
		expect(screen.getByText('Tamaño del sistema')).toBeInTheDocument();
		expect(screen.getByText('5 kW')).toBeInTheDocument();
	});

	it('renders the correct panel quantity', () => {
		renderComponent();
		expect(screen.getByText('Cantidad de paneles')).toBeInTheDocument();
		expect(screen.getByText('20')).toBeInTheDocument();
	});

	it('renders the correct panel type', () => {
		renderComponent();
		expect(screen.getByText('Tipo de panel')).toBeInTheDocument();
		expect(screen.getByText('Monocrystalline')).toBeInTheDocument();
	});

	it('renders the correct monthly payment', () => {
		renderComponent();
		expect(screen.getByText('Mensualidad')).toBeInTheDocument();
		expect(screen.getByText('$150.75')).toBeInTheDocument();
	});

	it('renders the correct initial deposit', () => {
		renderComponent();
		expect(screen.getByText('Depósito inicial')).toBeInTheDocument();
		expect(screen.getByText('$1000.00')).toBeInTheDocument();
	});

	it('renders the correct annual escalator', () => {
		renderComponent();
		expect(screen.getByText('Escalador')).toBeInTheDocument();
		expect(screen.getByText('2.50% anual')).toBeInTheDocument();
	});
});
