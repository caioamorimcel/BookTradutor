<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { typeDados } from '$lib/types/typeDados';
	import { tick } from 'svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { funcaoCarregarDadosDasRevistas } from './funcaoCarregarDadosDasRevistas.remote';
	import { funcaoPesquisar } from './funcaoPesquisar';

	let {
		show = false,
		onhide,
	}: {
		show: boolean;
		onhide: () => void;
	} = $props();

	let pending = $state(false);
	let searchVal = $state<string | null>(null);
	let timer: string | number | NodeJS.Timeout | undefined;

	let resultadoDaPesquisa = $state<typeDados[]>([]);

	let todasRevistas = $state<typeDados[]>([]);

	const reset = async () => {
		await tick();
		searchVal = null;
		resultadoDaPesquisa = [];
	};

	const hide = () => {
		onhide();
		show = false;
		reset();
	};

	const handleWindowKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			hide();
		}

		if (event.key === 'Enter') {
			show = true;
			reset();
		}
	};

	const handleClick = (revista: typeDados) => {
		hide();
		const url = (revista.saga ? `/flix/${revista.pasta}` : `/leitura/${revista.pasta}/1`) as
			| `/flix/${string}`
			| `/leitura/${string}/1`;

		goto(resolve(url));
	};

	const debounce = (v: string) => {
		clearTimeout(timer);

		timer = setTimeout(async () => {
			pending = true;
			if (todasRevistas.length === 0) {
				todasRevistas = await funcaoCarregarDadosDasRevistas();
			}
			resultadoDaPesquisa = funcaoPesquisar({
				data: todasRevistas,
				string: searchVal ?? '',
				keys: ['titulo', 'descricao'],
			});
			// const res = await Movie.getSearch(v);
			// resultadoDaPesquisa = await res.json();
			pending = false;
		}, 750);
	};

	$effect(() => {
		if (searchVal) {
			debounce(searchVal);
		} else {
			resultadoDaPesquisa = [];
		}
	});

	const init = (el: HTMLInputElement) => {
		el.focus();
	};
</script>

<svelte:window on:keydown={handleWindowKeyDown} />

{#if show}
	<div
		class="fixed inset-0 z-10 overflow-y-auto bg-slate-500/80 px-1 pt-16 sm:p-6 md:p-20 dark:bg-white/50"
		role="dialog"
		aria-modal="true"
	>
		<div
			in:fade={{ duration: 200 }}
			out:fade
			class="fixed inset-0 transition-opacity"
			aria-hidden="true"
			onclick={hide}
		></div>

		<div
			in:fly={{ y: 15, duration: 300, easing: sineInOut }}
			out:fade
			class="divide-gray/10 dark:bg-dark dark:ring-gray/5 mx-auto max-w-xl transform divide-y overflow-hidden rounded-xl bg-white shadow-2xl ring-2 ring-white/10 transition-all dark:shadow-none"
		>
			<div class="relative">
				{#if pending}
					<div in:fade>
						<img
							src="/img/loading.svg"
							alt="Loading"
							class="pointer-events-none absolute top-3.5 left-4 h-5 w-5"
						/>
					</div>
				{:else}
					<div in:fade>
						<svg
							class="text-gray pointer-events-none absolute top-3.5 left-4 h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				{/if}

				<input
					type="text"
					class="text-gray h-12 w-full border-0 bg-transparent pr-4 pl-11 placeholder-gray-400 focus:ring-0 sm:text-sm"
					placeholder="Search..."
					role="combobox"
					aria-expanded="false"
					aria-controls="options"
					bind:value={searchVal}
					use:init
				/>
			</div>

			{#if resultadoDaPesquisa.length}
				<ul
					class="text-gray divide-gray/10 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-primary scrollbar-track-light max-h-72 scroll-py-2 divide-y overflow-y-auto py-2 text-sm"
					id="options"
					role="listbox"
				>
					{#each resultadoDaPesquisa as revista, index (index)}
						<!-- svelte-ignore a11y_role_has_required_aria_props -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<li
							in:fade={{ duration: 300, delay: index * 100 }}
							class="group hover:bg-gray/10 hover:text-dark dark:hover:text-light flex cursor-pointer items-center space-x-2 px-4 py-2 transition-all select-none hover:text-white"
							id="option-{index + 1}"
							role="option"
							tabindex="-1"
							onclick={() => handleClick(revista)}
						>
							<div class="hidden shrink-0 sm:inline-block">
								<img
									class="w-10 object-cover object-bottom sm:w-16"
									src={revista.capa ? revista.capa : '/img/mesh.png'}
									alt="poster"
									onerror={(ev) => ((ev.target as HTMLImageElement).src = '/img/mesh.png')}
								/>
							</div>

							<div class="flex-1">
								<div class="text-lg font-semibold">{revista.titulo}</div>

								<div class="hidden sm:line-clamp-3">
									{revista.descricao}
								</div>

								{#if revista.ano}
									<div class="text-xs sm:mt-2">
										{revista.ano}
									</div>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			{:else if resultadoDaPesquisa.length === 0}
				<p class="text-gray p-4 text-center text-sm">No movie found.</p>
			{/if}
		</div>
	</div>
{/if}
