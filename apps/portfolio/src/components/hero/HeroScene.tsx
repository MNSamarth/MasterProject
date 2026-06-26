"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Edges,
  Environment,
  Float,
  Sparkles,
  Stars,
  useCursor,
} from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ── Constants ──────────────────────────────────────── */
const SHAPE_COUNT = 3;
const ACCENT  = "#6366f1";
const CYAN    = "#22d3ee";
const VIOLET  = "#a78bfa";

/* ── Geometry switcher ──────────────────────────────── */
function Geometry({ index }: { index: number }) {
  switch (index % SHAPE_COUNT) {
    case 1:  return <torusKnotGeometry args={[0.75, 0.22, 140, 16]} />;
    case 2:  return <octahedronGeometry args={[1.08, 2]} />;
    default: return <icosahedronGeometry args={[1.12, 3]} />;
  }
}

/* ── Orbiting particle ring ─────────────────────────── */
function ParticleRing({
  count  = 110,
  radius = 2.2,
  color  = ACCENT,
  size   = 0.022,
  speed  = 0.12,
  tiltX  = 0,
  tiltZ  = 0,
}: {
  count?:  number;
  radius?: number;
  color?:  string;
  size?:   number;
  speed?:  number;
  tiltX?:  number;
  tiltZ?:  number;
}) {
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle  = (i / count) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.11;
      positions[i * 3]     = Math.cos(angle) * (radius + spread);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.09;
      positions[i * 3 + 2] = Math.sin(angle) * (radius + spread);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count, radius]);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * speed;
    ref.current.rotation.x = tiltX;
    ref.current.rotation.z = tiltZ;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.78}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Central interactive orb ────────────────────────── */
function Orb({
  shapeIndex,
  onCycleShape,
}: {
  shapeIndex:   number;
  onCycleShape: () => void;
}) {
  const meshRef     = useRef<THREE.Mesh>(null);
  const ringRef     = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [hovered,  setHovered]  = useState(false);
  const [dragging, setDragging] = useState(false);

  const lastPtrRef   = useRef<{ x: number; y: number } | null>(null);
  const movedRef     = useRef(false);
  const dragOffset   = useRef({ x: 0, y: 0 });
  const dragVel      = useRef({ x: 0, y: 0 });
  const pulseAtRef   = useRef(0);

  useCursor(hovered || dragging);

  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color:      new THREE.Color(ACCENT),
        transparent: true,
        opacity:    0.24,
        metalness:  0.45,
        roughness:  0.28,
      }),
    [],
  );

  useEffect(() => () => { ringMat.dispose(); }, [ringMat]);
  useEffect(() => { pulseAtRef.current = performance.now(); }, [shapeIndex]);

  useFrame(({ clock, pointer }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t   = clock.getElapsedTime();
    const now = performance.now();

    /* Orb drifts to the right of screen center and follows cursor gently */
    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, pointer.x * 0.14 + 1.05, 0.05);
    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, pointer.y * 0.11,          0.05);

    /* Drag inertia */
    if (!dragging) {
      dragOffset.current.x += dragVel.current.x;
      dragOffset.current.y += dragVel.current.y;
      dragVel.current.x    *= 0.91;
      dragVel.current.y    *= 0.91;
    }

    mesh.rotation.x = t * 0.14 + pointer.y * 0.2  + dragOffset.current.y;
    mesh.rotation.y = t * 0.18 + pointer.x * 0.26 + dragOffset.current.x;
    mesh.rotation.z = t * 0.045;

    /* Shape-change pulse */
    const dt = now - pulseAtRef.current;
    mesh.scale.setScalar(dt < 700 ? 1 + 0.09 * Math.exp(-dt / 240) : 1);

    /* Ring follows orb */
    const ring = ringRef.current;
    if (ring) {
      ring.rotation.x = t * 0.48 + pointer.y * 0.28;
      ring.rotation.y = t * 0.62 + pointer.x * 0.38;
      ring.rotation.z = t * 0.1;
      ring.position.x = mesh.position.x * 0.75;
      ring.position.y = mesh.position.y * 0.75;
    }

    /* Material responds to hover */
    const mat = materialRef.current;
    if (mat) {
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, hovered ? 0.55 : 0.22, 0.1);
      mat.roughness         = THREE.MathUtils.lerp(mat.roughness, hovered ? 0.06 : 0.14, 0.1);
    }
  });

  return (
    <Float speed={0.9} rotationIntensity={0.35} floatIntensity={0.75}>
      <group>
        {/* Outer glow halo */}
        <mesh scale={1.22}>
          <Geometry index={shapeIndex} />
          <meshBasicMaterial
            color={ACCENT}
            transparent
            opacity={0.055}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Second, softer halo in cyan */}
        <mesh scale={1.38}>
          <Geometry index={shapeIndex} />
          <meshBasicMaterial
            color={CYAN}
            transparent
            opacity={0.022}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Main interactive mesh */}
        <mesh
          ref={meshRef}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true);  }}
          onPointerOut={(e)  => {
            e.stopPropagation();
            setHovered(false);
            setDragging(false);
            lastPtrRef.current = null;
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            setDragging(true);
            movedRef.current   = false;
            lastPtrRef.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
            dragVel.current    = { x: 0, y: 0 };
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            setDragging(false);
            lastPtrRef.current = null;
          }}
          onPointerMove={(e) => {
            if (!dragging) return;
            e.stopPropagation();
            const last = lastPtrRef.current;
            const x = e.nativeEvent.clientX;
            const y = e.nativeEvent.clientY;
            if (!last) { lastPtrRef.current = { x, y }; return; }
            const dx = x - last.x;
            const dy = y - last.y;
            lastPtrRef.current = { x, y };
            if (Math.abs(dx) + Math.abs(dy) > 2) movedRef.current = true;
            const s = 0.0042;
            dragOffset.current.x += dx * s;
            dragOffset.current.y += dy * s;
            dragVel.current.x = THREE.MathUtils.lerp(dragVel.current.x, dx * s, 0.35);
            dragVel.current.y = THREE.MathUtils.lerp(dragVel.current.y, dy * s, 0.35);
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!movedRef.current) onCycleShape();
          }}
        >
          <Geometry index={shapeIndex} />
          <meshPhysicalMaterial
            ref={materialRef}
            color="#040810"
            emissive={ACCENT}
            emissiveIntensity={0.22}
            metalness={0.96}
            roughness={0.14}
            clearcoat={0.92}
            clearcoatRoughness={0.12}
            envMapIntensity={1.5}
          />
          <Edges color={ACCENT} opacity={0.42} transparent />
        </mesh>

        {/* Orbiting torus ring */}
        <mesh ref={ringRef} material={ringMat}>
          <torusGeometry args={[1.58, 0.016, 8, 80]} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Scene wrapper / exports ────────────────────────── */
