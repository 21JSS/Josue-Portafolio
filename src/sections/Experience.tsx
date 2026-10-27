import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { experience } from '../data/experience';
import { Briefcase, GraduationCap } from 'lucide-react';

export function Experience() {
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      className="section bg-[#07111A]"
      aria-labelledby="experience-heading"
    >
      <div className="section-container">
        <SectionHeading titleKey="experience.title" subtitleKey="experience.subtitle" />

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#62E6D2]/30 via-[#62E6D2]/10 to-transparent"
            aria-hidden="true"
          />

          <ol className="relative flex flex-col gap-8 md:gap-12" role="list">
            {experience.map((item, i) => {
              const isRight = i % 2 === 0;
              const title = t(`${item.key}.title`);
              const description = t(`${item.key}.description`);
              const responsibilities = t(`${item.key}.responsibilities`, {
                returnObjects: true,
              }) as string[];

              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: isRight ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-stretch gap-x-4 md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] md:gap-x-6"
                >
                  {/* Timeline dot */}
                  <div
                    className="relative z-10 col-start-1 row-start-1 my-auto flex h-10 w-10 items-center justify-center self-center rounded-full border-2 border-[#62E6D2]/40 bg-[#10202B] md:col-start-2 md:mx-auto md:h-12 md:w-12"
                    aria-hidden="true"
                  >
                    {item.type === 'work' ? (
                      <Briefcase size={16} className="text-[#62E6D2]" />
                    ) : (
                      <GraduationCap size={16} className="text-[#62E6D2]" />
                    )}
                  </div>

                  {/* Content card */}
                  <div
                    className={`relative col-start-2 row-start-1 min-w-0 ${
                      isRight ? 'md:col-start-3 md:text-left' : 'md:col-start-1 md:row-start-1 md:text-right'
                    }`}
                  >
                    <div className="bg-[#10202B] border border-[#62E6D2]/08 rounded-2xl p-5 hover:border-[#62E6D2]/20 transition-colors">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#62E6D2]/20 to-transparent rounded-t-2xl" />

                      {/* Date + org */}
                      <div className={`mb-3 flex flex-wrap items-center gap-2 ${isRight ? '' : 'md:justify-end'}`}>
                        <span className="text-xs font-medium text-[#62E6D2] bg-[#62E6D2]/08 border border-[#62E6D2]/20 px-3 py-1 rounded-full">
                          {item.startDate} — {item.endDate ?? t('experience.present')}
                        </span>
                        <span className="text-xs text-[#718591]">{item.organization}</span>
                      </div>

                      <h3 className="font-display font-semibold text-[#F2F7FA] mb-2 text-sm leading-tight">
                        {title}
                      </h3>

                      <p className="text-xs text-[#A2B4BE] leading-relaxed mb-3">
                        {description}
                      </p>

                      {responsibilities?.length > 0 && (
                        <ul className={`flex flex-col gap-1 text-xs text-[#718591] ${isRight ? '' : 'md:items-end'}`} role="list">
                          {responsibilities.map((r) => (
                            <li key={r} className="flex items-start gap-1.5">
                              {isRight && <span className="mt-1 flex-shrink-0 text-[#62E6D2]" aria-hidden="true">▸</span>}
                              <span>{r}</span>
                              {!isRight && <span className="mt-1 flex-shrink-0 text-[#62E6D2]" aria-hidden="true">◂</span>}
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.tech && item.tech.length > 0 && (
                        <div className={`mt-3 flex flex-wrap gap-1.5 ${isRight ? '' : 'md:justify-end'}`}>
                          {item.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-full text-xs bg-white/05 border border-white/08 text-[#A2B4BE]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
