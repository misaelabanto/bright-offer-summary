import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MessageLayout: FC = () => {
	return (
		<main className="p-10 flex justify-center items-center h-screen">
			<Outlet />
		</main>
	);
};
