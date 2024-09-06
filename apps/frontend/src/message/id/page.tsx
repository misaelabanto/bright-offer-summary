import { GenericError } from '@/common/generic-error';
import { useMessage } from '@/message/hooks/use-message';
import { MessageView } from '@/message/id/message-view';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

export interface MessageIdPageProps {
	id: string;
}

export const MessageIdPage: FC = () => {
	const { id } = useParams();
	const { message, error, isLoading } = useMessage(id!);

	return (
		<div className="flex justify-center h-screen``` items-center">
			{error && <GenericError message={error.message} />}
			{isLoading && <div>Loading...</div>}
			{message && <MessageView message={message} />}
		</div>
	);
};
