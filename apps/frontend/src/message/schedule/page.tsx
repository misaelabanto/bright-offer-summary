import { useCreateMessage } from '@/message/hooks/use-create-message';
import { MessageForm } from '@/message/schedule/message-form';
import { ICreateMessageDto } from '@bright-offer-summary/shared';
import { Button } from '@bright-offer-summary/ui';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const MessageSchedulePage: FC = () => {
	const { trigger: createMessage, isLoading } = useCreateMessage();

	const onFormSubmit = async (data: ICreateMessageDto) => {
		await createMessage(data);
	};

	return (
		<div className="p-10">
			<h1 className="text-4xl">Schedule message</h1>
			<MessageForm onSubmit={onFormSubmit} isLoading={isLoading} />
			<Link to="/admin/messages">
				<Button type={'submit'}>
					<span>View all messages</span>
				</Button>
			</Link>
		</div>
	);
};
