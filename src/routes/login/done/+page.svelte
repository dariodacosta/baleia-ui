<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
</script>

<div class="text-center space-y-6 py-4">
  <div class="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-3xl shadow-sm border border-green-200 dark:border-green-800">
    ✓
  </div>

  <div class="space-y-2">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Tudo pronto!</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400">Sua senha foi redefinida com sucesso. Suas credenciais já estão ativas.</p>
  </div>

  <div class="pt-4">
    <a href="/login" class="block w-full">
      <Button variant="primary" class="w-full">
        Ir para o Login Principal
      </Button>
    </a>
  </div>
</div>