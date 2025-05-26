import { useRef, useMemo, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Mesh } from 'three';
import { useCursor, Edges } from '@react-three/drei';
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
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const rotationSpeed = useMemo(
    () => ({
      x: (Math.random() - 0.5) * 0.01,
      y: (Math.random() - 0.5) * 0.01,
      z: (Math.random() - 0.5) * 0.01,
    }),
    [],
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x;
      meshRef.current.rotation.y += rotationSpeed.y;
      meshRef.current.rotation.z += rotationSpeed.z;
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
      send({ type: 'SELECT_SHAPE', shape });
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={shape.position}
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
  );
}
