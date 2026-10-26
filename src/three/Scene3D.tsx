import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { TechOrb } from './TechOrb';

function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-48">
        {/* CSS fallback orb */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1A4A1A] to-[#080A08] border border-[#B8FF80]/30 shadow-[0_0_60px_rgba(184,255,128,0.15)] animate-float" />
        <div className="absolute inset-[-8px] rounded-full border border-[#B8FF80]/10 animate-pulse-glow" />
        <div className="absolute inset-[-16px] rounded-full border border-[#B8FF80]/05" />
      </div>
    </div>
  );
}



export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    // Check motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!webglSupported || prefersReducedMotion) {
    return <WebGLFallback />;
  }

  return (
    <div ref={containerRef} className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <TechOrb />
        </Suspense>
      </Canvas>
    </div>
  );
}
