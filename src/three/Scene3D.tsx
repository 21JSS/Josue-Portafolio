import { Suspense, useSyncExternalStore } from 'react';
import { Canvas } from '@react-three/fiber';
import { TechOrb } from './TechOrb';

const webglSupported = (() => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
})();

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

function subscribeToMotionPreference(onChange: () => void) {
  motionPreference.addEventListener('change', onChange);
  return () => motionPreference.removeEventListener('change', onChange);
}

function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-48">
        {/* CSS fallback orb */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#174C5B] to-[#07111A] border border-[#62E6D2]/30 shadow-[0_0_60px_rgba(98,230,210,0.15)] animate-float" />
        <div className="absolute inset-[-8px] rounded-full border border-[#62E6D2]/10 animate-pulse-glow" />
        <div className="absolute inset-[-16px] rounded-full border border-[#62E6D2]/05" />
      </div>
    </div>
  );
}



export function Scene3D() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => motionPreference.matches,
    () => false
  );

  if (webglSupported === false || prefersReducedMotion === true) {
    return <WebGLFallback />;
  }

  return (
    <div className="w-full h-full" aria-hidden="true">
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
