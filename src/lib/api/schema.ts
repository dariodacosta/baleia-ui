import { MOCK_ENABLED, mockResponse } from './mock';
import { apiFetch } from './client';
import type { Catalog, TableDetails } from '$lib/types/schema';

const mockCatalogs: Catalog[] = [
  {
    name: 'aws_redshift_prod',
    schemas: [
      {
        name: 'public',
        tables: [
          { name: 'users', kind: 'table' },
          { name: 'orders', kind: 'table' },
          { name: 'active_sessions_view', kind: 'view' }
        ]
      },
      {
        name: 'analytics',
        tables: [
          { name: 'user_funnel_daily', kind: 'table' },
          { name: 'marketing_attribution', kind: 'table' }
        ]
      }
    ]
  }
];

const mockTableDetails: Record<string, TableDetails> = {
  'users': {
    name: 'users',
    schema: 'public',
    catalog: 'aws_redshift_prod',
    comment: 'Tabela central de cadastro de clientes da plataforma.',
    columns: [
      { name: 'id', dataType: 'VARCHAR(36)', isPrimaryKey: true, isForeignKey: false, isPartition: false, isNullable: false, comment: 'ID incremental UUID v4' },
      { name: 'email', dataType: 'VARCHAR(255)', isPrimaryKey: false, isForeignKey: false, isPartition: false, isNullable: false },
      { name: 'role_id', dataType: 'INTEGER', isPrimaryKey: false, isForeignKey: true, isPartition: false, isNullable: true, references: { table: 'roles', column: 'id' } }
    ],
    stats: { rowCount: 145020, sizeBytes: 24510200, columnCount: 3 }
  }
};

export async function getDatabaseMetadata(datasourceId: string): Promise<Catalog[]> {
  if (MOCK_ENABLED) return mockResponse(mockCatalogs, 400);
  return apiFetch(`/datasources/${datasourceId}/metadata`);
}

export async function getTableDetails(datasourceId: string, catalog: string, schema: string, table: string): Promise<TableDetails> {
  if (MOCK_ENABLED) {
    const details = mockTableDetails[table] || {
      name: table,
      schema,
      catalog,
      columns: [{ name: 'id', dataType: 'INTEGER', isPrimaryKey: true, isForeignKey: false, isPartition: false, isNullable: false }],
      stats: { rowCount: 0, sizeBytes: 0, columnCount: 1 }
    };
    return mockResponse(details);
  }
  return apiFetch(`/datasources/${datasourceId}/metadata/${catalog}/${schema}/${table}`);
}