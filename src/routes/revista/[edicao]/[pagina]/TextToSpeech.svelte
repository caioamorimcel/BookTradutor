<script lang="ts">
	import { speak } from '$lib/funcaoTextToSpeech';
	import IconeSpeech from '$lib/icones/iconeSpeech.svelte';

	let {
		texto,
		voz
	}: {
		texto: string;
		voz: string;
	} = $props();
</script>

<button
	class="cursor-pointer rounded bg-gray-700 px-2 py-1"
	onclick={() => speak(texto, { voiceName: voz })}
>
	<IconeSpeech />
</button>
