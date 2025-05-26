import type { Shape } from '../types';

export const parseDSL = (code: string): Shape[] => {
  const shapes = [];

  // Split input code into lines and filter out empty lines
  const lines = code.split('\n').filter(Boolean);

  for (const line of lines) {
    // Using regex to match word followed by parentheses (allow empty args)
    const match = line.match(/^(\w+)\(([^)]*)\)$/);
    if (!match) continue;

    // Extract shape type and arguments
    const type = match[1] as 'cube' | 'sphere';
    const argsStr = match[2];

    const args: { [key: string]: string | number } = {};

    // Only parse arguments if argsStr is not empty
    if (argsStr.trim() !== '') {
      argsStr.split(',').forEach((part) => {
        const [key, value] = part.split('=')?.map((s) => s.trim());
        // Assign if both key and value are present and value is not empty
        if (key && value !== undefined && value !== '') {
          args[key] = isNaN(Number(value)) ? value : parseFloat(value);
        }
      });
    }

    const position: [number, number, number] = [
      (args.x as number) ?? 0,
      (args.y as number) ?? 0,
      (args.z as number) ?? 0,
    ];

    shapes.push({
      id: crypto.randomUUID(),
      type,
      size: (args.size as number) ?? 1,
      radius: (args.radius as number) ?? 0.5,
      position,
      color: (args.color as string) ?? 'white',
    });
  }

  return shapes;
};
