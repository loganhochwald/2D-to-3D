/**
 * Validates if a given value is a valid color.
 * @param value - The color value to validate.
 * @returns True if the value is a valid color, false otherwise.
 */
export function isValidColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value) || /^[a-zA-Z]+$/.test(value);
}

export function namedColorToHex(color: string): string {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return '#000000';
  ctx.fillStyle = color;
  const computed = ctx.fillStyle;

  if (computed.startsWith('rgb')) {
    const rgb = computed.match(/\d+/g);
    if (!rgb) return '#000000';
    return (
      '#' +
      rgb
        .slice(0, 3)
        .map((n) => ('0' + parseInt(n).toString(16)).slice(-2))
        .join('')
    );
  }

  return computed;
}
