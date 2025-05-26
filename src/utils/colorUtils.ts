/**
 * Validates if a given value is a valid color.
 * @param value - The color value to validate.
 * @returns True if the value is a valid color, false otherwise.
 */
export function isValidColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value) || /^[a-zA-Z]+$/.test(value);
}
