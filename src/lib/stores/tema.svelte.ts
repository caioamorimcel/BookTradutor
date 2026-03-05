import { browser } from '$app/environment';

let temaPadrao: 'dark' | 'light' = 'dark';
let valorInicial: 'dark' | 'light' = 'dark';

if (browser) {
	temaPadrao = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
}
if (browser) {
	valorInicial = window.localStorage.getItem('tema')
		? <'dark' | 'light'>window.localStorage.getItem('tema')
		: temaPadrao;
}

export const tema = $state({ value: valorInicial });
