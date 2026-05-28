<script lang="ts">
  let collapsed = $state(false);
  let searchTerm = $state('');
  let columns = $state([{ name: 'id', type: 'int' }, { name: 'name', type: 'varchar' }]);
  let filtered = $derived(columns.filter(c => c.name.includes(searchTerm)));
</script>

<aside class="{collapsed ? 'w-10' : 'w-[300px]'} transition-all duration-300 border-l border-gray-200 dark:border-gray-800 flex flex-col bg-gray-50 dark:bg-gray-900">
  <button onclick={() => collapsed = !collapsed} class="p-2 border-b text-xs font-bold">
    {collapsed ? '▶' : 'Inspector ◀'}
  </button>
  
  {#if !collapsed}
    <div class="p-2 border-b">
      <input type="text" bind:value={searchTerm} placeholder="Filtrar colunas..." class="w-full text-xs p-1 rounded border" />
    </div>
    <ul class="flex-1 overflow-y-auto">
      {#each filtered as col}
        <li class="p-2 text-xs border-b hover:bg-gray-100">{col.name} <span class="text-gray-400">({col.type})</span></li>
      {/each}
    </ul>
  {/if}
</aside>
