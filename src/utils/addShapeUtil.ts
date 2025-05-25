import {
  Scene,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  MeshNormalMaterial,
} from 'three';

export type Shape = {
  type: 'cube' | 'sphere';
  size?: number;
  radius?: number;
  position: [number, number, number];
};

export default function addShapesToScene(
  scene: Scene,
  shapes: Shape[],
  meshes: Mesh[],
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
    let mesh: Mesh;
    if (shape.type === 'cube') {
      mesh = new Mesh(
        new BoxGeometry(shape.size ?? 1, shape.size ?? 1, shape.size ?? 1),
        new MeshNormalMaterial(),
      );
    } else if (shape.type === 'sphere') {
      mesh = new Mesh(
        new SphereGeometry(shape.radius ?? 0.5, 32, 32),
        new MeshNormalMaterial(),
      );
    } else {
      return;
    }
    mesh.position.set(...shape.position);
    scene.add(mesh);
    meshes.push(mesh);
  });
}
