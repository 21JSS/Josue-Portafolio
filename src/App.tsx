import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';

const WebAtmosphere = lazy(() =>
  import('./three/WebAtmosphere').then((module) => ({ default: module.WebAtmosphere }))
);

function Footer() {
  return (
    <footer className="relative z-[1] border-t border-[#62E6D2]/08 py-8 px-4 text-center" role="contentinfo">
      <p className="text-xs text-[#718591]">
        © {new Date().getFullYear()}{' '}
        <span className="text-[#62E6D2] font-display font-semibold">JOSS.DEV</span>
        {' '}— Todos los derechos reservados
      </p>
      <p className="text-xs text-[#718591] mt-1">
        Construido con React, TypeScript, Tailwind CSS & Three.js
      </p>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-svh bg-[#07111A] text-[#F2F7FA] overflow-x-hidden">
      <Suspense fallback={null}>
        <WebAtmosphere />
      </Suspense>
      <Navbar />
      <main id="main-content" className="relative z-[1]">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
