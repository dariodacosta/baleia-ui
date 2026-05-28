import { browser } from '$app/environment';

function createTheme() {
  // O Svelte 5 usa $state para criar variáveis reativas nativas
  let mode = $state<'light' | 'dark'>('light');

  function init() {
    if (!browser) return;
    // Busca a preferência salva ou o padrão do sistema operacional do usuário
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    mode = stored ?? (prefersDark ? 'dark' : 'light');
    applyClass(mode);
  }

  function toggle() {
    mode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    applyClass(mode);
  }

  function applyClass(theme: 'light' | 'dark') {
    if (!browser) return;
    // Adiciona ou remove a classe tanto no html quanto no body para garantir compatibilidade
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }

  return {
    get mode() { return mode; },
    init,
    toggle,
  };
}

export const theme = createTheme();