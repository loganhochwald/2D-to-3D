import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ShapeMesh from './ShapeMesh';
import type { Shape } from '../types';

interface SceneRendererProps {
  shapes: Shape[];
  send: (event: any) => void;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({ shapes, send }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight />
      <OrbitControls />
      {shapes.map((shape, i) => (
        <ShapeMesh key={i} shape={shape} send={send} />
      ))}
    </Canvas>
  );
};

export default SceneRenderer;
