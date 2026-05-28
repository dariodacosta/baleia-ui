<script lang="ts">
  import type { Snippet } from 'svelte';
  import GlobalNav from './GlobalNav.svelte';
  import AppHeader from './AppHeader.svelte';

  interface Props {
    breadcrumb: string;
    headerLeft?: Snippet;
    headerRight?: Snippet;
    children?: Snippet;
  }

  let { breadcrumb, headerLeft, headerRight, children }: Props = $props();
</script>

<div class="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
  <GlobalNav />

  <div class="flex-1 flex flex-col overflow-hidden">
    <AppHeader {breadcrumb}>
      {#if headerLeft}
        {@render headerLeft()}
      {/if}
      
      {#key headerRight}
        {#if headerRight}
          {@render headerRight()}
        {/if}
      {/key}
    </AppHeader>

    <main class="flex-1 overflow-auto p-6">
      {#if children}
        {@render children()}
      {/if}
    </main>
  </div>
</div>