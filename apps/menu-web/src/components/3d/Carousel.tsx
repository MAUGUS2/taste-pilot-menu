"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface CarouselProps {
  items: { id: string; name: string; model: string }[];
  onSelect: (id: string) => void;
}

export function Carousel({ items, onSelect }: CarouselProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [activeItem, setActiveItem] = useState(0);
  const [rotating, setRotating] = useState(true);

  // Position items in a circle
  const radius = 5;
  const itemAngle = (2 * Math.PI) / items.length;

  // Handle item selection with animation
  const rotateToItem = (index: number) => {
    if (!groupRef.current) return;

    setRotating(false);
    const targetAngle = -itemAngle * index;

    gsap.to(groupRef.current.rotation, {
      y: targetAngle,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        setRotating(true);
        setActiveItem(index);
        onSelect(items[index].id);
      },
    });
  };

  // Add auto-rotation when not interacting
  useFrame((_, delta) => {
    if (groupRef.current && rotating) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Colors for the items to make them visually distinct
  const colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];

  return (
    <group ref={groupRef}>
      {items.map((item, index) => {
        const angle = itemAngle * index;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        const itemColor = colors[index % colors.length];

        return (
          <group key={item.id} position={[x, 0, z]} onClick={() => rotateToItem(index)}>
            {/* Placeholder for the actual food model */}
            <mesh scale={activeItem === index ? 1.3 : 1} castShadow receiveShadow>
              <boxGeometry args={[1.5, 1.5, 1.5]} />
              <meshStandardMaterial
                color={itemColor}
                emissive={activeItem === index ? itemColor : "black"}
                emissiveIntensity={0.5}
                roughness={0.5}
                metalness={0.2}
              />
            </mesh>

            {/* Item label */}
            <Text
              position={[0, -1.5, 0]}
              fontSize={0.4}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {item.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
