import React from "react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import typeFace from "../static/fonts/Akira.typeface.json";
import WhoAmI from "../components/WhoIAm";
import TalkToMe from "../components/TalkToMe";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import WhatIDoPage from "../pages/WhatIDoPage";

function Home() {
  const canvasRef = useRef();
  const whoAmIRef = useRef();
  const whatIDoRef = useRef();
  const talkToMeRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    let sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const isMobile = window.innerWidth < 1000;
    const camera = new THREE.PerspectiveCamera(isMobile ? 30 : 15, sizes.width / sizes.height, 0.1, 100);

    camera.position.set(0, 0, 12);
    // camera.position.set(0, 0, 92);
    scene.add(camera);

    /*
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();

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

    // Concrete Look Texture
    const concreteColorTexture = textureLoader.load("/textures/Concrete044C_2K-JPG/Concrete044C_2K-JPG_Color.jpg");
    const concreteRoughnessTexture = textureLoader.load("/textures/Concrete044C_2K-JPG/Concrete044C_2K-JPG_Roughness.jpg");
    const concreteAOTexture = textureLoader.load("/textures/Concrete044C_2K-JPG/Concrete044C_2K-JPG_AmbientOcclusion.jpg");
    const concreteMetalnessTexture = textureLoader.load("/textures/Concrete044C_2K-JPG/Concrete044C_2K-JPG_Metalness.jpg");
    const concreteDisplacementTexture = textureLoader.load("/textures/Concrete044C_2K-JPG/Concrete044C_2K-JPG_Displacement.jpg");
    const concreteNormalTexture = textureLoader.load("/textures/Concrete044C_2K-JPG/Concrete044C_2K-JPG_NormalGL.jpg");

    concreteColorTexture.colorSpace = THREE.SRGBColorSpace;

    const repeatCount = 5.3;

    concreteColorTexture.repeat.x = repeatCount;
    concreteColorTexture.repeat.y = repeatCount;
    concreteColorTexture.wrapS = THREE.RepeatWrapping;
    concreteColorTexture.wrapT = THREE.RepeatWrapping;

    concreteRoughnessTexture.repeat.x = repeatCount;
    concreteRoughnessTexture.repeat.y = repeatCount;
    concreteRoughnessTexture.wrapS = THREE.RepeatWrapping;
    concreteRoughnessTexture.wrapT = THREE.RepeatWrapping;

    concreteAOTexture.repeat.x = repeatCount;
    concreteAOTexture.repeat.y = repeatCount;
    concreteAOTexture.wrapS = THREE.RepeatWrapping;
    concreteAOTexture.wrapT = THREE.RepeatWrapping;

    concreteMetalnessTexture.repeat.x = repeatCount;
    concreteMetalnessTexture.repeat.y = repeatCount;
    concreteMetalnessTexture.wrapS = THREE.RepeatWrapping;
    concreteMetalnessTexture.wrapT = THREE.RepeatWrapping;

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
    const textContent = "Ben scott";

    const textGeometry = new TextGeometry(textContent, {
      font,
      size: window.innerWidth < 1500 ? 0.25 : 0.3,
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
    text.castShadow = true;
    text.receiveShadow = true;
    textGeometry.computeBoundingBox();
    textGeometry.computeVertexNormals();
    scene.add(text);

    const subText = new TextGeometry("web designer / developer", {
      font,
      size: window.innerWidth < 1500 ? 0.05 : 0.3,
      depth: 0.1,
      curveSegments: 12,
      bevelSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.005,
    });
    subText.center();
    subText.setAttribute("uv2", new THREE.BufferAttribute(subText.attributes.uv.array, 2));

    const text2 = new THREE.Mesh(subText, metalTexture);
    text2.position.y = -0.225;
    text2.position.x = -0.23;
    text2.castShadow = true;
    text2.receiveShadow = true;
    subText.computeBoundingBox();
    subText.computeVertexNormals();
    scene.add(text2);

    /*
     * Geometries
     */

    // Plane Geometry
    const planeGeometry = new THREE.PlaneGeometry(30, 30, 30, 30);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: "#000",
      roughnessMap: concreteRoughnessTexture,
      metalnessMap: concreteMetalnessTexture,

      aoMap: concreteAOTexture,
      normalMap: concreteNormalTexture,
      displacementMap: concreteDisplacementTexture,
      displacementScale: 0.63,
    });

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.z = -0.45;
    planeMesh.position.x = 0.75;
    planeMesh.position.y = 2.8;
    planeMesh.receiveShadow = true;
    planeMesh.castShadow = true;
    scene.add(planeMesh);

    /*
     * Scene Add-ons
     */

    // Lights

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
    const dirLightHelp = new THREE.DirectionalLight(dirLight);
    dirLight.decay = 2;
    // scene.add(dirLightHelp);
    dirLight.shadow.bias = 0.0000006;
    dirLight.lookAt(0, 0, 0);
    dirLight.position.set(1, 1, 1);
    dirLight.castShadow = true;

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 7);
    const dirLightHelp2 = new THREE.DirectionalLightHelper(dirLight2);
    // scene.add(dirLightHelp2);
    dirLight2.shadow.bias = 0.0000006;
    dirLight2.position.set(1, 10, 0.5);
    dirLight2.castShadow = true;

    const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.3);
    const dirLightHelp3 = new THREE.DirectionalLightHelper(dirLight3);
    // scene.add(dirLightHelp3);
    dirLight3.shadow.bias = 0.0000006;

    dirLight3.position.set(0, -0.3, 3);
    dirLight3.castShadow = true;
    dirLight3.lookAt(0, 0, 0);

    // const helper = new THREE.CameraHelper(dirLight.shadow.camera);
    // scene.add(helper);

    scene.add(dirLight, dirLight2, dirLight3);

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
    let baseScale = window.innerWidth < 1200 ? 0.009 : 0.003;

    // WhoAmI
    const whoAmIElement = whoAmIRef.current;
    const whoAmIObject = new CSS3DObject(whoAmIElement);
    whoAmIObject.position.set(5, 9, 0);
    whoAmIObject.scale.set(baseScale, baseScale, baseScale);

    scene.add(whoAmIObject);

    // TalkToMe
    const TalkToMeElement = talkToMeRef.current;
    const TalkToMeObject = new CSS3DObject(TalkToMeElement);
    TalkToMeObject.position.set(-9, -2, 0);
    TalkToMeObject.scale.set(baseScale, baseScale, baseScale);

    scene.add(TalkToMeObject);

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

    // Who I Am
    const whoIAmBtn = document.querySelector(".whoiam");
    if (whoIAmBtn) {
      whoIAmBtn.addEventListener("click", () => {
        gsap.to(camera.position, {
          x: whoAmIObject.position.x,
          y: whoAmIObject.position.y,
          duration: 1,
          ease: "power2.inOut",
        });

        gsap.to(lookAtTarget, {
          x: whoAmIObject.position.x,
          y: whoAmIObject.position.y,
          z: whoAmIObject.position.z,
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

    // Talk To Me
    const talkToMeBtn = document.querySelector(".talktome");
    if (talkToMeBtn) {
      talkToMeBtn.addEventListener("click", () => {
        gsap.to(camera.position, {
          x: TalkToMeObject.position.x,
          y: TalkToMeObject.position.y,
          duration: 1,
          ease: "power2.inOut",
        });

        gsap.to(lookAtTarget, {
          x: TalkToMeObject.position.x,
          y: TalkToMeObject.position.y,
          z: TalkToMeObject.position.z,
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
          const relativeX = (e.clientX / window.innerWidth - 0.5) * 3;
          const relativeY = (e.clientY / window.innerHeight - 0.5) * 3;

          targetX = cameraFocus.x + relativeX * 0.95;
          targetY = cameraFocus.y - relativeY * 0.95;

          mouseMoveScheduled = false;
        });
      }
    });

    window.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const relativeX = (touch.clientX / window.innerWidth - 0.5) * 3;
        const relativeY = (touch.clientY / window.innerHeight - 0.5) * 3;

        targetX = cameraFocus.x + relativeX * 3.45;
        targetY = cameraFocus.y - relativeY * 3.45;
      }
    });

    // Renderers
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const hdriLoader = new RGBELoader();
    hdriLoader.load("/src/static/table_mountain_1_1k.hdr", function (texture) {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      texture.dispose();
      scene.environment = envMap;
      scene.environmentIntensity = 0;
    });

    // CSS Renderer for DOM elements
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.domElement.classList.add("css3d");
    cssRenderer.setSize(sizes.width, sizes.height);
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.top = "0";
    containerRef.current.appendChild(cssRenderer.domElement);

    // Resize
    const getCanvasSize = () => {
      const bounds = canvas.getBoundingClientRect();
      return {
        width: bounds.width,
        height: bounds.height,
      };
    };

    sizes = getCanvasSize();

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      cssRenderer.setSize(sizes.width, sizes.height);
    });

    // window.addEventListener("resize", handleResize);

    // Animation
    const tick = () => {
      const parallaxX = targetX;
      const parallaxY = targetY;
      camera.position.x += (parallaxX - camera.position.x) * 0.02;
      camera.position.y += (parallaxY - camera.position.y) * 0.02;

      camera.lookAt(cameraFocus);
      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
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
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} className="webgl" />
      <WhoAmI ref={whoAmIRef} />
      <TalkToMe ref={talkToMeRef} />
      <WhatIDoPage />
    </div>
  );
}
export default Home;
