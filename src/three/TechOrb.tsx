import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
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
      <pointsMaterial color="#55B8D8" size={0.025} transparent opacity={0.7} sizeAttenuation />
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
      {/* Stars background */}
      <Stars radius={12} depth={8} count={300} factor={1.2} fade speed={0.5} />

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
