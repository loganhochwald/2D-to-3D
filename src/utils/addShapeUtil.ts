import * as THREE from 'three';

export type Shape = {
  type: 'cube' | 'sphere';
  size?: number;
  radius?: number;
  position: [number, number, number];
};

export default function addShapesToScene(
  scene: THREE.Scene,
  shapes: Shape[],
  meshes: THREE.Mesh[],
) {
  // Remove and dispose old meshes
  meshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((mat) => mat.dispose());
    } else {
      mesh.material.dispose();
    }
  });
  meshes.length = 0;

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
    meshes.push(mesh);
  });
}
