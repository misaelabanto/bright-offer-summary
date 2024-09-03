import { createFetch } from 'ofetch';

const _fetch = createFetch({
	defaults: {
		baseURL: import.meta.env.VITE_BACKEND_URL,
	},
});

export const fetcher = _fetch;
