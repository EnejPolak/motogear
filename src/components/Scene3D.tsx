'use client';

import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { SuitConfiguration } from '@/types/configurator';

interface Scene3DProps {
  configuration: SuitConfiguration;
  textures: { [key: string]: string | null };
}

function SuitModel({ configuration, textures }: { configuration: SuitConfiguration; textures: { [key: string]: string | null } }) {
  const { scene } = useGLTF('/models/suit.glb');

  useEffect(() => {
    if (scene) {
      // Scale the entire model to make it larger
      scene.scale.set(1.5, 1.5, 1.5);
      
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const materialName = child.material.name.toLowerCase();
          
          // First check if there's a texture for this part
          let textureApplied = false;
          Object.entries(textures).forEach(([part, textureUrl]) => {
            if (textureUrl && (materialName === part || materialName.includes(part))) {
              if (child.material instanceof THREE.MeshStandardMaterial) {
                // Create and apply texture
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(textureUrl, (texture) => {
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                });
                textureApplied = true;
              }
            }
          });
          
          // If no texture was applied, apply colors
          if (!textureApplied) {
            Object.entries(configuration).forEach(([part, color]) => {
              // Check for exact matches and partial matches
              const isMatch = materialName === part || 
                             materialName.includes(part) || 
                             (part.startsWith('logo') && materialName.includes('logo'));
              
              if (isMatch) {
                if (child.material instanceof THREE.MeshStandardMaterial) {
                  if (color === 'transparent') {
                    child.material.transparent = true;
                    child.material.opacity = 0.0;
                    // Reset color to white when transparent
                    child.material.color.setHex(0xFFFFFF);
                  } else {
                    child.material.transparent = false;
                    child.material.opacity = 1.0;
                    child.material.color.setHex(parseInt(color.replace('#', ''), 16));
                  }
                }
              }
            });
          }
        }
      });
    }
  }, [scene, configuration, textures]);

  return <primitive object={scene} />;
}

export default function Scene3D({ configuration, textures }: Scene3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 100 }}
        style={{ background: '#0F172A' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        
        <Suspense fallback={null}>
          <SuitModel configuration={configuration} textures={textures} />
          <Environment preset="city" />
        </Suspense>
        
        <OrbitControls 
          enablePan={true}
          enableZoom={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={2.5}
          maxDistance={2.5}
          panSpeed={0.8}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          maxAzimuthAngle={Infinity}
          minAzimuthAngle={-Infinity}
        />
      </Canvas>
    </div>
  );
}