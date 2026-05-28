<script lang="ts">
import { addToast } from "$lib/stores/toasts";
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';
  import PasswordInput from '$lib/components/ui/PasswordInput.svelte'; // Import adicionado aqui
  import { toasts } from '$lib/stores/toasts';

  let dbHost = $state('');
  let dbUser = $state('');
  let dbPass = $state('');
  let isLoading = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isLoading = true;

    setTimeout(() => {
      isLoading = false;
      addToast({ type: 'success', title: 'Conexão Estável', message: 'Conectado ao cluster com sucesso.' });
      goto('/setup/sso');
    }, 1200);
  }

  function handleSkip() {
    addToast({ type: 'info', title: 'Ignorado', message: 'Você poderá adicionar datasources no painel de configurações posteriormente.' });
    goto('/setup/done');
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Conectar Banco de Dados</h2>
    <p class="text-xs text-gray-400 mt-1">Configure o primeiro datasource analítico do seu estúdio (Opcional).</p>
  </div>

  <form onsubmit={handleSubmit} class="space-y-4">
    <TextInput label="String de Conexão ou Host IP" placeholder="postgresql://localhost:5432/main" required disabled={isLoading} bind:value={dbHost} />
    <TextInput label="Usuário DB" placeholder="postgres" required disabled={isLoading} bind:value={dbUser} />
    <PasswordInput label="Senha DB" placeholder="••••••••" required disabled={isLoading} bind:value={dbPass} />

    <div class="flex flex-col space-y-2 pt-2">
      <Button type="submit" variant="primary" class="w-full" loading={isLoading}>
        Testar e Conectar
      </Button>
      
      <Button type="button" variant="ghost" class="w-full" disabled={isLoading} onclick={handleSkip}>
        Skip for now (Pular etapa)
      </Button>
    </div>
  </form>
</div>