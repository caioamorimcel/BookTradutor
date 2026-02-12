import { funcaoTotalDePaginas } from '$lib/funcaoTotalDePaginas';
import { redirect } from '@sveltejs/kit';

export function load({ params }) {
	const totalDePaginas = funcaoTotalDePaginas(params.edicao);
	const pagina = parseInt(params.pagina);

	// bloqueia página menor que 1
	if (pagina < 1) {
		throw redirect(302, `/revista/${params.edicao}/1`);
	}

	// bloqueia página maior que o limite
	if (pagina > totalDePaginas) {
		throw redirect(302, `/revista/${params.edicao}/${totalDePaginas}`);
	}

	return {
		totalPaginas: totalDePaginas
	};
}
