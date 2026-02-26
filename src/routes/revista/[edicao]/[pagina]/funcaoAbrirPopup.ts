import { type Balao } from '$lib/types/typeBalao';
import { tick } from 'svelte';
import {
	arrayOriginal,
	arrayTraducao,
	arrayTraducaopp,
	idioma,
	indiceDoBalao,
	popupVisivel,
	popupX,
	popupY,
	traducao
} from './estados.svelte';

export async function funcaoAbrirPopup(event: MouseEvent, balao: Balao, indice: number) {
	event.stopPropagation();

	// Toggle: se clicar no mesmo balão fecha
	if (popupVisivel.value && indiceDoBalao.value === indice) {
		popupVisivel.value = false;
		indiceDoBalao.value = null;
		return;
	}

	const target = event.currentTarget as HTMLElement;
	const container = target.offsetParent as HTMLElement;
	const rect = target.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	const larguraPopup = 260;

	let x = rect.left - containerRect.left + rect.width / 2 - larguraPopup / 2;
	let y = rect.bottom - containerRect.top + 10;

	const larguraContainer = container.offsetWidth;
	if (x + larguraPopup > larguraContainer) x = larguraContainer - larguraPopup - 10;
	if (x < 10) x = 10;

	// Força transição: fecha antes de abrir novo popup
	popupVisivel.value = false;
	await tick(); // espera o DOM atualizar e aplicar out:slide

	traducao.value = balao[idioma.value].join(' ');
	arrayOriginal.value = balao['en'];
	arrayTraducaopp.value = balao[`${idioma.value}pp`];
	arrayTraducao.value = balao[`${idioma.value}`];
	popupX.value = x;
	popupY.value = y;
	indiceDoBalao.value = indice;
	popupVisivel.value = true;
}
