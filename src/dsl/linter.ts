import { type Diagnostic, linter } from '@codemirror/lint';
import { isValidColor } from '../utils/colorUtils';

const knownShapes = ['cube', 'sphere'];

export const dslLinter = linter((view) => {
  const diagnostics: Diagnostic[] = [];
  const lines = view.state.doc.toString().split('\n');
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Missing parentheses
    if (!trimmed.includes('(') || !trimmed.endsWith(')')) {
      diagnostics.push({
        from: view.state.doc.line(i + 1).from,
        to: view.state.doc.line(i + 1).to,
        severity: 'error',
        message: 'Missing parentheses. Example: shape(args)',
      });
      return;
    }

    // Invalid syntax
    const match = /^(\w+)\(([^)]*)\)$/.exec(trimmed);
    if (!match) {
      diagnostics.push({
        from: view.state.doc.line(i + 1).from,
        to: view.state.doc.line(i + 1).to,
        severity: 'error',
        message: 'Invalid syntax. Expected: shape(args)',
      });
      return;
    }

    const [_, shape, args] = match;

    // Unknown shape
    if (!knownShapes.includes(shape)) {
      diagnostics.push({
        from: view.state.doc.line(i + 1).from,
        to: view.state.doc.line(i + 1).from + shape.length,
        severity: 'error',
        message: `Unknown shape "${shape}".`,
      });
    }

    // Check each argument for property=value format
    if (args.trim()) {
      const argList = args.split(',').map((arg) => arg.trim());
      argList.forEach((arg) => {
        if (!arg.includes('=')) {
          diagnostics.push({
            from: view.state.doc.line(i + 1).from + trimmed.indexOf(arg),
            to:
              view.state.doc.line(i + 1).from +
              trimmed.indexOf(arg) +
              arg.length,
            severity: 'error',
            message: `Argument "${arg}" must be in the form name=number.`,
          });
          return;
        }
        const [name, value] = arg.split('=').map((s) => s.trim());
        if (name === 'color') {
          if (!isValidColor(value)) {
            diagnostics.push({
              from:
                view.state.doc.line(i + 1).from +
                trimmed.indexOf(arg) +
                arg.indexOf('=') +
                1,
              to:
                view.state.doc.line(i + 1).from +
                trimmed.indexOf(arg) +
                arg.length,
              severity: 'error',
              message: `Value for "color" must be a valid color (e.g., #RRGGBB or a color name).`,
            });
          }
        } else if (!/^-?\d+(\.\d+)?$/.test(value)) {
          diagnostics.push({
            from:
              view.state.doc.line(i + 1).from +
              trimmed.indexOf(arg) +
              arg.indexOf('=') +
              1,
            to:
              view.state.doc.line(i + 1).from +
              trimmed.indexOf(arg) +
              arg.length,
            severity: 'error',
            message: `Value for "${name}" must be a number.`,
          });
        }
      });
    }
  });
  return diagnostics;
});
