import { type Balao } from '$lib/types/typeBalao';

export const fontSize = $state({ value: 14 });
export const popupX = $state({ value: 0 });
export const popupY = $state({ value: 0 });
export const larguraOriginal = $state({ value: 0 });
export const alturaOriginal = $state({ value: 0 });
export const idioma = $state<{ value: 'ptbr' | 'en' }>({ value: 'ptbr' });
export const voz = $state({ value: '' });
export const popupVisivel = $state({ value: false });
export const arrayOriginal = $state<{ value: string[] }>({ value: [] });
export const arrayTraducaopp = $state<{ value: string[] }>({ value: [] });
export const arrayTraducao = $state<{ value: string[] }>({ value: [] });
export const traducao = $state({ value: '' });
export const indiceDoBalao = $state<{ value: number | null }>({ value: null });
export const totalDePaginas = $state({ value: 0 });
export const baloes = $state<{ value: Balao[] }>({ value: [] });
