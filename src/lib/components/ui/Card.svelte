<script lang="ts">
  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children }: Props = $props();
</script>

<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 {className}">
  {#if children}
    {@render children()}
  {/if}
</div>