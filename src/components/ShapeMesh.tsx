import { useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Mesh } from 'three';
import { useCursor, Edges } from '@react-three/drei';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import type { Shape } from '../types';

interface ShapeMeshProps {
  shape: Shape;
  send: (event: any) => void;
  selectedShape: Shape | undefined;
}

export default function ShapeMesh({
  shape,
  send,
  selectedShape,
}: ShapeMeshProps) {
  const meshRef = useRef<Mesh>(null!);
  const rigidBody = useRef<RapierRigidBody>(null);
  const [hovered, setHovered] = useState(false);
  const applied = useRef(false);

  useCursor(hovered);

  useFrame(() => {
    if (rigidBody.current && !applied.current) {
      rigidBody.current.setAngvel(
        {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 2,
        },
        true,
      );
      applied.current = true;
    }
  });

  const isSelected = selectedShape === shape;

  const geometry =
    shape.type === 'cube' ? (
      <boxGeometry args={[shape.size ?? 1, shape.size ?? 1, shape.size ?? 1]} />
    ) : (
      <sphereGeometry args={[shape.radius ?? 0.5, 32, 32]} />
    );

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (isSelected) {
      send({ type: 'DESELECT_SHAPE' });
    } else {
      if (rigidBody.current) {
        const rigidBodyPosition = rigidBody.current.translation();
        shape.position = [
          rigidBodyPosition.x,
          rigidBodyPosition.y,
          rigidBodyPosition.z,
        ];
      }
      send({ type: 'SELECT_SHAPE', shape });
    }
  };

  return (
    <RigidBody type="dynamic" position={shape.position} ref={rigidBody}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => handleClick(event)}
      >
        {geometry}
        <meshStandardMaterial
          color={shape.color}
          emissive={shape.color}
          emissiveIntensity={1}
        />
        <Edges
          linewidth={hovered || isSelected ? 4 : 2}
          color={hovered || isSelected ? 'white' : 'black'}
        />
      </mesh>
    </RigidBody>
  );
}
