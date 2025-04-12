/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import earthblue from "../../assets/Earth-Blue.jpg";
import clouds from "../../assets/clouds.png";

gsap.registerPlugin(ScrollTrigger);

const ThreeJSGlobe = ({globeRef, globeContainer}) => {

  useEffect(() => {
    if (!globeContainer.current) return;

    // Initialize Three.js
    const width = window.innerWidth;
    const height = window.innerHeight;

    //Renderer Settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    globeContainer.current.appendChild(renderer.domElement);

    //Setting up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 200;

    // Create globe
    const globe = new ThreeGlobe({ animateIn: false, waitForGlobeReady: true })
      .globeImageUrl(earthblue)
      //Atmosphere
      .showAtmosphere(true)
      .atmosphereColor("lightskyblue")
      .atmosphereAltitude("0.1");

    globe.position.x = -75;
    globe.position.y = -60;

    //Cloud
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

    const Clouds = new THREE.Mesh(
      new THREE.SphereGeometry(
        globe.getGlobeRadius() * (1 + CLOUDS_ALT),
        75,
        75
      )
    );
    new THREE.TextureLoader().load(clouds, (cloudsTexture) => {
      Clouds.material = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.5,
      });
    });

    globe.add(Clouds);

    (function localGlobeAnimationHandler() {
      Clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
      globe.rotation.y += 0.0005
      requestAnimationFrame(localGlobeAnimationHandler);
    })();

    scene.add(globe);
    globeRef.current = globe;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();


    return () => {
      if (globeContainer.current?.contains(renderer.domElement)) {
        globeContainer.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={globeContainer}
      style={{
        position: "fixed",
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: "linear-gradient(#001A31,#000000)",
      }}
    />
  );
};

export default ThreeJSGlobe;
