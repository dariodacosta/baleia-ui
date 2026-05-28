<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'ghost' | 'danger' | 'sso' | 'enterprise';
    size?: 'sm' | 'md';
    loading?: boolean;
    children?: Snippet;
    iconLeft?: Snippet;
  }

  // Desestruturação reativa nativa do Svelte 5
  let {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    children,
    iconLeft,
    class: customClass = '',
    type = 'button',
    ...restProps
  }: Props = $props();

  // Mapeamento de classes utilitárias baseadas nas origens de estilo (.btn-xxx)
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500 border border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
    sso: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-400',
    enterprise: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500 border border-transparent'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2'
  };
</script>

<button
  {type}
  disabled={disabled || loading}
  class="{baseClasses} {variants[variant]} {sizes[size]} {customClass}"
  {...restProps}
>
  {#if loading}
    <!-- Spinner SVG integrado -->
    <svg class="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {:else if iconLeft}
    {@render iconLeft()}
  {/if}

  {#if children}
    {@render children()}
  {/if}
</button>