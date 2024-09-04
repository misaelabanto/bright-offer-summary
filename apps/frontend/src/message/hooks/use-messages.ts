import { fetcher } from '@/fetcher';
import { IMessage } from '@bright-offer-summary/shared';
import useSWR from 'swr';

export const useMessages = () => {
	const {
		data: messages,
		error,
		isLoading,
	} = useSWR<IMessage[]>('/messages', fetcher);

	return { messages, error, isLoading };
};
