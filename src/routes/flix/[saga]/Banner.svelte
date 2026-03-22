<script lang="ts">
	import { Clock, Icon, Link } from 'svelte-hero-icons';
	// import ProviderSection from '$components/templates/ProviderSection.svelte';
	import { resolve } from '$app/paths';
	import Rating from '$lib/componentes/Rating.svelte';
	import type { typeDados } from '$lib/types/typeDados';

	let {
		saga,
		//providers
	}: { saga: typeDados } = $props();

	export const isEmpty = (obj: Record<string, unknown>): boolean => {
		for (const prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				return false;
			}
		}
		return JSON.stringify(obj) === JSON.stringify({});
	};

	// const getYear = (date) => {
	// 	const d = new Date(date);
	// 	return d.getFullYear();
	// };
</script>

<div class="items-top bg-dark z-20 px-2 py-6 text-white sm:flex sm:space-x-4 sm:px-0">
	<a
		class="group relative block shrink-0"
		href={resolve(`/leitura/${saga.pasta}/1/1`)}
		style={`view-transition-name: revista-${saga.pasta}`}
	>
		<img class="mt-1 h-48 w-32 object-cover sm:h-56 sm:w-40" src={saga.banner} alt="poster" />

		<!-- Overlay -->
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="rounded-full bg-black/50 p-3 opacity-70 transition group-hover:opacity-100">
				<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8 5v14l11-7z" />
				</svg>
			</div>
		</div>
	</a>

	<div class="dark:text-light flex flex-col">
		<div class="mt-4 text-sm sm:mt-0">
			{#if saga.editora}
				{saga.editora}
			{/if}
			{#if saga.ano}
				<span class="mt-1 inline-flex items-center">
					(<Icon src={Clock} class="w-3" />
					<span>{saga.ano}</span>)
				</span>
			{/if}
		</div>
		<div class="font-secondary text-4xl font-bold">
			{saga.titulo}
		</div>
		<div
			class="text-gray mt-2 flex items-center justify-between space-x-6 text-xs sm:justify-start"
		>
			<!-- {#if saga.genres}
				<div class="flex items-center space-x-1">
					{#each saga.genres as genre, index (index)}
						<div>{genre.name}</div>
						{#if saga.genres.length - 1 !== index}
							<div>|</div>
						{/if}
					{/each}
				</div>
			{/if} -->
			{#if saga.rating}
				<Rating valor={saga.rating} />
			{/if}
		</div>
		<!-- <div class="text-gray flex items-center space-x-1 text-xs font-medium">
			{#if saga.ano}
				<div class="mt-1 flex items-center">
					<Icon src={Clock} class="w-3" />
					<span>{saga.ano}</span>
				</div>
			{/if}
		</div> -->
		{#if saga.descricao}
			<div class="aamax-w-2xl">
				<p class="mt-2">{saga.descricao}</p>
			</div>
		{/if}
		<div class="text-gray mt-2 flex items-center space-x-4 text-xs">
			<!-- {#if saga.homepage} -->
			<div class="flex items-center space-x-1">
				<Icon src={Link} class="w-3" />
				<a rel="external" href="/" target="_blank">Homepage</a>
			</div>
			<!-- {/if} -->
		</div>
		<!-- <ProviderSection collection={providers} /> -->
	</div>
</div>
