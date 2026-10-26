import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { TechIcon } from '../components/TechIcon';
import { skills } from '../data/skills';
import type { TechItem } from '../data/skills';

type Category = TechItem['category'];
const CATEGORY_ORDER: Category[] = ['frontend', 'backend', 'language', 'database', 'tools'];

export function Skills() {
  const { t } = useTranslation();

  const grouped = CATEGORY_ORDER.reduce<Record<Category, TechItem[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {} as Record<Category, TechItem[]>);

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="section-container">
        <SectionHeading titleKey="skills.title" subtitleKey="skills.subtitle" />

        <div className="flex flex-col gap-10">
          {CATEGORY_ORDER.map((cat, catIndex) => {
            const items = grouped[cat];
            if (!items?.length) return null;

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.08 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-[#B8FF80] mb-5">
                  {t(`skills.categories.${cat}`)}
                </h3>

                <div className="flex flex-wrap gap-x-6 gap-y-7">
                  {items.map((skill) => (
                    <TechIcon
                      key={skill.name}
                      {...skill}
                      size="md"
                      showLabel
                    />
                  ))}
                </div>

                <div className="mt-5 h-px bg-gradient-to-r from-[#B8FF80]/10 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-[#5A6A5A] text-center">
          Pasa el cursor sobre cada icono para ver el nivel de dominio
        </p>
      </div>
    </section>
  );
}
