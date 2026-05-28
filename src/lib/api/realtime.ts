// Wrapper para futura conexão WebSocket com o motor Trino
export interface QueryResult {
  executionId: string;
  data: any;
  status: 'pending' | 'success' | 'error';
}

// Interface inicial vazia para não quebrar o build
export function connectRealtime(executionId: string, onUpdate: (res: QueryResult) => void) {
  console.log('Aguardando implementação do backend Go para WebSocket:', executionId);
  // Futuramente: return new WebSocket(...)
}
