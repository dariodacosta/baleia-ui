import { browser } from '$app/environment';

interface User {
  id: string;
  email: string;
  name: string;
}

class AuthStore {
  token = $state<string | null>(browser ? localStorage.getItem('token') : null);
  user = $state<User | null>(null);
  loading = $state(false);

  get isAuthenticated() {
    return !!this.token;
  }

  async login(email: string, password: string) {
    this.loading = true;
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      this.loading = false;
      throw new Error('Login failed');
    }
    const data = await res.json();
    this.token = data.token;
    this.user = data.user;
    localStorage.setItem('token', data.token);
    this.loading = false;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
  }
}

export const authStore = new AuthStore();