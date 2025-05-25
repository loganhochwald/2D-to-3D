import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { color, oneDark } from '@codemirror/theme-one-dark';
import { dslLinter } from '../dsl/linter';

type EditorProps = {
  initialDoc?: string;
  onChange?: (value: string) => void;
};

export default function Editor({ initialDoc = '', onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        basicSetup,
        oneDark,
        dslLinter,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const doc = update.state.doc.toString();
            onChange?.(doc);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div
      className="w-full h-full text-xl rounded-xl overflow-y-auto"
      ref={editorRef}
      style={{
        backgroundColor: color.background,
      }}
    />
  );
}
