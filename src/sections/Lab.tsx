import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { FlaskConical, Clock } from 'lucide-react';

const LAB_ITEMS = ['techOrb', 'particleField'] as const;

export function Lab() {
  const { t } = useTranslation();

  return (
    <section id="lab" className="section" aria-labelledby="lab-heading">
      <div className="section-container">
        <SectionHeading titleKey="lab.title" subtitleKey="lab.subtitle" />

        <p className="text-[#A0AAA0] mb-10 max-w-lg">{t('lab.description')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAB_ITEMS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-5 rounded-2xl bg-[#111611] border border-[#B8FF80]/08 hover:border-[#B8FF80]/20 transition-all group cursor-default"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8FF80]/15 to-transparent" />

              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#B8FF80]/08 border border-[#B8FF80]/15 flex items-center justify-center">
                  <FlaskConical size={18} className="text-[#B8FF80]" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#5A6A5A]">
                  <Clock size={12} />
                  {t('lab.comingSoon')}
                </div>
              </div>

              <h3 className="font-display font-semibold text-[#F4F7F2] text-sm mb-2 group-hover:text-[#B8FF80] transition-colors">
                {t(`lab.items.${key}.title`)}
              </h3>
              <p className="text-xs text-[#A0AAA0] leading-relaxed">
                {t(`lab.items.${key}.description`)}
              </p>
            </motion.div>
          ))}

          {/* Add more card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: LAB_ITEMS.length * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center p-5 rounded-2xl border border-dashed border-[#B8FF80]/12 text-[#5A6A5A] text-sm text-center"
          >
            <div>
              <p className="font-display font-medium text-[#A0AAA0] mb-1">Más experimentos</p>
              <p className="text-xs">próximamente...</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
