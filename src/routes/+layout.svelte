<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';

	let { children } = $props();

	// VIEW TRANSITIONS CONFIG:
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
	/////
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{@render children()}

<style>
	/* VIEW TRANSITIONS CONFIG: */
	:root {
		view-transition-name: none;
	}
	:root::view-transition-group(*) {
		animation-duration: 1s;
	}
	/**/
</style>
