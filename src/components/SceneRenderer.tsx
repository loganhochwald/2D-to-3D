import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ShapeMesh from './ShapeMesh';
import type { Shape } from '../types';

interface SceneRendererProps {
  shapes: Shape[];
  send: (event: any) => void;
  selectedShape: Shape | undefined;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({
  shapes,
  send,
  selectedShape,
}) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight />
      <OrbitControls />
      {shapes.map((shape, i) => (
        <ShapeMesh
          key={i}
          shape={shape}
          send={send}
          selectedShape={selectedShape}
        />
      ))}
    </Canvas>
  );
};

export default SceneRenderer;
