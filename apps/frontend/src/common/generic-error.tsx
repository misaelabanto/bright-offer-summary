import notFoundImage from '@/assets/not-found.webp';
import { FC } from 'react';

export interface ErrorProps {
	message: string;
}

export const GenericError: FC<ErrorProps> = ({ message }) => {
	return (
		<main>
			<img src={notFoundImage} alt="Error image" />
			<h1>{message}</h1>
		</main>
	);
};
