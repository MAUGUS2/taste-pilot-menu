"use client";
import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Stars, Html } from "@react-three/drei";
import { Carousel } from "../components/3d/Carousel";

// Mock food items data
const FOOD_ITEMS = [
  { id: "burger-1", name: "Classic Burger", model: "/models/burger.glb" },
  { id: "burger-2", name: "Cheese Burger", model: "/models/burger.glb" },
  { id: "burger-3", name: "Veggie Burger", model: "/models/burger.glb" },
  { id: "pizza-1", name: "Pepperoni Pizza", model: "/models/burger.glb" },
  { id: "sandwich-1", name: "Club Sandwich", model: "/models/burger.glb" },
];

// Loading component usando Html do drei para renderizar HTML no Canvas
const LoadingFallback = () => (
  <Html center>
    <div className="bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm">
      Loading 3D Experience...
    </div>
  </Html>
);

export default function Page() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedItem(id);
    console.log(`Selected item: ${id}`);
  };

  return (
    <main className="w-full h-screen relative">
      {/* 3D Menu Canvas */}
      <Canvas shadows dpr={[1, 2]} style={{ width: "100%", height: "100%", background: "#111822" }}>
        <Suspense fallback={<LoadingFallback />}>
          <PerspectiveCamera makeDefault position={[0, 3, 9]} fov={50} />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            dampingFactor={0.05}
            rotateSpeed={0.5}
          />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight position={[-10, 10, -5]} color="#ffcc77" intensity={0.5} />

          {/* Background elements */}
          <Stars radius={100} depth={50} count={1000} factor={4} />

          {/* Food Item Carousel */}
          <Carousel items={FOOD_ITEMS} onSelect={handleSelect} />

          {/* Environment and lighting */}
          <Environment preset="sunset" />

          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#111822" roughness={1} metalness={0} />
          </mesh>
        </Suspense>
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-8 left-0 right-0 mx-auto text-center text-white">
        <h1 className="text-3xl font-bold mb-2">TastePilot 3D Menu</h1>
        <p className="text-lg">Explore our delicious menu items</p>
      </div>

      {selectedItem && (
        <div className="absolute bottom-8 left-0 right-0 mx-auto text-center text-white p-4 bg-black/70 max-w-md rounded-lg backdrop-blur-sm">
          <h2 className="text-xl font-bold">
            {FOOD_ITEMS.find((item) => item.id === selectedItem)?.name}
          </h2>
          <p className="mt-2">Click to customize or order</p>
          <button
            className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
            onClick={() => console.log(`Ordering ${selectedItem}`)}
          >
            Order Now
          </button>
        </div>
      )}
    </main>
  );
}
