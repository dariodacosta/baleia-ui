<script lang="ts">
  interface Props {
    onDone: () => void;
  }

  let { onDone }: Props = $props();
</script>

<div class="text-center">
  <div class="w-[52px] h-[52px] rounded-full bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mx-auto mb-4">
    <svg viewBox="0 0 24 24" class="w-[22px] h-[22px] stroke-[#16a34a]"><polyline points="20 6 9 17 4 12"/></svg>
  </div>
  <h2 class="text-xl font-bold tracking-[-0.4px] mb-1">Password updated</h2>
  <p class="text-[13px] text-[var(--muted)] mb-6 leading-relaxed">Your password has been reset. Sign in with your new password.</p>

  <button
    onclick={onDone}
    class="w-full h-10 bg-[var(--primary)] hover:bg-[var(--primary-h)] text-white rounded-md text-[13px] font-semibold flex items-center justify-center gap-2 transition"
  >
    Back to sign in
  </button>
</div>