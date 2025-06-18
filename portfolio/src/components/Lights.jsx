import React, { useEffect } from "react";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import GUI from "lil-gui";

function Lights({ scene }) {
  useEffect(() => {
    if (!scene) return;

    const gui = new GUI();
    gui.close();

    scene.fog = new THREE.FogExp2(0x262626, 0.05);

    const pointLight = new THREE.PointLight(0xc5e2ff, 3.5, 100);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    pointLight.position.set(0, 0, -8);
    pointLightHelper.visible = false;

    const pointLight3 = new THREE.PointLight(0xffffff, 2.5, 100);
    const pointLightHelper3 = new THREE.PointLightHelper(pointLight3);
    pointLight3.position.set(0, -0.08, 2.4);

    pointLightHelper3.visible = false;

    scene.add(pointLight, pointLight3);
    // scene.add(pointLightHelper, pointLightHelper2, pointLightHelper3);

    const folder1 = gui.addFolder("Point Light 1");
    folder1.add(pointLightHelper, "visible", true, false);
    folder1.add(pointLight, "visible", true, false);
    folder1.add(pointLight, "intensity", 0, 20);
    folder1.add(pointLight.position, "x", -10, 10);
    folder1.add(pointLight.position, "y", -10, 10);
    folder1.add(pointLight.position, "z", -10, 10);

    const folder3 = gui.addFolder("Point Light 3");
    folder3.add(pointLightHelper3, "visible", true, false);
    folder3.add(pointLight3, "visible", true, false);
    folder3.add(pointLight3, "intensity", 0, 20);
    folder3.add(pointLight3.position, "x", -10, 10);
    folder3.add(pointLight3.position, "y", -10, 10);
    folder3.add(pointLight3.position, "z", -10, 10);

    return () => {
      pointLightHelper.dispose?.();
      pointLightHelper3.dispose?.();

      gui.destroy();
      scene.remove(pointLight, pointLight3, pointLightHelper, pointLightHelper3);
    };
  }, [scene]);

  return null;
}

export default Lights;
