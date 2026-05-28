<script lang="ts">
  interface Props {
    onFormat: () => void;
    onRun: () => void;
  }
  let { onFormat, onRun }: Props = $props();
</script>

<div class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
  <button type="button" onclick={onRun} class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold transition-colors">▶ Run</button>
  <button type="button" onclick={onFormat} class="px-3 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-xs transition-colors">Format</button>
  <div class="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>
  <button type="button" class="px-2 py-1 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Explain</button>
  <button type="button" class="px-2 py-1 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Save</button>
</div>