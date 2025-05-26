import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import ShapeMesh from './ShapeMesh';
import type { Shape } from '../types';
import EditingPanel from './EditingPanel';

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
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      <Physics gravity={[0, 0, 0]}>
        {shapes.map((shape) => (
          <ShapeMesh
            key={shape.id}
            shape={shape}
            send={send}
            selectedShape={selectedShape}
          />
        ))}
      </Physics>
      {selectedShape && (
        <Html fullscreen>
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '300px',
              zIndex: 10,
            }}
          >
            <EditingPanel shape={selectedShape} send={send} />
          </div>
        </Html>
      )}
    </Canvas>
  );
};

export default SceneRenderer;
