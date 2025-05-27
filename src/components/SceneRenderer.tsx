import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import ShapeMesh from './ShapeMesh';
import type { Shape } from '../types';
import EditingPanel from './EditingPanel';
import Editor from './Editor';
import CameraLookAt from './CameraLookAt';
import DSLGuidePanel from './DSLGuidePanel';
import DSLGuideContent from './DSLGuideContent';
interface SceneRendererProps {
  shapes: Shape[];
  send: (event: any) => void;
  selectedShape: Shape | undefined;
  editorVisible: boolean;
  code: string;
  onCodeChange: (value: string) => void;
  isGuideVisible: boolean;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({
  shapes,
  send,
  selectedShape,
  editorVisible,
  code,
  onCodeChange,
  isGuideVisible,
}) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight />
      <OrbitControls />
      <CameraLookAt
        targetPosition={selectedShape ? selectedShape.position : null}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      <Physics gravity={[0, 0, 0]} paused={!editorVisible}>
        {shapes.map((shape) => (
          <ShapeMesh
            key={shape.id}
            shape={shape}
            send={send}
            selectedShape={selectedShape}
          />
        ))}
        <DSLGuidePanel send={send} />
      </Physics>
      {selectedShape && (
        <Html fullscreen>
          <div className="absolute top-4 right-4 w-[280px]">
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
      {isGuideVisible && (
        <Html fullscreen>
          <div className="absolute top-4 left-4">
            <DSLGuideContent isGuideVisible={isGuideVisible} />
          </div>
        </Html>
      )}
    </Canvas>
  );
};

export default SceneRenderer;
