<script lang="ts">
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/theme';
  import LoginShell from '$lib/components/ui/LoginShell.svelte';

  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  // Executa o foco automático toda vez que a URL (rota) mudar
  $effect(() => {
    // Rastreia a rota ativa para disparar o efeito
    const _url = $page.url.pathname; 

    // Replica o comportamento clássico de delay para garantir que o DOM terminou a renderização
    const timer = setTimeout(() => {
      const firstInput = document.querySelector('input:not([disabled])') as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  });

  function toggleTheme() {
    theme.toggle(); // Altera o estado na store global
  }
</script>

<div class="relative min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
  
  <!-- Botão flutuante do Toggle Dark no canto superior direito -->
  <div class="absolute top-4 right-4 z-50">
    <button 
      type="button" 
      onclick={toggleTheme}
      class="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-sm shadow-sm"
      aria-label="Alternar tema escuro"
    >
      <!-- Corrigido: Lendo .mode diretamente em vez de usar o prefixo $ de stores antigas -->
      {theme.mode === 'dark' ? '☀️ light' : '🌙 dark'}
    </button>
  </div>

  <LoginShell>
    {#if children}
      {@render children()}
    {/if}
  </LoginShell>
</div>