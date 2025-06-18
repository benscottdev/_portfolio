import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

function SpaceShipModel({ scene, loadingManager }) {
  useEffect(() => {
    if (!scene) return;

    const gltfLoader = new GLTFLoader(loadingManager);
    let roomModel = null;
    gltfLoader.load("../src/static/NEWSHIP.glb", (gltf) => {
      roomModel = gltf.scene;
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0);
      roomModel.quaternion.copy(quaternion);

      scene.add(roomModel);

      roomModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
          child.material.encoding = THREE.sRGBEncoding;
        }
      });

      return () => {
        if (roomModel) {
          scene.remove(roomModel);
          roomModel.traverse((child) => {
            if (child.isMesh) {
              child.geometry?.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach((m) => m?.dispose());
              } else {
                child.material?.dispose();
              }
            }
          });
        }
      };
    });
  }, [scene]);

  return null;
}

export default SpaceShipModel;
