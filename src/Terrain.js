import React, { useRef, useEffect } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry, MeshBasicMaterial, Mesh } from 'three';
import * as THREE from 'three';

const ThreeTerrain = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, camera, and renderer setup
    const scene = new Scene();
    scene.background = new THREE.Color(0xffffff); // Set background to white
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Terrain geometry using BufferGeometry
    const geometry = new PlaneGeometry(100, 100, 100, 100);
    geometry.rotateX(-Math.PI / 2); // Rotate to lay flat

    // Accessing and modifying vertices
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] = Math.random() * 10; // Simple noise
    }
    geometry.attributes.position.needsUpdate = true;

    // Material for the terrain, changed to dark brown
    const material = new MeshBasicMaterial({ color: 0x8B4513, wireframe: true });

    // Terrain mesh
    const terrain = new Mesh(geometry, material);
    scene.add(terrain);

    // Camera position
    camera.position.z = 50;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeTerrain;

