'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { GloveConfiguration } from '@/types/glove';

interface GloveSceneProps {
  configuration: GloveConfiguration;
}

useGLTF.preload('/models/gloves.glb');

function GloveModel({ configuration, onReady }: { configuration: GloveConfiguration; onReady?: (center: THREE.Vector3, radius: number) => void }) {
  const { scene } = useGLTF('/models/gloves.glb');

  useEffect(() => {
    if (!scene) return;
    scene.scale.set(1.7, 1.7, 1.7);

    // Compute center/radius once model is present
    const bbox = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    bbox.getCenter(center);
    bbox.getSize(size);
    const radius = Math.max(size.x, size.y, size.z) * 0.6;
    onReady?.(center, radius);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material && child.material instanceof THREE.MeshStandardMaterial) {
        const name = (child.material.name || '').toLowerCase();
        const mat = child.material;
        if (name.includes('fixed')) {
          mat.color.set('#000000');
          mat.transparent = false;
          mat.opacity = 1;
          return;
        }
        if (name.includes('paddings') || name.includes('padding')) {
          mat.color.set(configuration.paddings);
          mat.transparent = false;
          mat.opacity = 1;
          return;
        }
        if (name.includes('main')) {
          mat.color.set(configuration.main);
          mat.transparent = false;
          mat.opacity = 1;
          return;
        }
      }
    });
  }, [scene, configuration, onReady]);

  return <primitive object={scene} />;
}

export default function GloveScene3D({ configuration }: GloveSceneProps) {
  const controlsRef = useRef<OrbitControls>(null);
  const [cameraProps, setCameraProps] = useState<{ pos: [number, number, number]; dist: number; target: [number, number, number] } | null>(null);

  const handleModelReady = (center: THREE.Vector3, radius: number) => {
    const distance = Math.max(3.0, radius * 2.0); // further away than suit feel
    setCameraProps({ pos: [center.x, center.y, center.z + distance], dist: distance, target: [center.x, center.y, center.z] });
  };

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: cameraProps ? cameraProps.pos : [0, 0, 3.2], fov: 75 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[8, 12, 6]} intensity={1.2} />
        <Suspense fallback={null}>
          <GloveModel configuration={configuration} onReady={handleModelReady} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={cameraProps ? cameraProps.dist : 3.2}
          maxDistance={cameraProps ? cameraProps.dist : 3.2}
          target={cameraProps ? new THREE.Vector3(...cameraProps.target) : new THREE.Vector3(0, 0, 0)}
        />
      </Canvas>
    </div>
  );
}
