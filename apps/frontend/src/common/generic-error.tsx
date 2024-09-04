import notFoundImage from '@/assets/not-found.webp';
import { FC } from 'react';

export interface ErrorProps {
	message: string;
}

export const GenericError: FC<ErrorProps> = ({ message }) => {
	return (
		<main className="h-screen w-screen flex justify-center items-center">
			<div className="flex flex-col items-center">
				<img className="w-1/2 md:w-80" src={notFoundImage} alt="Error image" />
				<h1 className="text-center">{message}</h1>
			</div>
		</main>
	);
};
