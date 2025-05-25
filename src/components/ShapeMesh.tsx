import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import type { Shape } from '../types';

export default function ShapeMesh({ shape }: { shape: Shape }) {
  const meshRef = useRef<Mesh>(null!);

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

  return (
    <mesh ref={meshRef} position={shape.position}>
      {geometry}
      <meshNormalMaterial />
    </mesh>
  );
}
