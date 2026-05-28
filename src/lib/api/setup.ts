import { MOCK_ENABLED, mockResponse } from './mock';
import { apiFetch } from './client';
import type { Plugin } from '$lib/types/datasource';

const mockPlugins: Plugin[] = [
  { id: 'p1', name: 'PostgreSQL Native Driver', engine: 'PG', packageName: '@baleia-studio/driver-pg', version: '1.4.2', installed: true, bundled: true, sizeMb: 4.2 },
  { id: 'p2', name: 'Trino Distributed Connector', engine: 'TR', packageName: '@baleia-studio/driver-trino', version: '2.1.0', installed: false, bundled: false, updateAvailable: '2.2.0', sizeMb: 18.5 },
  { id: 'p3', name: 'ClickHouse Driver High-Perf', engine: 'CK', packageName: '@baleia-studio/driver-clickhouse', version: '0.9.5', installed: true, bundled: false, sizeMb: 8.1 }
];

export async function listPlugins(): Promise<Plugin[]> {
  if (MOCK_ENABLED) return mockResponse(mockPlugins);
  return apiFetch('/setup/plugins');
}

export async function installPlugin(id: string): Promise<Plugin> {
  if (MOCK_ENABLED) {
    const plugin = mockPlugins.find(p => p.id === id);
    if (!plugin) throw new Error('Plugin not found');
    plugin.installed = true;
    return mockResponse({ ...plugin }, 1200); // Maior delay para simular o download do binário
  }
  return apiFetch(`/setup/plugins/${id}/install`, { method: 'POST' });
}