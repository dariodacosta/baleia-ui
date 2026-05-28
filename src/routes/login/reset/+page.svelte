<script lang="ts">
  import { resetPassword } from '$lib/api/auth';
  import { toasts } from '$lib/stores/toasts';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import PasswordInput from '$lib/components/ui/PasswordInput.svelte';

  let password = $state('');
  let confirmPassword = $state('');
  let isLoading = $state(false);

  async function handleReset(e: SubmitEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toasts.push({ type: 'warning', title: 'Divergência', message: 'A confirmação de senha não coincide.' });
      return;
    }

    isLoading = true;
    try {
      // Ajustado para newPassword casar perfeitamente com a interface da nossa API
      await resetPassword({ token: 'mock-token', newPassword: password });
      goto('/login/done');
    } catch (err: any) {
      toasts.push({ type: 'error', title: 'Erro', message: 'Falha ao gravar a nova senha.' });
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Nova Senha</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Defina seus novos parâmetros de acesso à plataforma.</p>
  </div>

  <form onsubmit={handleReset} class="space-y-4">
    <PasswordInput label="Nova Senha" placeholder="••••••••" required disabled={isLoading} bind:value={password} />
    <PasswordInput label="Confirmar Nova Senha" placeholder="••••••••" required disabled={isLoading} bind:value={confirmPassword} />

    <Button type="submit" variant="primary" class="w-full mt-2" loading={isLoading}>
      Atualizar Credenciais
    </Button>
  </form>
</div>