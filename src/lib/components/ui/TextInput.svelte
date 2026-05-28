<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'value' | 'placeholder'> {
    label?: string;
    placeholder?: string | null;
    value?: string;
    error?: string;
    mono?: boolean;
  }

  let {
    label,
    placeholder = '',
    value = $bindable(''),
    error = '',
    mono = false,
    disabled = false,
    id = crypto.randomUUID(),
    class: customClass = '',
    type = 'text',
    ...restProps
  }: Props = $props();
</script>