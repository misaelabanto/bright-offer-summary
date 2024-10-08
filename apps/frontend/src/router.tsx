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
		children: [],
	},
	{
		path: 'messages/:id',
		async lazy() {
			const { MessageIdPage } = await import('./message/id/page');
			return { Component: MessageIdPage };
		},
	},
	{
		path: '/admin',
		children: [
			{
				index: true,
				async lazy() {
					const { AdminPage } = await import('./admin/page');
					return { Component: AdminPage };
				},
			},
			{
				path: 'messages',
				async lazy() {
					const { MessageLayout } = await import('./message/layout');
					return { Component: MessageLayout };
				},
				children: [
					{
						index: true,
						async lazy() {
							const { MessagesPage } = await import('./message/page');
							return { Component: MessagesPage };
						},
					},
					{
						path: 'schedule',
						async lazy() {
							const { MessageSchedulePage } = await import(
								'./message/schedule/page'
							);
							return { Component: MessageSchedulePage };
						},
					},
				],
			},
		],
	},
	{
		path: 'about',
		async lazy() {
			const { AboutPage } = await import('./about/page');
			return { Component: AboutPage };
		},
	},
]);
