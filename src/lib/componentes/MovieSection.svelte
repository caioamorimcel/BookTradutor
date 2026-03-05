<script lang="ts">
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import 'swiper/css';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import MoviePreview from './MoviePreview.svelte';

	let {
		collection
	}: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		collection: any;
	} = $props();

	let innerWidth = $state<number>();
	let slidesPerView = $state<number>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let movies = $state<any>({
		results: []
	});

	const setSlidesPerView = async (w: number) => {
		await tick();
		if (w >= 1024) {
			slidesPerView = 6.5;
		} else if (w >= 768) {
			slidesPerView = 4.5;
		} else if (w >= 480) {
			slidesPerView = 3.5;
		} else {
			slidesPerView = 2.2;
		}
	};

	$effect(() => {
		if (collection) {
			movies = collection;
		}
	});

	$effect(() => {
		if (innerWidth) {
			setSlidesPerView(innerWidth);
		}
	});
</script>

<svelte:window bind:innerWidth />

<div class="relative">
	<div
		class="absolute right-0 z-20 h-full w-20 bg-linear-to-l from-gray-light to-transparent dark:from-gray-dark"
	></div>

	<Swiper spaceBetween={10} {slidesPerView}>
		{#each movies.results as movie, index (index)}
			<SwiperSlide>
				<div in:fade={{ duration: 300, delay: index * 100 }}>
					<MoviePreview {movie} />
				</div>
			</SwiperSlide>
		{/each}
	</Swiper>
</div>
