<script lang="ts">
  let name = $state('');
  let visibility = $state<'me' | 'team'>('me');
  let { isOpen = $bindable(), onSave } = $props();
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-lg font-bold mb-4">Salvar Query</h2>
      <input type="text" bind:value={name} placeholder="Nome da query" class="w-full border p-2 mb-4" />
      <select bind:value={visibility} class="w-full border p-2 mb-4">
        <option value="me">Only me</option>
        <option value="team">Shared with team</option>
      </select>
      <div class="flex justify-end gap-2">
        <button onclick={() => isOpen = false}>Cancelar</button>
        <button onclick={() => { onSave({name, visibility}); isOpen = false; }} class="bg-blue-600 text-white px-4 py-2">Salvar</button>
      </div>
    </div>
  </div>
{/if}
