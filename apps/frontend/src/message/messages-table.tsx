import { IMessage } from '@bright-offer-summary/shared';
import { Icon } from '@iconify/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const MessagesTable: FC<{ messages: IMessage[] }> = ({ messages }) => {
	const statusColors = {
		pending: 'bg-yellow-500',
		sent: 'bg-green-500',
		failed: 'bg-red-500',
	} as const;
	return (
		<table className="table w-full">
			<thead>
				<tr>
					<th className="p-2">Created at</th>
					<th className="p-2">Scheduled at</th>
					<th className="p-2">Phone Number</th>
					<th className="p-2">Status</th>
					<th className="p-2">Actions</th>
				</tr>
			</thead>
			<tbody>
				{messages.length ? (
					messages.map(message => (
						<tr className="hover" key={message.id}>
							<td className="p-2">
								{new Date(message.createdAt).toLocaleString()}
							</td>
							<td className="p-2">
								{new Date(message.sendAt).toLocaleString()}
							</td>
							<td className="p-2">{message.phoneNumber}</td>
							<td className="p-2">
								<span
									className={`${statusColors[message.status]} p-2 rounded-md text-white`}
								>
									{message.status}
								</span>
							</td>
							<td className="cursor-pointer">
								<Link to={'/messages/' + message.id}>
									<button aria-label={message.id}>
										<Icon
											icon="mdi:eye"
											fontSize={16}
											className="hover:text-primary"
										></Icon>
									</button>
								</Link>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan={5}>No messages available</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};
