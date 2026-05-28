<script lang="ts">
  import PasswordInput from '../ui/PasswordInput.svelte';

  interface Props {
    onSuccess: () => void;
  }

  let { onSuccess }: Props = $props();

  let password = $state('');
  let confirm = $state('');
  let error = $state('');

  function checkStrength(val: string): { score: number; label: string; color: string } {
    if (!val) return { score: 0, label: '', color: '' };
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val) && val.length >= 12) score++;
    const labels = ['Weak', 'Fair', 'Strong'];
    const colors = ['#ef4444', '#f59e0b', '#16a34a'];
    return { score, label: labels[score - 1] || '', color: colors[score - 1] || '' };
  }

  let strength = $derived(checkStrength(password));

  function setNewPassword() {
    error = '';
    if (!password || password !== confirm) {
      error = "Passwords don't match.";
      return;
    }
    onSuccess();
  }
</script>

<div>
  <h2 class="text-xl font-bold tracking-[-0.4px] mb-1">Set new password</h2>
  <p class="text-[13px] text-[var(--muted)] mb-6 leading-relaxed">Choose a strong password for your account.</p>

  <PasswordInput label="New password" bind:value={password} onkeydown={(e) => e.key === 'Enter' && setNewPassword()} />

  {#if password}
    <div class="flex gap-1 -mt-2 mb-3">
      {#each [1, 2, 3] as i}
        <div
          class="flex-1 h-[3px] rounded-sm bg-[var(--border)] transition-colors"
          class:bg-[#ef4444]={i <= strength.score && strength.score === 1}
          class:bg-[#f59e0b]={i <= strength.score && strength.score === 2}
          class:bg-[#22c55e]={i <= strength.score && strength.score === 3}
        ></div>
      {/each}
    </div>
    {#if strength.label}
      <p class="text-[10px] -mt-1 mb-3" style="color: {strength.color}">{strength.label}</p>
    {/if}
  {/if}

  <PasswordInput label="Confirm password" bind:value={confirm} onkeydown={(e) => e.key === 'Enter' && setNewPassword()} />

  {#if error}
    <div class="bg-[#fef2f2] border border-[#fecaca] rounded-md px-3 py-2.5 text-xs text-[#dc2626] mb-3.5">{error}</div>
  {/if}

  <button
    onclick={setNewPassword}
    class="w-full h-10 bg-[var(--primary)] hover:bg-[var(--primary-h)] text-white rounded-md text-[13px] font-semibold flex items-center justify-center gap-2 transition"
  >
    <svg viewBox="0 0 24 24" class="w-[13px] h-[13px] stroke-white"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    Update password
  </button>
</div>