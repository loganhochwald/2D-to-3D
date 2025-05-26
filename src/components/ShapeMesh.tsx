import { useRef, useMemo, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Mesh } from 'three';
import { useCursor, Outlines } from '@react-three/drei';
import type { Shape } from '../types';

interface ShapeMeshProps {
  shape: Shape;
  send: (event: any) => void;
}

export default function ShapeMesh({ shape, send }: ShapeMeshProps) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

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

  const geometry =
    shape.type === 'cube' ? (
      <boxGeometry args={[shape.size ?? 1, shape.size ?? 1, shape.size ?? 1]} />
    ) : (
      <sphereGeometry args={[shape.radius ?? 0.5, 32, 32]} />
    );

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setSelected((prev) => {
      const newSelected = !prev;
      if (newSelected) send({ type: 'SELECT_SHAPE', shape });
      else send({ type: 'DESELECT_SHAPE' });
      return newSelected;
    });
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
      <meshNormalMaterial />
      {(hovered || selected) && <Outlines thickness={4} color="white" />}
    </mesh>
  );
}
