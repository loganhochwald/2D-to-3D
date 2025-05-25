import * as THREE from 'three';

export type Shape = {
  type: 'cube' | 'sphere';
  size?: number;
  radius?: number;
  position: [number, number, number];
};

export function addShapesToScene(scene: THREE.Scene, shapes: Shape[]) {
  shapes.forEach((shape) => {
    let mesh: THREE.Mesh;

    if (shape.type === 'cube') {
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(
          shape.size ?? 1,
          shape.size ?? 1,
          shape.size ?? 1,
        ),
        new THREE.MeshNormalMaterial(),
      );
    } else if (shape.type === 'sphere') {
      mesh = new THREE.Mesh(
        new THREE.SphereGeometry(shape.radius ?? 0.5, 32, 32),
        new THREE.MeshNormalMaterial(),
      );
    } else {
      return;
    }

    mesh.position.set(...shape.position);
    scene.add(mesh);
  });
}
