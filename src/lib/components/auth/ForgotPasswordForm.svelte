<script lang="ts">
  interface Props {
    onBack: () => void;
    onCodeSent: (email: string) => void;
  }

  let { onBack, onCodeSent }: Props = $props();
  let email = $state('');

  function sendCode() {
    if (!email.trim()) return;
    onCodeSent(email);
  }
</script>

<div>
  <button class="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] bg-transparent border-none cursor-pointer mb-5 w-fit transition-colors" onclick={onBack}>
    <svg viewBox="0 0 24 24" class="w-[13px] h-[13px]"><polyline points="15 18 9 12 15 6"/></svg>
    Back to sign in
  </button>

  <h2 class="text-xl font-bold tracking-[-0.4px] mb-1">Forgot password?</h2>
  <p class="text-[13px] text-[var(--muted)] mb-6 leading-relaxed">Enter your email and we'll send a 6-digit code to reset your password.</p>

  <div class="flex flex-col gap-[5px] mb-4">
    <label class="text-[11px] font-semibold">Email</label>
    <input
      type="email"
      bind:value={email}
      placeholder="you@company.com"
      onkeydown={(e) => e.key === 'Enter' && sendCode()}
      class="w-full h-10 bg-[var(--bg)] border border-[var(--border)] rounded-md px-3 font-mono text-xs text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,.1)] focus:bg-[var(--panel)] placeholder:text-[var(--muted)] dark:bg-[#1c2128] dark:focus:bg-[var(--panel)]"
    />
  </div>

  <button
    onclick={sendCode}
    class="w-full h-10 bg-[var(--primary)] hover:bg-[var(--primary-h)] text-white rounded-md text-[13px] font-semibold flex items-center justify-center gap-2 transition"
  >
    <svg viewBox="0 0 24 24" class="w-[13px] h-[13px] stroke-white"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    Send code
  </button>
</div>