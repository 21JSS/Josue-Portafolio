import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, GitBranch } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useTranslation();
  const key = project.key;

  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const features = t(`${key}.features`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="group relative flex flex-col bg-[#111611] border border-[#B8FF80]/08 rounded-2xl overflow-hidden hover:border-[#B8FF80]/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,255,128,0.06)]"
    >
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8FF80]/30 to-transparent" />

      {/* Visual area */}
      <div className="relative h-48 bg-gradient-to-br from-[#151A15] to-[#0D120D] overflow-hidden flex items-center justify-center">
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="relative z-10 w-16 h-16 rounded-full border border-[#B8FF80]/20 bg-[#B8FF80]/05 flex items-center justify-center">
          <span className="text-2xl font-display font-bold text-[#B8FF80]/40">
            {title.charAt(0)}
          </span>
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-[#B8FF80]/10 border border-[#B8FF80]/20 px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8FF80] animate-pulse-glow" />
            <span className="text-xs font-medium text-[#B8FF80]">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <h3 className="text-lg font-display font-semibold text-[#F4F7F2] group-hover:text-[#B8FF80] transition-colors duration-200">
          {title}
        </h3>

        <p className="text-sm text-[#A0AAA0] leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Features */}
        <p className="text-xs text-[#5A6A5A] leading-relaxed">
          <span className="text-[#B8FF80]/60 font-medium">Features: </span>
          {features}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/05 border border-white/08 text-[#A0AAA0]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-white/05">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-[#B8FF80] hover:text-[#B8FF80] hover:underline transition-colors"
              aria-label={`${t('projects.demo')} — ${title}`}
            >
              <ExternalLink size={13} />
              {t('projects.demo')}
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-[#5A6A5A]">
              <ExternalLink size={13} />
              {t('projects.noDemo')}
            </span>
          )}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-[#A0AAA0] hover:text-[#F4F7F2] transition-colors"
              aria-label={`${t('projects.code')} — ${title}`}
            >
              <GitBranch size={13} />
              {t('projects.code')}
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-[#5A6A5A]">
              <GitBranch size={13} />
              {t('projects.noRepo')}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
