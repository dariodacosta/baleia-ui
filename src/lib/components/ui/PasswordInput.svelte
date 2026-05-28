<script lang="ts">
//   import { eye, eyeOff } from './icons';

  interface Props {
    label?: string;
    placeholder?: string;
    value?: string;
    onkeydown?: (e: KeyboardEvent) => void;
    oninput?: (e: Event) => void;
  }

  let {
    label,
    placeholder = '••••••••',
    value = $bindable(''),
    onkeydown,
    oninput,
  }: Props = $props();

  let show = $state(false);
  let id = Math.random().toString(36).slice(2, 8);
</script>

<div class="flex flex-col gap-[5px] mb-[14px]">
  {#if label}
    <label for={id} class="text-[11px] font-semibold">{label}</label>
  {/if}
  <div class="relative">
    <input
      {id}
      type={show ? 'text' : 'password'}
      {placeholder}
      {onkeydown}
      {oninput}
      bind:value
      class="w-full h-10 bg-[var(--bg)] border border-[var(--border)] rounded-md pl-3 pr-10 text-[13px] text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,.1)] focus:bg-[var(--panel)] placeholder:text-[var(--muted)] dark:bg-[#1c2128] dark:focus:bg-[var(--panel)]"
    />
    <button
      type="button"
      onclick={() => show = !show}
      tabindex="-1"
      class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text)] transition-colors p-0.5 bg-transparent border-none cursor-pointer"
    >
      <svg viewBox="0 0 24 24" class="w-[15px] h-[15px] stroke-current" style="stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none;">
        {#if show}
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
        {:else}
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        {/if}
      </svg>
    </button>
  </div>
</div>