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
import GUI from "lil-gui";

function Home() {
  const canvasRef = useRef();
  const containerRef = useRef();
  const loaderRef = useRef();
  const [loading, setLoading] = useState(true);

  let scene;

  function setRepeatWrapping(texture, repeatX, repeatY) {
    texture.repeat.set(repeatX, repeatY);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }

  useEffect(() => {
    const gui = new GUI();

    const canvas = canvasRef.current;
    scene = new THREE.Scene();

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

    setRepeatWrapping(metalColorTexture, 1, 1);
    setRepeatWrapping(metalAOTexture, 1, 1);
    setRepeatWrapping(metalRoughnessTexture, 1, 1);
    setRepeatWrapping(metalMetallicTexture, 1, 1);
    setRepeatWrapping(metalNormalTexture, 1, 1);
    setRepeatWrapping(metalDisplacementTexture, 1, 1);

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
    const hangarMetalNormalTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_4K_normal.jpg");

    hangarMetalColorTexture.colorSpace = THREE.SRGBColorSpace;

    setRepeatWrapping(hangarMetalColorTexture, 2, 2);
    setRepeatWrapping(hangarMetalRoughnessTexture, 2, 2);
    setRepeatWrapping(hangarMetalAOTexture, 2, 2);
    setRepeatWrapping(hangarMetalMetalnessTexture, 2, 2);
    setRepeatWrapping(hangarMetalNormalTexture, 2, 2);

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

    gltfLoader.load("../src/static/SpaceShip.glb", (gltf) => {
      const roomModel = gltf.scene;
      scene.add(roomModel);
      // roomModel.rotation.set(0, -1.55, 0);

      roomModel.traverse((child) => {
        if (child.isMesh) {
          // Clone material if shared among objects
          child.material = child.material.clone();

          // Apply maps
          child.material.map = hangarMetalColorTexture;
          child.material.normalMap = hangarMetalNormalTexture;
          child.material.roughnessMap = hangarMetalRoughnessTexture;
          child.material.metalnessMap = hangarMetalMetalnessTexture;

          const repeat = 4;

          setRepeatWrapping(child.material.map, 4, 4);
          setRepeatWrapping(child.material.normalMap, 4, 4);
          setRepeatWrapping(child.material.roughnessMap, 4, 4);
          setRepeatWrapping(child.material.metalnessMap, 4, 4);

          child.material.transparent = false;
          // Make sure the material updates
          child.material.needsUpdate = true;
        }
      });
    });

    // Monitor
    gltfLoader.load("../src/static/SpaceShipScreen.glb", (gltf) => {
      const spaceShipMonitor = gltf.scene;
      scene.add(spaceShipMonitor);
    });

    // Bollards
    gltfLoader.load("../src/static/SpaceShipBollards.glb", (gltf) => {
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

          setRepeatWrapping(child.material.map, 0.25, 0.25);
          setRepeatWrapping(child.material.normalMap, 0.25, 0.25);
          setRepeatWrapping(child.material.roughnessMap, 0.25, 0.25);
          setRepeatWrapping(child.material.metalnessMap, 0.25, 0.25);
          child.material.transparent = false;

          // Make sure the material updates
          child.material.needsUpdate = true;
        }
      });
    });

    // BlastDoor
    gltfLoader.load("../src/static/SpaceShipBlastDoor.glb", (gltf) => {
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

          setRepeatWrapping(child.material.map, 1, 1);
          setRepeatWrapping(child.material.normalMap, 1, 1);
          setRepeatWrapping(child.material.roughnessMap, 1, 1);
          setRepeatWrapping(child.material.metalnessMap, 1, 1);

          child.material.transparent = true;
          // child.material.depthWrite = true;
          // child.material.depthTest = true;
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

    // Fog
    scene.fog = new THREE.FogExp2(0x262626, 0.1);

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    pointLight.position.set(-0, 0.7, -3);
    pointLight.castShadow = false;
    // scene.add(pointLightHelper);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.75, 100);
    const pointLightHelper2 = new THREE.PointLightHelper(pointLight2);
    pointLight2.position.set(-0, 0.7, 3);
    pointLight2.castShadow = false;
    // scene.add(pointLightHelper2);

    const spotLight = new THREE.SpotLight(0xffffff, 18);
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.position.set(0, 0.8, 0);
    const spotLightTarget = new THREE.Object3D();
    spotLight.castShadow = false;
    spotLightTarget.position.set(0, -3, 0);
    scene.add(spotLightTarget);
    spotLight.target = spotLightTarget;

    // scene.add(spotLightHelper);
    spotLightHelper.update();
    // spotLight.penumbra = 0.5;
    spotLight.angle = Math.PI / 4;
    spotLight.distance = 1;

    const ambi = new THREE.AmbientLight(0xffffff, 0.5);

    scene.add(spotLight);
    // scene.add(ambi);
    scene.add(pointLight);
    scene.add(pointLight2);

    // LIGHTING GUI
    gui.add(pointLight, "intensity", 0, 10).name("PointLight1_Intensity");
    gui.add(pointLight2, "intensity", 0, 10).name("PointLight2_Intensity");
    gui.add(spotLight, "distance", 0, 10).name("SpotLight_Intensity");

    gui.add(pointLight.position, "z", -20, 20).name("PointLight1_ZPosition");
    gui.add(pointLight2.position, "z", -20, 20).name("PointLight2_ZPosition");
    gui.add(spotLight.position, "z", -20, 20).name("SpotLight_ZPosition");

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
