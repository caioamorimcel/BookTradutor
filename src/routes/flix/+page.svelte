<script lang="ts">
	import MovieSection from '$lib/componentes/MovieSection.svelte';
	import type { typeDados } from '$lib/types/typeDados';
	import { funcaoCarregarDadosDasRevistas } from './funcaoCarregarDadosDasRevistas.remote';
	import { upcoming } from './upcoming';

	let dados = $state<typeDados[]>();

	$effect(() => {
		(async () => {
			try {
				dados = await funcaoCarregarDadosDasRevistas();
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				alert(e.body.message); // aqui você pega a mensagem do erro
			}

			dados = await funcaoCarregarDadosDasRevistas();
		})();
	});
</script>

{JSON.stringify(dados)}qqqq

<div class="container space-y-6">
	<div>
		<h2 class="text-2xl text-gray-dark sm:text-3xl dark:text-gray-light">Upcoming</h2>
		<MovieSection collection={upcoming} />
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
