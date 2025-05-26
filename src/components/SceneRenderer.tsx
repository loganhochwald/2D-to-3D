import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import ShapeMesh from './ShapeMesh';
import type { Shape } from '../types';
import EditingPanel from './EditingPanel';
import Editor from './Editor';

interface SceneRendererProps {
  shapes: Shape[];
  send: (event: any) => void;
  selectedShape: Shape | undefined;
  editorVisible: boolean;
  code: string;
  onCodeChange: (value: string) => void;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({
  shapes,
  send,
  selectedShape,
  editorVisible,
  code,
  onCodeChange,
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
          <div className="absolute top-4 right-4 w-[300px]">
            <EditingPanel shape={selectedShape} send={send} />
          </div>
        </Html>
      )}
      {editorVisible && (
        <Html fullscreen>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-5/6 sm:w-1/2 h-48">
            <Editor initialDoc={code} onChange={onCodeChange} />
          </div>
        </Html>
      )}
    </Canvas>
  );
};

export default SceneRenderer;
