<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    currentStep?: number;
    children?: Snippet;
  }

  let { currentStep = 1, children }: Props = $props();

  const steps = [
    { num: 1, label: 'Licenciamento', desc: 'Termos de uso corporativo' },
    { num: 2, label: 'Superusuário', desc: 'Criar conta de administrador' },
    { num: 3, label: 'Drivers e Plugins', desc: 'Instalar complementos de banco' }
  ];
</script>

<div class="min-h-screen w-screen grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-gray-950 transition-colors duration-200">
  <!-- Painel do Stepper (Esquerda) -->
  <div class="hidden lg:flex lg:col-span-4 bg-gray-900 flex-col p-12 border-r border-gray-800">
    <div class="flex items-center space-x-3 mb-16">
      <div class="h-8 w-8 flex items-center justify-center bg-blue-600 rounded-lg text-white font-bold text-md shadow-md">
        🐋
      </div>
      <span class="text-md font-bold text-white tracking-tight">Baleia <span class="text-blue-500 font-medium">Setup</span></span>
    </div>

    <!-- Lista Vertical do Stepper (.sso-proto-tabs / cadastro reference) -->
    <div class="space-y-8 my-auto">
      {#each steps as step}
        {@const active = step.num === currentStep}
        {@const done = step.num < currentStep}
        <div class="flex items-start space-x-4">
          <div class="h-8 w-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold border transition-all duration-300
            {active ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-4 ring-blue-500/20' : ''}
            {done ? 'bg-green-600 text-white border-green-500' : ''}
            {!active && !done ? 'bg-gray-800 text-gray-500 border-gray-700' : ''}">
            {#if done} ✓ {:else} {step.num} {/if}
          </div>
          <div>
            <h3 class="text-sm font-bold {active ? 'text-white' : 'text-gray-400'} {done ? 'text-gray-300' : ''}">
              {step.label}
            </h3>
            <p class="text-xs text-gray-500 mt-0.5">{step.desc}</p>
          </div>
        </div>
      {/each}
    </div>

    <div class="text-xs text-gray-600 font-mono mt-auto">
      Instalador do Sistema v1.2
    </div>
  </div>

  <!-- Painel do Formulário Dinâmico (Direita) -->
  <div class="col-span-1 lg:col-span-8 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-950 overflow-y-auto">
    <div class="w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl shadow-md">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>