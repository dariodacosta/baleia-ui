<script lang="ts">
  import LeftPanel from '$lib/components/branding/LeftPanel.svelte';
  import LoginForm from '$lib/components/auth/LoginForm.svelte';
  import SsoForm from '$lib/components/auth/SsoForm.svelte';
  import ForgotPasswordForm from '$lib/components/auth/ForgotPasswordForm.svelte';
  import CodeVerification from '$lib/components/auth/CodeVerification.svelte';
  import NewPasswordForm from '$lib/components/auth/NewPasswordForm.svelte';
  import PasswordUpdated from '$lib/components/auth/PasswordUpdated.svelte';

  type Screen = 'login' | 'sso' | 'forgot' | 'code' | 'newpw' | 'success';
  let screen = $state<Screen>('login');
  let resetEmail = $state('');
  let dark = $state(false);

  $effect(() => {
    document.body.classList.toggle('dark', dark);
  });

  function go(s: Screen, email = '') {
    if (email) resetEmail = email;
    screen = s;
  }
</script>

<div class="flex min-h-screen">
  <LeftPanel />
  <div class="w-[420px] flex-shrink-0 flex flex-col items-center justify-center p-10 relative bg-[var(--panel)]">
    <div class="absolute top-4 right-5 flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
      <svg viewBox="0 0 24 24" style="width:13px;height:13px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <div
        class="w-8 h-[18px] rounded-full cursor-pointer relative transition-colors"
        class:bg-[var(--primary)]={dark}
        class:bg-[var(--border)]={!dark}
        onclick={() => dark = !dark}
        role="switch"
        aria-checked={dark}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && (dark = !dark)}
      >
        <div
          class="w-[14px] h-[14px] bg-white rounded-full absolute top-0.5 transition-transform shadow-sm"
          class:translate-x-[14px]={dark}
          class:left-0.5={!dark}
        ></div>
      </div>
    </div>

    <div class="w-full max-w-[360px]">
      {#if screen === 'login'}
        <LoginForm onNavigate={go} />
      {:else if screen === 'sso'}
        <SsoForm onBack={() => go('login')} />
      {:else if screen === 'forgot'}
        <ForgotPasswordForm onBack={() => go('login')} onCodeSent={(email) => go('code', email)} />
      {:else if screen === 'code'}
        <CodeVerification email={resetEmail} onBack={() => go('forgot')} onVerified={() => go('newpw')} />
      {:else if screen === 'newpw'}
        <NewPasswordForm onSuccess={() => go('success')} />
      {:else if screen === 'success'}
        <PasswordUpdated onDone={() => go('login')} />
      {/if}
    </div>
  </div>
</div>