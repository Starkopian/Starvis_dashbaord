'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { Shape, type Group, type Mesh } from 'three';

function Mascot() {
  const group = useRef<Group>(null);
  const leftEye = useRef<Mesh>(null);
  const rightEye = useRef<Mesh>(null);
  const gl = useThree((state) => state.gl);

  const star = useMemo(() => {
    const shape = new Shape();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const radius = i % 2 === 0 ? 0.3 : 0.105;
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  // Track cursor position accurately relative to the canvas center on screen
  const targetPointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const canvas = gl.domElement;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize across the viewport so that moving the cursor anywhere
      // on screen (left copy, nav, right side) causes the mascot to turn and look right at it
      const fovX = Math.max(window.innerWidth * 0.45, 250);
      const fovY = Math.max(window.innerHeight * 0.45, 250);
      const nx = Math.max(-1.4, Math.min(1.4, (clientX - centerX) / fovX));
      const ny = Math.max(-1.4, Math.min(1.4, (clientY - centerY) / fovY));

      targetPointer.current.x = nx;
      targetPointer.current.y = ny;
      targetPointer.current.active = true;
    };

    const handlePointerLeave = () => {
      targetPointer.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [gl]);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const blend = 1 - Math.exp(-delta * 7);

    const idleY = Math.sin(clock.elapsedTime * 0.8) * 0.08;
    const idleRotY = Math.sin(clock.elapsedTime * 0.5) * 0.05;

    let targetRotY = idleRotY;
    let targetRotX = 0;
    let targetRotZ = 0;
    let targetPosX = 0;
    let targetPosY = idleY;

    if (targetPointer.current.active) {
      // Rotate head & body accurately towards cursor position
      targetRotY = targetPointer.current.x * 0.65;
      targetRotX = -targetPointer.current.y * 0.38;
      targetRotZ = -targetPointer.current.x * 0.08; // natural head tilt
      targetPosX = targetPointer.current.x * 0.22;
      targetPosY = -targetPointer.current.y * 0.16 + idleY;
    }

    group.current.rotation.y += (targetRotY - group.current.rotation.y) * blend;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * blend;
    group.current.rotation.z += (targetRotZ - group.current.rotation.z) * blend;
    group.current.position.x += (targetPosX - group.current.position.x) * blend;
    group.current.position.y += (targetPosY - group.current.position.y) * blend;

    // Pupil shift for lively eye contact
    const eyeOffsetX = (targetPointer.current.active ? targetPointer.current.x : 0) * 0.04;
    const eyeOffsetY = (targetPointer.current.active ? -targetPointer.current.y : 0) * 0.03;
    if (leftEye.current) {
      leftEye.current.position.x += (-0.43 + eyeOffsetX - leftEye.current.position.x) * blend;
      leftEye.current.position.y += (0.05 + eyeOffsetY - leftEye.current.position.y) * blend;
    }
    if (rightEye.current) {
      rightEye.current.position.x += (0.43 + eyeOffsetX - rightEye.current.position.x) * blend;
      rightEye.current.position.y += (0.05 + eyeOffsetY - rightEye.current.position.y) * blend;
    }
  });

  return (
    <group ref={group}>
      <mesh scale={[1.32, 1.14, 0.78]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshStandardMaterial color="#c7c9e4" metalness={0.65} roughness={0.24} />
      </mesh>
      <mesh position={[0, 0, 0.45]} scale={[1.14, 0.94, 0.5]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshPhysicalMaterial color="#060b23" metalness={0.45} roughness={0.16} clearcoat={1} />
      </mesh>

      {/* Eyes with subtle pupil-tracking parallax */}
      <mesh ref={leftEye} position={[-0.43, 0.05, 0.94]}>
        <shapeGeometry args={[star]} />
        <meshBasicMaterial color="#49efff" side={2} />
      </mesh>
      <mesh ref={rightEye} position={[0.43, 0.05, 0.94]}>
        <shapeGeometry args={[star]} />
        <meshBasicMaterial color="#ab83ff" side={2} />
      </mesh>

      {/* Ears & Antennae */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.47, 0.47, 0.24, 32]} />
            <meshStandardMaterial color="#8273b0" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[side * 1.2, 1.03, -0.1]} rotation={[0, 0, -side * 0.18]}>
            <boxGeometry args={[0.14, 0.85, 0.16]} />
            <meshStandardMaterial color="#98f5ff" emissive="#29c8e8" emissiveIntensity={0.7} />
          </mesh>
        </group>
      ))}

      {/* Mouth */}
      <mesh position={[0, -0.46, 0.9]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.17, 0.016, 8, 24, Math.PI]} />
        <meshBasicMaterial color="#64ddeb" />
      </mesh>

      {/* Orbit Rings */}
      <mesh rotation={[1.2, 0.2, 0.25]}>
        <torusGeometry args={[1.95, 0.009, 8, 100]} />
        <meshBasicMaterial color="#6174b0" transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[0.6, -0.6, -0.4]}>
        <torusGeometry args={[2.15, 0.006, 8, 100]} />
        <meshBasicMaterial color="#a37aff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function ContextHealth({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', onFailure);
    return () => canvas.removeEventListener('webglcontextlost', onFailure);
  }, [gl, onFailure]);
  return null;
}

export default function MascotScene({
  active,
  onFailure,
}: {
  active: boolean;
  onFailure: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.15, 6], fov: 46 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      fallback={<img src="/brand/starvis.jpg" alt="STARVIS mascot" />}
    >
      <ContextHealth onFailure={onFailure} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 5, 4]} intensity={4} color="#e7eeff" />
      <pointLight position={[-3, 0, 3]} intensity={14} color="#22dfff" />
      <pointLight position={[3, -1, 1]} intensity={20} color="#9857ff" />
      <Mascot />
    </Canvas>
  );
}
