<script lang="ts">
  import { editorTabs } from '$lib/stores/editorTabs';
</script>

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
  <button type="button" class="px-3 text-gray-400 hover:text-blue-500 transition-colors font-bold text-sm" onclick={() => editorTabs.open()}>+</button>
</div>