import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, depends }) => {
	const response = await fetch(`/api/data`);
	const cookies = await response.json();
	depends('cookies');
	return { cookies };
};
