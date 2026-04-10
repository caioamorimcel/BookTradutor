<script lang="ts">
	import { type typeIdioma } from '$lib/types/typeIdioma';
	import SelecaoDeVoz from './SelecaoDeVoz.svelte';

	let {
		idioma = $bindable(),
		voz = $bindable(''),
	}: {
		idioma: typeIdioma;
		voz: string;
	} = $props();
</script>

<div class="daisy-drawer daisy-drawer-end">
	<input id="my-drawer-5" type="checkbox" class="daisy-drawer-toggle" />
	<div class="daisy-drawer-content">
		<!-- Page content here -->
		<label for="my-drawer-5" class="daisy-drawer-button classButton">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"
				/></svg
			>
		</label>
	</div>
	<div class="daisy-drawer-side">
		<label for="my-drawer-5" aria-label="close sidebar" class="daisy-drawer-overlay"></label>
		<div class="min-h-full w-80 bg-base-200 p-4">
			<div class="flex justify-center">
				<fieldset class="daisy-fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
					<legend class="daisy-fieldset-legend">CONFIGURAÇÕES:</legend>
					<p class="daisy-label">IDIOMA:</p>
					<select bind:value={idioma} class="daisy-select">
						<option value="ptbr">Português</option>
						<option value="en">English</option>
					</select>
					<p class="daisy-label">VOZ:</p>
					<SelecaoDeVoz bind:voz />
				</fieldset>
			</div>
		</div>
	</div>
</div>

<!-- <div class="daisy-drawer daisy-drawer-end">
	<input id="my-drawer-5" type="checkbox" class="daisy-drawer-toggle" />
	<div class="daisy-drawer-content">
		<label for="my-drawer-5" class="daisy-drawer-button daisy-btn daisy-btn-primary"
			>Open drawer</label
		>
	</div>
	<div class="daisy-drawer-side">
		<label for="my-drawer-5" aria-label="close sidebar" class="daisy-drawer-overlay"></label>
		<div class="flex justify-center">
			<fieldset class="daisy-fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
				<legend class="daisy-fieldset-legend">CONFIGURAÇÕES:</legend>
				<p class="daisy-label">IDIOMA:</p>
				<select bind:value={idioma} class="daisy-select">
					<option value="ptbr">Português</option>
					<option value="en">English</option>
				</select>
				<p class="daisy-label">VOZ:</p>
				<SelecaoDeVoz bind:voz />
			</fieldset>
		</div>
	</div>
</div> -->
