'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';
import { SuitConfiguration } from '@/types/configurator';

interface Scene3DProps {
  configuration: SuitConfiguration;
  textures: { [key: string]: string | null };
}

const USE_DECALS = true; // Fallback to decals to avoid UV cropping

function getLogoSlotSize(materialName: string): number {
  const name = materialName.toLowerCase();
  if (name.includes('logo_back')) return 1024;
  if (name.includes('logo_chest')) return 768;
  if (name.includes('logo_leva') || name.includes('logo_desna') || name.includes('logo_left') || name.includes('logo_right')) return 512;
  return 512;
}

function createContainCanvasTexture(srcUrl: string, size: number, gl: THREE.WebGLRenderer): Promise<THREE.CanvasTexture> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const side = size;

      const maxSource = 2048;
      let srcW = img.width;
      let srcH = img.height;
      let sourceImage: HTMLImageElement | HTMLCanvasElement = img;
      if (Math.max(srcW, srcH) > maxSource) {
        const scale = maxSource / Math.max(srcW, srcH);
        srcW = Math.round(srcW * scale);
        srcH = Math.round(srcH * scale);
        const tmp = document.createElement('canvas');
        tmp.width = srcW;
        tmp.height = srcH;
        const tctx = tmp.getContext('2d');
        if (tctx) {
          tctx.clearRect(0, 0, srcW, srcH);
          tctx.drawImage(img, 0, 0, srcW, srcH);
          sourceImage = tmp;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = side;
      canvas.height = side;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get 2D context'));
        return;
      }
      ctx.clearRect(0, 0, side, side);

      const scale = Math.min(1, Math.min(side / sourceImage.width, side / sourceImage.height));
      const drawW = Math.round(sourceImage.width * scale);
      const drawH = Math.round(sourceImage.height * scale);
      const dx = Math.round((side - drawW) / 2);
      const dy = Math.round((side - drawH) / 2);
      ctx.drawImage(sourceImage, dx, dy, drawW, drawH);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = false;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.repeat.set(1, 1);
      texture.offset.set(0, 0);
      texture.anisotropy = Math.min((gl.capabilities as any).getMaxAnisotropy?.() ?? 8, 8);

      resolve(texture);
    };
    img.onerror = reject;
    img.src = srcUrl;
  });
}

function computeUvExtents(geometry: THREE.BufferGeometry) {
  const uv = geometry.attributes.uv as THREE.BufferAttribute | undefined;
  if (!uv) return null;
  let uMin = Infinity, vMin = Infinity, uMax = -Infinity, vMax = -Infinity;
  for (let i = 0; i < uv.count; i++) {
    const u = uv.getX(i);
    const v = uv.getY(i);
    if (u < uMin) uMin = u;
    if (v < vMin) vMin = v;
    if (u > uMax) uMax = u;
    if (v > vMax) vMax = v;
  }
  return { uMin, vMin, uMax, vMax };
}

function applyUvRectToMap(map: THREE.Texture, geometry: THREE.BufferGeometry) {
  const rect = computeUvExtents(geometry);
  if (!rect) return;
  const width = Math.max(1e-6, rect.uMax - rect.uMin);
  const height = Math.max(1e-6, rect.vMax - rect.vMin);
  map.repeat.set(1 / width, 1 / height);
  map.offset.set(-rect.uMin / width, -rect.vMin / height);
  map.needsUpdate = true;
}

function resetMapTransform(material: THREE.MeshStandardMaterial) {
  if (material.map) {
    material.map.repeat.set(1, 1);
    material.map.offset.set(0, 0);
  }
}

