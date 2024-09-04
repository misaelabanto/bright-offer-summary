import { useMessages } from '@/message/hooks/use-messages';
import { MessagesTable } from '@/message/messages-table';
import { FC } from 'react';

export const MessagesPage: FC = () => {
	const { messages } = useMessages();

	return (
		<div className="w-screen lg:w-1/2">
			<h1 className="text-4xl">Scheduled messages</h1>
			{!messages && <p>Loading...</p>}
			{messages && <MessagesTable messages={messages} />}
		</div>
	);
};
