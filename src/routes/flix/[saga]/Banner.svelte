<script lang="ts">
	import { Clock, Icon, Link } from 'svelte-hero-icons';
	// import ProviderSection from '$components/templates/ProviderSection.svelte';
	import Rating from '$lib/componentes/Rating.svelte';
	import type { typeDados } from '$lib/types/typeDados';

	let {
		saga
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
	<img
		class="mt-1 h-48 sm:h-56"
		style={`view-transition-name: revista-${saga.pasta}`}
		src={saga.banner}
		alt="poster"
		onerror={(ev) => {
			const img = ev.currentTarget as HTMLImageElement;
			img.src = '/img/mesh.png';
		}}
	/>
	<div class="dark:text-light flex flex-col">
		<div class="mt-4 text-sm sm:mt-0">cccccc</div>
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
		<div class="text-gray flex items-center space-x-1 text-xs font-medium">
			{#if saga.ano}
				<div>{saga.ano}</div>
			{/if}
			<!-- {#if saga.runtime} -->
			<div class="flex items-center">
				<Icon src={Clock} class="w-3" />
				<span>aaaaaaa</span>
			</div>
			<!-- {/if} -->
		</div>
		<div class="max-w-2xl">
			<p class="mt-2">{saga.titulo}</p>
		</div>
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
