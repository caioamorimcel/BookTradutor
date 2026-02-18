<script lang="ts">
	import * as arrastar from './revista/[edicao]/[pagina]/arrastar';
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	ontouchstart={arrastar.handleTouchStart}
	ontouchend={arrastar.handleTouchEnd}
	style="height: 100vh;"
>
	Conteúdo da página
</div>
