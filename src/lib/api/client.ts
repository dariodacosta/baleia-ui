import { session } from '$lib/stores/session';
import { goto } from '$app/navigation';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const token = session.token;
  
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (response.status === 401) {
    session.clear();
    goto('/login');
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
}