import type { Shape } from '../types';
import { hashToFloat } from '../utils/hashUtils'; // Import the updated helper function

export const generateDSL = (shapes: Shape[]): string => {
  return shapes
    .map((shape) => {
      const args: string[] = [];

      const defaultPosition: [number, number, number] = [
        hashToFloat(shape.id, 'x'),
        hashToFloat(shape.id, 'y'),
        hashToFloat(shape.id, 'z'),
      ];

      const [x, y, z] = shape.position;
      if (x !== defaultPosition[0]) args.push(`x=${x}`);
      if (y !== defaultPosition[1]) args.push(`y=${y}`);
      if (z !== defaultPosition[2]) args.push(`z=${z}`);

      if (shape.type === 'cube') {
        if (shape.size !== 1) args.push(`size=${shape.size}`);
      } else if (shape.type === 'sphere') {
        if (shape.radius !== 0.5) args.push(`radius=${shape.radius}`);
      }

      if (shape.color !== 'white') args.push(`color=${shape.color}`);

      return `${shape.type}(${args.join(', ')})`;
    })
    .join('\n');
};
