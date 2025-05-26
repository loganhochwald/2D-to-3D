import { Text3D, Edges, useCursor } from '@react-three/drei';
import { useState } from 'react';
import { RigidBody } from '@react-three/rapier';

interface DSLGuidePanelProps {
  send: (event: { type: 'TOGGLE_GUIDE' }) => void;
}

const DSLGuidePanel: React.FC<DSLGuidePanelProps> = ({ send }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <RigidBody
      type="dynamic"
      linearVelocity={[0.05, 0, 0]}
      linearDamping={0}
      angularDamping={0}
      canSleep={false}
    >
      <group
        position={[-2, 3, 0]}
        onClick={() => send({ type: 'TOGGLE_GUIDE' })}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Text3D height={0.1} size={0.4} font="/Inter_Bold.json">
          ?
          <meshStandardMaterial color={hovered ? '#ffaaaa' : 'red'} />
          <Edges scale={1.01} threshold={15} color="black" />
        </Text3D>
      </group>
    </RigidBody>
  );
};

export default DSLGuidePanel;
