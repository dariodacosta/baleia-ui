<script lang="ts">
import { addToast } from "$lib/stores/toasts";
  import { resetPassword } from '$lib/api/auth';
  import { toasts } from '$lib/stores/toasts';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import PasswordInput from '$lib/components/ui/PasswordInput.svelte';

  let password = $state('');
  let confirmPassword = $state('');
  let isLoading = $state(false);

  // Computa a força da senha reativamente usando Runes ($derived)
  let passwordStrength = $derived.by(() => {
    if (!password) return { score: 0, label: 'Vazia', color: 'bg-gray-200' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: 'Fraca', color: 'bg-red-500 w-1/4' };
    if (score <= 3) return { score, label: 'Média', color: 'bg-yellow-500 w-2/4' };
    return { score, label: 'Forte — Excelente', color: 'bg-green-500 w-full' };
  });

  async function handleReset(e: SubmitEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast({ type: 'warning', title: 'Divergência', message: 'A confirmação de senha não coincide.' });
      return;
    }
    if (passwordStrength.score < 2) {
      addToast({ type: 'warning', title: 'Senha Vulnerável', message: 'Por favor, melhore a complexidade da sua nova senha.' });
      return;
    }

    isLoading = true;
    try {
      await resetPassword({ token: 'mock-token', newPassword: password });
      goto('/login/done');
    } catch (err: any) {
      addToast({ type: 'error', title: 'Erro', message: 'Falha ao gravar a nova senha.' });
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
    <div class="space-y-1">
      <PasswordInput label="Nova Senha" placeholder="••••••••" required disabled={isLoading} bind:value={password} />
      
      {#if password}
        <div class="pt-1 space-y-1">
          <div class="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div class="h-full transition-all duration-300 {passwordStrength.color}"></div>
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Força: {passwordStrength.label}</span>
        </div>
      {/if}
    </div>

    <PasswordInput label="Confirmar Nova Senha" placeholder="••••••••" required disabled={isLoading} bind:value={confirmPassword} />

    <Button type="submit" variant="primary" class="w-full mt-2" loading={isLoading}>
      Atualizar Credenciais
    </Button>
  </form>
</div>