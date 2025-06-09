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
import { RGBELoader } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import HeadsUpDisplay from "../components/HeadsUpDisplay";

function Home() {
  const canvasRef = useRef();
  const containerRef = useRef();
  const loaderRef = useRef();
  const progressRef = useRef();
  const progressPercentRef = useRef();
  const instructionRef = useRef();
  const [loading, setLoading] = useState(true);
  // Camera Movement Logic Position

  let scene;

  function setRepeatWrapping(texture, repeatX, repeatY) {
    texture.repeat.set(repeatX, repeatY);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
  }

  useEffect(() => {
    const gui = new GUI();

    const canvas = canvasRef.current;
    scene = new THREE.Scene();

    let sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const isMobile = window.innerWidth < 800;

    const camera = new THREE.PerspectiveCamera(isMobile ? 60 : 50, sizes.width / sizes.height, 0.01, 1000);
    camera.updateProjectionMatrix();
    // scene.add(camera);
    const cameraGroup = new THREE.Group();
    cameraGroup.add(camera);

    const focusDistance = 3;
    const cameraWorldDir = new THREE.Vector3();
    camera.getWorldDirection(cameraWorldDir);

    const focusPoint = camera.position.clone().add(cameraWorldDir.multiplyScalar(focusDistance));
    scene.add(cameraGroup);
    cameraGroup.position.set(0, 0.2, 11);

    // Renderers
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.physicallyCorrectLights = true;
    renderer.frustumCulled = true;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap it

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const loadingManager = new THREE.LoadingManager();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const hdriLoader = new RGBELoader();
    hdriLoader.load("/HDR_blue_nebulae-1.hdr", function (texture) {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      texture.dispose();
      scene.environment = envMap;
      scene.background = envMap;
    });

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
    const repeat = 4;
    // SciFi Panel
    const hangarMetalColorTexture = textureLoader.load("/textures/TCom_Scifi_Panel1/TCom_Scifi_Panel_4K_albedo.jpg", (texture) => {
      setRepeatWrapping(texture, repeat, repeat);
    });
    const hangarMetalRoughnessTexture = textureLoader.load("/textures/TCom_Scifi_Panel1/TCom_Scifi_Panel_4K_roughness.jpg", (texture) => {
      setRepeatWrapping(texture, repeat, repeat);
    });
    const hangarMetalAOTexture = textureLoader.load("/textures/TCom_Scifi_Panel1/TCom_Scifi_Panel_4K_ao.jpg", (texture) => {
      setRepeatWrapping(texture, repeat, repeat);
    });
    const hangarMetalMetalnessTexture = textureLoader.load("/textures/TCom_Scifi_Panel1/TCom_Scifi_Panel_4K_metallic.jpg", (texture) => {
      setRepeatWrapping(texture, repeat, repeat);
    });
    const hangarMetalNormalTexture = textureLoader.load("/textures/TCom_Scifi_Panel1/TCom_Scifi_Panel_4K_normal.png", (texture) => {
      setRepeatWrapping(texture, repeat, repeat);
    });

    hangarMetalColorTexture.colorSpace = THREE.SRGBColorSpace;
    hangarMetalColorTexture.encoding = THREE.sRGBEncoding;

    const hangarMaterial = new THREE.MeshStandardMaterial({
      map: hangarMetalColorTexture,
      roughnessMap: hangarMetalRoughnessTexture,
      metalnessMap: hangarMetalMetalnessTexture,
      aoMap: hangarMetalAOTexture,
      normalMap: hangarMetalNormalTexture,
    });

    // Font
    const textGroup = new THREE.Group();
    const fontLoader = new FontLoader();
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
    const textMaterial = new THREE.MeshStandardMaterial({ color: "grey", roughness: 0.2, metalness: 1 });

    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.set(0, 0, 8);
    textGeometry.computeBoundingBox();
    textGeometry.computeVertexNormals();
    textGroup.add(text);
    textMaterial.transparent = true;

    const subTextGeometry = new TextGeometry("Web Developer", {
      font,
      size: 0.03,
      depth: 0.02,
      curveSegments: 12,
      bevelSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.0005,
    });
    subTextGeometry.center();
    subTextGeometry.setAttribute("uv2", new THREE.BufferAttribute(textGeometry.attributes.uv.array, 2));

    const subText = new THREE.Mesh(subTextGeometry, textMaterial);
    subText.position.set(0, -0.08, 8);
    subTextGeometry.computeBoundingBox();
    subTextGeometry.computeVertexNormals();
    textGroup.add(subText);

    scene.add(textGroup);

    /*
     * Geometries
     */

    // ROOM
    const gltfLoader = new GLTFLoader(loadingManager);

    gltfLoader.load("../src/static/SpaceShip.glb", (gltf) => {
      const roomModel = gltf.scene;
      scene.add(roomModel);

      roomModel.traverse((child) => {
        if (child.isMesh) {
          // Apply maps
          child.material.map = hangarMaterial.map;
          child.material.roughnessMap = hangarMaterial.roughnessMap;
          child.material.metalnessMap = hangarMaterial.metalnessMap;
          child.material.normalMap = hangarMaterial.normalMap;
          child.material.aoMap = hangarMaterial.aoMap;
          child.material.side = THREE.DoubleSide;
          child.material.transparent = false;
          // Make sure the material updates
          child.material.needsUpdate = true;
        }
      });
    });

    // Pipes
    gltfLoader.load("../src/static/SpaceShipPipes1.glb", (gltf) => {
      const spaceShipPipes = gltf.scene;

      spaceShipPipes.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set("orangered");
          child.material.roughness = 0.4;
          child.material.metalness = 1;
        }
      });
      // scene.add(spaceShipPipes);
    });

    // Desk
    gltfLoader.load("../src/static/SpaceShipDesk3.glb", (gltf) => {
      const spaceShipDesk = gltf.scene;

      scene.add(spaceShipDesk);
    });

    // const lightBarGeom = new THREE.BoxGeometry(0.25, 0.05, 3);
    // const lightBarMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0 });

    // const lightBar1 = new THREE.Mesh(lightBarGeom, lightBarMaterial);
    // const lightBar2 = new THREE.Mesh(lightBarGeom, lightBarMaterial);

    // lightBar1.position.set(0, 1.3, 0);
    // lightBar2.position.set(0, 1.16, 8);

    // scene.add(lightBar1, lightBar2);

    /*
     * Scene Add-ons
     */

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 0, 100);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    pointLight.position.set(-0, 0.7, -6.3);
    pointLightHelper.visible = false;
    scene.add(pointLightHelper);

    const pointLight2 = new THREE.PointLight(0xffffff, 0, 100);
    const pointLightHelper2 = new THREE.PointLightHelper(pointLight2);
    pointLightHelper2.visible = false;
    pointLight2.position.set(-0, 0.2, 0);
    scene.add(pointLightHelper2);

    const pointLight3 = new THREE.PointLight(0xffffff, 0, 100);
    const pointLightHelper3 = new THREE.PointLightHelper(pointLight3);
    pointLightHelper3.visible = false;
    pointLight3.position.set(-0, 0.2, 8.8);
    scene.add(pointLightHelper3);

    const spotLight = new THREE.SpotLight(0xffffff, 50);
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);

    spotLight.position.set(0, 0.8, 0);
    const spotLightTarget = new THREE.Object3D();
    spotLightTarget.position.set(0, -3, 0);
    scene.add(spotLightTarget);
    spotLight.target = spotLightTarget;

    // scene.add(spotLightHelper);
    spotLightHelper.update();
    // spotLight.penumbra = 0.5;
    spotLight.angle = Math.PI / 4;
    spotLight.distance = 1;

    const ambi = new THREE.AmbientLight(0xffffff, 0.1);

    scene.add(pointLight);
    scene.add(pointLight2);
    scene.add(pointLight3);
    scene.add(spotLight);
    // scene.add(ambi);

    // Fog
    scene.fog = new THREE.FogExp2(0x262626, 0.05);

    // LIGHTING & FOG GUI

    const pointLight1Folder = gui.addFolder("Point Light 1");
    pointLight1Folder.add(pointLightHelper, "visible", true, false);
    pointLight1Folder.add(pointLight, "intensity", 0, 20).name("PointLight1 Intensity");
    pointLight1Folder.add(pointLight.position, "x", -20, 20).name("PointLight1 X Position");
    pointLight1Folder.add(pointLight.position, "y", -20, 20).name("PointLight1 Y Position");
    pointLight1Folder.add(pointLight.position, "z", -20, 20).name("PointLight1 Z Position");

    const pointLight2Folder = gui.addFolder("Point Light 2");
    pointLight2Folder.add(pointLightHelper2, "visible", true, false);
    pointLight2Folder.add(pointLight2, "intensity", 0, 20).name("PointLight2 Intensity");
    pointLight2Folder.add(pointLight2.position, "x", -20, 20).name("PointLight2 X Position");
    pointLight2Folder.add(pointLight2.position, "y", -20, 20).name("PointLight2 Y Position");
    pointLight2Folder.add(pointLight2.position, "z", -20, 20).name("PointLight2 Z Position");

    const pointLight3Folder = gui.addFolder("Point Light 3");
    pointLight3Folder.add(pointLightHelper3, "visible", true, false);
    pointLight3Folder.add(pointLight3, "intensity", 0, 20).name("PointLight3 Intensity");
    pointLight3Folder.add(pointLight3.position, "x", -20, 20).name("PointLight3 X Position");
    pointLight3Folder.add(pointLight3.position, "y", -20, 20).name("PointLight3 Y Position");
    pointLight3Folder.add(pointLight3.position, "z", -20, 20).name("PointLight3 Z Position");

    const spotLightFolder = gui.addFolder("Spot Light");
    spotLightFolder.add(spotLight, "distance", 0, 10).name("SpotLight_Intensity");
    spotLightFolder.add(spotLight.position, "z", -20, 20).name("SpotLight_ZPosition");

    const fogFolder = gui.addFolder("Fog");
    fogFolder.add(scene.fog, "density", 0, 0.5);
    fogFolder.addColor(scene.fog, "color", 255);

    // Camera Parallax

    // const lookAtTarget = {
    //   x: focusPoint.x,
    //   y: focusPoint.y,
    //   z: focusPoint.z,
    // };

    // Home

    // Mouse Move Parallax
    let targetX = 0;
    let targetY = 0;

    // let mouseMoveScheduled = false;
    // window.addEventListener("mousemove", (e) => {
    //   if (!mouseMoveScheduled) {
    //     mouseMoveScheduled = true;
    //     requestAnimationFrame(() => {
    //       const relativeX = e.clientX / window.innerWidth - 0.5;
    //       const relativeY = e.clientY / window.innerHeight - 0.5;

    //       targetX = lookAtTarget.x + relativeX * 0.95;
    //       targetY = lookAtTarget.y - relativeY * 0.95;

    //       mouseMoveScheduled = false;
    //     });
    //   }
    // });

    // window.addEventListener("touchmove", (e) => {
    //   if (e.touches.length === 1) {
    //     const touch = e.touches[0];
    //     const relativeX = (touch.clientX / window.innerWidth - 0.5) * -1;
    //     const relativeY = (touch.clientY / window.innerHeight - 0.5) * -1;

    //     targetX = cameraFocus.x + relativeX * 3.45;
    //     targetY = cameraFocus.y - relativeY * 3.45;
    //   }
    // });

    // Resize
    const getCanvasSize = () => {
      const bounds = canvas.getBoundingClientRect();
      return {
        width: bounds.width,
        height: bounds.height,
      };
    };
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.0;

    sizes = getCanvasSize();

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false);
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    });

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;
    // controls.zoomSpeed = 1.0;

    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      camera.getWorldDirection(cameraWorldDir);

      // Compute focus point 3 units in front of camera
      focusPoint.copy(camera.position).add(cameraWorldDir.clone().multiplyScalar(focusDistance));
      // camera.lookAt(focusPoint);
      const smoothingFactor = 2; // play with this value: 3 = slow, 5 = nice, 10 = snappy
      // const parallaxX = targetX;
      // const parallaxY = targetY;
      // camera.position.x += (parallaxX - camera.position.x) * smoothingFactor * delta;
      // camera.position.y += (parallaxY - camera.position.y) * smoothingFactor * delta;

      // camera.lookAt(focusPoint);

      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };

    let currentPosition = "text";

    // Interaction
    instructionRef.current.addEventListener("click", () => {
      if (currentPosition == "text") {
        console.log(currentPosition);
        // Position = Ben Scott Text
        const tl = gsap.timeline();
        instructionRef.current.innerHTML = "TURNING ON THE LIGHTS...";

        tl.to(
          pointLight,
          {
            intensity: 20,
            duration: 0.8,
          },
          "-=0.2"
        );

        tl.to(
          pointLight2,
          {
            intensity: 12,
            duration: 0.8,
          },
          "-=0.2"
        );
        tl.to(
          pointLight3,
          {
            intensity: 8,
            duration: 0.8,
            onComplete: () => {
              instructionRef.current.innerHTML = "SEE THE VIEW";
              currentPosition = "text_LightsOn";
              console.log(currentPosition);
            },
          },
          "-=0.2"
        );
      } else if (currentPosition == "text_LightsOn") {
        // Position = Windows
        // Quaternion Logic for rotating the camera
        // Creaate new quaternion
        const quaternion = new THREE.Quaternion();
        // Create it's axis, (x,y,z)
        const axis = new THREE.Vector3(0, 1, 0);
        // Choose an angle (PI = 180: /2 = 90)
        const angle = Math.PI / 2;
        // Set the axis and angle
        quaternion.setFromAxisAngle(axis, angle);
        // Animate to the new quaternion
        gsap.to(textMaterial, {
          opacity: 0,
          duration: 1,
        });
        gsap.to(cameraGroup.position, {
          x: 1.5,
          y: 0,
          z: 0,
          duration: 3,
          ease: "power1.inOut",
        });

        gsap.to(cameraGroup.quaternion, {
          x: quaternion.x,
          y: quaternion.y,
          z: quaternion.z,
          w: quaternion.w,
          duration: 2,
          ease: "power1.inOut",
          onUpdate: () => {
            cameraGroup.quaternion.normalize();
          },
          onComplete: () => {
            currentPosition = "windows";
            instructionRef.current.innerHTML = "VISIT WORKSPACE";
          },
        });
      } else if (currentPosition == "windows") {
        // Create new quaternion instance
        const quarternion = new THREE.Quaternion();
        // Create new axis (x,y,z)
        const axis = new THREE.Vector3(0, 1, 0);
        // Decide on an angle (pi = 180deg)
        const angle = -Math.PI / 2;
        // set quaterion axis and angle
        quarternion.setFromAxisAngle(axis, angle);
        const tl = gsap.timeline();

        tl.to(cameraGroup.quaternion, {
          x: quarternion.x,
          y: quarternion.y,
          z: quarternion.z,
          w: quarternion.w,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            cameraGroup.quaternion.normalize();
          },
        });
        tl.to(
          cameraGroup.position,
          {
            x: 4,
            y: 0,
            z: 0,
            duration: 2,

            onComplete: () => {
              currentPosition = "desk";
            },
          },
          "-=0.4"
        );
      }
    });

    window.addEventListener("click", () => {
      console.log("camera Position:", camera.position);
      console.log("focusPoint:", focusPoint);
    });

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
      // controls.dispose();

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
      <div className="sceneWrapper" ref={containerRef}>
        <HeadsUpDisplay ref={instructionRef} />
        <canvas ref={canvasRef} className="webgl" />
        <WhatIDoPage />
      </div>
    </>
  );
}
export default Home;
