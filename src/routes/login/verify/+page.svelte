<script lang="ts">
import { addToast } from "$lib/stores/toasts";
  import { page } from '$app/stores';
  import { toasts } from '$lib/stores/toasts';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';

  let code = $state('');
  let isLoading = $state(false);
  let resendText = $state('Não recebeu? Reenviar código');
  let isResending = $state(false);

  // Cast explícito em 'any' para evitar que o validador reclame do contrato padrão de PageState
  const email = ($page.state as any)?.email || 'seu e-mail';

  async function handleVerify(e: SubmitEvent) {
    e.preventDefault();
    if (code.length < 6) return;

    isLoading = true;
    setTimeout(() => {
      isLoading = false;
      addToast({ type: 'success', title: 'Código validado', message: 'Identidade confirmada.' });
      goto('/login/reset');
    }, 800);
  }

  function handleResend() {
    if (isResending) return;
    
    isResending = true;
    resendText = 'Code resent!';
    addToast({ type: 'info', title: 'Token Disparado', message: `Um novo código foi enviado para ${email}` });

    // Restaura o texto original do link após exatamente 3 segundos
    setTimeout(() => {
      resendText = 'Não recebeu? Reenviar código';
      isResending = false;
    }, 3000);
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Verificar Código</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Insira os 6 dígitos de validação enviados para <span class="text-blue-500 font-medium">{email}</span>.
    </p>
  </div>

  <form onsubmit={handleVerify} class="space-y-4">
    <TextInput label="Código de Segurança" placeholder="000000" required disabled={isLoading} mono={true} bind:value={code} maxlength={6} class="text-center font-bold tracking-widest text-xl" />

    <Button type="submit" variant="primary" class="w-full" loading={isLoading}>
      Confirmar Identidade
    </Button>

    <button type="button" disabled={isResending} onclick={handleResend} class="w-full text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-2 disabled:text-green-500 disabled:no-underline transition-all">
      {resendText}
    </button>
  </form>
</div>