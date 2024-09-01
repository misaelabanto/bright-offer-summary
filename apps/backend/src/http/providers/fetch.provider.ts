import { createFetch } from 'ofetch';

export const FetchService = createFetch({
	defaults: {
		onRequest: ({ request, options }) => {
			console.log(`[ofetch]:, ${options.method} ${request}`);
		},
	},
});
