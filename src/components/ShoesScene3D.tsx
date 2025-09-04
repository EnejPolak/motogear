'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { ShoesConfiguration } from '@/types/shoes';

interface ShoesSceneProps { configuration: ShoesConfiguration; }

useGLTF.preload('/models/shoes.glb');

function ShoesModel({ configuration, onReady }: { configuration: ShoesConfiguration; onReady?: (center: THREE.Vector3, radius: number) => void }) {
  const { scene } = useGLTF('/models/shoes.glb');

  useEffect(() => {
    if (!scene) return;
    scene.scale.set(1.8, 1.8, 1.8);

    const bbox = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    bbox.getCenter(center);
    bbox.getSize(size);
    const radius = Math.max(size.x, size.y, size.z) * 0.6;
    onReady?.(center, radius);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material && child.material instanceof THREE.MeshStandardMaterial) {
        const mat = child.material;
        mat.color.set(configuration.main);
        mat.transparent = false;
        mat.opacity = 1;
      }
    });
  }, [scene, configuration, onReady]);

  return <primitive object={scene} />;
}

export default function ShoesScene3D({ configuration }: ShoesSceneProps) {
  const controlsRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [cameraProps, setCameraProps] = useState<{ pos: [number, number, number]; dist: number; target: [number, number, number] } | null>(null);

  const handleReady = (center: THREE.Vector3, radius: number) => {
    const distance = Math.max(3.0, radius * 2.2);
    setCameraProps({ pos: [center.x, center.y, center.z + distance], dist: distance, target: [center.x, center.y, center.z] });
  };

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: cameraProps ? cameraProps.pos : [0, 0, 3.5], fov: 75 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[8, 12, 6]} intensity={1.2} />
        <Suspense fallback={null}>
          <ShoesModel configuration={configuration} onReady={handleReady} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls ref={controlsRef} enablePan={false} enableZoom={false} enableRotate={true} enableDamping={true} dampingFactor={0.05} minDistance={cameraProps ? cameraProps.dist : 3.5} maxDistance={cameraProps ? cameraProps.dist : 3.5} />
      </Canvas>
    </div>
  );
}
