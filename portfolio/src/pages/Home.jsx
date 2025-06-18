import React from "react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import WhatIDoPage from "./WhatIDoPage";
import Loader from "../components/Loader";
import Lights from "../components/Lights";
import SpaceShipModel from "../models/SpaceShipModel";
import TextModel from "../models/TextModel";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { FilmPass, RenderPass } from "three/examples/jsm/Addons.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";

function Home() {
  const canvasRef = useRef();
  const sceneRef = useRef(new THREE.Scene());
  const loaderRef = useRef();
  const progressRef = useRef();
  const progressPercentRef = useRef();
  const [loading, setLoading] = useState(true);
  const loadingManagerRef = useRef(new THREE.LoadingManager());

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;

    let loadingManager = loadingManagerRef.current;

    let sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const isMobile = window.innerWidth < 800;

    const camera = new THREE.PerspectiveCamera(isMobile ? 65 : 50, sizes.width / sizes.height, 0.01, 1000);
    camera.position.set(0, 0.1, 2);
    camera.updateProjectionMatrix();
    scene.add(camera);

    // Renderers
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    console.log(renderer.info);
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // cap it

    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    /**
     * Post Processing
     */
    const composer = new EffectComposer(renderer);

    const params = {
      threshold: 0.8,
      strength: 0.3,
      radius: 0.3,
      exposure: 0.2,
    };

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;

    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(bloomPass);
    composer.addPass(new FilmPass(2, 0.25, 324, false));
    composer.addPass(new OutputPass());

    // Runs on completion of all  loads
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

    /**
     * Controls
     */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.enableDamping = true; // optional, adds smoother motion
    controls.dampingFactor = 0.05;

    /**
     * Reqiured stuff
     */

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.88;

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight, false);
    });

    const tick = () => {
      composer.render();
      controls.update();

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      controls.dispose();
      cancelAnimationFrame(tick);
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
      // Cancel any animation frame
    };
  }, []);

  return (
    <>
      <Loader refs={{ loaderRef, progressRef, progressPercentRef }} />
      {/* <HeadsUpDisplay ref={instructionRef} /> */}
      <canvas ref={canvasRef} className="webgl" />
      {sceneRef.current && <Lights scene={sceneRef.current} />}
      {sceneRef.current && <SpaceShipModel scene={sceneRef.current} loadingManager={loadingManagerRef.current} />}
      {sceneRef.current && <TextModel scene={sceneRef.current} loadingManager={loadingManagerRef.current} />}
      <WhatIDoPage />
    </>
  );
}

export default Home;
