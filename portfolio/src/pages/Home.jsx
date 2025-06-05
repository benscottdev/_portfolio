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
  const progressRef = useRef();
  const progressPercentRef = useRef();
  const [loading, setLoading] = useState(true);

  let scene;

  function setRepeatWrapping(texture, repeatX, repeatY) {
    texture.repeat.set(repeatX, repeatY);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }

  useEffect(() => {
    const gui = new GUI();

    const canvas = canvasRef.current;
    scene = new THREE.Scene();

    let sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.001, 1000);
    camera.updateProjectionMatrix();
    camera.position.set(0.05, 0.1, 8);
    scene.add(camera);

    // Renderers
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const loadingManager = new THREE.LoadingManager();

    // Runs on completion of all texture load
    loadingManager.onLoad = () => {
      const tl = gsap.timeline();

      tl.to(progressRef.current, {
        height: "100dvh",
        duration: 1,
        delay: 0.3,
      });

      tl.to(loaderRef.current, {
        duration: 0.5,
        autoAlpha: 0,
        ease: "power2.inOut",
        onComplete: () => {
          setLoading(false);
        },
      });
    };

    loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      const percentage = (itemsLoaded / itemsTotal) * 100;

      gsap.to(progressRef.current, {
        width: `${percentage}%`,
        duration: 0.3,
        ease: "power1.out",
      });

      gsap.to(progressPercentRef.current, {
        innerHTML: `${percentage.toFixed(1)}%`,
        duration: 0.3,
        snap: "innerHTML",
      });
    };
    /*
     * Textures
     */
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // SciFi Panel
    const hangarMetalColorTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_1K_albedo.jpg", (texture) => {
      setRepeatWrapping(texture);
    });
    const hangarMetalRoughnessTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_1K_roughness.jpg", (texture) => {
      setRepeatWrapping(texture, 4, 4);
    });
    const hangarMetalAOTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_1K_ao.jpg", (texture) => {
      setRepeatWrapping(texture, 4, 4);
    });
    const hangarMetalMetalnessTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_1K_metallic.jpg", (texture) => {
      setRepeatWrapping(texture, 4, 4);
    });
    const hangarMetalNormalTexture = textureLoader.load("/textures/TCom_Scifi_Panel/TCom_Scifi_Panel_1K_normal.jpg", (texture) => {
      setRepeatWrapping(texture, 4, 4);
    });

    hangarMetalColorTexture.colorSpace = THREE.SRGBColorSpace;
    hangarMetalColorTexture.encoding = THREE.sRGBEncoding;

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

    const text = new THREE.Mesh(textGeometry, hangarMetalColorTexture);
    text.position.set(0.2, 0, 5);
    text.castShadow = true;
    text.receiveShadow = true;
    textGeometry.computeBoundingBox();
    textGeometry.computeVertexNormals();
    // scene.add(text);

    /*
     * Geometries
     */

    // Light Switch
    // const lightSwitchBox = new THREE.BoxGeometry(0.09, 0.22, 0.1);
    // const glowingRed = new THREE.MeshStandardMaterial({ color: "red", emissive: "red", emissiveIntensity: 1 });
    // const lightSwitch = new THREE.Mesh(lightSwitchBox, glowingRed);
    // lightSwitch.position.set(-1.23, 0, 6.15);
    // scene.add(lightSwitch);

    // const raycaster = new THREE.Raycaster();
    // const pointer = new THREE.Vector2();

    // window.addEventListener("click", (event) => {
    //   // Convert screen coords to normalized device coords
    //   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //   raycaster.setFromCamera(pointer, camera);

    //   const intersects = raycaster.intersectObject(lightSwitch);
    //   if (intersects.length > 0) {
    //     glowingRed.color.set("lightgreen");
    //     glowingRed.emissive.set("lightgreen");
    //   }
    // });

    // ROOM
    const gltfLoader = new GLTFLoader(loadingManager);

    // gltfLoader.load("../src/static/SpaceShipLightSwitch.glb", (gltf) => {
    //   const lightSwitchCase = gltf.scene;
    //   scene.add(lightSwitchCase);
    // });

    gltfLoader.load("../src/static/SpaceShipLOWTEXTURE2.glb", (gltf) => {
      const roomModel = gltf.scene;
      scene.add(roomModel);

      roomModel.traverse((child) => {
        if (child.isMesh) {
          // Clone material if shared among objects
          child.material = child.material.clone();

          // Apply maps
          child.material.map = hangarMetalColorTexture;
          child.material.normalMap = hangarMetalNormalTexture;
          child.material.roughnessMap = hangarMetalRoughnessTexture;
          child.material.metalnessMap = hangarMetalMetalnessTexture;

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
    gltfLoader.load("../src/static/SpaceShipBollardsLOWTEXTURE.glb", (gltf) => {
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

          child.material.transparent = false;
          // Make sure the material updates
          child.material.needsUpdate = true;
        }
      });
    });

    // BlastDoor
    gltfLoader.load("../src/static/SpaceShipBlastDoorLOWTEXTURE.glb", (gltf) => {
      const blastDoorModel = gltf.scene;
      scene.add(blastDoorModel);

      blastDoorModel.traverse((child) => {
        if (child.isMesh) {
          // Clone material if shared among objects
          child.material = child.material.clone();
          child.material.side = THREE.DoubleSide;

          // Apply maps
          child.material.map = hangarMetalColorTexture;

          child.material.transparent = true;
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
    scene.fog = new THREE.FogExp2(0x262626, 0.12);

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 14, 100);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    pointLight.position.set(-0, 0.7, -3);
    pointLight.castShadow = false;
    // scene.add(pointLightHelper);

    const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 100);
    const pointLightHelper2 = new THREE.PointLightHelper(pointLight2);
    pointLight2.position.set(-0, 0.7, 4.75);
    pointLight2.castShadow = false;
    // scene.add(pointLightHelper2);

    const spotLight = new THREE.SpotLight(0xffffff, 50);
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
    gui.add(pointLight, "intensity", 0, 20).name("PointLight1_Intensity");
    gui.add(pointLight2, "intensity", 0, 20).name("PointLight2_Intensity");
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
      // Dispose text geometry & material
      textGeometry?.dispose();

      // Dispose all textures
      [hangarMetalColorTexture, hangarMetalRoughnessTexture, hangarMetalAOTexture, hangarMetalMetalnessTexture, hangarMetalNormalTexture].forEach((tex) => tex?.dispose());

      // Dispose all meshes and materials from scene
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m?.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });

      // Dispose renderer
      renderer.dispose();

      // Dispose OrbitControls
      controls.dispose();

      // Destroy GUI
      gui.destroy();

      // Remove event listeners
      // window.removeEventListener("mousemove", mouseMoveHandler);
      // window.removeEventListener("touchmove", touchMoveHandler);
      // window.removeEventListener("resize", resizeHandler);
      // homeBtn?.removeEventListener("click", homeClickHandler);

      // Cancel any animation frame
      cancelAnimationFrame(tick);
    };
  }, []);

  return (
    <>
      <Loader refs={{ loaderRef, progressRef, progressPercentRef }} />
      <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
        <canvas ref={canvasRef} className="webgl" />
        <WhatIDoPage />
      </div>
    </>
  );
}
export default Home;
