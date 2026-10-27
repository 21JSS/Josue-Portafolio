import { lazy, Suspense } from 'react';
import { motion, type Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { socialLinks } from '../data/socialLinks';
import { SocialIcon } from '../components/SocialIcon';
import { ProfilePhotoPlaceholder } from '../components/ProfilePhotoPlaceholder';

const Scene3D = lazy(() =>
  import('../three/Scene3D').then((m) => ({ default: m.Scene3D }))
);

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function Hero() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col justify-center overflow-hidden grid-pattern"
      aria-labelledby="hero-heading"
    >
      {/* Gradient blobs */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #62E6D2 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-[0.05] blur-3xl"
        style={{ background: 'radial-gradient(circle, #55B8D8 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="page-shell relative z-10 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Left: text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex min-w-0 flex-col gap-7 lg:gap-8"
          >
            {/* Availability badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#62E6D2]/20 bg-[#62E6D2]/08 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-[#62E6D2] animate-pulse-glow" aria-hidden="true" />
                <span className="text-xs font-medium text-[#62E6D2] tracking-wide">
                  {t('hero.available')}
                </span>
              </div>
            </motion.div>

            {/* Role label */}
            <motion.p variants={fadeUp} className="text-sm font-medium tracking-[0.2em] uppercase text-[#A2B4BE]">
              {t('hero.role')}
            </motion.p>

            {/* Main heading */}
            <motion.div variants={fadeUp}>
              <h1 id="hero-heading" className="font-display font-bold leading-none">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F2F7FA]">
                  {t('hero.greeting')}{' '}
                  <span className="text-[#62E6D2]">{t('hero.name')}</span>
                </span>
              </h1>
              <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-display font-medium text-[#A2B4BE] leading-snug">
                {t('hero.tagline')}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeUp} className="text-base text-[#A2B4BE] leading-relaxed max-w-md">
              {t('hero.description')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="hero-actions flex flex-wrap">
              <Button
                onClick={() => scrollTo('experience')}
                variant="primary"
                size="lg"
                icon={<ChevronRight size={16} />}
              >
                {t('hero.cta_experience')}
              </Button>
              <Button
                onClick={() => scrollTo('about')}
                variant="secondary"
                size="lg"
              >
                {t('hero.cta_about')}
              </Button>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
              {socialLinks.map((link) => (
                <SocialIcon
                  key={link.id}
                  {...link}
                  size="md"
                  showTooltip={true}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right: photo + 3D scene */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
            className="flex min-w-0 items-center justify-center"
          >
            <div className="relative h-72 w-full max-w-xl sm:h-80 lg:h-[28rem]">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#62E6D2]/30 border-t-[#62E6D2] animate-spin" />
                </div>
              }>
                <Scene3D />
              </Suspense>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <ProfilePhotoPlaceholder
                  photoUrl="/josue-profile.webp"
                  alt={t('hero.photoAlt')}
                  size="xl"
                  className="h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:bottom-6"
        aria-hidden="true"
      >
        <span className="text-xs text-[#718591] tracking-widest uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-[#62E6D2]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
