import { Layout } from '@/layout';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
	return (
		<Layout>
			<main className="flex justify-center items-center h-screen">
				<div className="flex flex-col gap-10 grid-col-span-1 text-3xl">
					<Link
						className="underline hover:decoration-blue-500"
						to="/admin/messages/schedule"
					>
						Schedule Message
					</Link>
					<Link
						className="underline hover:decoration-blue-500"
						to="/admin/messages"
					>
						Messages List
					</Link>
					<Link className="underline hover:decoration-blue-500" to="/about">
						About
					</Link>
				</div>
			</main>
		</Layout>
	);
};
