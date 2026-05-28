<script lang="ts">
  interface Props {
    label?: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    mono?: boolean;
    onkeydown?: (e: KeyboardEvent) => void;
    oninput?: (e: Event) => void;
    value?: string;
  }

  let {
    label,
    type = 'text',
    placeholder = '',
    mono = false,
    onkeydown,
    oninput,
    value = $bindable(''),
  }: Props = $props();

  let id = Math.random().toString(36).slice(2, 8);
</script>

<div class="flex flex-col gap-[5px] mb-[14px]">
  {#if label}
    <label for={id} class="text-[11px] font-semibold">{label}</label>
  {/if}
  <input
    {id}
    {type}
    {placeholder}
    {onkeydown}
    {oninput}
    bind:value
    class="w-full h-10 bg-[var(--bg)] border border-[var(--border)] rounded-md px-3 text-[13px] text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(59,130,246,.1)] focus:bg-[var(--panel)] placeholder:text-[var(--muted)] dark:bg-[#1c2128] dark:focus:bg-[var(--panel)]"
    class:font-mono={mono}
    class:text-xs={mono}
  />
</div>