import type { Datasource } from '$lib/types/datasource';

function createActiveDatasource() {
  let current = $state<Datasource | null>(null);
  
  return {
    get value() { return current; },
    set(value: Datasource | null) { current = value; },
  };
}

export const activeDatasource = createActiveDatasource();