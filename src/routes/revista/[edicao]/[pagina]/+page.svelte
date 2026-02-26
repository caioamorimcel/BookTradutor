<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import IconeFechar from '$lib/icones/iconeFechar.svelte';
	import { type Balao } from '$lib/types/typeBalao';
	import { tick } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import * as arrastar from './arrastar';
	import { funcaoLerBaloes } from './funcaoLerBaloes.remote.js';
	import { funcaoTeclas } from './funcaoTeclas.js';
	import { funcaoTotalDePaginas } from './funcaoTotalDePaginas.remote.js';
	import PalavraPorPalavra from './PalavraPorPalavra.svelte';
	import SelecaoDeVoz from './SelecaoDeVoz.svelte';
	import TextToSpeech from './TextToSpeech.svelte';

	let baloes = $state<Balao[]>([]);
	let elementoImagem = $state<HTMLImageElement>();
	let larguraOriginal = $state(0);
	let alturaOriginal = $state(0);
	let idioma = $state<'ptbr' | 'en'>('ptbr');
	let voz = $state('');
	let popupVisivel = $state(false);
	let traducao = $state('');
	let arrayOriginal = $state<string[]>([]);
	let arrayTraducaopp = $state<string[]>([]);
	let arrayTraducao = $state<string[]>([]);
	let popupX = $state(0);
	let popupY = $state(0);
	let indiceDoBalao = $state<number | null>(null);
	let popupFontSize = $state(14);
	let totalDePaginas = $state(0);

	const paginaAtual = $derived(parseInt(page.params.pagina ?? '1'));
	const derivedTransitionIn = $derived(
		page.url.searchParams.get('direction') === 'next' ? '100%' : '-100%'
	);
	const derivedTransitionOut = $derived(
		page.url.searchParams.get('direction') === 'next' ? '-100%' : '100%'
	);

	$effect(() => {
		(async () => {
			totalDePaginas = await funcaoTotalDePaginas({
				edicao: page.params.edicao ?? '1',
				pagina: page.params.pagina ?? '1'
			});
			baloes = await funcaoLerBaloes({
				edicao: page.params.edicao ?? '1',
				pagina: page.params.pagina ?? '1'
			});
		})();
	});

	// Fechar popup ao clicar fora
	$effect(() => {
		const fechar = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// Ignora clique dentro do SweetAlert
			if (target.closest('.swal2-container')) return;

			// Ignora clique dentro do popup interno
			if (target.closest('.popup-interno')) return;

			popupVisivel = false;
			indiceDoBalao = null;
		};

		window.addEventListener('click', fechar);
		return () => window.removeEventListener('click', fechar);
	});

	async function abrirPopup(event: MouseEvent, balao: Balao, indice: number) {
		event.stopPropagation();

		// Toggle: se clicar no mesmo balão fecha
		if (popupVisivel && indiceDoBalao === indice) {
			popupVisivel = false;
			indiceDoBalao = null;
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
		popupVisivel = false;
		await tick(); // espera o DOM atualizar e aplicar out:slide

		traducao = balao[idioma].join(' ');
		arrayOriginal = balao['en'];
		arrayTraducaopp = balao[`${idioma}pp`];
		arrayTraducao = balao[`${idioma}`];
		popupX = x;
		popupY = y;
		indiceDoBalao = indice;
		popupVisivel = true;
	}

	function funcaoAumentarFonte() {
		if (popupFontSize < 30) popupFontSize += 2; // limite máximo 30px
	}

	function funcaoDiminuirFonte() {
		if (popupFontSize > 10) popupFontSize -= 2; // limite mínimo 10px
	}

	function transitionIn(node: Element, args: { parType: 'transitionFade' | 'transitionFly' }) {
		return args.parType === 'transitionFade'
			? fade(node, { duration: 500, delay: 550 })
			: fly(node, { duration: 500, delay: 550, x: derivedTransitionIn });
	}
	function transitionOut(node: Element, args: { parType: 'transitionFade' | 'transitionFly' }) {
		return args.parType === 'transitionFade'
			? fade(node, { duration: 500 })
			: fly(node, { duration: 500, x: derivedTransitionOut });
	}
</script>

<svelte:window onkeydown={funcaoTeclas} />

<div class="mt-2 mb-2 flex items-center justify-center gap-3">
	<button
		class="classButton disabled:cursor-not-allowed disabled:opacity-50"
		disabled={paginaAtual <= 1}
		onclick={() =>
			paginaAtual > 1 &&
			goto(resolve(`/revista/${page.params.edicao}/${paginaAtual - 1}?direction=previous`))}
	>
		VOLTAR
	</button>

	<select
		value={paginaAtual}
		onchange={(event) => {
			const valorSelecionado = (event.currentTarget as HTMLSelectElement).value;
			goto(resolve(`/revista/${page.params.edicao}/${valorSelecionado}`));
		}}
		class="max-w-20 rounded border p-2"
	>
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars-->
		{#each Array.from({ length: totalDePaginas }) as _, p (p)}
			<option value={p + 1}>{p + 1} / {totalDePaginas}</option>
		{/each}
	</select>

	<button
		class="classButton disabled:cursor-not-allowed disabled:opacity-50"
		disabled={paginaAtual >= totalDePaginas}
		onclick={() =>
			paginaAtual < totalDePaginas &&
			goto(resolve(`/revista/${page.params.edicao}/${paginaAtual + 1}?direction=next`))}
	>
		AVANÇAR
	</button>
</div>

<div class="relative mx-auto w-full">
	{#key page.url.pathname}
		<img
			in:transitionIn|global={{
				parType:
					page.url.searchParams.get('direction') === null ? 'transitionFade' : 'transitionFly'
			}}
			out:transitionOut={{
				parType:
					page.url.searchParams.get('direction') === null ? 'transitionFade' : 'transitionFly'
			}}
			ontouchstart={arrastar.handleTouchStart}
			ontouchend={arrastar.handleTouchEnd}
			bind:this={elementoImagem}
			src={`/${page.params.edicao}/${page.params.pagina}.jpg`}
			alt="Quadrinho"
			class="mb-4 block w-full"
			onload={() => {
				if (elementoImagem) {
					larguraOriginal = elementoImagem.naturalWidth;
					alturaOriginal = elementoImagem.naturalHeight;
				}
			}}
		/>
	{/key}

	{#each baloes as balao, i (i)}
		{JSON.stringify(balao)}
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			type="button"
			class="absolute cursor-pointer bg-blue-500/30 p-0 lg:bg-transparent lg:hover:bg-red-500/20"
			style="
        left: {(balao.x1 / larguraOriginal) * 100}%;
        top: {(balao.y1 / alturaOriginal) * 100}%;
        width: {((balao.x2 - balao.x1) / larguraOriginal) * 100}%;
        height: {((balao.y2 - balao.y1) / alturaOriginal) * 100}%;
      "
			onclick={(e) => abrirPopup(e, balao, i)}
		></button>
	{/each}

	{#if popupVisivel}
		<div
			class="absolute z-50 w-64"
			style="left: {popupX}px; top: {popupY}px;"
			in:slide={{ duration: 500 }}
			out:slide={{ duration: 150 }}
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="popup-interno relative rounded-2xl bg-black p-4 text-white shadow-xl"
				style="font-size: {popupFontSize}px;"
				onclick={(event) => {
					event.stopPropagation(); // ⚡ impede o fechamento do popup
				}}
			>
				{traducao}

				<div class="mt-2 flex justify-between gap-1">
					<button
						onclick={() => ((popupVisivel = false), (indiceDoBalao = null))}
						class="cursor-pointer rounded bg-blue-500 px-2 py-1"
					>
						<IconeFechar />
					</button>
					<PalavraPorPalavra
						original={arrayOriginal}
						traducao={arrayTraducao}
						traducaopp={arrayTraducaopp}
						{voz}
					/>

					<TextToSpeech {voz} texto={arrayOriginal.join(' ')} />

					<div class="flex gap-1">
						<button
							onclick={funcaoDiminuirFonte}
							class="cursor-pointer rounded bg-gray-700 px-2 py-1">-</button
						>
						<button
							onclick={funcaoAumentarFonte}
							class="cursor-pointer rounded bg-gray-700 px-2 py-1">+</button
						>
					</div>
				</div>

				<div class="absolute -top-2 left-6 h-4 w-4 rotate-45 bg-black"></div>
			</div>
		</div>
	{/if}
</div>

<div class="flex justify-center">
	<fieldset class="daisy-fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
		<legend class="daisy-fieldset-legend">CONFIGURAÇÕES:</legend>
		<p class="daisy-label">IDIOMA:</p>
		<select bind:value={idioma} class="daisy-select">
			<option value="ptbr">Português</option>
			<option value="en">English</option>
		</select>
		<p class="daisy-label">VOZ:</p>
		<SelecaoDeVoz bind:voz />
	</fieldset>
</div>
