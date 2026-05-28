export interface Tab {
  id: string;
  name: string;
  sql: string;
  datasourceId: string;
  unsaved: boolean;
}

function createTabsStore() {
  // Lista de abas aberta inicializada com uma query moficada de exemplo
  let tabs = $state<Tab[]>([
    { id: '1', name: 'query_inicial.sql', sql: 'SELECT * FROM users LIMIT 100;', datasourceId: 'main', unsaved: false }
  ]);
  let activeTabId = $state<string>('1');

  // Estado computado reativamente para saber os dados da aba ativa
  let activeTab = $derived(tabs.find(t => t.id === activeTabId) || null);

  return {
    // Getters para expor os estados reativos de forma limpa
    get list() { return tabs; },
    get activeId() { return activeTabId; },
    get active() { return activeTab; },
    
    // Setter para alterar a aba ativa
    set activeId(id: string) { activeTabId = id; },

    // Função para abrir uma nova aba vazia
    open(name = 'nova_query.sql', sql = '') {
      const id = crypto.randomUUID();
      tabs.push({ id, name, sql, datasourceId: 'main', unsaved: false });
      activeTabId = id;
    },

    // Função para fechar abas com barreira de segurança se não estiver salva
    close(id: string) {
      const index = tabs.findIndex(t => t.id === id);
      if (index === -1) return;

      const tabToClose = tabs[index];
      if (tabToClose.unsaved) {
        const confirmClose = confirm(`A aba "${tabToClose.name}" tem alterações não salvas. Deseja fechar mesmo assim?`);
        if (!confirmClose) return;
      }

      tabs.splice(index, 1);

      // Se fechamos a aba que estava ativa, move o foco para a aba anterior
      if (activeTabId === id && tabs.length > 0) {
        activeTabId = tabs[Math.max(0, index - 1)].id;
      }
    }
  };
}

// Exporta a instância única que será consumida por toda a interface
export const editorTabs = createTabsStore();