<!-- <script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{JSON.stringify(data.dados)} -->

<script lang="ts">
	let dados = $state([]);

	async function carregar() {
		const res = await fetch('/api/dados');
		dados = await res.json();
	}

	$effect(() => {
		carregar();
	});
</script>

{#each dados as item, i (i)}
	<div>
		<h2>{item.nome}</h2>
		<p>{item.editora}</p>
	</div>
{/each}
