import { indiceDoBalao, popupVisivel } from './estados.svelte';

export function funcaoFecharAoClicarFora(event: MouseEvent) {
	const target = event.target as HTMLElement;

	// Ignora clique dentro do SweetAlert
	if (target.closest('.swal2-container')) return;

	// Ignora clique dentro do popup interno
	if (target.closest('.popup-interno')) return;

	popupVisivel.value = false;
	indiceDoBalao.value = null;
}
