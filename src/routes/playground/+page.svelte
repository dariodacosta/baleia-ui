<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';
  import PasswordInput from '$lib/components/ui/PasswordInput.svelte';

  let textValue = $state('');
  let passwordValue = $state('');
  let isLoadingTest = $state(false);

  function triggerLoading() {
    isLoadingTest = true;
    setTimeout(() => { isLoadingTest = false; }, 2000);
  }
</script>

<div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 space-y-12 transition-colors duration-200">
  <header class="border-b border-gray-300 dark:border-gray-700 pb-4">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Baleia UI - Playground de Primitivos</h1>
    <p class="text-sm text-gray-600 dark:text-gray-400">Ambiente de teste isolado para componentes Svelte 5</p>
  </header>

  <!-- Seção de Botões -->
  <section class="space-y-4">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">1. Variantes do Button.svelte</h2>
    <div class="flex flex-wrap gap-4 items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <Button variant="primary">Primary Md</Button>
      <Button variant="primary" size="sm">Primary Sm</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="danger">Danger Mode</Button>
      <Button variant="sso">Sign in with Google</Button>
      <Button variant="enterprise">Enterprise Cloud</Button>
      <Button variant="primary" loading={true}>Carregando</Button>
      <Button variant="primary" disabled={true}>Desabilitado</Button>
      
      <Button variant="primary" onclick={triggerLoading} loading={isLoadingTest}>
        Clique para Carregar (2s)
      </Button>
    </div>
  </section>

  <!-- Seção de Inputs -->
  <section class="space-y-4">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">2. Inputs de Texto e Senha</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      
      <TextInput label="Nome do Banco" placeholder="Ex: Produção-Main" bind:value={textValue} />
      
      <TextInput label="Query Monospace" placeholder="SELECT * FROM table;" mono={true} />
      
      <TextInput label="Input com Erro" placeholder="Digite algo..." error="Este campo possui uma inconsistência crítica." />
      
      <PasswordInput label="Senha de Acesso" placeholder="Sua frase secreta" bind:value={passwordValue} />

    </div>
    <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-xs font-mono text-gray-600 dark:text-gray-400">
      Estados Reativos: Nome: [{textValue}] | Senha: [{passwordValue}]
    </div>
  </section>
</div>