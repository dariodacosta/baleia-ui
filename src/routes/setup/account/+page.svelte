<script lang="ts">
import { addToast } from "$lib/stores/toasts";
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';
  import PasswordInput from '$lib/components/ui/PasswordInput.svelte';
  import { toasts } from '$lib/stores/toasts';

  let name = $state('');
  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isLoading = true;

    // Simulação da persistência do superusuário no banco local embarcado
    setTimeout(() => {
      isLoading = false;
      addToast({ type: 'success', title: 'Admin Configurado', message: 'Conta mestre criada com credenciais seguras.' });
      goto('/setup/connection');
    }, 1000);
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Criar Conta Administrador</h2>
    <p class="text-xs text-gray-400 mt-1">Este usuário terá privilégios ROOT irrestritos sobre todos os bancos de dados.</p>
  </div>

  <form onsubmit={handleSubmit} class="space-y-4">
    <TextInput label="Nome Completo" placeholder="Ex: Linus Torvalds" required disabled={isLoading} bind:value={name} />
    <TextInput label="E-mail de Acesso" type="email" placeholder="admin@baleia.internal" required disabled={isLoading} bind:value={email} />
    <PasswordInput label="Senha Mestre" placeholder="••••••••" required disabled={isLoading} bind:value={password} />

    <Button type="submit" variant="primary" class="w-full mt-2" loading={isLoading}>
      Gravar e Avançar
    </Button>
  </form>
</div>