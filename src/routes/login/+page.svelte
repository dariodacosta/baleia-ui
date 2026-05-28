<script lang="ts">
  import { login } from '$lib/api/auth';
  import { session } from '$lib/stores/session';
  import { toasts } from '$lib/stores/toasts';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';
  import PasswordInput from '$lib/components/ui/PasswordInput.svelte';

  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    if (!email || !password) return;

    isLoading = true;
    try {
      const response = await login({ email, password });
      session.setSession(response.user, response.token);
      toasts.push({ type: 'success', title: 'Acesso autorizado', message: `Bem-vindo, ${response.user.firstName}!` });
      goto('/');
    } catch (err: any) {
      toasts.push({ type: 'error', title: 'Erro de autenticação', message: err.message || 'Credenciais inválidas.' });
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Entrar no Estúdio</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Insira suas credenciais para acessar os clusters.</p>
  </div>

  <form onsubmit={handleLogin} class="space-y-4">
    <TextInput label="E-mail" type="email" placeholder="seu@email.com" required disabled={isLoading} bind:value={email} />
    
    <div class="space-y-1">
      <PasswordInput label="Senha" placeholder="••••••••" required disabled={isLoading} bind:value={password} />
      <div class="text-right">
        <a href="/login/forgot" class="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">Esqueceu a senha?</a>
      </div>
    </div>

    <Button type="submit" variant="primary" class="w-full mt-2" loading={isLoading}>
      Entrar no Workspace
    </Button>
  </form>

  <div class="relative flex items-center justify-center my-4">
    <div class="absolute w-full border-t border-gray-200 dark:border-gray-800"></div>
    <span class="relative bg-gray-50 dark:bg-gray-950 px-3 text-xs text-gray-400 font-medium uppercase tracking-wider">Ou continue com</span>
  </div>

  <div class="grid grid-cols-1 gap-3">
    <a href="/login/sso" class="w-full">
      <Button variant="sso" class="w-full">
        <span class="mr-2">🔑</span> Single Sign-On (SSO) Enterprise
      </Button>
    </a>
  </div>
</div>