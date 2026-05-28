<script lang="ts">
  import { page } from '$app/stores';
  import { session } from '$lib/stores/session';

  // Mapeamento dos itens de navegação baseados no seu design original (.global-nav)
  const navItems = [
    { id: 'editor', label: 'SQL Editor', href: '/', icon: '💻' },
    { id: 'schema', label: 'Schema Browser', href: '/schema', icon: '📂' },
    { id: 'history', label: 'Query History', href: '/history', icon: '⏱️' },
    { id: 'datasources', label: 'Datasources', href: '/datasources', icon: '⚙️' }
  ];

  // Computa se a rota atual corresponde ao item para fins de estilo ativo
  function isItemActive(href: string) {
    const pathname = $page.url.pathname;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }
</script>

<aside class="w-16 h-screen flex flex-col items-center py-4 bg-gray-900 border-r border-gray-800 text-gray-400 select-none flex-shrink-0">
  <div class="h-10 w-10 flex items-center justify-center bg-blue-600 rounded-xl text-white font-bold text-xl shadow-lg mb-8 hover:scale-105 transition-transform cursor-pointer">
    🐋
  </div>

  <nav class="flex-1 w-full space-y-2 px-2">
    {#each navItems as item}
      {@const active = isItemActive(item.href)}
      <a
        href={item.href}
        class="group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200
          {active 
            ? 'bg-blue-600/10 text-blue-500 border border-blue-500/30 font-semibold' 
            : 'hover:bg-gray-800 hover:text-gray-200'}"
        title={item.label}
      >
        <span class="text-xl">{item.icon}</span>
        
        <div class="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-150 origin-left bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-50">
          {item.label}
        </div>
      </a>
    {/each}
  </nav>

  <div class="mt-auto relative group pt-4 border-t border-gray-800 w-full flex justify-center">
    <button class="h-10 w-10 rounded-xl overflow-hidden border border-gray-700 bg-gray-800 hover:border-gray-500 transition-colors focus:outline-none">
      {#if session.user?.avatar}
        <img src={session.user.avatar} alt="Avatar" class="h-full w-full object-cover" />
      {:else}
        <div class="h-full w-full flex items-center justify-center bg-blue-700 text-white font-bold text-sm">
          {session.user?.firstName?.charAt(0) || 'D'}
        </div>
      {/if}
    </button>
    
    <div class="absolute bottom-2 left-16 scale-0 group-hover:scale-100 transition-all duration-150 origin-bottom-left bg-gray-800 border border-gray-700 p-2 rounded-lg shadow-xl w-48 z-50">
      <p class="text-xs font-semibold text-white px-2 py-1 truncate">{session.user?.firstName || 'Usuário'} {session.user?.lastName || ''}</p>
      <p class="text-[10px] text-gray-400 px-2 pb-1 border-b border-gray-700 truncate">{session.user?.email || 'sem-email'}</p>
      <button onclick={() => session.clear()} class="w-full text-left text-xs text-red-400 hover:bg-red-500/10 p-2 rounded mt-1 transition-colors">
        Sair do Estúdio
      </button>
    </div>
  </div>
</aside>