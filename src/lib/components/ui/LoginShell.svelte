<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="min-h-screen w-screen grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-gray-950 transition-colors duration-200">
  <!-- Painel de Branding (Esquerda - Ocupa 5 colunas no desktop) -->
  <div class="hidden lg:flex lg:col-span-5 relative bg-gray-950 flex-col justify-between p-12 overflow-hidden border-r border-gray-800">
    <!-- Efeito de Blur Neon Macabro de Fundo -->
    <div class="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none"></div>

    <!-- Header do Branding -->
    <div class="flex items-center space-x-3 z-10">
      <div class="h-9 w-9 flex items-center justify-center bg-blue-600 rounded-lg text-white font-bold text-lg shadow-md">
        🐋
      </div>
      <span class="text-lg font-bold text-white tracking-tight">baleia<span class="text-blue-500">.io</span></span>
    </div>

    <!-- Mensagem Principal Centralizada -->
    <div class="my-auto max-w-sm space-y-4 z-10">
      <h1 class="text-4xl font-extrabold text-white leading-tight tracking-tight">
        Performance analítica sem fricção.
      </h1>
      <p class="text-sm text-gray-400 leading-relaxed">
        Escreva consultas SQL massivas, analise esquemas complexos e monitore seus clusters de dados em uma interface construída para desenvolvedores exigentes.
      </p>
    </div>

    <!-- Rodapé do Branding -->
    <div class="flex items-center justify-between text-xs text-gray-500 z-10">
      <span>© 2026 Baleia Studio</span>
      <span class="font-mono bg-gray-900 border border-gray-800 px-2 py-0.5 rounded text-gray-400">v1.2.0-stable</span>
    </div>
  </div>

  <!-- Painel do Formulário (Direita - Ocupa 7 colunas no desktop) -->
  <div class="col-span-1 lg:col-span-7 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
    <div class="w-full max-w-md">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>