export type EngineType = 'PG' | 'MY' | 'TR' | 'RS' | 'DR' | 'CK';

export type ConnectionStatus = 'online' | 'error' | 'disabled';

export type Datasource = {
  id: string;
  name: string;
  engine: EngineType;
  host: string;
  port: number;
  database?: string;
  status: ConnectionStatus;
  schemas?: number;
  tables?: number;
  errorMessage?: string;
};

export type DatasourceCreate = {
  name: string;
  engine: EngineType;
  host: string;
  port: number;
  database?: string;
  username: string;
  password: string;
  useSsl: boolean;
  sshTunnel?: SshTunnel;
};

export type SshTunnel = {
  host: string;
  port: number;
  username: string;
  privateKey: string;
};

export type Plugin = {
  id: string;
  name: string;
  engine: EngineType;
  packageName: string;
  version: string;
  installed: boolean;
  bundled: boolean;
  updateAvailable?: string;
  sizeMb?: number;
};