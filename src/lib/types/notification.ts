export type Toast = {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  action?: { label: string; handler: () => void };
  duration?: number; // ms, default 3000
};