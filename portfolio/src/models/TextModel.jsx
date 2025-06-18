import React, { useEffect } from "react";
import * as THREE from "three";
import typeFace from "../static/fonts/Akira.typeface.json";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";

function TextModel({ scene, loadingManager }) {
  useEffect(() => {
    if (!scene) return;

    const fontLoader = new FontLoader(loadingManager);
    const font = fontLoader.parse(typeFace);
    const textContent = "Ben Scott";

    const textGeometry = new TextGeometry(textContent, {
      font,
      size: 0.1,
      depth: 0.02,
      curveSegments: 12,
      bevelSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.0005,
    });
    textGeometry.center();
    textGeometry.setAttribute("uv2", new THREE.BufferAttribute(textGeometry.attributes.uv.array, 2));
    const textMaterial = new THREE.MeshStandardMaterial({ color: "silver", roughness: 0.2, metalness: 1 });

    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.set(0, 0, 0);
    textGeometry.computeBoundingBox();
    textGeometry.computeVertexNormals();
    textMaterial.transparent = true;
    // scene.add(text);
  }, [scene]);

  return null;
}

export default TextModel;
