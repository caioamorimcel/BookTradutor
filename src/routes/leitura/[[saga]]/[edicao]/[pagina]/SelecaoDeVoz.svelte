<script lang="ts">
	let { voz = $bindable('') }: { voz: string } = $props();

	let voices = $state<SpeechSynthesisVoice[]>([]);

	let englishVoices = $derived(voices.filter((current) => current.lang.slice(0, 2) === 'en'));

	$effect(() => {
		const loadVoices = () => {
			voices = speechSynthesis.getVoices();
		};

		// tenta carregar imediatamente
		loadVoices();

		// atualiza quando as vozes realmente estiverem prontas
		speechSynthesis.addEventListener('voiceschanged', loadVoices);

		return () => {
			speechSynthesis.removeEventListener('voiceschanged', loadVoices);
		};
	});

	$effect(() => {
		if (!voz && englishVoices.length > 0) {
			// tenta escolher uma voz específica primeiro
			const preferida = englishVoices.find((v) => v.name.includes('Liam')) ?? englishVoices[0];

			voz = preferida.name;
		}
	});
</script>

<select class="daisy-select" bind:value={voz}>
	<option value="">Padrão</option>
	{#each englishVoices as voice (voice.name)}
		<option value={voice.name}>
			{voice.name} ({voice.lang})
		</option>
	{/each}
</select>
