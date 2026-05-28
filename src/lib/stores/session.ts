import { browser } from '$app/environment';
import type { User } from '$lib/types/auth';

function createSession() {
  let user = $state<User | null>(null);
  let token = $state<string | null>(null);

  function loadFromStorage() {
    if (!browser) return;
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      token = storedToken;
      user = JSON.parse(storedUser);
    }
  }

  function setSession(newUser: User, newToken: string) {
    user = newUser;
    token = newToken;
    if (browser) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  }

  function clear() {
    user = null;
    token = null;
    if (browser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  return {
    get user() { return user; },
    get token() { return token; },
    loadFromStorage,
    setSession,
    clear,
  };
}

export const session = createSession();