import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { addShapesToScene } from '../utils/addShapeUtil';
import type { Shape } from '../utils/addShapeUtil';

export default function Scene({ shapes = [] }: { shapes: Shape[] }) {
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

    const controls = new OrbitControls(camera, renderer.domElement);

    addShapesToScene(scene, shapes);

    camera.position.z = 5;

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Clean up function to remove the renderer from the DOM
    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [shapes]);

  return <div className="w-full h-full" ref={mountRef} />;
}
