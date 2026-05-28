export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';
export type ResultTab = 'results' | 'messages' | 'explain' | 'history';

function createResultsStore() {
  let status = $state<ExecutionStatus>('idle');
  let result = $state<any>(null);
  let activeTab = $state<ResultTab>('results');

  return {
    get status() { return status; },
    get result() { return result; },
    get activeTab() { return activeTab; },
    set activeTab(tab: ResultTab) { activeTab = tab; },
    
    run(sql: string) {
      status = 'running';
      setTimeout(() => {
        status = 'success';
        result = { rows: [{ id: 1, name: 'Exemplo' }], count: 1, time: '20ms' };
      }, 500);
    }
  };
}
export const queryResults = createResultsStore();
