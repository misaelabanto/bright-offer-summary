import { fetcher } from '@/fetcher';
import { IMessage } from '@bright-offer-summary/shared';
import useSWR from 'swr';

export const useMessage = (id: string) => {
	const {
		data: message,
		error,
		isLoading,
	} = useSWR<IMessage>('/messages/' + id, fetcher);

	return { message, error, isLoading };
};
