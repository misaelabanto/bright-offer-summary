import { Icon } from '@iconify/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
	return (
		<>
			<h1 className="text-4xl text-center">Bright Solar Offer Summary</h1>
			<div className="flex justify-center items-center">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-40">
					<Link
						to="https://api.bright.misaelabanto.com/docs"
						className="card w-80 bg-base-100 shadow-lg hover:shadow-2xl"
					>
						<div className="card-body flex items-center">
							<Icon icon="mdi:api" fontSize={48} className="text-primary" />
							<h2 className="card-title text-center">View API Docs</h2>
							<p>
								Access the API documentation to understand the available
								endpoints and their usage.
							</p>
						</div>
					</Link>
					<Link
						to="https://github.com/misaelabanto/bright-offer-summary"
						className="card w-80 bg-base-100 shadow-lg hover:shadow-2xl "
					>
						<div className="card-body flex items-center">
							<Icon
								icon="mdi:code-tags"
								fontSize={48}
								className="text-primary"
							/>
							<h2 className="card-title text-center">
								View Code & Documentation
							</h2>
							<p>
								Explore the source code and additional documentation of the
								solution
							</p>
						</div>
					</Link>
					<Link
						to="https://docs.google.com/document/d/1TK4vL8kfoHKIpQWjYMAsNujprAlxrqa5KNyX8zRJlBU/edit?usp=sharing"
						className="card w-80 bg-base-100 shadow-lg hover:shadow-2xl "
					>
						<div className="card-body flex items-center">
							<Icon
								icon="mdi:alert-circle"
								fontSize={48}
								className="text-primary"
							/>
							<h2 className="card-title text-center">View Challenge</h2>
							<p>Review the challenge specifications and constraints</p>
						</div>
					</Link>
					<Link
						to="/about"
						className="card w-80 bg-base-100 shadow-lg hover:shadow-2xl "
					>
						<div className="card-body flex items-center">
							<Icon
								icon="mdi:information"
								fontSize={48}
								className="text-primary"
							/>
							<h2 className="card-title text-center">About</h2>
							<p>Learn more about the project and its author</p>
						</div>
					</Link>
					<Link
						to="/about"
						className="card w-80 bg-base-100 shadow-lg hover:shadow-2xl "
					>
						<div className="card-body flex items-center">
							<Icon
								icon="mdi:shield-account"
								fontSize={48}
								className="text-primary"
							/>
							<h2 className="card-title text-center">Admin</h2>
							<p>Admin mode to play with the features</p>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};
