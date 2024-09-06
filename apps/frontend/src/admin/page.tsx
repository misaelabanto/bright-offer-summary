import { Icon } from '@iconify/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const AdminPage: FC = () => {
	return (
		<>
			<h1 className="text-4xl text-center">Admin Portal</h1>
			<div className="flex justify-center items-center h-screen">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-3xl">
					<Link
						to="messages"
						className="card bg-base-100 shadow-lg hover:shadow-2xl"
					>
						<div className="card-body flex items-center">
							<Icon
								icon="mdi:calendar-clock"
								fontSize={48}
								className="text-primary"
							/>
							<h2 className="card-title">View Scheduled Messages</h2>
							<p>Access the list of messages that are scheduled to be sent.</p>
						</div>
					</Link>
					<Link
						to="/admin/messages/schedule"
						className="card bg-base-100 shadow-lg hover:shadow-2xl"
					>
						<div className="card-body flex items-center">
							<Icon
								icon="mdi:calendar-plus"
								fontSize={48}
								className="text-primary"
							/>
							<h2 className="card-title">Schedule New Message</h2>
							<p>Schedule a new message to be sent at a specified time.</p>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};
