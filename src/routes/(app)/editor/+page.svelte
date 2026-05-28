<script lang="ts">
  import { editorTabs } from '$lib/stores/editorTabs';
  import EditorTabs from '$lib/components/editor/EditorTabs.svelte';
  import EditorToolbar from '$lib/components/editor/EditorToolbar.svelte';
  import SqlEditor from '$lib/components/editor/SqlEditor.svelte';

  let sidebarCollapsed = $state(false);
  let sqlEditorRef: any = $state();
</script>

<div 
  class="h-[calc(100vh-4rem)] w-full grid bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-all duration-200 overflow-hidden"
  style="grid-template-columns: {sidebarCollapsed ? '48px' : '260px'} 1fr 300px;"
>
  <!-- Coluna 1: Sidebar -->
  <aside class="bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col p-3">
    <button type="button" class="text-xs p-1" onclick={() => sidebarCollapsed = !sidebarCollapsed}>
      {sidebarCollapsed ? '▶' : '◀'}
    </button>
  </aside>

  <!-- Coluna 2: Editor Principal -->
  <section class="flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-hidden">
    <EditorTabs />
    
    {#if editorTabs.active}
      <EditorToolbar 
        onFormat={() => sqlEditorRef?.format()} 
        onRun={() => alert('Rodando: ' + editorTabs.active?.sql)} 
      />
      <div class="flex-1 overflow-hidden">
        <SqlEditor 
          bind:this={sqlEditorRef}
          value={editorTabs.active.sql} 
          onChange={(val) => editorTabs.updateSql(editorTabs.activeId, val)}
        />
      </div>
    {:else}
      <div class="flex-1 flex items-center justify-center text-gray-400">Nenhuma aba aberta.</div>
    {/if}
  </section>

  <!-- Coluna 3: Inspector -->
  <aside class="bg-gray-100 dark:bg-gray-900 flex flex-col p-4">
    <span class="text-xs font-bold text-gray-400">Table Inspector</span>
  </aside>
</div>