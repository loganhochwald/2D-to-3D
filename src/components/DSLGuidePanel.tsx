import { Html, Text3D } from '@react-three/drei';
import { useState } from 'react';
import { RigidBody } from '@react-three/rapier'; // Import RigidBody

const DSLGuidePanel: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {!expanded && (
        <RigidBody type="dynamic" colliders="hull">
          <group
            onClick={() => setExpanded(true)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <Text3D height={0.2} size={0.8} font="public\Inter_Bold.json">
              ?
              <meshStandardMaterial color={hovered ? '#ffaaaa' : 'red'} />
            </Text3D>
          </group>
        </RigidBody>
      )}

      {expanded && (
        <Html position={[0, 2, -5]} center>
          <div
            className="p-4 bg-gray-800 text-white rounded-lg shadow-lg w-96 h-auto"
            style={{ cursor: 'grab' }}
          >
            <h2 className="text-lg font-bold">DSL Guide</h2>
            <p>Use the following syntax to create shapes:</p>
            <ul className="list-disc list-inside">
              <li>
                <code>cube(size=1, x=0, y=0, z=0)</code>
              </li>
              <li>
                <code>sphere(radius=0.5, color=red)</code>
              </li>
            </ul>
          </div>
        </Html>
      )}
    </>
  );
};

export default DSLGuidePanel;
