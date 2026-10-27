export interface Project {
  id: string;
  key: string; // i18n key prefix
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'inventory-system',
    key: 'projects.items.inventory',
    tech: ['React', 'TypeScript', 'ASP.NET Core', 'SQL Server', 'Tailwind CSS'],
    repoUrl: '',
    demoUrl: '',
    featured: true,
  },
  {
    id: 'image-recognition',
    key: 'projects.items.imageRecognition',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'NumPy'],
    repoUrl: '',
    demoUrl: '',
    featured: true,
  },
  {
    id: 'configurable-project',
    key: 'projects.items.configurable',
    tech: ['React', 'TypeScript', 'Node.js'],
    repoUrl: '',
    demoUrl: '',
    featured: false,
  },
];
