import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface SectionHeadingProps {
  titleKey: string;
  subtitleKey?: string;
  accent?: boolean;
  centered?: boolean;
}

export function SectionHeading({ titleKey, subtitleKey, accent = true, centered = false }: SectionHeadingProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`mb-14 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      {subtitleKey && (
        <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-[#62E6D2]">
          {t(subtitleKey)}
        </p>
      )}
      <h2 className={`font-display text-3xl md:text-4xl font-bold ${accent ? 'text-[#F2F7FA]' : 'text-[#F2F7FA]'}`}>
        {t(titleKey)}
        {accent && (
          <span className="text-[#62E6D2]">.</span>
        )}
      </h2>
      <div className={`mt-4 h-px w-16 bg-gradient-to-r from-[#62E6D2] to-transparent ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
