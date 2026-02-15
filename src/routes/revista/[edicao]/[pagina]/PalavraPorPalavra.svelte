<script lang="ts">
	import IconePalavraPorPalavra from '$lib/icones/iconePalavraPorPalavra.svelte';
	import Swal from 'sweetalert2';

	let {
		original,
		traducao
	}: {
		original: string[];
		traducao: string[];
	} = $props();

	let aa = $derived(
		original
			.map((texto, contador) => {
				return `
			    <span class="tooltip-container">
					${texto}
	  				<span class="tooltip-text">
	    				${traducao[contador]}
	  				</span>
				</span>
			`;
			})
			.join(' ')
	);

	function abrirSweetAlert() {
		Swal.fire({
			title: 'TRADUÇÃO PALAVRA POR PALAVRA',
			html: `${aa} <br/><br/> ${traducao.join(' ')}`,
			customClass: {
				popup: 'meu-swal',
				title: 'meu-titulo-pequeno'
			},
			footer: '* Clique em cada palavra isoladamente para ver sua tradução.',
			confirmButtonColor: '#3085d6'
		});
	}
</script>

<button onclick={abrirSweetAlert} class="cursor-pointer rounded bg-gray-700 px-2 py-1">
	<IconePalavraPorPalavra />
</button>

<style>
	/* 🔥 ESSENCIAL */
	:global(.meu-swal) {
		overflow: visible !important;
	}

	:global(.meu-swal .swal2-html-container) {
		overflow: visible !important;
	}

	:global(.tooltip-container) {
		position: relative;
		cursor: pointer;
		color: #0d6efd;
		background-color: lightcyan;
		font-weight: bold;
		margin: 0px 5px;
	}

	:global(.tooltip-text) {
		visibility: hidden;
		opacity: 0;
		transition: opacity 0.2s ease;

		position: absolute;
		bottom: 125%;
		left: 50%;
		transform: translateX(-50%);

		background: #333;
		color: #fff;
		padding: 6px 10px;
		border-radius: 6px;
		font-size: 13px;
		white-space: nowrap;
		z-index: 1000;
	}

	:global(.tooltip-container:hover .tooltip-text) {
		visibility: visible;
		opacity: 1;
	}

	:global(.meu-titulo-pequeno) {
		font-size: 26px; /* ajuste o tamanho que quiser */
		font-weight: normal; /* opcional */
	}
</style>
