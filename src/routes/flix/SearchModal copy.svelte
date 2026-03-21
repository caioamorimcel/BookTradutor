<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { typeDados } from '$lib/types/typeDados';
	import { tick } from 'svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

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

	let response = $state<typeDados[]>([]);

	const reset = async () => {
		await tick();
		searchVal = null;
		response = [];
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

	const handleClick = (movie: typeDados) => {
		hide();
		goto(resolve(`/`));
	};

	const debounce = (v: string) => {
		clearTimeout(timer);

		timer = setTimeout(async () => {
			pending = true;

			pending = false;
		}, 750);
	};

	$effect(() => {
		if (searchVal) {
			debounce(searchVal);
		}
	});

	const init = (el: HTMLInputElement) => {
		el.focus();
	};
</script>

<svelte:window on:keydown={handleWindowKeyDown} />

{#if show}
	<div
		class="fixed inset-0 z-10 overflow-y-auto px-1 pt-16 sm:p-6 md:p-20"
		role="dialog"
		aria-modal="true"
	>
		<div
			in:fade={{ duration: 200 }}
			out:fade
			class="fixed inset-0 bg-slate-300/75 transition-opacity dark:bg-slate-300/90"
			aria-hidden="true"
			onclick={hide}
		></div>

		<div
			in:fly={{ y: 15, duration: 300, easing: sineInOut }}
			out:fade
			class="mx-auto max-w-xl transform divide-y divide-gray-dark/10 overflow-hidden rounded-xl bg-gray-light shadow-2xl ring-2 ring-gray-light/10 transition-all dark:divide-gray-light dark:bg-gray-dark dark:shadow-none dark:ring-gray-light/5"
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
							class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-dark dark:text-gray-light"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
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
					class="h-12 w-full border-0 bg-gray-light pr-4 pl-11 text-gray-dark placeholder-gray-400 focus:ring-0 sm:text-sm dark:bg-gray-dark dark:text-gray-light"
					placeholder="Search..."
					bind:value={searchVal}
					use:init
				/>
			</div>

			{#if response.length}
				<ul
					class="divide-gray/10 text-gray scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-primary scrollbar-track-light max-h-72 scroll-py-2 divide-y overflow-y-auto py-2 text-sm"
				>
					{#each response as revista, index (index)}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li
							in:fade={{ duration: 300, delay: index * 100 }}
							class="group hover:bg-gray/10 dark:hover:text-light flex cursor-pointer items-center space-x-2 px-4 py-2 transition-all select-none hover:text-white"
							onclick={() => handleClick(revista)}
						>
							<div class="hidden shrink-0 sm:inline-block">
								<img
									class="w-10 object-cover object-bottom sm:w-16"
									src={revista?.capa
										? `https://image.tmdb.org/t/p/w500${revista.capa}`
										: '/img/mesh.png'}
									alt="poster"
									onerror={(ev) => ((ev.target as HTMLImageElement).src = '/img/mesh.png')}
								/>
							</div>

							<div class="flex-1">
								<div class="text-lg font-semibold">{revista.titulo}</div>
								<div class="hidden sm:line-clamp-3">{revista.titulo}</div>

								{#if revista.ano}
									<div class="text-xs sm:mt-2">
										{revista.ano}
									</div>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			{:else if response.length === 0}
				<p class="p-4 text-center text-sm text-gray-dark dark:text-gray-light">No movie found.</p>
			{/if}
		</div>
	</div>
{/if}
