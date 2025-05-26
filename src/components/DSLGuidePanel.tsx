import { Text3D } from '@react-three/drei';
import { useState } from 'react';
import { RigidBody } from '@react-three/rapier';

interface DSLGuidePanelProps {
  send: (event: { type: 'TOGGLE_GUIDE' }) => void;
}

const DSLGuidePanel: React.FC<DSLGuidePanelProps> = ({ send }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <RigidBody type="dynamic" colliders="hull">
      <group
        position={[-2, 2, 0]}
        onClick={() => send({ type: 'TOGGLE_GUIDE' })}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Text3D height={0.2} size={0.8} font="public\Inter_Bold.json">
          ?
          <meshStandardMaterial color={hovered ? '#ffaaaa' : 'red'} />
        </Text3D>
      </group>
    </RigidBody>
  );
};

export default DSLGuidePanel;
