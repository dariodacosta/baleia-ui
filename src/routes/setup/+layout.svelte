<script lang="ts">
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/theme';

  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  // Mapeamento estrito dos passos do setup
  const steps = [
    { path: '/setup/account', num: '01', title: 'Conta Admin', desc: 'Criar superusuário raiz' },
    { path: '/setup/connection', num: '02', title: 'Banco Inicial', desc: 'Conectar cluster de dados' },
    { path: '/setup/sso', num: '03', title: 'Federação SSO', desc: 'Provedores de identidade' },
    { path: '/setup/done', num: '04', title: 'Finalizado', desc: 'Ambiente pronto' }
  ];

  // Identifica o índice atual para estilizar os passos passados, ativos e futuros
  let currentStepIndex = $derived(steps.findIndex(s => $page.url.pathname === s.path));

  function toggleTheme() {
    theme.toggle();
  }
</script>

<div class="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
  
  <!-- Toggle de Tema Flutuante no canto superior direito -->
  <div class="absolute top-4 right-4 z-50">
    <button 
      type="button" 
      onclick={toggleTheme}
      class="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-sm shadow-sm"
    >
      {theme.mode === 'dark' ? '☀️ light' : '🌙 dark'}
    </button>
  </div>

  <!-- Painel Esquerdo: Stepper Lateral Fixo (SetupShell) -->
  <aside class="w-full md:w-80 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-800 text-white flex flex-col p-8 flex-shrink-0">
    <div class="flex items-center space-x-3 mb-12">
      <div class="h-10 w-10 flex items-center justify-center bg-blue-600 rounded-xl text-white font-bold text-xl shadow-lg">
        🐋
      </div>
      <div>
        <h1 class="text-md font-bold tracking-tight">Baleia Studio</h1>
        <p class="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Assistente de Instalação</p>
      </div>
    </div>

    <!-- Lista de Passos Reativa baseada no Roteador -->
    <nav class="space-y-6 flex-1">
      {#each steps as step, i}
        {@const isCurrent = currentStepIndex === i}
        {@const isPassed = currentStepIndex > i}
        <div class="flex items-start space-x-4 transition-opacity duration-200 {isCurrent ? 'opacity-100' : 'opacity-50'}">
          <div class="h-8 w-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all border
            {isCurrent ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20 scale-105' : ''}
            {isPassed ? 'bg-green-500/10 text-green-400 border-green-500/30' : ''}
            {!isCurrent && !isPassed ? 'bg-gray-800 text-gray-400 border-gray-700' : ''}">
            {#if isPassed} ✓ {:else} {step.num} {/if}
          </div>
          <div>
            <h3 class="text-sm font-semibold {isCurrent ? 'text-white' : 'text-gray-300'}">{step.title}</h3>
            <p class="text-xs text-gray-500 mt-0.5">{step.desc}</p>
          </div>
        </div>
      {/each}
    </nav>

    <div class="mt-auto pt-4 border-t border-gray-800 text-[11px] text-gray-500 font-medium">
      baleia-core v1.0.0-stable
    </div>
  </aside>

  <!-- Painel Direito: Conteúdo de Cada Sub-Rota -->
  <main class="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
    <div class="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </main>
</div>