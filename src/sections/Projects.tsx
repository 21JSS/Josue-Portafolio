import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="section-container">
        <SectionHeading
          titleKey="projects.title"
          subtitleKey="projects.subtitle"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <p className="mt-8 text-xs text-[#5A6A5A] text-center">
          {t('projects.noRepo')} — {' '}
          <span className="text-[#A0AAA0]">Proyectos adicionales disponibles en GitHub</span>
        </p>
      </div>
    </section>
  );
}
