import { FC } from 'react';

export interface ToastProps {
	message: string;
	level: 'error' | 'info' | 'warning' | 'success';
}

export const Toast: FC<ToastProps> = ({ message, level }) => {
	const levelClasses = {
		info: 'bg-blue-500 text-white',
		success: 'bg-green-500 text-white',
		warning: 'bg-yellow-600 text-white',
		error: 'bg-red-500 text-white',
	};

	return (
		<div
			className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${levelClasses[level]}`}
		>
			{message}
		</div>
	);
};
