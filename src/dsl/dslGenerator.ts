import type { Shape } from '../types';

// AVOIDING PUSHING THE DEFAULT VALUES
export const generateDSL = (shapes: Shape[]): string => {
  return shapes
    .map((shape) => {
      const args: string[] = [];

      // Position (x, y, z)
      const [x, y, z] = shape.position;
      if (x !== 0) args.push(`x=${x}`);
      if (y !== 0) args.push(`y=${y}`);
      if (z !== 0) args.push(`z=${z}`);

      // Type
      if (shape.type === 'cube') {
        if (shape.size !== 1) args.push(`size=${shape.size}`);
      } else if (shape.type === 'sphere') {
        if (shape.radius !== 0.5) args.push(`radius=${shape.radius}`);
      }

      // Color
      if (shape.color !== 'white') args.push(`color=${shape.color}`);

      return `${shape.type}(${args.join(', ')})`;
    })
    .join('\n');
};
