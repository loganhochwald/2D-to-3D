import type { Shape } from '../types';
import { isValidColor } from '../utils/colorUtils';
import { hashToFloat } from '../utils/hashUtils'; // Import the updated helper function

export const parseDSL = (code: string): Shape[] => {
  const shapes = [];

  // Split input code into lines and filter out empty lines
  const lines = code.split('\n').filter(Boolean);

  for (const line of lines) {
    const match = line.match(/^(\w+)\(([^)]*)\)$/);
    if (!match) continue;

    const type = match[1] as 'cube' | 'sphere';
    const argsStr = match[2];

    const args: { [key: string]: string | number } = {};

    if (argsStr.trim() !== '') {
      argsStr.split(',').forEach((part) => {
        const [key, value] = part.split('=')?.map((s) => s.trim());
        if (key && value !== undefined && value !== '') {
          args[key] = isNaN(Number(value)) ? value : parseFloat(value);
        }
      });
    }

    const id: string = (shapes.length + 1).toString();

    const position: [number, number, number] = [
      (args.x as number) ?? hashToFloat(id, 'x'),
      (args.y as number) ?? hashToFloat(id, 'y'),
      (args.z as number) ?? hashToFloat(id, 'z'),
    ];

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
