<script lang="ts">
	import { funcao } from './estados.svelte';

	const kk = funcao();
</script>

CONTADOR: {kk.value}

<button onclick={kk.aumentar}>AUMENTAR</button>
