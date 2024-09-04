import { FC } from 'react';

export const AboutPage: FC = () => {
	return (
		<main className="flex justify-center items-center h-screen">
			<div className="flex flex-col gap-10">
				<h1 className="text-4xl">About</h1>
				<p>
					Created by{' '}
					<a
						className="hover:underline hover:decoration-blue-500"
						href="https://github.com/misaelabanto"
					>
						Misael Abanto
					</a>
				</p>
			</div>
		</main>
	);
};
