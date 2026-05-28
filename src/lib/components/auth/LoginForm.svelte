<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '../ui/Button.svelte';
  import Input from '../ui/Input.svelte';
  import PasswordInput from '../ui/PasswordInput.svelte';
  import { authStore } from '$lib/stores/auth.svelte';

  interface Props {
    onNavigate: (screen: string, email?: string) => void;
  }

  let { onNavigate }: Props = $props();

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let shaking = $state(false);

  async function doLogin() {
    error = '';
    shaking = false;
    if (!email.trim() || !password) {
      error = 'Enter your email and password.';
      return;
    }
    try {
      await authStore.login(email, password);
      goto('/dashboard');
    } catch {
      error = 'Incorrect email or password.';
      shaking = true;
      setTimeout(() => (shaking = false), 400);
    }
  }
</script>

<div>
  <h2 class="text-xl font-bold tracking-[-0.4px] mb-1">Sign in</h2>
  <p class="text-[13px] text-[var(--muted)] mb-6 leading-relaxed">Welcome back. Enter your credentials to continue.</p>

  {#if error}
    <div class="bg-[#fef2f2] border border-[#fecaca] rounded-md px-3 py-2.5 text-xs text-[#dc2626] mb-3.5">{error}</div>
  {/if}

  <Input label="Email" type="email" mono placeholder="you@company.com" bind:value={email} onkeydown={(e) => e.key === 'Enter' && doLogin()} />
  <PasswordInput label="Password" bind:value={password} onkeydown={(e) => e.key === 'Enter' && doLogin()} />

  <div class="text-right text-[11px] -mt-2 mb-4">
    <button class="text-[var(--primary)] hover:text-[var(--primary-h)] font-semibold bg-transparent border-none cursor-pointer" onclick={() => onNavigate('forgot')}>Forgot password?</button>
  </div>

  <Button variant="primary" onclick={doLogin}>
    <svg viewBox="0 0 24 24" class="w-[13px] h-[13px] stroke-white"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
    Sign in
  </Button>

  <div class="flex items-center gap-2.5 my-4 text-[11px] font-semibold text-[var(--muted)]">
    <span class="flex-1 h-px bg-[var(--border)]"></span>
    or
    <span class="flex-1 h-px bg-[var(--border)]"></span>
  </div>

  <div class="flex flex-col gap-2">
    <Button variant="sso">
      <svg viewBox="0 0 24 24" class="w-4 h-4" style="fill:none;stroke:none;">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Continue with Google
    </Button>
    <Button variant="sso">
      <svg viewBox="0 0 24 24" class="w-4 h-4" style="stroke:none;fill:var(--text);">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
      Continue with GitHub
    </Button>

    <div class="mt-2">
      <div class="text-[10px] font-bold uppercase tracking-[.6px] text-[var(--muted)] mb-2 flex items-center gap-2">
        Enterprise SSO
        <span class="flex-1 h-px bg-[var(--border)]"></span>
      </div>
      <Button variant="enterprise" onclick={() => onNavigate('sso')}>
        <svg viewBox="0 0 24 24" class="w-[14px] h-[14px]"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Sign in with SSO
        <span class="ml-auto flex gap-1">
          <span class="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-[#eff6ff] text-[#1d4ed8]">SAML</span>
          <span class="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-[#fdf4ff] text-[#7e22ce]">OIDC</span>
        </span>
      </Button>
    </div>
  </div>
</div>