import { type Diagnostic, linter } from '@codemirror/lint';

export const dslLinter = linter((view) => {
  const diagnostics: Diagnostic[] = [];
  const lines = view.state.doc.toString().split('\n');
  lines.forEach((line, i) => {
    if (!line.trim()) return;
    if (!/^(\w+)\(([^)]*)\)$/.test(line.trim())) {
      diagnostics.push({
        from: view.state.doc.line(i + 1).from,
        to: view.state.doc.line(i + 1).to,
        severity: 'error',
        message: 'Invalid DSL syntax',
      });
    }
  });
  return diagnostics;
});
