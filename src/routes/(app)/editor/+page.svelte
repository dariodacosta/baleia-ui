<script lang="ts">
  import { editorTabs } from '$lib/stores/editorTabs';

  let sidebarCollapsed = $state(false);
  let tableInspectorActive = $state(true);
</script>

<div 
  class="h-[calc(100vh-4rem)] w-full grid bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-all duration-200 overflow-hidden"
  style="grid-template-columns: {sidebarCollapsed ? '48px' : '260px'} 1fr {tableInspectorActive ? '300px' : '0px'};"
>
  
  <aside class="bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col p-3">
    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2 mb-2">
      {#if !sidebarCollapsed}
        <span class="text-xs font-bold tracking-wider uppercase text-gray-400">Navegador</span>
      {/if}
      <button 
        type="button" 
        class="text-xs p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500"
        onclick={() => sidebarCollapsed = !sidebarCollapsed}
      >
        {sidebarCollapsed ? '▶' : '◀'}
      </button>
    </div>
    {#if !sidebarCollapsed}
      <p class="text-[11px] font-mono text-gray-400 mt-2">Pronto para DatabaseTree & SavedQueries</p>
    {/if}
  </aside>

  <section class="flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-hidden">
    
    <div class="flex items-center bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-x-auto min-h-[40px] select-none">
      <div class="flex">
        {#each editorTabs.list as tab}
          {@const isActive = editorTabs.activeId === tab.id}
          <div 
            class="flex items-center space-x-2 px-4 py-2.5 text-xs border-r border-gray-200 dark:border-gray-800 cursor-pointer transition-all font-mono
              {isActive ? 'bg-white dark:bg-gray-950 border-t-2 border-t-blue-500 text-gray-900 dark:text-white font-semibold' : 'bg-gray-100/50 dark:bg-gray-900/40 text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}"
            role="tab"
            aria-selected={isActive}
            onclick={() => editorTabs.activeId = tab.id}
            onkeydown={(e) => { if(e.key === 'Enter') editorTabs.activeId = tab.id }}
            tabindex="0"
          >
            <span class="truncate max-w-[110px]">{tab.name}</span>
            <button 
              type="button"
              class="text-[9px] text-gray-400 hover:text-red-500 ml-1 font-bold p-0.5"
              onclick={(e) => { e.stopPropagation(); editorTabs.close(tab.id); }}
              aria-label="Fechar aba"
            >
              ✕
            </button>
          </div>
        {/each}
      </div>

      <button 
        type="button" 
        class="px-3 text-gray-400 hover:text-blue-500 transition-colors font-bold text-sm"
        onclick={() => editorTabs.open()}
      >
        +
      </button>
    </div>

    <div class="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <div class="text-3xl mb-2">⚡</div>
      <p class="text-xs font-mono font-bold text-gray-700 dark:text-gray-300">
        Aba Ativa: <span class="text-blue-500">{editorTabs.active?.name || 'Nenhuma'}</span>
      </p>
      <p class="text-[11px] font-mono text-gray-400 mt-1 max-w-xs">
        Estrutura de 3 colunas da sub-fase 6.1 concluída com sucesso.
      </p>
    </div>
  </section>

  <aside class="bg-gray-100 dark:bg-gray-900 flex flex-col p-4 overflow-y-auto">
    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
      <span class="text-xs font-bold tracking-wider uppercase text-gray-400">Table Inspector</span>
    </div>
    <div class="h-full border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center p-4">
      <p class="text-[11px] font-mono text-gray-400 text-center">Nenhuma tabela selecionada na árvore.</p>
    </div>
  </aside>

</div>