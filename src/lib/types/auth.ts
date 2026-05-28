export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  avatar?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type ForgotPasswordRequest = { email: string };

export type ResetPasswordRequest = { token: string; newPassword: string };

export type SSOProvider = 'saml' | 'oidc';

export type SSOConfig = { provider: SSOProvider; domain: string };