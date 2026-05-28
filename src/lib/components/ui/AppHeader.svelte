<script lang="ts">
  import type { Snippet } from 'svelte';
  import { browser } from '$app/environment';

  interface Props {
    breadcrumb: string;
    children?: Snippet;     // Extras à esquerda (ex: switcher)
    right?: Snippet;        // Extras à direita
  }

  let { breadcrumb, children, right }: Props = $props();

  // Estado inicial do dark mode persistido no local ou preferência do sistema
  let isDark = $state(
    browser ? document.documentElement.classList.contains('dark') : true
  );

  function toggleDarkMode() {
    isDark = !isDark;
    if (browser) {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
</script>

<header class="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 select-none transition-colors duration-200 flex-shrink-0">
  <!-- Lado Esquerdo: Breadcrumb + Componentes Injetados (Slot Default) -->
  <div class="flex items-center space-x-4">
    <div class="flex items-center space-x-2 text-sm font-medium">
      <span class="text-gray-400 dark:text-gray-500">Workspace</span>
      <span class="text-gray-300 dark:text-gray-700">/</span>
      <span class="text-gray-800 dark:text-gray-200 font-semibold tracking-tight">{breadcrumb}</span>
    </div>

    {#if children}
      <div class="h-4 w-[1px] bg-gray-200 dark:bg-gray-800"></div>
      {@render children()}
    {/if}
  </div>

  <!-- Lado Direito: Extras Opcionais + Seletor de Tema -->
  <div class="flex items-center space-x-4">
    {#if right}
      {@render right()}
    {/if}

    <div class="h-4 w-[1px] bg-gray-200 dark:bg-gray-800"></div>

    <!-- Dark Mode Toggle (.dark-toggle) -->
    <button
      onclick={toggleDarkMode}
      class="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors focus:outline-none"
      title="Alternar Tema Visual"
    >
      {#if isDark}
        ☀️
      {:else}
        🌙
      {/if}
    </button>
  </div>
</header>