<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import IconeFechar from '$lib/icones/iconeFechar.svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import * as arrastar from './arrastar';
	import {
		alturaOriginal,
		arrayOriginal,
		baloes,
		fontSize,
		idioma,
		indiceDoBalao,
		larguraOriginal,
		popupVisivel,
		popupX,
		popupY,
		totalDePaginas,
		traducao,
		voz,
	} from './estados.svelte.js';
	import { funcaoAbrirPopup } from './funcaoAbrirPopup.js';
	import { funcaoFecharAoClicarFora } from './funcaoFecharAoClicarFora.js';
	import { funcaoLerBaloes } from './funcaoLerBaloes.remote.js';
	import { funcaoLerTotalDePaginas } from './funcaoLerTotalDePaginas.remote.js';
	import { funcaoTeclas } from './funcaoTeclas.js';
	import PalavraPorPalavra from './PalavraPorPalavra.svelte';
	import SelecaoDeVoz from './SelecaoDeVoz.svelte';
	import Sidebar from './Sidebar.svelte';
	import TextToSpeech from './TextToSpeech.svelte';

	let elementoImagem = $state<HTMLImageElement>();

	// DERIVEDS
	const paginaAtual = $derived(parseInt(page.params.pagina ?? '1'));
	const derivedTransitionIn = $derived(
		page.url.searchParams.get('direction') === 'next' ? '100%' : '-100%',
	);
	const derivedTransitionOut = $derived(
		page.url.searchParams.get('direction') === 'next' ? '-100%' : '100%',
	);
	const derivedSaga = $derived(page.params.saga ? `${page.params.saga}/` : '');
	/////

	$effect(() => {
		(async () => {
			totalDePaginas.value = await funcaoLerTotalDePaginas({
				edicao: page.params.edicao ?? '1',
				pagina: page.params.pagina ?? '1',
				saga: page.params.saga,
			});
			baloes.value = await funcaoLerBaloes({
				edicao: page.params.edicao ?? '1',
				pagina: page.params.pagina ?? '1',
				saga: page.params.saga,
			});
		})();
	});

	$effect(() => {
		window.addEventListener('click', funcaoFecharAoClicarFora);
		return () => window.removeEventListener('click', funcaoFecharAoClicarFora);
	});

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

<div class="mx-3 flex items-center justify-between">
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		class="classButton"
		onclick={() => {
			goto(resolve(`/flix/${derivedSaga}`));
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 9"
			><path
				fill="currentColor"
				d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"
			/><path
				fill="currentColor"
				d="M6 8.5a.47.47 0 0 1-.35-.15l-3.5-3.5c-.2-.2-.2-.51 0-.71L5.65.65c.2-.2.51-.2.71 0s.2.51 0 .71L3.21 4.51l3.15 3.15c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"
			/></svg
		>
	</button>
	<div class="mt-2 mb-2 flex items-center justify-center gap-3">
		<button
			class="classButton disabled:cursor-not-allowed disabled:opacity-50"
			disabled={paginaAtual <= 1}
			onclick={() => {
				if (paginaAtual > 1) {
					goto(
						resolve(
							`/leitura/${derivedSaga}${page.params.edicao}/${paginaAtual - 1}?direction=previous`,
						),
					);
				}
			}}
		>
			VOLTAR
		</button>

		<select
			value={paginaAtual}
			onchange={(event) => {
				const valorSelecionado = (event.currentTarget as HTMLSelectElement).value;
				goto(resolve(`/leitura/${derivedSaga}${page.params.edicao}/${valorSelecionado}`));
			}}
			class="max-w-20 rounded border p-2"
		>
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars-->
			{#each Array.from({ length: totalDePaginas.value }) as _, p (p)}
				<option value={p + 1}>{p + 1} / {totalDePaginas.value}</option>
			{/each}
		</select>

		<button
			class="classButton disabled:cursor-not-allowed disabled:opacity-50"
			disabled={paginaAtual >= totalDePaginas.value}
			onclick={() => {
				if (paginaAtual < totalDePaginas.value) {
					goto(
						resolve(
							`/leitura/${derivedSaga}${page.params.edicao}/${paginaAtual + 1}?direction=next`,
						),
					);
				}
			}}
		>
			AVANÇAR
		</button>
	</div>
	<div><Sidebar bind:idioma={idioma.value} bind:voz={voz.value} /></div>
</div>
<div class="relative mx-auto w-full">
	{#key page.url.pathname}
		<img
			in:transitionIn|global={{
				parType:
					page.url.searchParams.get('direction') === null ? 'transitionFade' : 'transitionFly',
			}}
			out:transitionOut={{
				parType:
					page.url.searchParams.get('direction') === null ? 'transitionFade' : 'transitionFly',
			}}
			ontouchstart={arrastar.handleTouchStart}
			ontouchend={arrastar.handleTouchEnd}
			bind:this={elementoImagem}
			src={`/revistas/${derivedSaga}${page.params.edicao}/${page.params.pagina}.jpg`}
			alt="Quadrinho"
			class="mb-4 block w-full"
			onload={() => {
				if (elementoImagem) {
					larguraOriginal.value = elementoImagem.naturalWidth;
					alturaOriginal.value = elementoImagem.naturalHeight;
				}
			}}
		/>
	{/key}

	{#each baloes.value as balao, i (i)}
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			type="button"
			class="absolute cursor-pointer bg-blue-500/30 p-0 lg:bg-transparent lg:hover:bg-red-500/20"
			style="
        left: {(balao.x1 / larguraOriginal.value) * 100}%;
        top: {(balao.y1 / alturaOriginal.value) * 100}%;
        width: {((balao.x2 - balao.x1) / larguraOriginal.value) * 100}%;
        height: {((balao.y2 - balao.y1) / alturaOriginal.value) * 100}%;
      "
			onclick={(e) => funcaoAbrirPopup(e, balao, i)}
		></button>
	{/each}

	{#if popupVisivel.value}
		<div
			class="absolute z-50 w-64"
			style="left: {popupX.value}px; top: {popupY.value}px;"
			in:slide={{ duration: 500 }}
			out:slide={{ duration: 150 }}
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="popup-interno relative rounded-2xl bg-black p-4 text-white shadow-xl"
				style="font-size: {fontSize.value}px;"
				onclick={(event) => {
					event.stopPropagation(); // ⚡ impede o fechamento do popup
				}}
			>
				{traducao.value}

				<div class="mt-2 flex justify-between gap-1">
					<button
						onclick={() => ((popupVisivel.value = false), (indiceDoBalao.value = null))}
						class="cursor-pointer rounded bg-blue-500 px-2 py-1"
					>
						<IconeFechar />
					</button>
					<PalavraPorPalavra />

					<TextToSpeech texto={arrayOriginal.value.join(' ')} />

					<div class="flex gap-1">
						<button
							onclick={() => {
								if (fontSize.value > 10) {
									fontSize.value -= 2; // limite mínimo 10px
								}
							}}
							class="cursor-pointer rounded bg-gray-700 px-2 py-1">-</button
						>
						<button
							onclick={() => {
								if (fontSize.value < 30) {
									fontSize.value += 2; // limite máximo 30px
								}
							}}
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
		<select bind:value={idioma.value} class="daisy-select">
			<option value="ptbr">Português</option>
			<option value="en">English</option>
		</select>
		<p class="daisy-label">VOZ:</p>
		<SelecaoDeVoz bind:voz={voz.value} />
	</fieldset>
</div>
