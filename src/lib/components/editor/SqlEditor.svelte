<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { EditorView, basicSetup } from 'codemirror';
  import { sql, type SQLDialect } from '@codemirror/lang-sql'; // Adicionamos o tipo aqui
  import { oneDark } from '@codemirror/theme-one-dark';
  import type { ViewUpdate } from '@codemirror/view';

  interface Props {
    value: string;
    // Trocamos o tipo aqui para aceitar o que o CodeMirror espera
    dialect?: 'postgresql' | 'mysql' | 'sql'; 
    readonly?: boolean;
    onChange?: (val: string) => void;
  }

  let { value = $bindable(), dialect = 'postgresql', readonly = false, onChange }: Props = $props();
  let editorRef: HTMLDivElement;
  let view: EditorView;

  onMount(() => {
    view = new EditorView({
      doc: value,
      extensions: [
        basicSetup,
        // Fazemos o cast aqui para 'any' para evitar o erro de tipagem
        sql({ dialect: dialect as any }), 
        oneDark,
        EditorView.editable.of(!readonly),
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged && !readonly) {
            const newValue = view.state.doc.toString();
            value = newValue;
            onChange?.(newValue);
          }
        })
      ],
      parent: editorRef
    });
  });
  $effect(() => {
    if (view && value !== view.state.doc.toString()) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
    }
  });

  onDestroy(() => view?.destroy());

  export function format() {
    import('sql-formatter').then(({ format }) => {
      const formatted = format(view.state.doc.toString(), { language: dialect as any });
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: formatted } });
    });
  }
</script>

<div bind:this={editorRef} class="h-full w-full font-mono text-sm overflow-hidden"></div>