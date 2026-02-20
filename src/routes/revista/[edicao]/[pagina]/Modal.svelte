<script lang="ts">
	let modal = $state<HTMLDialogElement>();
	let palavraSelecionada = $state(''); // Estado para armazenar o texto atual
	let palavraSelecionadaOriginal = $state(''); // Estado para armazenar o texto atual

	let {
		traducaopp,
		original,
		traducao
	}: { traducaopp: string[]; original: string[]; traducao: string[] } = $props();

	function abrir(traducao: string, original: string) {
		palavraSelecionada = traducao; // Atualiza o conteúdo
		palavraSelecionadaOriginal = original; // Atualiza o conteúdo
		modal?.showModal(); // Abre o modal único
	}
</script>

{#each traducaopp as traducaocorrente, i (i)}
	<button
		onclick={() => abrir(traducaocorrente, original[i])}
		class="cursor-pointer bg-[lightcyan] px-1 font-bold text-[#0d6efd]"
	>
		{original[i]}
	</button>&nbsp;&nbsp;
{/each}

<br /><br />
{traducao.join(' ')}

<dialog bind:this={modal} class="daisy-modal">
	<div class="daisy-modal-box">
		<h3 class="text-lg font-bold">{palavraSelecionadaOriginal}</h3>
		<h3 class="text-lg font-bold">{palavraSelecionada}</h3>
		<p class="py-4">Pressione ESC ou clique fora para fechar.</p>
		<!-- <div class="modal-action">
			<form method="dialog">
				<button class="btn">Fechar</button>
			</form>
		</div> -->
	</div>
	<form method="dialog" class="daisy-modal-backdrop">
		<button>close</button>
	</form>
</dialog>
