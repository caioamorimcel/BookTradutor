


<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { type Balao } from '$lib/types/typeBalao';

	let { data } = $props();

	let balaoJson = $state<Balao[]>([]);
	let imgElement = $state<HTMLImageElement>();
	let larguraOriginal = $state(0);
	let alturaOriginal = $state(0);
	let estadoIdioma = $state<'ptbr' | 'en'>('ptbr');
	let audio: HTMLAudioElement;

	let paginaAtual = $derived(parseInt(page.params.pagina ?? '1'));

	const asyncEffect = async () => {
		const resultado = await fetch(`/${page.params.edicao}/json/${page.params.pagina}.json`);
		balaoJson = await resultado.json();
		audio = new Audio('/audio/musica_teste.mp3');
	};

	$effect(() => {
		asyncEffect();
	});
</script>

<div class='text-center'>
<button
	onclick={() => {
		if (paginaAtual > 1) {
			goto(`/revista/${page.params.edicao}/${paginaAtual - 1}`);
		}
	}}
	disabled={paginaAtual <= 1}
>
	VOLTAR
</button>

<select
	onchange={(event) => {
		const select = event.currentTarget as HTMLSelectElement;
		const valorSelecionado = select.value;
		goto(`/revista/${page.params.edicao}/${valorSelecionado}`);
	}}
  class='mx-auto max-w-20 rounded border p-2'
>
	{#each Array.from({ length: data.totalPaginas }) as _, p}
		<option value={p + 1}>{p + 1} / {data.totalPaginas}</option>
	{/each}
</select>


<button
	onclick={() => {
		if (paginaAtual < data.totalPaginas) {
			goto(`/revista/${page.params.edicao}/${paginaAtual + 1}`);
		}
	}}
	disabled={paginaAtual >= data.totalPaginas}
>
	AVANÇAR
</button>

</div>

<div class="relative mx-auto w-full">
	<img
		bind:this={imgElement}
		src={`/${page.params.edicao}/${page.params.pagina}.jpg`}
		alt="Quadrinho"
		class="mb-4 block w-full"
		onload={() => {
			if (imgElement) {
				larguraOriginal = imgElement.naturalWidth;
				alturaOriginal = imgElement.naturalHeight;
				console.log('Largura original:', larguraOriginal, 'Altura original:', alturaOriginal);
			}
		}}
	/>

	{#each balaoJson as balao}
		<button
			type="button"
			class="absolute cursor-pointer bg-blue-500/30 p-0 lg:bg-transparent lg:hover:bg-red-500/20"
			aria-label="Clique para ver o diálogo: {balao[estadoIdioma]}"
			style="
        left: {(balao.x1 / larguraOriginal) * 100}%;
        top: {(balao.y1 / alturaOriginal) * 100}%;
        width: {((balao.x2 - balao.x1) / larguraOriginal) * 100}%;
        height: {((balao.y2 - balao.y1) / alturaOriginal) * 100}%;
      "
      onclick={() => {
        alert(balao[estadoIdioma]);
        // if (audio) {
        //   audio.currentTime = 0;
        //   audio.play();
        // }
      }}
		></button>
	{/each}
</div>

<div class="mx-auto mb-4 w-full max-w-150">
	<select bind:value={estadoIdioma} class="mx-auto block w-full max-w-50 rounded border p-2">
		<option value="ptbr">Português</option>
		<option value="en">English</option>
	</select>
</div>
