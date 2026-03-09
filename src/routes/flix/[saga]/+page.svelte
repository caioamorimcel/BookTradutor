<script lang="ts">
	import { page } from '$app/state';
	import Banner from './Banner.svelte';
	// import Movie from '$lib/service/Movie';
	// import MovieSection from '$components/templates/MovieSection.svelte';
	// import CastSection from '$components/templates/CastSection.svelte';
	// import MovieDetailHero from '$components/elements/MovieDetailHero.svelte';
	import { funcaoCarregarDadosDasRevistas } from './funcaoCarregarDadosDaSaga.remote';
	// export let movie, similar, credits, providers;

	// import type { typeDados } from '$lib/types/typeDados';
	// let saga = $state<typeDados>();
	// $effect(() => {
	// 	(async () => {
	// 		saga = await funcaoCarregarDadosDasRevistas({
	// 			saga: page.params.saga ?? ''
	// 		});
	// 	})();
	// });

	const saga = $derived(
		await funcaoCarregarDadosDasRevistas({
			saga: page.params.saga ?? ''
		})
	);
</script>

<svelte:head>
	<title>{saga.titulo}</title>
</svelte:head>

<div>
	<div class="bg-slate-500">
		<div class="container">
			<Banner {saga} />
		</div>
	</div>
	<div></div>
	<div class="container">
		<div class="mt-4">
			<!-- <CastSection collection={credits.cast} /> -->
		</div>

		<h2 class="my-4">Similar Movies</h2>
		<!-- <MovieSection collection={similar} /> -->
	</div>
</div>

<style>
	.container {
		width: 100%;
		margin-right: auto;
		margin-left: auto;
		padding-right: 0.5rem /* 8px */;
		padding-left: 0.5rem /* 8px */;
	}
	@media (min-width: 1280px) {
		.container {
			max-width: 1280px;
		}
	}
</style>
