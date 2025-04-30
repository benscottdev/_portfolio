import React from "react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import typeFace from "../static/fonts/NohemiBold.typeface.json";
import WhoAmI from "./WhoIAm";

function BenScott() {
  const canvasRef = useRef();
  const whoAmIRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    // THREEJS
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const bounds = canvas.getBoundingClientRect();
    let sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 35 : 15, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 0, 12);
    scene.add(camera);

    /*
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load("/textures/4.png");
    matcapTexture.colorSpace = THREE.SRGBColorSpace;

    // Metal Look Texture
    const metalColorTexture = textureLoader.load("/textures/worn-metal4-bl/worn_metal4_diff.png");
    const metalAOTexture = textureLoader.load("/textures/worn-metal4-bl/worn_metal4_ao.png");
    const metalRoughnessTexture = textureLoader.load("/textures/worn-metal4-bl/worn_metal4_Roughness.png");
    const metalMetallicTexture = textureLoader.load("/textures/worn-metal4-bl/worn_metal4_Metallic.png");
    const metalDisplacementTexture = textureLoader.load("/textures/worn-metal4-bl/worn_metal4_Height.png");
    const metalNormalTexture = textureLoader.load("/textures/worn-metal4-bl/worn_metal4_Normal-ogl.png");

    metalColorTexture.colorSpace = THREE.SRGBColorSpace;

    const metalRepeatCount = 4;

    metalColorTexture.repeat.x = metalRepeatCount;
    metalColorTexture.repeat.y = metalRepeatCount;
    metalColorTexture.wrapS = THREE.RepeatWrapping;
    metalColorTexture.wrapT = THREE.RepeatWrapping;

    metalAOTexture.repeat.x = metalRepeatCount;
    metalAOTexture.repeat.y = metalRepeatCount;
    metalAOTexture.wrapS = THREE.RepeatWrapping;
    metalAOTexture.wrapT = THREE.RepeatWrapping;

    metalRoughnessTexture.repeat.x = metalRepeatCount;
    metalRoughnessTexture.repeat.y = metalRepeatCount;
    metalRoughnessTexture.wrapS = THREE.RepeatWrapping;
    metalRoughnessTexture.wrapT = THREE.RepeatWrapping;

    metalMetallicTexture.repeat.x = metalRepeatCount;
    metalMetallicTexture.repeat.y = metalRepeatCount;
    metalMetallicTexture.wrapS = THREE.RepeatWrapping;
    metalMetallicTexture.wrapT = THREE.RepeatWrapping;

    metalDisplacementTexture.repeat.x = metalRepeatCount;
    metalDisplacementTexture.repeat.y = metalRepeatCount;
    metalDisplacementTexture.wrapS = THREE.RepeatWrapping;
    metalDisplacementTexture.wrapT = THREE.RepeatWrapping;

    metalNormalTexture.repeat.x = metalRepeatCount;
    metalNormalTexture.repeat.y = metalRepeatCount;
    metalNormalTexture.wrapS = THREE.RepeatWrapping;
    metalNormalTexture.wrapT = THREE.RepeatWrapping;

    const metalTexture = new THREE.MeshStandardMaterial({
      color: "white",
      aoMap: metalAOTexture,
      roughness: 0.2,
      metalness: 0.99,
      normalMap: metalNormalTexture,
    });

    // Concrete Look Texture
    const concreteColorTexture = textureLoader.load("/textures/rough_plaster_brick_04_2k/rough_plaster_brick_04_diff_2k.jpg");
    const concreteARMTexture = textureLoader.load("/textures/rough_plaster_brick_04_2k/rough_plaster_brick_04_arm_2k.jpg");
    const concreteDisplacementTexture = textureLoader.load("/textures/rough_plaster_brick_04_2k/rough_plaster_brick_04_disp_2k.jpg");
    const concreteNormalTexture = textureLoader.load("/textures/rough_plaster_brick_04_2k/rough_plaster_brick_04_nor_gl_2k.jpg");

    concreteColorTexture.colorSpace = THREE.SRGBColorSpace;

    const repeatCount = 5.3;

    concreteColorTexture.repeat.x = repeatCount;
    concreteColorTexture.repeat.y = repeatCount;
    concreteColorTexture.wrapS = THREE.RepeatWrapping;
    concreteColorTexture.wrapT = THREE.RepeatWrapping;

    concreteARMTexture.repeat.x = repeatCount;
    concreteARMTexture.repeat.y = repeatCount;
    concreteARMTexture.wrapS = THREE.RepeatWrapping;
    concreteARMTexture.wrapT = THREE.RepeatWrapping;

    concreteDisplacementTexture.repeat.x = repeatCount;
    concreteDisplacementTexture.repeat.y = repeatCount;
    concreteDisplacementTexture.wrapS = THREE.RepeatWrapping;
    concreteDisplacementTexture.wrapT = THREE.RepeatWrapping;

    concreteNormalTexture.repeat.x = repeatCount;
    concreteNormalTexture.repeat.y = repeatCount;
    concreteNormalTexture.wrapS = THREE.RepeatWrapping;
    concreteNormalTexture.wrapT = THREE.RepeatWrapping;

    // Fonts
    const fontLoader = new FontLoader();
    const font = fontLoader.parse(typeFace);

    const textGeometry = new TextGeometry("BEN SCOTT", {
      font,
      size: 0.3,
      depth: 0.2,
      curveSegments: 24,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.002,
      bevelSegments: 12,
    });
    textGeometry.center();
    textGeometry.setAttribute("uv2", new THREE.BufferAttribute(textGeometry.attributes.uv.array, 2));

    const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

    const text = new THREE.Mesh(textGeometry, metalTexture);
    text.castShadow = true;
    text.receiveShadow = true;
    textGeometry.computeBoundingBox();
    textGeometry.computeVertexNormals();
    scene.add(text);

    /*
     * Geometries
     */

    // Plane Geometry
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalnessMap: concreteARMTexture,
      aoMap: concreteARMTexture,
      normalMap: concreteNormalTexture,
      displacementMap: concreteDisplacementTexture,
      displacementScale: 0.6,
    });

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.z = -0.5;
    planeMesh.position.x = 0.6;
    planeMesh.position.y = 2.8;
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    // Test Cube
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xff00ff }));
    cube.position.set(2, 5, 0);
    // scene.add(cube);
    cube.castShadow = true;

    /*
     * Scene Add-ons
     */

    // Lights

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.shadow.bias = 0.00004;

    dirLight.position.set(4, 4, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const pointLight = new THREE.PointLight(0xffffff, -1);
    pointLight.position.set(0, 0, 2);
    pointLight.castShadow = true;

    scene.add(dirLight, ambientLight);

    // Camera
    const cameraFocus = new THREE.Vector3();
    cameraFocus.copy(text.position);

    const lookAtTarget = {
      x: cameraFocus.x,
      y: cameraFocus.y,
      z: cameraFocus.z,
    };

    /*
     * Div Positioning
     */

    const whoAmIElement = whoAmIRef.current;
    const whoAmIObject = new CSS3DObject(whoAmIElement);
    whoAmIObject.position.copy(cube.position);
    whoAmIObject.scale.set(0.003, 0.003, 0.003);

    scene.add(whoAmIObject);

    const homeBtn = document.querySelector(".home");
    if (homeBtn) {
      homeBtn.addEventListener("click", () => {
        gsap.to(camera.position, {
          x: text.position.x,
          y: text.position.y,
          duration: 1,
          ease: "power2.inOut",
        });

        gsap.to(lookAtTarget, {
          x: text.position.x,
          y: text.position.y,
          z: text.position.z,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => {
            cameraFocus.set(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z);
          },
        });
      });
    }

    const whoIAmBtn = document.querySelector(".whoiam");
    if (whoIAmBtn) {
      whoIAmBtn.addEventListener("click", () => {
        gsap.to(camera.position, {
          x: cube.position.x,
          y: cube.position.y,
          duration: 1,
          ease: "power2.inOut",
        });

        gsap.to(lookAtTarget, {
          x: cube.position.x,
          y: cube.position.y,
          z: cube.position.z,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => {
            cameraFocus.set(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z);
          },
        });
      });
    }
    let targetX = 0;
    let targetY = 0;

    window.addEventListener("mousemove", (e) => {
      const relativeX = (e.clientX / window.innerWidth - 0.5) * 3;
      const relativeY = (e.clientY / window.innerHeight - 0.5) * 3;

      targetX = cameraFocus.x + relativeX * 1.45;
      targetY = cameraFocus.y - relativeY * 1.45;
    });

    // Renderers
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // CSS Renderer for DOM elements
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.domElement.classList.add("css3d");
    cssRenderer.setSize(sizes.width, sizes.height);
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.top = "0";
    containerRef.current.appendChild(cssRenderer.domElement); // containerRef is a wrapper div

    // Animation
    const tick = () => {
      const parallaxX = targetX;
      const parallaxY = targetY;
      camera.position.x += (parallaxX - camera.position.x) * 0.05;
      camera.position.y += (parallaxY - camera.position.y) * 0.05;

      camera.lookAt(cameraFocus);

      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);

      requestAnimationFrame(tick);
    };
    tick();

    const getCanvasSize = () => {
      const bounds = canvas.getBoundingClientRect();
      return {
        width: bounds.width,
        height: bounds.height,
      };
    };

    sizes = getCanvasSize();

    const handleResize = () => {
      sizes = getCanvasSize();

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      textGeometry.dispose();
      matcapMaterial.dispose();
      scene.remove(text);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} className="webgl" />
      <WhoAmI ref={whoAmIRef} />
    </div>
  );
}
export default BenScott;
