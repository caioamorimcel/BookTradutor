let voices: SpeechSynthesisVoice[] = [];

function loadVoices() {
	voices = window.speechSynthesis.getVoices();
}

if (typeof window !== 'undefined') {
	loadVoices();
	window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function getVoices() {
	return voices;
}

export function speak(
	text: string,
	options?: {
		lang?: string;
		voiceName?: string;
		rate?: number;
		pitch?: number;
		volume?: number;
	}
) {
	if (!window.speechSynthesis) return;

	const utterance = new SpeechSynthesisUtterance(text);

	// Selecionar voz pelo nome
	if (options?.voiceName) {
		const selected = voices.find((v) => v.name === options.voiceName);
		if (selected) utterance.voice = selected;
	}

	// Ou selecionar automaticamente por idioma
	else if (options?.lang) {
		const selected = voices.find((v) => v.lang === options.lang);
		if (selected) utterance.voice = selected;
	}

	utterance.rate = options?.rate ?? 1;
	utterance.pitch = options?.pitch ?? 1;
	utterance.volume = options?.volume ?? 1;

	window.speechSynthesis.speak(utterance);
}

export function stop() {
	window.speechSynthesis.cancel();
}
