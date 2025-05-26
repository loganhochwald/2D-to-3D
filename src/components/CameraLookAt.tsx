import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const CameraLookAt: React.FC<{
  targetPosition: [number, number, number] | null;
}> = ({ targetPosition }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (targetPosition) {
      const target = new Vector3(...targetPosition);
      const offset = new Vector3(0, 0, 5);
      camera.position.copy(target).add(offset);
      camera.lookAt(target);
    }
  });

  return null;
};

export default CameraLookAt;