import { fetcher } from '@/fetcher';
import { ICreateMessageDto, IMessage } from '@bright-offer-summary/shared';
import useSWRMutation from 'swr/mutation';

export const useCreateMessage = () => {
	const {
		trigger,
		data: message,
		error,
		isMutating: isLoading,
	} = useSWRMutation(
		'/messages',
		(url: string, { arg: data }: { arg: ICreateMessageDto }) =>
			fetcher<IMessage>(url, {
				method: 'POST',
				body: data,
			})
	);

	return { message, error, isLoading, trigger };
};
