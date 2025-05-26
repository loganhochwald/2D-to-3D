export type Shape = {
  type: 'cube' | 'sphere';
  size?: number;
  radius?: number;
  position: [number, number, number];
  color: string;
};
