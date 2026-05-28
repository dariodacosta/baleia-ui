import { MOCK_ENABLED, mockResponse } from './mock';
import { apiFetch } from './client';
import type { 
  LoginRequest, 
  LoginResponse, 
  ForgotPasswordRequest, 
  ResetPasswordRequest, 
  SSOConfig, 
  User 
} from '$lib/types/auth';

const mockUser: User = {
  id: 'usr-8831',
  email: 'dario@baleia.io',
  firstName: 'Dário',
  lastName: 'Silva',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
};

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  if (MOCK_ENABLED) {
    if (payload.email === 'admin@baleia.io' && payload.password === 'password') {
      return mockResponse({ token: 'mock-jwt-token-xyz-123', user: mockUser }, 600);
    }
    // Para facilitar testes na UI, vamos deixar passar qualquer login no modo mock, mas variando o e-mail
    return mockResponse({ 
      token: 'mock-jwt-token-xyz-123', 
      user: { ...mockUser, email: payload.email } 
    }, 600);
  }
  return apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

export async function forgotPassword(payload: ForgotPasswordRequest): Promise<{ success: boolean }> {
  if (MOCK_ENABLED) return mockResponse({ success: true });
  return apiFetch('/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) });
}

export async function resetPassword(payload: ResetPasswordRequest): Promise<{ success: boolean }> {
  if (MOCK_ENABLED) return mockResponse({ success: true }, 500);
  return apiFetch('/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getSSOConfig(domain: string): Promise<SSOConfig> {
  if (MOCK_ENABLED) {
    return mockResponse({ provider: 'oidc', domain });
  }
  return apiFetch(`/auth/sso/config?domain=${encodeURIComponent(domain)}`);
}