<script lang="ts">
  import { getSSOConfig } from '$lib/api/auth';
  import { toasts } from '$lib/stores/toasts';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';

  let domain = $state('');
  let activeTab = $state('saml'); // alternância SAML/OIDC
  let isLoading = $state(false);

  async function handleSSO(e: SubmitEvent) {
    e.preventDefault();
    if (!domain) return;

    isLoading = true;
    try {
      const config = await getSSOConfig(domain);
      toasts.push({ type: 'info', title: 'Redirecionando', message: `Conectando ao provedor ${config.provider.toUpperCase()} via ${activeTab.toUpperCase()}...` });
      setTimeout(() => { goto('/login/verify'); }, 1000);
    } catch (err: any) {
      toasts.push({ type: 'error', title: 'Erro de SSO', message: 'Nenhuma configuração ativa encontrada para este domínio.' });
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">SSO Corporativo</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Autentique-se usando o provedor de identidade da sua empresa.</p>
  </div>

  <!-- Abas SAML / OIDC -->
  <div class="flex border-b border-gray-200 dark:border-gray-800 text-sm">
    <button type="button" class="flex-1 pb-2 font-medium transition-colors {activeTab === 'saml' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}" onclick={() => activeTab = 'saml'}>
      SAML 2.0
    </button>
    <button type="button" class="flex-1 pb-2 font-medium transition-colors {activeTab === 'oidc' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}" onclick={() => activeTab = 'oidc'}>
      OpenID Connect
    </button>
  </div>

  <form onsubmit={handleSSO} class="space-y-4">
    <TextInput label="Domínio Corporativo" placeholder="empresa.com" required disabled={isLoading} bind:value={domain} />

    <Button type="submit" variant="primary" class="w-full" loading={isLoading}>
      Avançar via {activeTab.toUpperCase()}
    </Button>

    <a href="/login" class="block text-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline mt-2">
      Voltar para login padrão
    </a>
  </form>
</div>