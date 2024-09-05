import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorProps, GenericError } from './generic-error';

vi.mock('@/assets/not-found.webp', () => ({ default: 'mocked-image-path' }));

describe('GenericError', () => {
	const defaultProps: ErrorProps = {
		message: 'An error occurred',
	};

	it('renders without crashing', () => {
		render(<GenericError {...defaultProps} />);
		expect(screen.getByRole('main')).toBeInTheDocument();
	});

	it('displays the correct error message', () => {
		render(<GenericError {...defaultProps} />);
		expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
	});

	it('renders the error image with correct attributes', () => {
		render(<GenericError {...defaultProps} />);
		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('src', 'mocked-image-path');
		expect(img).toHaveAttribute('alt', 'Error image');
	});
});
