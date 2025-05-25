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
    // Using regex to match word followed by parentheses
    const match = line.match(/^(\w+)\(([^)]+)\)$/);
    if (!match) continue;

    // Extract shape type and arguments
    const type = match[1] as 'cube' | 'sphere';
    const argsStr = match[2];

    const args: { [key: string]: number } = {};

    // Split arguments by comma and store them in an object
    // Example: "x=1, y=2, z=3" becomes { x: 1, y: 2, z: 3 }
    argsStr.split(',').forEach((part) => {
      const [key, value] = part.split('=')?.map((s) => s.trim());
      args[key] = parseFloat(value);
    });

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
