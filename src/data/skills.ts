export interface TechItem {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  category: 'frontend' | 'backend' | 'database' | 'language' | 'tools';
  level: 'learning' | 'intermediate' | 'advanced' | 'expert';
  icon: string; // SVG path or identifier
}

export const skills: TechItem[] = [
  // Frontend
  { name: 'React', color: '#61DAFB', bgColor: 'rgba(97,218,251,0.08)', borderColor: 'rgba(97,218,251,0.3)', category: 'frontend', level: 'advanced', icon: 'react' },
  { name: 'TypeScript', color: '#3178C6', bgColor: 'rgba(49,120,198,0.08)', borderColor: 'rgba(49,120,198,0.3)', category: 'frontend', level: 'advanced', icon: 'typescript' },
  { name: 'JavaScript', color: '#F7DF1E', bgColor: 'rgba(247,223,30,0.08)', borderColor: 'rgba(247,223,30,0.3)', category: 'frontend', level: 'advanced', icon: 'javascript' },
  { name: 'HTML5', color: '#E34F26', bgColor: 'rgba(227,79,38,0.08)', borderColor: 'rgba(227,79,38,0.3)', category: 'frontend', level: 'expert', icon: 'html5' },
  { name: 'CSS3', color: '#1572B6', bgColor: 'rgba(21,114,182,0.08)', borderColor: 'rgba(21,114,182,0.3)', category: 'frontend', level: 'advanced', icon: 'css3' },
  { name: 'Tailwind CSS', color: '#06B6D4', bgColor: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.3)', category: 'frontend', level: 'advanced', icon: 'tailwind' },
  { name: 'Vite', color: '#646CFF', bgColor: 'rgba(100,108,255,0.08)', borderColor: 'rgba(100,108,255,0.3)', category: 'tools', level: 'intermediate', icon: 'vite' },

  // Backend
  { name: 'ASP.NET Core', color: '#512BD4', bgColor: 'rgba(81,43,212,0.08)', borderColor: 'rgba(81,43,212,0.3)', category: 'backend', level: 'intermediate', icon: 'dotnet' },
  { name: 'Node.js', color: '#8CC84B', bgColor: 'rgba(140,200,75,0.08)', borderColor: 'rgba(140,200,75,0.3)', category: 'backend', level: 'intermediate', icon: 'nodejs' },

  // Languages
  { name: 'C#', color: '#9B4F96', bgColor: 'rgba(155,79,150,0.08)', borderColor: 'rgba(155,79,150,0.3)', category: 'language', level: 'intermediate', icon: 'csharp' },
  { name: 'Python', color: '#3776AB', bgColor: 'rgba(55,118,171,0.08)', borderColor: 'rgba(55,118,171,0.3)', category: 'language', level: 'intermediate', icon: 'python' },

  // Database
  { name: 'SQL Server', color: '#CC2927', bgColor: 'rgba(204,41,39,0.08)', borderColor: 'rgba(204,41,39,0.3)', category: 'database', level: 'intermediate', icon: 'sql' },

  // Tools
  { name: 'Git', color: '#F05032', bgColor: 'rgba(240,80,50,0.08)', borderColor: 'rgba(240,80,50,0.3)', category: 'tools', level: 'advanced', icon: 'git' },
  { name: 'Three.js', color: '#FFFFFF', bgColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)', category: 'tools', level: 'learning', icon: 'threejs' },
];
