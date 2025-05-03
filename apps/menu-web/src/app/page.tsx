"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Page() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <RotatingCube />
      <ambientLight />
    </Canvas>
  );
} 