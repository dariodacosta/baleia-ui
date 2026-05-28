<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import { toasts } from '$lib/stores/toasts';

  let isLoading = $state(false);

  function finalizeSetup() {
    isLoading = true;
    setTimeout(() => {
      toasts.push({ type: 'success', title: 'Instalação Pronta', message: 'Bem-vindo ao Baleia SQL Studio!' });
      goto('/'); // Envia o administrador para a área logada de produção
    }, 1500);
  }
</script>

<div class="text-center space-y-6 py-4">
  <div class="mx-auto h-16 w-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-3xl shadow-md border border-blue-200 dark:border-gray-800">
    🚀
  </div>

  <div class="space-y-2">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Ambiente Preparado!</h2>
    <p class="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
      Todas as partições de dados foram geradas e as diretrizes de segurança mestre estão ativas na infraestrutura.
    </p>
  </div>

  <div class="pt-4">
    <Button variant="primary" class="w-full" loading={isLoading} onclick={finalizeSetup}>
      Entrar no Dashboard do Estúdio
    </Button>
  </div>
</div>