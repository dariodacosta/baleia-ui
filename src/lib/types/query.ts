export type QueryStatus = 'success' | 'error' | 'running';

export type QueryType = 'dql' | 'dml' | 'ddl' | 'explain';

export type SavedQuery = {
  id: string;
  name: string;
  sql: string;
  visibility: 'mine' | 'shared';
  ownerId: string;
  ownerName?: string;
  updatedAt: Date;
};

export type QueryExecution = {
  id: string;
  sql: string;
  datasourceId: string;
  status: QueryStatus;
  durationMs?: number;
  rowsReturned?: number;
  scannedBytes?: number;
  errorMessage?: string;
  executedAt: Date;
  userId: string;
};

export type QueryResult = {
  columns: string[];
  rows: Array<Record<string, unknown>>;
  totalRows: number;
  executionMs: number;
  scannedBytes?: number;
};