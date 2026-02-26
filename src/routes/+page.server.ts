import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/api/dados');
	const dados = await res.json();

	return {
		dados
	};
};
