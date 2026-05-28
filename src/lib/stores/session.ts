import type { User } from '$lib/types/auth';

class SessionStore {
  // Estados reativos usando Runes do Svelte 5
  user = $state<User | null>(null);
  token = $state<string | null>(null);

  constructor() {
    // No futuro, podemos ler o localStorage aqui se necessário
  }

  setSession(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  clear() {
    this.user = null;
    this.token = null;
  }
}

export const session = new SessionStore();