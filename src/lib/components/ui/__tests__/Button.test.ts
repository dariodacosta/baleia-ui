// @vitest-environment jsdom
import { render } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Button from '../Button.svelte';

it('deve desabilitar o botão quando a prop disabled for true', () => {
  // Passamos as propriedades diretamente como o segundo argumento
  const { getByRole } = render(Button, { disabled: true });
  
  const button = getByRole('button') as HTMLButtonElement;
  
  expect(button.disabled).toBe(true);
});
