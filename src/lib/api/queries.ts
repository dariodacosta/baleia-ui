import { MOCK_ENABLED, mockResponse } from './mock';
import { apiFetch } from './client';
import type { SavedQuery } from '$lib/types/query';

const mockSavedQueries: SavedQuery[] = [
  { id: 'q1', name: 'Relatório Trimestral Faturamento', sql: 'SELECT * FROM orders WHERE created_at >= \'2026-01-01\'', visibility: 'shared', ownerId: 'usr-102', ownerName: 'Amanda L.', updatedAt: new Date() },
  { id: 'q2', name: 'Métricas de Engajamento por Usuário', sql: 'SELECT user_id, COUNT(*) FROM events GROUP BY 1', visibility: 'mine', ownerId: 'usr-8831', updatedAt: new Date(Date.now() - 86400000) },
  { id: 'q3', name: 'Limpeza de Logs Inativos', sql: 'DELETE FROM system_logs WHERE status = \'deprecated\'', visibility: 'shared', ownerId: 'usr-8831', ownerName: 'Dário S.', updatedAt: new Date(Date.now() - 172800000) }
];

export async function listSavedQueries(): Promise<SavedQuery[]> {
  if (MOCK_ENABLED) return mockResponse(mockSavedQueries);
  return apiFetch('/queries');
}

export async function createSavedQuery(payload: Omit<SavedQuery, 'id' | 'updatedAt'>): Promise<SavedQuery> {
  if (MOCK_ENABLED) {
    const newQuery: SavedQuery = { id: `q-${Date.now()}`, ...payload, updatedAt: new Date() };
    return mockResponse(newQuery);
  }
  return apiFetch('/queries', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateSavedQuery(id: string, payload: Partial<SavedQuery>): Promise<SavedQuery> {
  if (MOCK_ENABLED) {
    const q = mockSavedQueries.find(item => item.id === id);
    if (!q) throw new Error('Query not found');
    return mockResponse({ ...q, ...payload, updatedAt: new Date() });
  }
  return apiFetch(`/queries/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function deleteSavedQuery(id: string): Promise<void> {
  if (MOCK_ENABLED) return mockResponse(undefined);
  return apiFetch(`/queries/${id}`, { method: 'DELETE' });
}