<script lang="ts">
  type Balao = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    ptbr: string;
    en:string;
  };

  let balaoJson  = $state<Balao[]>([]);
  let imgElement = $state<HTMLImageElement>();
  let larguraOriginal = $state(0);
  let alturaOriginal = $state(0);
  let estadoIdioma = $state<'ptbr' | 'en'>('ptbr')

const funcaoLeitura = async () => {
    const res = await fetch('/Liga_da_Justiça_Odisseia_01/DC_16_(28).json');
    balaoJson = await res.json();
  }

  $effect(()=>{
    funcaoLeitura()
  });

  
</script>
<div class="quadrinho relative w-full max-w-150">
  <img
  class='block w-full'
bind:this={imgElement}
  src="/Liga_da_Justiça_Odisseia_01/DC_16_(28).jpg"
    alt="Quadrinho"
    onload={()=>{
      if (imgElement) {
      larguraOriginal = imgElement.naturalWidth;
      alturaOriginal = imgElement.naturalHeight;
      console.log('Largura original:', larguraOriginal, 'Altura original:', alturaOriginal);
    }
    }} 
  />

  {#each balaoJson as balao}
    <button
      type="button"
      class="absolute cursor-pointer p-0 hover:bg-red-500/20"
      aria-label="Clique para ver o diálogo: {balao[estadoIdioma]}"
      onclick={() => alert(balao[estadoIdioma])}
      style="
        left: {(balao.x1 / larguraOriginal) * 100}%;
        top: {(balao.y1 / alturaOriginal) * 100}%;
        width: {((balao.x2 - balao.x1) / larguraOriginal) * 100}%;
        height: {((balao.y2 - balao.y1) / alturaOriginal) * 100}%;
      "
    ></button>
  {/each}
</div>
