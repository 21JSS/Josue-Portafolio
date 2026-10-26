import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_LINKS = ['home', 'projects', 'about', 'skills', 'experience', 'contact'] as const;

const SECTION_IDS: Record<typeof NAV_LINKS[number], string> = {
  home: 'hero',
  projects: 'projects',
  about: 'about',
  skills: 'skills',
  experience: 'experience',
  contact: 'contact',
};

export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('home');

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const key = Object.keys(SECTION_IDS).find(
              (k) => SECTION_IDS[k as typeof NAV_LINKS[number]] === id
            );
            if (key) setActive(key);
          }
        }
      },
      { threshold: 0.3 }
    );

    Object.values(SECTION_IDS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-2 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#080A08]/90 backdrop-blur-md border-b border-[#B8FF80]/08 shadow-[0_1px_0_rgba(184,255,128,0.05)]'
        : 'bg-transparent'
        }`}
      role="banner"
    >
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-5 focus:left-5 bg-[#B8FF80] text-[#080A08] px-4 py-2 rounded-full text-sm font-medium z-50"
      >
        {t('a11y.skipToContent')}
      </a>

      <nav
        className="page-shell flex items-center justify-between py-4"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-display text-2xl font-bold tracking-tight text-[#F4F7F2] hover:text-[#B8FF80] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF80] rounded"
          aria-label="JOSS.DEV — Go to top"
        >
          JOSS<span className="text-[#B8FF80] text-2xl" >.DEV</span>
        </button>

        {/* Desktop links */}
        <ul className="main-nav-links hidden md:flex items-center" role="list">
          {NAV_LINKS.map((key) => (
            <li key={key}>
              <button
                onClick={() => scrollTo(SECTION_IDS[key])}
                aria-current={active === key ? 'page' : undefined}
                className={`main-nav-link relative rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF80] ${active === key
                  ? 'text-[#B8FF80]'
                  : 'text-[#A0AAA0] hover:text-[#F4F7F2]'
                  }`}
              >
                <span className="relative z-10">{t(`nav.${key}`)}</span>
                {active === key && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 z-0 rounded-full bg-[#B8FF80]/10 border border-[#B8FF80]/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: Language + Mobile menu btn */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden md:flex" />

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/05 text-[#A0AAA0] hover:text-[#F4F7F2] hover:border-[#B8FF80]/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF80]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#B8FF80]/08 bg-[#080A08]/95 backdrop-blur-md"
          >
            <ul className="flex flex-col px-4 py-4 gap-1" role="list">
              {NAV_LINKS.map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => scrollTo(SECTION_IDS[key])}
                    aria-current={active === key ? 'page' : undefined}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-150 ${active === key
                      ? 'bg-[#B8FF80]/10 text-[#B8FF80] border border-[#B8FF80]/20'
                      : 'text-[#A0AAA0] hover:text-[#F4F7F2] hover:bg-white/05'
                      }`}
                  >
                    {t(`nav.${key}`)}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="px-8 pb-6">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
