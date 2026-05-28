<script lang="ts">
  let search = $state('');
</script>

<div class="flex gap-4 p-4 border-b">
  <input type="text" bind:value={search} placeholder="Search queries..." class="border p-1 rounded text-xs" />
  <div class="flex gap-2">
    <button class="px-2 py-1 border rounded text-xs">All</button>
    <button class="px-2 py-1 border rounded text-xs">Success</button>
    <button class="px-2 py-1 border rounded text-xs">Error</button>
  </div>
</div>
