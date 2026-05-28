<script lang="ts">
  let { title, description, actionLabel, onAction } = $props();
</script>

<div class="flex flex-col items-center justify-center py-20 text-center">
  <div class="text-4xl mb-4">📭</div>
  <h3 class="font-bold">{title}</h3>
  <p class="text-sm text-gray-500 mb-4">{description}</p>
  {#if actionLabel}
    <button onclick={onAction} class="text-blue-600 font-bold">{actionLabel}</button>
  {/if}
</div>