function SuitModel({ configuration, textures }: { configuration: SuitConfiguration; textures: { [key: string]: string | null } }) {
  const { scene } = useGLTF('/models/suit.glb');
  const { gl, camera } = useThree();
  const decalsRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!decalsRef.current) return;
    // Clear previous decals
    while (decalsRef.current.children.length) {
      const m = decalsRef.current.children.pop() as THREE.Mesh;
      if (m && (m as any).material) {
        const mat = (m as any).material as THREE.Material;
        if ((mat as any).map) (mat as any).map.dispose();
        mat.dispose();
      }
      m?.geometry.dispose();
    }
  }, [textures]);

  useEffect(() => {
    if (scene) {
      scene.scale.set(1.5, 1.5, 1.5);

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const materialAny = child.material as any;
          const materialName = (materialAny?.name || '').toLowerCase();
          const isLogo = materialName.startsWith('logo');

          if (!materialAny) return;

          // Find matching logo texture
          const entry = Object.entries(textures).find(([part, textureUrl]) => textureUrl && (materialName === part || materialName.includes(part)));

          if (entry && isLogo) {
            const [, textureUrl] = entry;
            const targetSize = getLogoSlotSize(materialName);

            if (USE_DECALS) {
              // Remove underlying map to avoid UV artifacts
              if (materialAny instanceof THREE.MeshStandardMaterial) {
                if (materialAny.map) {
                  materialAny.map.dispose();
                  materialAny.map = null;
                }
              }

              // Build decal
              createContainCanvasTexture(textureUrl as string, targetSize, gl)
                .then((tex) => {
                  const bbox = new THREE.Box3().setFromObject(child);
                  const size = new THREE.Vector3();
                  bbox.getSize(size);

                  // Determine part for per-zone adjustments
                  const part = ['logo_back','logo_chest','logo_leva','logo_desna','logo_left','logo_right'].find(p => materialName.includes(p)) || null;

                  // Before placing decal, set base mesh color to chest color so padding blends in
                  if (materialAny instanceof THREE.MeshStandardMaterial) {
                    try {
                      materialAny.transparent = false;
                      materialAny.opacity = 1.0;
                      materialAny.color.setHex(parseInt(configuration.chest.replace('#', ''), 16));
                      materialAny.needsUpdate = true;
                    } catch {}
                  }

                  // Base square size factor (relative to bbox)
                  let scaleFactor = 0.9;
                  if (part === 'logo_back') scaleFactor = 1.2; // enlarge back logo

                  const decalSize = Math.max(size.x, size.y) * scaleFactor;

                  // World position at bbox center
                  const position = new THREE.Vector3();
                  bbox.getCenter(position);

                  // Orientation: align with mesh's world orientation; project along camera view direction fallback
                  const worldQuat = new THREE.Quaternion();
                  child.getWorldQuaternion(worldQuat);
                  const orientation = new THREE.Euler().setFromQuaternion(worldQuat);

                  // Rotate upright for back/chest (image upside-down otherwise)
                  if (part === 'logo_back' || part === 'logo_chest') {
                    orientation.z += Math.PI;
                  }
                  // Fix orientation for right arm logo so it's upright
                  if (part === 'logo_desna' || part === 'logo_right') {
                    orientation.z += Math.PI;
                  }
                  // Fix orientation for left arm logo so it's upright
                  if (part === 'logo_leva' || part === 'logo_left') {
                    orientation.z += Math.PI;
                  }

                  const decalGeo = new DecalGeometry(child, position, orientation, new THREE.Vector3(decalSize, decalSize, decalSize));

                  const decalMat = new THREE.MeshBasicMaterial({
                    map: tex,
                    transparent: true,
                    depthWrite: true,
                    depthTest: false,
                    polygonOffset: true,
                    polygonOffsetFactor: -2
                  });

                  const decalMesh = new THREE.Mesh(decalGeo, decalMat);
                  decalsRef.current?.add(decalMesh);
                })
                .catch((e) => console.error('Decal creation failed:', e));
              return;
            }

            // Direct map fallback (if decals disabled)
            if (materialAny instanceof THREE.MeshStandardMaterial) {
              createContainCanvasTexture(textureUrl as string, targetSize, gl)
                .then((tex) => {
                  if (materialAny.map) materialAny.map.dispose();
                  materialAny.map = tex;
                  materialAny.transparent = true;
                  materialAny.opacity = 1.0;
                  materialAny.needsUpdate = true;
                })
                .catch((e) => console.error('Texture creation failed:', e));
              return;
            }
          }

          // No texture provided: restore base color and clear map
          if (materialAny instanceof THREE.MeshStandardMaterial) {
            if (materialAny.map) {
              materialAny.map.dispose();
              materialAny.map = null;
              materialAny.needsUpdate = true;
            }

            const colorEntry = Object.entries(configuration).find(([part]) => materialName === part || materialName.includes(part) || (part.startsWith('logo') && materialName.includes('logo')));
            if (colorEntry) {
              const [, color] = colorEntry;
              if (color === 'transparent') {
                materialAny.transparent = true;
                materialAny.opacity = 0.0;
                materialAny.color.setHex(0xFFFFFF);
              } else {
                materialAny.transparent = false;
                materialAny.opacity = 1.0;
                materialAny.color.setHex(parseInt(color.replace('#', ''), 16));
              }
            }
          }
        }
      });
    }
  }, [scene, configuration, textures, gl, camera]);

  return (
    <>
      <primitive object={scene} />
      <group ref={decalsRef} />
    </>
  );
}

export default function Scene3D({ configuration, textures }: Scene3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 1.8], fov: 80 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 3]} intensity={1.5} />
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
