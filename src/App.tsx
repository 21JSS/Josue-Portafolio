import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Lab } from './sections/Lab';
import { Contact } from './sections/Contact';

function Footer() {
  return (
    <footer className="border-t border-[#B8FF80]/08 py-8 px-4 text-center" role="contentinfo">
      <p className="text-xs text-[#5A6A5A]">
        © {new Date().getFullYear()}{' '}
        <span className="text-[#B8FF80] font-display font-semibold">JOSS.DEV</span>
        {' '}— Todos los derechos reservados
      </p>
      <p className="text-xs text-[#5A6A5A] mt-1">
        Construido con React, TypeScript, Tailwind CSS & Three.js
      </p>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-svh bg-[#080A08] text-[#F4F7F2] overflow-x-hidden">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Lab />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
