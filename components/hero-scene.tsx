'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
function Core() {
  const group = useRef<THREE.Group>(null);
  const targetPointer = useRef({ x: 0, y: 0, active: false });

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const blend = 1 - Math.exp(-delta * 6);
    const targetY = targetPointer.current.active
      ? targetPointer.current.x * 0.7
      : clock.elapsedTime * 0.16;
    const targetX = targetPointer.current.active
      ? -targetPointer.current.y * 0.4
      : Math.sin(clock.elapsedTime * 0.2) * 0.08;

    group.current.rotation.y += (targetY - group.current.rotation.y) * blend;
    group.current.rotation.x += (targetX - group.current.rotation.x) * blend;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.1;
  });
  return (
    <group ref={group} rotation={[0.2, 0, 0.1]}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[1.22, 0]} />
        <meshStandardMaterial color="#f2c65d" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh scale={[0.48, 1.85, 0.48]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ffe4a0" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh rotation={[1.1, 0.2, 0.4]}>
        <torusGeometry args={[1.9, 0.013, 8, 100]} />
        <meshBasicMaterial color="#7d673b" />
      </mesh>
      <mesh rotation={[0.3, 1.1, -0.4]}>
        <torusGeometry args={[2.15, 0.008, 8, 100]} />
        <meshBasicMaterial color="#397180" />
      </mesh>
    </group>
  );
}
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 4, 3]} intensity={4} />
      <pointLight position={[-3, -1, 2]} color="#5ce0f5" intensity={20} />
      <Core />
    </Canvas>
  );
}
