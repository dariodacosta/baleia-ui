<script lang="ts">
  let { ds } = $props();
</script>

<div class="border rounded p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
  <div class="flex justify-between items-start mb-2">
    <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] uppercase font-bold rounded">{ds.type}</span>
    <div class="flex gap-2">
      <button class="text-xs text-gray-500 hover:text-gray-700">Edit</button>
      <button class="text-xs text-red-500 hover:text-red-700">Delete</button>
    </div>
  </div>
  <h3 class="font-bold text-sm">{ds.name}</h3>
  <p class="text-xs text-gray-400 font-mono">{ds.host}</p>
  <div class="mt-4 flex gap-4 text-xs text-gray-600 dark:text-gray-400">
    <span>Schemas: {ds.schemas}</span>
    <span>Tables: {ds.tables}</span>
  </div>
  {#if ds.status === 'error'}
    <p class="mt-2 text-[10px] text-red-600 font-mono bg-red-50 dark:bg-red-900/20 p-1 rounded">{ds.errorMessage}</p>
  {/if}
</div>
