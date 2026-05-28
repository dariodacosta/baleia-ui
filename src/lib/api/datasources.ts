import { MOCK_ENABLED, mockResponse } from './mock';
import { apiFetch } from './client';
import type { Datasource, DatasourceCreate } from '$lib/types/datasource';

// Dados mockados (extraídos do data-sources.html)
const mockDatasources: Datasource[] = [
  { id: '1', name: 'Main-RS-01', engine: 'RS', host: 'redshift-cluster.xxx.redshift.amazonaws.com', port: 5439, status: 'online', schemas: 12, tables: 48 },
  { id: '2', name: 'Trino Prod', engine: 'TR', host: 'trino.prod.internal', port: 8080, status: 'online', schemas: 24, tables: 156 },
  { id: '3', name: 'PG Staging', engine: 'PG', host: 'pg-staging.internal', port: 5432, status: 'error', errorMessage: 'Connection timeout' },
  { id: '4', name: 'MySQL Legacy', engine: 'MY', host: 'mysql-legacy.internal', port: 3306, status: 'disabled' },
];

export async function listDatasources(): Promise<Datasource[]> {
  if (MOCK_ENABLED) return mockResponse(mockDatasources);
  return apiFetch('/datasources');
}

export async function getDatasource(id: string): Promise<Datasource> {
  if (MOCK_ENABLED) {
    const ds = mockDatasources.find(d => d.id === id);
    if (!ds) throw new Error('Datasource not found');
    return mockResponse(ds);
  }
  return apiFetch(`/datasources/${id}`);
}

export async function createDatasource(payload: DatasourceCreate): Promise<Datasource> {
  if (MOCK_ENABLED) {
    const newDs: Datasource = { id: String(Date.now()), ...payload, status: 'online' };
    return mockResponse(newDs, 500);
  }
  return apiFetch('/datasources', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateDatasource(id: string, payload: Partial<DatasourceCreate>): Promise<Datasource> {
  if (MOCK_ENABLED) {
    const ds = mockDatasources.find(d => d.id === id);
    if (!ds) throw new Error('Datasource not found');
    return mockResponse({ ...ds, ...payload });
  }
  return apiFetch(`/datasources/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function deleteDatasource(id: string): Promise<void> {
  if (MOCK_ENABLED) return mockResponse(undefined);
  return apiFetch(`/datasources/${id}`, { method: 'DELETE' });
}

export async function testConnection(payload: DatasourceCreate): Promise<{ success: boolean; message?: string; latencyMs?: number }> {
  if (MOCK_ENABLED) {
    const success = Math.random() > 0.2;
    return mockResponse({ 
      success, 
      message: success ? 'Connected successfully' : 'Connection failed: timeout', 
      latencyMs: Math.floor(Math.random() * 200) 
    });
  }
  return apiFetch('/datasources/test', { method: 'POST', body: JSON.stringify(payload) });
}