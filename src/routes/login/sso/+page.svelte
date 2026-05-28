<script lang="ts">
  import { toasts } from '$lib/stores/toasts';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';

  let domain = $state('');
  let activeTab = $state<'saml' | 'oidc'>('saml');
  let isLoading = $state(false);

  // Hints dinâmicos mapeados do login.html originais
  const hints = {
    saml: 'O redirecionamento usará asserções seguras XML assinadas pelo seu IDP corporativo (Okta, Azure AD, Ping Identity).',
    oidc: 'A autenticação será processada via fluxo implícito ou authorization code usando tokens JWT escopados.'
  };

  async function handleSSO(e: SubmitEvent) {
    e.preventDefault();
    if (!domain) return;

    isLoading = true;
    try {
      // Simulação interna e elegante do redirecionamento do Provedor de Identidade Federado
      toasts.push({ type: 'info', title: 'Redirecionando', message: `Conectando ao gateway federado corporativo ${domain} via ${activeTab.toUpperCase()}...` });
      
      // Simula o tempo de handshake de rede externa
      setTimeout(() => {
        window.location.href = '/login/verify';
      }, 1200);
    } catch (err: any) {
      toasts.push({ type: 'error', title: 'Erro de Federação', message: err.message || 'Configuração não mapeada.' });
      isLoading = false;
    }
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">SSO Corporativo</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Autentique-se usando o provedor de identidade da sua empresa.</p>
  </div>

  <div class="flex border-b border-gray-200 dark:border-gray-800 text-sm">
    <button type="button" class="flex-1 pb-2 font-medium transition-colors {activeTab === 'saml' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}" onclick={() => activeTab = 'saml'}>
      SAML 2.0
    </button>
    <button type="button" class="flex-1 pb-2 font-medium transition-colors {activeTab === 'oidc' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}" onclick={() => activeTab = 'oidc'}>
      OpenID Connect
    </button>
  </div>

  <p class="text-xs text-gray-400 bg-gray-100 dark:bg-gray-900 p-3 rounded-lg leading-relaxed border border-gray-200 dark:border-gray-800">
    ℹ️ {hints[activeTab]}
  </p>

  <form onsubmit={handleSSO} class="space-y-4">
    <TextInput label="Domínio Corporativo" placeholder="empresa.com" required disabled={isLoading} bind:value={domain} />

    <Button type="submit" variant="primary" class="w-full" loading={isLoading}>
      Autenticar via {activeTab.toUpperCase()}
    </Button>

    <a href="/login" class="block text-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline mt-2">
      Voltar para login padrão
    </a>
  </form>
</div>