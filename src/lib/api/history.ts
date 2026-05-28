import { MOCK_ENABLED, mockResponse } from './mock';
import { apiFetch } from './client';
import type { QueryExecution, QueryResult } from '$lib/types/query';

const mockHistory: QueryExecution[] = [
  { id: 'exec-1', sql: 'SELECT * FROM users LIMIT 100;', datasourceId: '1', status: 'success', durationMs: 42, rowsReturned: 100, executedAt: new Date(), userId: 'usr-8831' },
  { id: 'exec-2', sql: 'DROP TABLE production_deploy_backup;', datasourceId: '1', status: 'error', errorMessage: 'Permission denied for user dario', executedAt: new Date(Date.now() - 600000), userId: 'usr-8831' }
];

export async function getExecutionHistory(datasourceId?: string): Promise<QueryExecution[]> {
  if (MOCK_ENABLED) {
    if (datasourceId) return mockResponse(mockHistory.filter(h => h.datasourceId === datasourceId));
    return mockResponse(mockHistory);
  }
  const url = datasourceId ? `/history?datasourceId=${datasourceId}` : '/history';
  return apiFetch(url);
}

export async function executeQuery(datasourceId: string, sql: string): Promise<QueryResult> {
  if (MOCK_ENABLED) {
    // Simula uma resposta genérica de banco de dados baseado no comando SQL
    const isSelect = sql.trim().toLowerCase().startsWith('select');
    
    if (!isSelect) {
      return mockResponse({
        columns: ['status', 'message'],
        rows: [{ status: 'success', message: 'Command executed successfully. 0 rows affected.' }],
        totalRows: 1,
        executionMs: Math.floor(Math.random() * 150)
      }, 400);
    }

    return mockResponse({
      columns: ['id', 'uuid', 'display_name', 'is_active', 'created_at'],
      rows: [
        { id: 1, uuid: 'a8b1-c4d2', display_name: 'Workspace Production', is_active: true, created_at: '2026-05-20' },
        { id: 2, uuid: 'f8e9-d3c1', display_name: 'Sandbox Environment', is_active: false, created_at: '2026-05-24' }
      ],
      totalRows: 2,
      executionMs: Math.floor(Math.random() * 80) + 20
    }, 500);
  }
  return apiFetch('/queries/run', { method: 'POST', body: JSON.stringify({ datasourceId, sql }) });
}