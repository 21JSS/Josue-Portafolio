import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { Code2, Cpu, BookOpen, Target } from 'lucide-react';

export function About() {
  const { t } = useTranslation();
  const interests = t('about.interestsList', { returnObjects: true }) as string[];

  const cards = [
    {
      icon: <Code2 size={20} className="text-[#B8FF80]" />,
      titleKey: 'about.focus',
      textKey: 'about.focusText',
    },
    {
      icon: <BookOpen size={20} className="text-[#B8FF80]" />,
      titleKey: 'about.education',
      textKey: 'about.educationText',
    },
    {
      icon: <Target size={20} className="text-[#B8FF80]" />,
      titleKey: 'about.objective',
      textKey: 'about.objectiveText',
    },
  ];

  return (
    <section
      id="about"
      className="section bg-[#0A0F0A]"
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <SectionHeading titleKey="about.title" subtitleKey="about.subtitle" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: description */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <p className="text-[#A0AAA0] leading-relaxed text-base">
              {t('about.description')}
            </p>

            <p className="text-[#A0AAA0] leading-relaxed text-base">
              {t('about.focusText')}
            </p>

            {/* Interests */}
            <div>
              <h3 className="font-display font-semibold text-[#F4F7F2] mb-4 flex items-center gap-2">
                <Cpu size={18} className="text-[#B8FF80]" />
                {t('about.interests')}
              </h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {interests.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1.5 rounded-full border border-[#B8FF80]/20 bg-[#B8FF80]/06 text-sm text-[#B8FF80]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: info cards */}
          <div className="flex flex-col gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.titleKey}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative p-5 rounded-2xl bg-[#111611] border border-[#B8FF80]/08 hover:border-[#B8FF80]/20 transition-colors group"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8FF80]/20 to-transparent" />
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-[#B8FF80]/10 border border-[#B8FF80]/20 flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[#F4F7F2] mb-1 text-sm">
                      {t(card.titleKey)}
                    </h3>
                    <p className="text-sm text-[#A0AAA0] leading-relaxed">
                      {t(card.textKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
