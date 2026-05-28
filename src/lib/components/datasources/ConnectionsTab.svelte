<script lang="ts">
  import DatasourceCard from './DatasourceCard.svelte';
  
  let filter = $state<'All' | 'Online' | 'Error' | 'Disabled'>('All');
  let connections = $state([
    { name: 'Catalog_Prod', type: 'TRINO', host: 'localhost:8080', status: 'online', schemas: 5, tables: 120 },
    { name: 'Legacy_Hive', type: 'HIVE', host: '192.168.1.50:9083', status: 'error', errorMessage: 'Connection refused', schemas: 0, tables: 0 }
  ]);
  
  let filtered = $derived(filter === 'All' ? connections : connections.filter(c => c.status === filter.toLowerCase()));
</script>

<div class="flex items-center justify-between mb-4">
  <div class="flex gap-2">
    {#each ['All', 'Online', 'Error', 'Disabled'] as f}
      <button 
        class="px-3 py-1 text-xs border rounded transition-colors {filter === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'}" 
        onclick={() => filter = f as any}
      >
        {f}
      </button>
    {/each}
  </div>
  <span class="text-xs text-gray-500">{filtered.length} connections</span>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each filtered as ds}
    <DatasourceCard {ds} />
  {/each}
</div>
