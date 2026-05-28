export type Catalog = { name: string; schemas: Schema[] };

export type Schema = { name: string; tables: TableSummary[] };

export type TableSummary = { name: string; kind: 'table' | 'view' };

export type TableDetails = {
  name: string;
  schema: string;
  catalog: string;
  comment?: string;
  columns: Column[];
  indexes?: Index[];
  stats: TableStats;
};

export type Column = {
  name: string;
  dataType: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isPartition: boolean;
  isNullable: boolean;
  comment?: string;
  references?: { table: string; column: string };
};

export type Index = {
  name: string;
  columns: string[];
  unique: boolean;
};

export type TableStats = {
  rowCount?: number;
  sizeBytes?: number;
  columnCount: number;
};