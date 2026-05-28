<script lang="ts">
  interface Props {
    variant?: 'primary' | 'sso' | 'enterprise';
    disabled?: boolean;
    onclick?: () => void;
    children: import('svelte').Snippet;
  }

  let { variant = 'primary', disabled = false, onclick, children }: Props = $props();
</script>

{#if variant === 'primary'}
  <button
    {disabled}
    {onclick}
    class="w-full h-10 bg-[var(--primary)] hover:bg-[var(--primary-h)] text-white rounded-md text-[13px] font-semibold flex items-center justify-center gap-2 transition disabled:bg-[#93c5fd] disabled:cursor-not-allowed"
  >
    {@render children()}
  </button>
{:else if variant === 'sso'}
  <button
    {onclick}
    class="w-full h-10 bg-transparent border border-[var(--border)] hover:border-[var(--border-h)] hover:bg-[var(--bg)] rounded-md text-[13px] font-medium text-[var(--text)] flex items-center justify-center gap-2.5 transition"
  >
    {@render children()}
  </button>
{:else if variant === 'enterprise'}
  <button
    {onclick}
    class="w-full h-10 bg-transparent border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] rounded-md text-xs font-semibold text-[var(--text)] flex items-center justify-center gap-2 transition dark:hover:bg-[#152236] hover:bg-[#f8fbff]"
  >
    {@render children()}
  </button>
{/if}