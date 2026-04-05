"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 3000 }) {
  const mesh = useRef();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      sz[i] = Math.random() * 1.5 + 0.3;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.008;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.012;

      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      mesh.current.position.y = scrollY * 0.002;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#E2E8F0"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ShootingStar() {
  const ref = useRef();
  const speed = useRef(Math.random() * 0.5 + 0.3);
  const startPos = useRef({
    x: (Math.random() - 0.5) * 60,
    y: Math.random() * 30 + 10,
    z: (Math.random() - 0.5) * 30,
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x -= speed.current * 0.3;
      ref.current.position.y -= speed.current * 0.15;

      if (ref.current.position.y < -30) {
        ref.current.position.x = startPos.current.x;
        ref.current.position.y = startPos.current.y;
        speed.current = Math.random() * 0.5 + 0.3;
      }
    }
  });

  return (
    <mesh ref={ref} position={[startPos.current.x, startPos.current.y, startPos.current.z]}>
      <sphereGeometry args={[0.02, 4, 4]} />
      <meshBasicMaterial color="#FDE68A" transparent opacity={0.9} />
    </mesh>
  );
}

export default function StarField() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={[1, isMobile ? 1 : 1.5]}
        style={{ background: "transparent" }}
        frameloop={isMobile ? "demand" : "always"}
      >
        <ambientLight intensity={0.1} />
        <Stars count={isMobile ? 800 : 2500} />
        {!isMobile && [...Array(3)].map((_, i) => (
          <ShootingStar key={i} />
        ))}
      </Canvas>
    </div>
  );
}