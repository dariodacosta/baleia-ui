<script lang="ts">
  import { toasts } from '$lib/stores/toasts';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';

  let code = $state('');
  let isLoading = $state(false);

  async function handleVerify(e: SubmitEvent) {
    e.preventDefault();
    if (code.length < 6) {
      toasts.push({ type: 'warning', title: 'Código incompleto', message: 'O código de verificação deve conter 6 dígitos.' });
      return;
    }

    isLoading = true;
    setTimeout(() => {
      isLoading = false;
      toasts.push({ type: 'success', title: 'Código validado', message: 'Identidade confirmada.' });
      goto('/login/reset');
    }, 800);
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Verificar Código</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Insira os 6 dígitos de validação para continuar.</p>
  </div>

  <form onsubmit={handleVerify} class="space-y-4">
    <TextInput 
      label="Código de Segurança" 
      placeholder="000000" 
      required 
      disabled={isLoading} 
      mono={true} 
      bind:value={code} 
      maxlength={6} 
      class="text-center font-bold tracking-widest text-xl" 
    />

    <Button type="submit" variant="primary" class="w-full" loading={isLoading}>
      Confirmar Identidade
    </Button>

    <button type="button" onclick={() => toasts.push({ type: 'info', title: 'Reenviado', message: 'Um novo token foi enviado para o seu e-mail.' })} class="w-full text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-2">
      Não recebeu? Reenviar código
    </button>
  </form>
</div>