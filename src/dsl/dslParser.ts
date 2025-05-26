import type { Shape } from '../types';
import { isValidColor } from '../utils/colorUtils'; // Import the helper function

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

    const id: string = (shapes.length + 1).toString();

    const position: [number, number, number] =
      id === '1'
        ? [0, 0, 0]
        : [
            (args.x as number) ?? (Math.random() - 0.5) * 3,
            (args.y as number) ?? (Math.random() - 0.5) * 3,
            (args.z as number) ?? (Math.random() - 0.5) * 3,
          ];

    // Validate color
    const color = (args.color as string) ?? 'white';
    const validatedColor = isValidColor(color) ? color : 'white';

    shapes.push({
      id: id,
      type,
      size: (args.size as number) ?? 1,
      radius: (args.radius as number) ?? 0.5,
      position,
      color: validatedColor,
    });
  }

  return shapes;
};
