<script lang="ts">
  import { login } from '$lib/api/auth';
  import { session } from '$lib/stores/session';
  import { toasts } from '$lib/stores/toasts';
  import { goto } from '$app/navigation';

  // Estados reativos com Runes do Svelte 5
  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);
  let errorMessage = $state('');

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    
    if (!email || !password) {
      toasts.push({ type: 'warning', title: 'Campos obrigatórios', message: 'Por favor, preencha e-mail e senha.' });
      return;
    }

    isLoading = true;
    errorMessage = '';

    try {
      // Dispara a chamada para a nossa camada de API (Mock ou Real)
      const response = await login({ email, password });
      
      // Salva na store global (que persiste no localStorage)
      session.setSession(response.user, response.token);
      
      toasts.push({ type: 'success', title: 'Sucesso', message: `Bem-vindo de volta, ${response.user.firstName}!` });
      
      // Redireciona para a raiz do dashboard
      goto('/');
    } catch (err: any) {
      errorMessage = err.message || 'Falha na autenticação. Verifique suas credenciais.';
      toasts.push({ type: 'error', title: 'Erro ao entrar', message: errorMessage });
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-200">
  <div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
    
    <!-- Header/Logo -->
    <div class="text-center">
      <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-2xl shadow-md">
        🐋
      </div>
      <h2 class="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Baleia SQL Studio
      </h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Entre com sua conta para acessar seus workspaces
      </p>
    </div>

    <!-- Alert de Erro Local -->
    {#if errorMessage}
      <div class="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
        {errorMessage}
      </div>
    {/if}

    <!-- Formulário -->
    <form class="mt-8 space-y-6" onsubmit={handleLogin}>
      <div class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autocomplete="email"
            required
            disabled={isLoading}
            bind:value={email}
            class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition shadow-sm text-sm"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Senha
            </label>
            <a href="/forgot-password" class="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Esqueceu a senha?
            </a>
          </div>
          <input
            id="password"
            type="password"
            autocomplete="current-password"
            required
            disabled={isLoading}
            bind:value={password}
            class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition shadow-sm text-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {#if isLoading}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Autenticando...
          {:else}
            Entrar no Estúdio
          {/if}
        </button>
      </div>
    </form>

  </div>
</div>