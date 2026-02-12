<script lang="ts">
	import { onMount } from 'svelte';

	type Item = {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		texto: string;
	};

	let itens: Item[] = [];

	onMount(async () => {
		const res = await fetch('/Liga_da_Justiça_Odisseia_01/DC_16_(28).json');
		itens = await res.json();
	});
</script>

<h2>Itens do arquivo JSON:</h2>

<ul>
	{#each itens as item}
		<li>
			x1: {item.x1}, y1: {item.y1}, x2: {item.x2}, y2: {item.y2} <br />
			texto: {item.texto}
		</li>
	{/each}
</ul>
