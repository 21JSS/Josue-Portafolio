import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function RingOrbit({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  const geometry = useMemo(() => new THREE.TorusGeometry(radius, 0.005, 6, 80), [radius]);
  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.38 }),
    [color]
  );

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]} geometry={geometry} material={material} />
  );
}

function Particles() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // A deterministic spherical distribution stays stable across React renders.
      const theta = i * 2.399963229728653;
      const y = 1 - (i / (count - 1)) * 2;
      const phi = Math.acos(y);
      const r = 2.2 + ((i * 37) % count) / count * 1.4;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial color="#55B8D8" size={0.045} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function PortraitOrbit() {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const pointCount = 210;
    const points = new Float32Array(pointCount * 3);
    const tints = new Float32Array(pointCount * 3);
    const palette = [new THREE.Color('#62E6D2'), new THREE.Color('#55B8D8'), new THREE.Color('#F4B860')];

    for (let i = 0; i < pointCount; i++) {
      const ring = i % 3;
      const pointOnRing = Math.floor(i / 3);
      const angle = (pointOnRing / 70) * Math.PI * 2 + ring * 0.34;
      const radius = [1.32, 1.49, 1.68][ring];
      const arcGap = Math.sin(angle * 1.5 + ring) > -0.72;
      const index = i * 3;

      points[index] = Math.cos(angle) * radius;
      points[index + 1] = Math.sin(angle) * radius * 0.94;
      points[index + 2] = Math.sin(angle * 2 + ring) * 0.08 + (ring - 1) * 0.035;

      const color = palette[ring].clone().multiplyScalar(arcGap ? 0.9 : 0.18);
      tints[index] = color.r;
      tints[index + 1] = color.g;
      tints[index + 2] = color.b;
    }

    return { positions: points, colors: tints };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.035;
      ref.current.rotation.y = Math.sin(_.clock.elapsedTime * 0.25) * 0.08;
    }
  });

  return (
    <points ref={ref} rotation={[0.12, 0, 0]} scale={2.24}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.88}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function TechOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!orbRef.current || !groupRef.current) return;
    const t = clock.getElapsedTime();

    // Slow spin
    orbRef.current.rotation.y = t * 0.15;
    orbRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;

    if (haloRef.current) {
      const pulse = 1 + Math.sin(t * 0.8) * 0.025;
      haloRef.current.scale.setScalar(pulse);
      haloRef.current.rotation.z = t * 0.04;
    }

    // Subtle pointer tracking
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.3,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * -0.2,
      0.02
    );

  });

  return (
    <group ref={groupRef}>
      {/* A floating constellation circles the portrait without a square particle field. */}
      <PortraitOrbit />

      {/* Ambient particles */}
      <Particles />

      {/* Orbital rings */}
      <RingOrbit radius={1.6} tilt={Math.PI / 5} speed={0.3} color="#62E6D2" />
      <RingOrbit radius={1.9} tilt={Math.PI / 3} speed={-0.2} color="#55B8D8" />
      <RingOrbit radius={2.1} tilt={Math.PI / 1.8} speed={0.15} color="#F4B860" />

      {/* Soft animated halo adds depth without adding another heavy mesh. */}
      <mesh ref={haloRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.28, 0.012, 8, 96]} />
        <meshBasicMaterial color="#F4B860" transparent opacity={0.28} />
      </mesh>

      {/* Core orb */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Sphere ref={orbRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#0A2632"
            emissive="#174C5B"
            emissiveIntensity={0.7}
            roughness={0.15}
            metalness={0.8}
            distort={0.25}
            speed={1.5}
          />
        </Sphere>

        {/* Turquoise rim glow sphere */}
        <Sphere args={[1.02, 32, 32]}>
          <meshBasicMaterial
            color="#62E6D2"
            transparent
            opacity={0.06}
            side={THREE.BackSide}
          />
        </Sphere>
      </Float>

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#62E6D2" />
      <pointLight position={[-3, -2, -2]} intensity={1} color="#55B8D8" />
      <pointLight position={[0, 2.5, 2]} intensity={0.65} color="#F4B860" />
    </group>
  );
}
