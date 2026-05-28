<script lang="ts">
  let { isOpen = $bindable() } = $props();
  let formData = $state({ engine: 'TRINO', name: '', host: '', port: 8080 });
  let testing = $state(false);

  async function testConnection() {
    testing = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    testing = false;
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-900 p-6 rounded shadow-xl w-full max-w-md">
      <h2 class="text-lg font-bold mb-4">New Connection</h2>
      <select bind:value={formData.engine} class="w-full border p-2 mb-2 rounded bg-transparent dark:border-gray-700">
        <option value="TRINO">Catalog Manager (Trino)</option>
        <option value="POLARIS">Polaris Catalog</option>
      </select>
      <input bind:value={formData.name} placeholder="Connection Name" class="w-full border p-2 mb-2 rounded bg-transparent dark:border-gray-700" />
      <input bind:value={formData.host} placeholder="Host" class="w-full border p-2 mb-2 rounded bg-transparent dark:border-gray-700" />
      
      <div class="flex justify-end gap-2 mt-6">
        <button onclick={() => isOpen = false} class="px-4 py-2 text-sm">Cancel</button>
        <button onclick={testConnection} class="bg-gray-200 dark:bg-gray-700 px-4 py-2 text-sm rounded">
          {testing ? 'Testing...' : 'Test Connection'}
        </button>
      </div>
    </div>
  </div>
{/if}
