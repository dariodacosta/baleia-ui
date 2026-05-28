// Theme store para gerenciar dark mode
const theme = {
  mode: 'light',
  
  init() {
    // Verificar se está no navegador
    if (typeof window === 'undefined') return;
    
    // Recuperar do localStorage ou preferência do sistema
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.mode = stored || (prefersDark ? 'dark' : 'light');
    this.applyClass(this.mode);
    
    // Ouvir mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.mode = e.matches ? 'dark' : 'light';
        this.applyClass(this.mode);
      }
    });
  },
  
  toggle() {
    this.mode = this.mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.mode);
    this.applyClass(this.mode);
  },
  
  applyClass(themeMode) {
    if (typeof document === 'undefined') return;
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

export default theme;
