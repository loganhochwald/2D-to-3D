import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SceneRenderer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This contains the mount point for the scene
    const mount = mountRef.current!;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Add basic cube for testing
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Clean up function to remove the renderer from the DOM
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="w-full h-full" ref={mountRef} />;
}
