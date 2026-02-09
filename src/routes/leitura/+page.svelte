

<script lang="ts">
  import { onMount } from 'svelte';

  let linhas: string[] = [];

  onMount(async () => {
    const res = await fetch('/leituraTeste.txt');
    const texto = await res.text();

    linhas = texto.split(/\r?\n/).filter(l => l.trim() !== '');

  });
</script>

<h2>Linhas do arquivo:</h2>

<ul>
  {#each linhas as linha}
    <li>{linha}</li>
  {/each}
</ul> 
