<script lang="ts">
import { addToast } from "$lib/stores/toasts";
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';
  import { toasts } from '$lib/stores/toasts';

  let idpUrl = $state('');
  let clientId = $state('');
  let isLoading = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isLoading = true;

    setTimeout(() => {
      isLoading = false;
      addToast({ type: 'success', title: 'Provedor Integrado', message: 'Mapeamento SAML efetuado.' });
      goto('/setup/done');
    }, 1000);
  }

  function handleSkip() {
    goto('/setup/done');
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Federação de Identidade</h2>
    <p class="text-xs text-gray-400 mt-1">Conecte o diretório de usuários do seu provedor corporativo (Opcional).</p>
  </div>

  <form onsubmit={handleSubmit} class="space-y-4">
    <TextInput label="Metadata URL (Okta / Azure / Ping)" placeholder="https://identity.provider/v2/saml/metadata" required disabled={isLoading} bind:value={idpUrl} />
    <TextInput label="Client ID / Entity ID" placeholder="baleia-studio-client-id" required disabled={isLoading} bind:value={clientId} />

    <div class="flex flex-col space-y-2 pt-2">
      <Button type="submit" variant="primary" class="w-full" loading={isLoading}>
        Salvar Integração
      </Button>
      
      <Button type="button" variant="ghost" class="w-full" disabled={isLoading} onclick={handleSkip}>
        Skip for now (Pular etapa)
      </Button>
    </div>
  </form>
</div>