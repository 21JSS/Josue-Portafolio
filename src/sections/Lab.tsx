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

        <p className="text-[#A2B4BE] mb-10 max-w-lg">{t('lab.description')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAB_ITEMS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-5 rounded-2xl bg-[#10202B] border border-[#62E6D2]/08 hover:border-[#62E6D2]/20 transition-all group cursor-default"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#62E6D2]/15 to-transparent" />

              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#62E6D2]/08 border border-[#62E6D2]/15 flex items-center justify-center">
                  <FlaskConical size={18} className="text-[#62E6D2]" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#718591]">
                  <Clock size={12} />
                  {t('lab.comingSoon')}
                </div>
              </div>

              <h3 className="font-display font-semibold text-[#F2F7FA] text-sm mb-2 group-hover:text-[#62E6D2] transition-colors">
                {t(`lab.items.${key}.title`)}
              </h3>
              <p className="text-xs text-[#A2B4BE] leading-relaxed">
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
            className="flex items-center justify-center p-5 rounded-2xl border border-dashed border-[#62E6D2]/12 text-[#718591] text-sm text-center"
          >
            <div>
              <p className="font-display font-medium text-[#A2B4BE] mb-1">Más experimentos</p>
              <p className="text-xs">próximamente...</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
