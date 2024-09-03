import { useCreateMessage } from '@/message/hooks/use-create-message';
import { MessageForm } from '@/message/message-form';
import { ICreateMessageDto } from '@bright-offer-summary/shared';
import { FC } from 'react';

export const MessagePage: FC = () => {
	const { trigger: createMessage, isLoading } = useCreateMessage();

	const onFormSubmit = async (data: ICreateMessageDto) => {
		await createMessage(data);
	};

	return (
		<main className="p-10">
			<h1 className="text-4xl">Schedule message</h1>
			<MessageForm onSubmit={onFormSubmit} isLoading={isLoading} />
		</main>
	);
};
