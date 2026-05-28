<script lang="ts">
  let { queries, onSelect } = $props();
</script>

<table class="w-full text-xs text-left">
  <thead class="text-gray-500 uppercase border-b">
    <tr><th class="p-2">Status</th><th>Query</th><th>User</th><th>Duration</th></tr>
  </thead>
  <tbody>
    {#each queries as q}
      <tr class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" onclick={() => onSelect(q)}>
        <td class="p-2">{q.status === 'success' ? '✅' : '❌'}</td>
        <td class="p-2 font-mono truncate max-w-[200px]">{q.sql}</td>
        <td class="p-2">{q.user}</td>
        <td class="p-2">{q.duration}ms</td>
      </tr>
    {/each}
  </tbody>
</table>
