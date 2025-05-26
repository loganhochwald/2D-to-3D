import type { Shape } from '../types';

export function diffShapes(prev: Shape[], next: Shape[]): Shape[] {
  const prevMap = new Map(prev.map((shape) => [shape.id, shape]));
  const result: Shape[] = [];

  for (const shape of next) {
    const existing = prevMap.get(shape.id);
    if (!existing || JSON.stringify(existing) !== JSON.stringify(shape)) {
      result.push(shape);
    } else {
      result.push(existing);
    }
  }

  return result;
}
