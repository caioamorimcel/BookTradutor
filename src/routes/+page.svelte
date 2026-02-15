<script>
	import { getVoices, speak } from '../lib/funcaoTextToSpeech';

	let text = $state(
		`AMAZING! LOOK AT THEM FLEE THE FLEAS... RIGHT INTO THEIR CAGES! DONALD, YOU'RE A MARVEL!`
	);
	let selectedVoice = $state('');

	let voices = $derived(
		getVoices().filter((current) => {
			return current.lang.slice(0, 2) === 'en';
		})
	);
</script>

<select bind:value={selectedVoice}>
	<option value="">Padrão</option>
	{#each voices as voice, i (i)}
		<option value={voice.name}>
			{voice.name} ({voice.lang})
		</option>
	{/each}
</select>

<button onclick={() => speak(text, { voiceName: selectedVoice })}> Falar </button>
