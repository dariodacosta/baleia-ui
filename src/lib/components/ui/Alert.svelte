<script lang="ts">
  interface Props {
    type: 'error' | 'warning' | 'success';
    message: string;
  }

  let { type, message }: Props = $props();

  const colors: Record<string, string> = {
    error: 'bg-red-900/30 border-red-800 text-red-400',
    warning: 'bg-yellow-900/30 border-yellow-800 text-yellow-400',
    success: 'bg-green-900/30 border-green-800 text-green-400',
  };
</script>

<div class="border rounded-lg px-4 py-3 text-sm {colors[type]}">
  {message}
</div>