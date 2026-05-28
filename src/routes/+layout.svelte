<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import '../input.css'; // Corrigido para apontar para o seu arquivo de entrada do Tailwind

  // No Svelte 5, o $effect substitui o onMount para códigos que rodam apenas no navegador
  $effect(() => {
    theme.init();
  });

  // Captura os filhos/páginas do SvelteKit de forma moderna
  let { children } = $props();
</script>

<!-- Renderiza as páginas dinamicamente (antigo <slot />) -->
{@render children?.()}