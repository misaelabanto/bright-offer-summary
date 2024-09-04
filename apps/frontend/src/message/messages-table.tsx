import { IMessage } from '@bright-offer-summary/shared';
import { FC } from 'react';

export const MessagesTable: FC<{ messages: IMessage[] }> = ({ messages }) => {
	const statusColors = {
		pending: 'bg-yellow-500',
		sent: 'bg-green-500',
		failed: 'bg-red-500',
	} as const;
	return (
		<table className="table table-zebra w-full">
			<thead>
				<tr>
					<th className="p-2">ID</th>
					<th className="p-2">Created at</th>
					<th className="p-2">Scheduled at</th>
					<th className="p-2">Phone Number</th>
					<th className="p-2">Status</th>
				</tr>
			</thead>
			<tbody>
				{messages.map(message => (
					<tr key={message.id}>
						<td className="p-2">{message.id}</td>
						<td className="p-2">
							{new Date(message.createdAt).toLocaleString()}
						</td>
						<td className="p-2">{new Date(message.sendAt).toLocaleString()}</td>
						<td className="p-2">{message.phoneNumber}</td>
						<td className="p-2">
							<span
								className={`${statusColors[message.status]} p-2 rounded-md text-white`}
							>
								{message.status}
							</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
