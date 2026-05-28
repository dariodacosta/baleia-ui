export const MOCK_ENABLED = import.meta.env.VITE_MOCK === 'true';

export function mockResponse<T>(data: T, delayMs = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}