import { useMessages } from '@/message/hooks/use-messages';
import { IMessage, IOffer } from '@bright-offer-summary/shared';
import { renderHook } from '@testing-library/react-hooks';
import useSWR from 'swr';
import { Mock, vi } from 'vitest';

vi.mock('swr');

describe('useMessages', () => {
	it('should return messages data when fetch is successful', async () => {
		const mockMessages: IMessage[] = [
			{
				id: '1',
				offer: {} as IOffer,
				phoneNumber: '123456789',
				sendAt: new Date(),
				createdAt: new Date(),
				status: 'pending',
			},
			{
				id: '2',
				offer: {} as IOffer,
				phoneNumber: '987654321',
				sendAt: new Date(),
				createdAt: new Date(),
				status: 'sent',
			},
		];
		(useSWR as Mock).mockReturnValue({
			data: mockMessages,
			error: null,
			isLoading: false,
		});

		const { result } = renderHook(() => useMessages());

		expect(result.current.messages).toEqual(mockMessages);
		expect(result.current.error).toBeNull();
		expect(result.current.isLoading).toBe(false);
	});

	it('should return an error when fetch fails', async () => {
		const mockError = new Error('Failed to fetch');
		(useSWR as Mock).mockReturnValue({
			data: null,
			error: mockError,
			isLoading: false,
		});

		const { result } = renderHook(() => useMessages());

		expect(result.current.messages).toBeNull();
		expect(result.current.error).toEqual(mockError);
		expect(result.current.isLoading).toBe(false);
	});

	it('should indicate loading state correctly', async () => {
		(useSWR as Mock).mockReturnValue({
			data: null,
			error: null,
			isLoading: true,
		});

		const { result } = renderHook(() => useMessages());

		expect(result.current.messages).toBeNull();
		expect(result.current.error).toBeNull();
		expect(result.current.isLoading).toBe(true);
	});
});
