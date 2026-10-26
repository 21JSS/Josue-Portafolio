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
    <footer className="border-t border-[#62E6D2]/08 py-8 px-4 text-center" role="contentinfo">
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
