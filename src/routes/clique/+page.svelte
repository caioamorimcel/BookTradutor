<script lang="ts">
  // coordenadas em pixels (do image map)
  const balaoPx = {
    x1: 1064,
    y1: 311,
    x2: 1328,
    y2: 495,
    texto: "Você clicou no balão! 💬"
  };

  // tamanho real da imagem
  const larguraOriginal = 1500;
  const alturaOriginal = 2306;

  function clicarImagem(event: MouseEvent) {
    const img = event.currentTarget as HTMLImageElement;
    const rect = img.getBoundingClientRect();

    // clique em porcentagem (0 a 1)
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // converte pixels -> porcentagem
    const x1 = balaoPx.x1 / larguraOriginal;
    const y1 = balaoPx.y1 / alturaOriginal;
    const x2 = balaoPx.x2 / larguraOriginal;
    const y2 = balaoPx.y2 / alturaOriginal;

    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      alert(balaoPx.texto);
    }
  }
</script>

<div class="quadrinho">
  <button type="button" on:click={clicarImagem}>
    <img
      src="/Liga_da_Justiça_Odisseia_01/DC_16_(28).jpg"
      alt="Quadrinho"
    />
  </button>
</div>

<style>
  .quadrinho {
    width: 100%;
    max-width: 600px;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
  }

  img {
    width: 100%;
    display: block;
  }
</style>

