import { Icon } from '@iconify/react';
import { FC } from 'react';

export const AboutPage: FC = () => {
	return (
		<main className="flex justify-center items-center h-screen">
			<div className="flex flex-col gap-10">
				<h1 className="text-4xl">About</h1>
				<p>Created by Misael Abanto</p>
				<ul>
					<li>
						<Icon icon="mdi:gmail" className="text-red-400"></Icon>
						<a
							className="hover:underline hover:decoration-blue-500"
							href="mailto:misaelabanto@gmail.com"
						>
							misaelabanto@gmail.com
						</a>
					</li>
					<li>
						<Icon icon="mdi:github"></Icon>
						<a
							className="hover:underline hover:decoration-blue-500"
							href="https://github.com/misaelabanto"
						>
							misaelabanto
						</a>
					</li>
					<li>
						<Icon icon="mdi:linkedin" className="text-blue-600"></Icon>
						<a
							className="hover:underline hover:decoration-blue-500"
							href="https://linkedin.com/in/misaelabanto"
						>
							misaelabanto
						</a>
					</li>
				</ul>
			</div>
		</main>
	);
};
