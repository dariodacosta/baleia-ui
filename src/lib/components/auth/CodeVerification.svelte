<script lang="ts">
  interface Props {
    email: string;
    onBack: () => void;
    onVerified: () => void;
  }

  let { email, onBack, onVerified }: Props = $props();

  let digits = $state(['', '', '', '', '', '']);
  let error = $state(false);
  let shaking = $state(false);
  let resent = $state(false);

  function verifyCode() {
    const code = digits.join('');
    if (code !== '123456') {
      error = true;
      shaking = true;
      setTimeout(() => (shaking = false), 400);
      return;
    }
    error = false;
    onVerified();
  }

  function resendCode() {
    resent = true;
    setTimeout(() => (resent = false), 3000);
  }

  function handleInput(i: number, e: Event) {
    const inp = e.target as HTMLInputElement;
    inp.value = inp.value.replace(/\D/g, '').slice(-1);
    digits[i] = inp.value;
    digits = digits;
    if (inp.value && i < 5) {
      const next = document.getElementById(`digit-${i + 1}`);
      next?.focus();
    }
  }

  function handleKeydown(i: number, e: KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      const prev = document.getElementById(`digit-${i - 1}`);
      prev?.focus();
    }
    if (e.key === 'Enter') verifyCode();
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) || '';
    for (let j = 0; j < 6; j++) {
      digits[j] = pasted[j] || '';
    }
    digits = digits;
    const focusIdx = Math.min(pasted.length, 5);
    document.getElementById(`digit-${focusIdx}`)?.focus();
  }

  let disabled = $derived(digits.some(d => !d));
</script>

<div>
  <button class="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] bg-transparent border-none cursor-pointer mb-5 w-fit transition-colors" onclick={onBack}>
    <svg viewBox="0 0 24 24" class="w-[13px] h-[13px]"><polyline points="15 18 9 12 15 6"/></svg>
    Back
  </button>

  <h2 class="text-xl font-bold tracking-[-0.4px] mb-1">Check your email</h2>
  <p class="text-[13px] text-[var(--muted)] mb-6 leading-relaxed">We sent a 6-digit code to <strong>{email}</strong>. It expires in 10 minutes.</p>

  <div class="flex gap-2 justify-center mb-2" class:shake={shaking} onpaste={handlePaste}>
    {#each digits as _, i}
      <input
        id="digit-{i}"
        type="text"
        inputmode="numeric"
        maxlength="1"
        value={digits[i]}
        oninput={(e) => handleInput(i, e)}
        onkeydown={(e) => handleKeydown(i, e)}
        class="w-[46px] h-[54px] bg-[var(--bg)] border border-[var(--border)] rounded-lg font-mono text-[22px] font-bold text-center text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,.1)] focus:bg-[var(--panel)] dark:bg-[#1c2128] dark:focus:bg-[var(--panel)]"
      />
    {/each}
  </div>

  <p class="text-xs text-[var(--muted)] text-center mb-5">
    {#if resent}
      Code resent!
    {:else}
      Didn't receive it? <button class="text-[var(--primary)] hover:text-[var(--primary-h)] font-semibold bg-transparent border-none cursor-pointer" onclick={resendCode}>Resend code</button>
    {/if}
  </p>

  {#if error}
    <div class="bg-[#fef2f2] border border-[#fecaca] rounded-md px-3 py-2.5 text-xs text-[#dc2626] mb-3.5">Invalid code. Try <strong>123456</strong> for the demo.</div>
  {/if}

  <button
    disabled={disabled}
    onclick={verifyCode}
    class="w-full h-10 bg-[var(--primary)] hover:bg-[var(--primary-h)] text-white rounded-md text-[13px] font-semibold flex items-center justify-center gap-2 transition disabled:bg-[#93c5fd] disabled:cursor-not-allowed"
  >
    <svg viewBox="0 0 24 24" class="w-[13px] h-[13px] stroke-white"><polyline points="20 6 9 17 4 12"/></svg>
    Verify
  </button>
</div>

<style>
  .shake { animation: shake .35s ease; }
  @keyframes shake {
    0%,100% { transform: translateX(0) }
    20%,60% { transform: translateX(-5px) }
    40%,80% { transform: translateX(5px) }
  }
</style>