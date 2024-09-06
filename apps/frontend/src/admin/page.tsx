import { Icon } from '@iconify/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const AdminPage: FC = () => {
	return (
		<div>
			<h1 className="text-4xl text-center my-10">Admin Portal</h1>
			<div className="flex justify-center items-center ">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					<Link
						to="messages"
						className="card w-80 bg-base-100 shadow-lg hover:shadow-2xl group"
					>
						<div className="card-body flex items-center">
							<Icon
								icon="mdi:calendar-clock"
								fontSize={48}
								className="text-primary group-hover:text-secondary"
							/>
							<h2 className="card-title">View Scheduled Messages</h2>
							<p>Access the list of messages that are scheduled to be sent.</p>
						</div>
					</Link>
					<Link
						to="/admin/messages/schedule"
						className="card w-80 bg-base-100 shadow-lg hover:shadow-2xl group"
					>
						<div className="card-body flex items-center">
							<Icon
								icon="mdi:calendar-plus"
								fontSize={48}
								className="text-primary group-hover:text-secondary"
							/>
							<h2 className="card-title">Schedule New Message</h2>
							<p>Schedule a new message to be sent at a specified time.</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};
