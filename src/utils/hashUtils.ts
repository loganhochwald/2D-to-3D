/**
 * Converts an id and coordinate suffix to a float in the range [-1.5, 1.5].
 * @param id The unique identifier for the shape.
 * @param suffix The coordinate suffix ('x', 'y', or 'z').
 * @returns A float value in the range [-1.5, 1.5].
 */
export const hashToFloat = (id: string, suffix: string): number => {
  let hash = 0;
  const str = id + suffix;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return ((hash % 1000) / 1000 - 0.5) * 3;
};
