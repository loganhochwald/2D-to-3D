export type Shape = {
  type: 'cube' | 'sphere';
  size: number;
  radius: number;
  position: [number, number, number];
};

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

    const args: { [key: string]: number } = {};

    // Only parse arguments if argsStr is not empty
    if (argsStr.trim() !== '') {
      argsStr.split(',').forEach((part) => {
        const [key, value] = part.split('=')?.map((s) => s.trim());
        // Assign if both key and value are present and value is not empty
        if (key && value !== undefined && value !== '') {
          args[key] = parseFloat(value);
        }
      });
    }

    const position: [number, number, number] = [
      args.x ?? 0,
      args.y ?? 0,
      args.z ?? 0,
    ];

    shapes.push({
      type,
      size: args.size,
      radius: args.radius,
      position,
    });
  }

  return shapes;
};
