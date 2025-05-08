"use client";
import { useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Preload common model paths to improve performance
useGLTF.preload("/models/burger.glb");

interface ModelLoaderProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function ModelLoader({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: ModelLoaderProps) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);

  // Clone the scene to avoid shared materials between instances
  const clonedScene = scene.clone();

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={clonedScene}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </Center>
  );
}
