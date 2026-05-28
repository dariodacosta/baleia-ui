<script>
  import { page } from '$app/stores';
</script>

<div class="h-screen flex flex-col items-center justify-center text-center p-6">
  <h1 class="text-4xl font-bold mb-4">Algo deu errado</h1>
  <p class="text-gray-600 mb-6">{$page.status}: {$page.error?.message}</p>
  <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded">Voltar para o início</a>
</div>
