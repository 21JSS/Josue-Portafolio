import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function InteractiveField() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0.5, 0.5));
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uScroll: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
    };
    const updateSize = () => uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    updatePointer({ clientX: window.innerWidth * 0.5, clientY: window.innerHeight * 0.5 } as PointerEvent);
    updateSize();
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('resize', updateSize, { passive: true });
    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('resize', updateSize);
    };
  }, [uniforms]);

  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uPointer.value.lerp(pointer.current, 0.055);
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    material.current.uniforms.uScroll.value = scrollRange > 0 ? window.scrollY / scrollRange : 0;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={/* glsl */`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uPointer;
          uniform float uScroll;
          uniform vec2 uResolution;
          void main() {
            vUv = uv;
            vec3 p = position;
            vec2 aspectUv = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
            vec2 pointerUv = (uPointer - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
            float d = distance(aspectUv, pointerUv);
            float cursorWave = sin(d * 34.0 - uTime * 3.2) * exp(-d * 4.0);
            float ambientWave = sin(uv.x * 13.0 + uTime * 0.22 + uScroll * 5.0)
                              * cos(uv.y * 10.0 - uTime * 0.18 + uScroll * 3.0);
            p.z += cursorWave * 0.12 + ambientWave * 0.035;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `}
        fragmentShader={/* glsl */`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uPointer;
          uniform float uScroll;
          uniform vec2 uResolution;
          void main() {
            vec2 aspectUv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
            vec2 pointerUv = (uPointer - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
            float d = distance(aspectUv, pointerUv);
            float wave = 0.5 + 0.5 * sin(d * 34.0 - uTime * 3.2);
            float falloff = exp(-d * 4.2);
            vec2 grid = abs(fract(vUv * vec2(78.0, 48.0) + vec2(uScroll * 0.025, 0.0)) - 0.5);
            float dots = 1.0 - smoothstep(0.055, 0.14, length(grid));
            float gridX = 1.0 - smoothstep(0.0, 0.012, grid.x);
            float gridY = 1.0 - smoothstep(0.0, 0.012, grid.y);
            float lattice = max(dots * 0.72, max(gridX, gridY) * 0.12);
            float glow = falloff * (0.3 + wave * 0.7);
            float drift = 0.55 + 0.45 * sin(vUv.y * 8.0 + uTime * 0.2 + uScroll * 6.283);
            vec3 color = mix(vec3(0.15, 0.48, 0.67), vec3(0.22, 0.82, 0.74), clamp(glow + drift * 0.18, 0.0, 1.0));
            float alpha = lattice * (0.16 + glow * 0.7) * (0.78 + drift * 0.22);
            gl_FragColor = vec4(color, alpha);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function WebAtmosphere() {
  return (
    <div className="web-atmosphere" aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <InteractiveField />
      </Canvas>
    </div>
  );
}