export function HeroScene({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [shapeIndex, setShapeIndex] = useState(0);

  if (reduceMotion) return null;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 48 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.10} />
        <pointLight position={[2.2, 2.5, 3.0]} intensity={4.0} color={ACCENT} />
        <pointLight position={[-2.5, -1.5, 2.0]} intensity={3.2} color={CYAN} />
        <pointLight position={[0.0,  3.5, 1.5]} intensity={1.4} color="#ffffff" />
        <pointLight position={[1.5, -2.0, 1.0]} intensity={1.8} color={VIOLET} />

        {/* Environment map for metal reflections */}
        <Environment preset="city" background={false} />

        {/* Star field */}
        <Stars
          radius={90}
          depth={55}
          count={3500}
          factor={2.4}
          saturation={0}
          fade
          speed={0.35}
        />

        {/* Ambient sparkles */}
        <Sparkles count={65} scale={9}  size={0.85} speed={0.18} color={ACCENT}  opacity={0.48} />
        <Sparkles count={42} scale={12} size={0.50} speed={0.10} color={CYAN}    opacity={0.32} />
        <Sparkles count={28} scale={6}  size={1.10} speed={0.25} color={VIOLET}  opacity={0.28} />

        {/* Particle rings at different inclinations */}
        <ParticleRing count={100} radius={2.20} color={ACCENT}  size={0.022} speed={ 0.13} tiltX={ 0.40} />
        <ParticleRing count={75}  radius={2.85} color={CYAN}    size={0.018} speed={-0.08} tiltX={-0.28} tiltZ={0.52} />
        <ParticleRing count={52}  radius={1.82} color={VIOLET}  size={0.015} speed={ 0.20} tiltX={ 1.10} tiltZ={0.88} />

        {/* Central orb */}
        <Orb
          shapeIndex={shapeIndex}
          onCycleShape={() => setShapeIndex((v) => (v + 1) % SHAPE_COUNT)}
        />
      </Canvas>
    </div>
  );
}
