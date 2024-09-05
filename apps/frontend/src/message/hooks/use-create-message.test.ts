import { fetcher } from '@/fetcher';
import { useCreateMessage } from '@/message/hooks/use-create-message';
import {
	ICreateMessageDto,
	IMessage,
	IOffer,
} from '@bright-offer-summary/shared';
import { act, renderHook } from '@testing-library/react-hooks';
import { Mock, vi } from 'vitest';

vi.mock('@/fetcher', () => ({
	fetcher: vi.fn().mockResolvedValue({}),
}));

describe('useCreateMessage', () => {
	const createMessageMock: ICreateMessageDto = {
		phoneNumber: '1234567890',
		sendAt: new Date(),
		offer: {} as IOffer,
	};

	it('should return initial state', () => {
		const { result } = renderHook(() => useCreateMessage());

		expect(result.current.message).toBeUndefined();
		expect(result.current.error).toBeUndefined();
		expect(result.current.isLoading).toBe(false);
		expect(result.current.trigger).toBeInstanceOf(Function);
	});

	it('should call fetcher with correct arguments when trigger is called', async () => {
		const { result } = renderHook(() => useCreateMessage());
		const data: ICreateMessageDto = createMessageMock;

		await act(async () => {
			await result.current.trigger(data);
		});

		expect(fetcher).toHaveBeenCalledWith('/messages', {
			method: 'POST',
			body: data,
		});
	});

	it('should update state correctly based on fetcher response', async () => {
		const message: IMessage = {
			...createMessageMock,
			id: '1',
			offer: {} as IOffer,
			createdAt: new Date(),
			status: 'sent',
		};
		(fetcher as unknown as Mock).mockResolvedValueOnce(message);

		const { result } = renderHook(() => useCreateMessage());
		const data: ICreateMessageDto = createMessageMock;

		await act(async () => {
			await result.current.trigger(data);
		});

		expect(result.current.message).toEqual(message);
		expect(result.current.error).toBeUndefined();
		expect(result.current.isLoading).toBe(false);
	});
});
