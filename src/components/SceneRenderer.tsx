import { useEffect, useRef } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import addShapesToScene from '../utils/addShapeUtil';
import type { Shape } from '../utils/addShapeUtil';

export default function SceneRenderer({ shapes = [] }: { shapes: Shape[] }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const meshesRef = useRef<Mesh[]>([]);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const renderer = new WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.forceContextLoss();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      addShapesToScene(sceneRef.current, shapes, meshesRef.current);
    }
  }, [shapes]);

  return <div className="w-full h-full" ref={mountRef} />;
}
