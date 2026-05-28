<script lang="ts">
  let { query, onClose } = $props();
</script>

{#if query}
  <div class="fixed inset-y-0 right-0 w-[400px] bg-white dark:bg-gray-900 border-l shadow-2xl z-50 p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-bold">Query Details</h2>
      <button onclick={onClose} class="text-gray-500">Close</button>
    </div>
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm overflow-x-auto">
      {query.sql}
    </div>
    <div class="mt-4 flex gap-2">
      <button class="bg-blue-600 text-white px-3 py-1 rounded text-xs">Open in Editor</button>
    </div>
  </div>
{/if}
