import { useMessages } from '@/message/hooks/use-messages';
import { MessagesTable } from '@/message/messages-table';
import { Button } from '@bright-offer-summary/ui';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const MessagesPage: FC = () => {
	const { messages } = useMessages();

	return (
		<div className="w-screen lg:w-1/2 px-4 my-10">
			<h1 className="text-4xl">Scheduled messages</h1>
			{!messages && <p>Loading...</p>}
			{messages && <MessagesTable messages={messages} />}
			<Link to="/admin/messages/schedule">
				<Button type="button">
					<span className="text-base-100">Schedule new message</span>
				</Button>
			</Link>
		</div>
	);
};
