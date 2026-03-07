<script lang="ts">
	import { Icon, Star } from 'svelte-hero-icons';

	let { valor }: { valor: number } = $props();
</script>

<div class="flex text-xs select-none">
	<div class="flex space-x-0.5 rounded-xl bg-gray-light px-1.5 py-1 font-medium text-red-700">
		<Icon src={Star} class="w-3" solid />
		<div>{Math.ceil(valor)}/10</div>
	</div>
</div>
