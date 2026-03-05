<script lang="ts">
	import { resolve } from '$app/paths';
	import Rating from './Rating.svelte';

	const getYear = (date: string | number | Date) => {
		const d = new Date(date);
		return d.getFullYear();
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { movie }: { movie: any } = $props();
</script>

<a href={resolve('/')} data-sveltekit-prefetch class="bg-light">
	<div class="group relative overflow-hidden rounded-lg sm:rounded-xl">
		<div class="text-light absolute z-20 flex h-full w-full flex-col justify-between">
			<div class="p-6">
				{#if movie.vote_average}
					<Rating valor={movie.vote_average} />
				{/if}
			</div>

			<div class="flex flex-col space-y-1 p-6">
				<div class="font-secondary font-bold text-[rgb(241,245,249)] transition-all sm:text-lg">
					{movie.title}
				</div>
				{#if movie.release_date}
					<div class="text-xs text-[rgb(241,245,249)]">{getYear(movie.release_date)}</div>
				{/if}
			</div>
		</div>
		<div
			class="from-dark absolute z-10 h-full w-full bg-linear-to-t to-transparent hover:opacity-0"
		></div>
		<div
			class="to-primary-light absolute z-10 h-full w-full bg-linear-to-tr from-primary opacity-0 transition-all duration-500 ease-out group-hover:opacity-50"
		></div>
		<img
			class="h-64 w-full object-cover object-bottom transition-all duration-200 group-hover:scale-105 sm:h-60"
			src={movie?.backdrop_path
				? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
				: '/img/mesh.png'}
			alt="poster"
			onerror={(ev) => {
				const img = ev.currentTarget as HTMLImageElement;
				img.src = '/img/mesh.png';
			}}
		/>
	</div>
</a>

<style>
	.font-secondary {
		font-family:
			Roboto Condensed,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			'Noto Sans',
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol',
			'Noto Color Emoji';
	}
</style>
