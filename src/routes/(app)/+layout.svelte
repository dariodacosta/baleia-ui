<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { authStore } from '$lib/stores/auth.svelte';
  import { onMount } from 'svelte';

  onMount(async () => {
    if (!authStore.token) {
      goto('/login');
      return;
    }
    if (!authStore.user) {
      await authStore.fetchMe();
    }
  });
</script>

{#if authStore.isAuthenticated}
  <div class="min-h-screen bg-zinc-950 flex">
    <!-- Sidebar temporária enquanto não componentizada -->
    <aside class="w-64 bg-zinc-900 border-r border-zinc-800 p-4">
      <a href="/dashboard" class="text-white font-bold">Baleia</a>
      <nav class="mt-8">
        <a href="/dashboard" class="block text-zinc-400 hover:text-white py-1">Dashboard</a>
        <a href="/workspace" class="block text-zinc-400 hover:text-white py-1">Workspaces</a>
        <a href="/explorer" class="block text-zinc-400 hover:text-white py-1">Explorer</a>
      </nav>
    </aside>
    <main class="flex-1 p-8">
      {@render children?.()}
    </main>
  </div>
{:else}
  <div class="min-h-screen bg-zinc-950 flex items-center justify-center">
    <p class="text-zinc-400">Carregando...</p>
  </div>
{/if}