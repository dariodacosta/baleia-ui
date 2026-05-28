<script lang="ts">
import { addToast } from "$lib/stores/toasts";
  import { forgotPassword } from '$lib/api/auth';
  import { toasts } from '$lib/stores/toasts';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';

  let email = $state('');
  let isLoading = $state(false);

  async function handleForgot(e: SubmitEvent) {
    e.preventDefault();
    if (!email) return;

    isLoading = true;
    try {
      await forgotPassword({ email });
      addToast({ type: 'success', title: 'Código gerado', message: 'Verifique seu e-mail cadastrado.' });
      
      // Passa o email de forma segura no state do histórico de navegação
      goto('/login/verify', { state: { email } });
    } catch (err: any) {
      addToast({ type: 'error', title: 'Erro', message: 'Não foi possível processar a recuperação.' });
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Recuperar Acesso</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Enviaremos um token de segurança de 6 dígitos para o seu e-mail.</p>
  </div>

  <form onsubmit={handleForgot} class="space-y-4">
    <TextInput label="E-mail de Cadastro" type="email" placeholder="seu@email.com" required disabled={isLoading} bind:value={email} />

    <Button type="submit" variant="primary" class="w-full" loading={isLoading}>
      Enviar Código de Segurança
    </Button>

    <a href="/login" class="block text-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline mt-2">
      Cancelar e voltar
    </a>
  </form>
</div>