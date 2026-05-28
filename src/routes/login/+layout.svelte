<script lang="ts">
  import LoginShell from '$lib/components/ui/LoginShell.svelte';
  
  interface Props {
    children?: import('svelte').Snippet;
  }
  
  let { children }: Props = $props();
</script>

<LoginShell>
  {#if children}
    {@render children()}
  {/if}
</LoginShell>