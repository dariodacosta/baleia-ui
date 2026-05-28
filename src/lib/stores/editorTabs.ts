export interface Tab {
  id: string;
  name: string;
  sql: string;
  datasourceId: string;
  unsaved: boolean;
}

function createTabsStore() {
  let tabs = $state<Tab[]>([
    { id: '1', name: 'query_inicial.sql', sql: 'SELECT * FROM users LIMIT 100;', datasourceId: 'main', unsaved: false }
  ]);
  let activeTabId = $state<string>('1');

  let activeTab = $derived(tabs.find(t => t.id === activeTabId) || null);

  return {
    get list() { return tabs; },
    get activeId() { return activeTabId; },
    get active() { return activeTab; },
    
    set activeId(id: string) { activeTabId = id; },

    // Método necessário para o SqlEditor atualizar a store
    updateSql(id: string, newSql: string) {
      const tab = tabs.find(t => t.id === id);
      if (tab) {
        tab.sql = newSql;
        tab.unsaved = true;
      }
    },

    open(name = 'nova_query.sql', sql = '') {
      const id = crypto.randomUUID();
      tabs.push({ id, name, sql, datasourceId: 'main', unsaved: false });
      activeTabId = id;
    },

    close(id: string) {
      const index = tabs.findIndex(t => t.id === id);
      if (index === -1) return;

      const tabToClose = tabs[index];
      if (tabToClose.unsaved) {
        const confirmClose = confirm(`A aba "${tabToClose.name}" tem alterações não salvas. Deseja fechar mesmo assim?`);
        if (!confirmClose) return;
      }

      tabs.splice(index, 1);

      if (activeTabId === id && tabs.length > 0) {
        activeTabId = tabs[Math.max(0, index - 1)].id;
      }
    }
  };
}

export const editorTabs = createTabsStore();