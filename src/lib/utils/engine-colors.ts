export type EngineType = 'PG' | 'MY' | 'TR' | 'RS' | 'DR' | 'CK';

export interface EngineColorConfig {
  bg: string;
  text: string;
  border: string;
  fullName: string;
}

export const engineColors: Record<EngineType, EngineColorConfig> = {
  PG: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800/50', fullName: 'PostgreSQL' },
  MY: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800/50', fullName: 'MySQL' },
  TR: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800/50', fullName: 'Trino' },
  RS: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-800/50', fullName: 'Amazon Redshift' },
  DR: { bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-teal-700 dark:text-teal-400', border: 'border-teal-200 dark:border-teal-800/50', fullName: 'DuckDB' },
  CK: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-800/50', fullName: 'ClickHouse' }
};