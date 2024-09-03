import { GenericError } from '@/common/generic-error';
import { HomePage } from '@/home/page';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: (
			<GenericError message="Oops! We searched high and low, but couldn't find what you're looking for." />
		),
	},
	{
		path: '/message',
		async lazy() {
			const { MessagePage } = await import('./message/page');
			return { Component: MessagePage };
		},
		children: [
			{
				path: ':id',
				async lazy() {
					const { MessageIdPage } = await import('./message/id/page');
					return { Component: MessageIdPage };
				},
			},
		],
	},
	{
		path: '/about',
		async lazy() {
			const { AboutPage } = await import('./about/page');
			return { Component: AboutPage };
		},
	},
]);
