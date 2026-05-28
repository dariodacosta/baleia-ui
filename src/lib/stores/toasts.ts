import { writable } from 'svelte/store';

export type Toast = { id: number; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' };
export const toasts = writable<Toast[]>([]);

export function addToast(toast: Omit<Toast, 'id'>) {
  const id = Date.now();
  toasts.update(t => [...t, { ...toast, id }]);
  setTimeout(() => toasts.update(t => t.filter(t => t.id !== id)), 5000);
}
