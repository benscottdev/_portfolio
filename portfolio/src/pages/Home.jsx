import React from "react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import typeFace from "../static/fonts/Akira.typeface.json";
import WhatIDoPage from "../pages/WhatIDoPage";
import Loader from "../components/Loader";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function Home() {
  const canvasRef = useRef();
  const containerRef = useRef();
  const loaderRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    let sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const isMobile = window.innerWidth < 1000;
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.001, 1000);
    camera.updateProjectionMatrix();
    camera.position.set(0.05, -0.1, 8);
    scene.add(camera);

    const loadingManager = new THREE.LoadingManager();
    const progressBar = document.querySelector(".progressBar");
    const progressBarPercent = document.querySelector(".percentageLoaded");

    // Runs on completion of all texture load
    loadingManager.onLoad = () => {
      const tl = gsap.timeline();

      tl.to(progressBar, {
        height: "100dvh",
        duration: 1,
        delay: 1,
      });

      tl.to(loaderRef.current, {
        duration: 1,
        autoAlpha: 0,
        ease: "power2.inOut",
        onComplete: () => {
          setLoading(false);
        },
      });
    };

    loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      const percentage = (itemsLoaded / itemsTotal) * 100;

      gsap.to(progressBar, {
        width: `${percentage}%`,
        duration: 0.3,
        ease: "power1.out",
      });

      gsap.to(progressBarPercent, {
        innerHTML: `${percentage.toFixed(1)}%`,
        duration: 0.3,
        snap: "innerHTML",
      });
    };
    /*
     * Textures
     */
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // Metal Look Texture
    const metalColorTexture = textureLoader.load("/textures/Metal003_2K-JPG/Metal003_2K-JPG_Color.jpg");
    const metalAOTexture = textureLoader.load("/textures/Metal003_2K-JPG/worn_metal4_ao.png");
    const metalRoughnessTexture = textureLoader.load("/textures/Metal003_2K-JPG/Metal003_2K-JPG_Roughness.jpg");
    const metalMetallicTexture = textureLoader.load("/textures/Metal003_2K-JPG/Metal003_2K-JPG_Metalness.jpg");
    const metalDisplacementTexture = textureLoader.load("/textures/Metal003_2K-JPG/Metal003_2K-JPG_Displacement.jpg");
    const metalNormalTexture = textureLoader.load("/textures/Metal003_2K-JPG/Metal003_2K-JPG_NormalGL.jpg");

    metalColorTexture.colorSpace = THREE.SRGBColorSpace;

    const metalRepeatCount = 1;

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
      color: "grey",
      map: metalColorTexture,
      roughness: 0.2,
      metalness: 0.9,
      normalMap: metalNormalTexture,
    });

    // METAL SCI FI
    const hangarMetalColorTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_4K_albedo.jpg");
    const hangarMetalRoughnessTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_4K_roughness.jpg");
    const hangarMetalAOTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_4K_ao.jpg");
    const hangarMetalMetalnessTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_4K_metallic.jpg");
    const hangarMetalDisplacementTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_4K_height.jpg");
    const hangarMetalNormalTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_4K_normal.jpg");

    hangarMetalColorTexture.colorSpace = THREE.SRGBColorSpace;

    const repeatCount2 = 2;

    hangarMetalColorTexture.repeat.x = repeatCount2;
    hangarMetalColorTexture.repeat.y = repeatCount2;
    hangarMetalColorTexture.wrapS = THREE.RepeatWrapping;
    hangarMetalColorTexture.wrapT = THREE.RepeatWrapping;

    hangarMetalRoughnessTexture.repeat.x = repeatCount2;
    hangarMetalRoughnessTexture.repeat.y = repeatCount2;
    hangarMetalRoughnessTexture.wrapS = THREE.RepeatWrapping;
    hangarMetalRoughnessTexture.wrapT = THREE.RepeatWrapping;

    hangarMetalAOTexture.repeat.x = repeatCount2;
    hangarMetalAOTexture.repeat.y = repeatCount2;
    hangarMetalAOTexture.wrapS = THREE.RepeatWrapping;
    hangarMetalAOTexture.wrapT = THREE.RepeatWrapping;

    hangarMetalMetalnessTexture.repeat.x = repeatCount2;
    hangarMetalMetalnessTexture.repeat.y = repeatCount2;
    hangarMetalMetalnessTexture.wrapS = THREE.RepeatWrapping;
    hangarMetalMetalnessTexture.wrapT = THREE.RepeatWrapping;

    hangarMetalDisplacementTexture.repeat.x = repeatCount2;
    hangarMetalDisplacementTexture.repeat.y = repeatCount2;
    hangarMetalDisplacementTexture.wrapS = THREE.RepeatWrapping;
    hangarMetalDisplacementTexture.wrapT = THREE.RepeatWrapping;

    hangarMetalNormalTexture.repeat.x = repeatCount2;
    hangarMetalNormalTexture.repeat.y = repeatCount2;
    hangarMetalNormalTexture.wrapS = THREE.RepeatWrapping;
    hangarMetalNormalTexture.wrapT = THREE.RepeatWrapping;

    // Fonts
    const fontLoader = new FontLoader();
    const font = fontLoader.parse(typeFace);
    const textContent = "Ben scott";

    const textGeometry = new TextGeometry(textContent, {
      font,
      size: 0.2,
      depth: 0.1,
      curveSegments: 12,
      bevelSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.005,
    });
    textGeometry.center();
    textGeometry.setAttribute("uv2", new THREE.BufferAttribute(textGeometry.attributes.uv.array, 2));

    const text = new THREE.Mesh(textGeometry, metalTexture);
    text.position.set(-0.3, 0, 4);
    text.castShadow = true;
    text.receiveShadow = true;
    textGeometry.computeBoundingBox();
    textGeometry.computeVertexNormals();
    // scene.add(text);

    const subText = new TextGeometry("web developer", {
      font,
      size: window.innerWidth < 1500 ? 0.05 : 0.07,
      depth: 0.1,
      curveSegments: 6,
      bevelSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.005,
    });
    subText.center();
    subText.setAttribute("uv2", new THREE.BufferAttribute(subText.attributes.uv.array, 2));

    const text2 = new THREE.Mesh(subText, metalTexture);
    text2.position.y = -0.225;
    text2.position.x = -1.02;
    text2.castShadow = true;
    text2.receiveShadow = true;
    subText.computeBoundingBox();
    subText.computeVertexNormals();
    // scene.add(text2);

    /*
     * Geometries
     */

    // ROOM

    const gltfLoader = new GLTFLoader();

    gltfLoader.load("../src/static/SpaceShip11.glb", (gltf) => {
      const roomModel = gltf.scene;
      scene.add(roomModel);
      // roomModel.rotation.set(0, -1.55, 0);

      roomModel.traverse((child) => {
        if (child.isMesh) {
          // Clone material if shared among objects
          child.material = child.material.clone();
          child.material.side = THREE.DoubleSide;

          // Apply maps
          child.material.map = hangarMetalColorTexture;
          child.material.normalMap = hangarMetalNormalTexture;
          child.material.roughnessMap = hangarMetalRoughnessTexture;
          child.material.metalnessMap = hangarMetalMetalnessTexture;
          // child.material.roughness = 0.1;
          // child.material.metalness = 0.9;
          const repeat = 1;

          child.material.map.wrapS = THREE.RepeatWrapping;
          child.material.map.wrapT = THREE.RepeatWrapping;
          child.material.map.repeat.set(repeat, repeat);

          child.material.normalMap.wrapS = THREE.RepeatWrapping;
          child.material.normalMap.wrapT = THREE.RepeatWrapping;
          child.material.normalMap.repeat.set(repeat, repeat);

          child.material.roughnessMap.wrapS = THREE.RepeatWrapping;
          child.material.roughnessMap.wrapT = THREE.RepeatWrapping;
          child.material.roughnessMap.repeat.set(repeat, repeat);

          child.material.metalnessMap.wrapS = THREE.RepeatWrapping;
          child.material.metalnessMap.wrapT = THREE.RepeatWrapping;
          child.material.metalnessMap.repeat.set(repeat, repeat);

          child.material.transparent = false;
          child.material.depthWrite = true;
          child.material.depthTest = true;
          // Make sure the material updates
          child.material.needsUpdate = true;
        }
      });
    });

    // Monitor
    gltfLoader.load("../src/static/SpaceShipScreen1.glb", (gltf) => {
      const spaceShipMonitor = gltf.scene;
      scene.add(spaceShipMonitor);
    });

    // Bollards
    gltfLoader.load("../src/static/SpaceShipBollards1.glb", (gltf) => {
      const spaceShipBollards = gltf.scene;
      scene.add(spaceShipBollards);

      spaceShipBollards.traverse((child) => {
        if (child.isMesh) {
          // Clone material if shared among objects
          child.material = child.material.clone();
          child.material.side = THREE.DoubleSide;

          // Apply maps
          child.material.map = hangarMetalColorTexture;
          child.material.normalMap = hangarMetalNormalTexture;
          child.material.roughnessMap = hangarMetalRoughnessTexture;
          child.material.metalnessMap = hangarMetalMetalnessTexture;
          const repeat = 1;

          child.material.map.wrapS = THREE.RepeatWrapping;
          child.material.map.wrapT = THREE.RepeatWrapping;
          child.material.map.repeat.set(repeat, repeat);

          child.material.normalMap.wrapS = THREE.RepeatWrapping;
          child.material.normalMap.wrapT = THREE.RepeatWrapping;
          child.material.normalMap.repeat.set(repeat, repeat);

          child.material.roughnessMap.wrapS = THREE.RepeatWrapping;
          child.material.roughnessMap.wrapT = THREE.RepeatWrapping;
          child.material.roughnessMap.repeat.set(repeat, repeat);

          child.material.metalnessMap.wrapS = THREE.RepeatWrapping;
          child.material.metalnessMap.wrapT = THREE.RepeatWrapping;
          child.material.metalnessMap.repeat.set(repeat, repeat);

          child.material.transparent = false;
          child.material.depthWrite = true;
          child.material.depthTest = true;
          // Make sure the material updates
          child.material.needsUpdate = true;
        }
      });
    });

    // BlastDoor
    gltfLoader.load("../src/static/SpaceShipBlastDoor1.glb", (gltf) => {
      const blastDoorModel = gltf.scene;
      scene.add(blastDoorModel);

      blastDoorModel.traverse((child) => {
        if (child.isMesh) {
          // Clone material if shared among objects
          child.material = child.material.clone();
          child.material.side = THREE.DoubleSide;

          // Apply maps
          child.material.map = hangarMetalColorTexture;
          child.material.normalMap = hangarMetalNormalTexture;
          child.material.roughnessMap = hangarMetalRoughnessTexture;
          child.material.metalnessMap = hangarMetalMetalnessTexture;
          const repeat = 1;

          child.material.map.wrapS = THREE.RepeatWrapping;
          child.material.map.wrapT = THREE.RepeatWrapping;
          child.material.map.repeat.set(repeat, repeat);

          child.material.normalMap.wrapS = THREE.RepeatWrapping;
          child.material.normalMap.wrapT = THREE.RepeatWrapping;
          child.material.normalMap.repeat.set(repeat, repeat);

          child.material.roughnessMap.wrapS = THREE.RepeatWrapping;
          child.material.roughnessMap.wrapT = THREE.RepeatWrapping;
          child.material.roughnessMap.repeat.set(repeat, repeat);

          child.material.metalnessMap.wrapS = THREE.RepeatWrapping;
          child.material.metalnessMap.wrapT = THREE.RepeatWrapping;
          child.material.metalnessMap.repeat.set(repeat, repeat);

          child.material.transparent = false;
          child.material.depthWrite = true;
          child.material.depthTest = true;
          // Make sure the material updates
          child.material.needsUpdate = true;
        }
      });
    });

    // Emissive Lights
    const lightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1 });
    const lightGeom = new THREE.BoxGeometry(0.4, 0.1, 2);
    const lightOneMesh = new THREE.Mesh(lightGeom, lightMaterial);
    const lightTwoMesh = new THREE.Mesh(lightGeom, lightMaterial);

    lightOneMesh.position.set(0, 0.76, 3);
    lightOneMesh.rotation.y = Math.PI * 0.5;
    scene.add(lightOneMesh);

    lightTwoMesh.position.set(0, 0.76, -3);
    lightTwoMesh.rotation.y = Math.PI * 0.5;
    scene.add(lightTwoMesh);

    /*
     * Scene Add-ons
     */

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    pointLight.position.set(-0, 0.7, -3);
    pointLight.castShadow = true;
    // scene.add(pointLightHelper);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
    const pointLightHelper2 = new THREE.PointLightHelper(pointLight2);
    pointLight2.position.set(-0, 0.7, 3);
    pointLight2.castShadow = true;
    // scene.add(pointLightHelper2);

    const pointLight3 = new THREE.PointLight(0xffffff, 0.5, 100);
    const pointLightHelper3 = new THREE.PointLightHelper(pointLight3);
    pointLight3.position.set(-0, 0.5, 5);
    pointLight3.castShadow = true;
    // scene.add(pointLightHelper3);

    const redDirectionalLight = new THREE.DirectionalLight(0xff0000, 0.3);
    redDirectionalLight.position.set(1.75, 0, 6);
    // redDirectionalLight.target = pointLight2;
    const redDirectionalLightHelper = new THREE.DirectionalLightHelper(redDirectionalLight);
    // scene.add(redDirectionalLightHelper);

    const ambi = new THREE.AmbientLight(0xffffff, 0);

    scene.add(ambi);
    scene.add(pointLight);
    scene.add(pointLight2);
    scene.add(pointLight3);
    // scene.add(redDirectionalLight);

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

    // Home
    const homeBtn = document.querySelector(".home");
    if (homeBtn) {
      homeBtn.addEventListener("click", () => {
        const tl = gsap.timeline();
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
            targetX = lookAtTarget.x;
            targetY = lookAtTarget.y;
          },
        });
      });
    }

    // Mouse Move Parallax
    let targetX = 0;
    let targetY = 0;

    let mouseMoveScheduled = false;
    window.addEventListener("mousemove", (e) => {
      if (!mouseMoveScheduled) {
        mouseMoveScheduled = true;
        requestAnimationFrame(() => {
          const relativeX = (e.clientX / window.innerWidth - 0.5) * 4;
          const relativeY = (e.clientY / window.innerHeight - 0.5) * 4;

          targetX = cameraFocus.x + relativeX * 0.95;
          targetY = cameraFocus.y - relativeY * 0.95;

          mouseMoveScheduled = false;
        });
      }
    });

    window.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const relativeX = (touch.clientX / window.innerWidth - 0.5) * 4;
        const relativeY = (touch.clientY / window.innerHeight - 0.5) * 4;

        targetX = cameraFocus.x + relativeX * 3.45;
        targetY = cameraFocus.y - relativeY * 3.45;
      }
    });

    // Renderers
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, precision: "highp" });
    renderer.setSize(sizes.width, sizes.height);
    const cappedPixelRatio = window.innerWidth > 2500 ? 1 : Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(cappedPixelRatio);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // Resize
    const getCanvasSize = () => {
      const bounds = canvas.getBoundingClientRect();
      return {
        width: bounds.width,
        height: bounds.height,
      };
    };
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    sizes = getCanvasSize();

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 1.0;

    // Animation
    const tick = () => {
      const parallaxX = targetX;
      const parallaxY = targetY;
      // camera.position.x += (parallaxX - camera.position.x) * 0.05;
      // camera.position.y += (parallaxY - camera.position.y) * 0.05;
      controls.update();

      // camera.lookAt(cameraFocus);
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      // window.removeEventListener("resize", handleResize);

      renderer.dispose();
      textGeometry.dispose();
      scene.remove(text);
    };
  }, []);

  return (
    <>
      <Loader ref={loaderRef} />

      <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
        <canvas ref={canvasRef} className="webgl" />
        <WhatIDoPage />
      </div>
    </>
  );
}
export default Home;
