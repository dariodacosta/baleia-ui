<script lang="ts">
  import { queryResults } from '$lib/stores/queryResults';
  
  // Tornamos o data opcional com o sinal de interrogação '?'
  let { data = null } = $props();
</script>

<div class="h-full overflow-auto text-xs">
  {#if data}
    <table class="w-full text-left border-collapse">
      <thead class="bg-gray-100 dark:bg-gray-800">
        <tr>
          {#each Object.keys(data.rows[0]) as header}
            <th class="p-2 border">{header}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data.rows as row}
          <tr>
            {#each Object.values(row) as cell}
              <td class="p-2 border {cell === null ? 'italic text-gray-400' : ''}">
                {cell ?? 'NULL'}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="p-2 border-t text-gray-500">
      {data.count} resultados | Tempo: {data.time}
    </div>
  {:else}
    <div class="p-4 text-gray-400">Nenhum resultado para exibir.</div>
  {/if}
</div>
