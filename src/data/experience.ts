export interface ExperienceItem {
  id: string;
  key: string;
  organization: string;
  type: 'work' | 'education';
  startDate: string;
  endDate?: string;
  tech?: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 'residency-mycard',
    key: 'experience.items.residency',
    organization: 'MyCard',
    type: 'work',
    startDate: '2024',
    endDate: '2025',
    tech: ['React', 'ASP.NET Core', 'SQL Server', 'TypeScript'],
  },
  {
    id: 'engineering-degree',
    key: 'experience.items.degree',
    organization: 'Universidad TecNM / Campus ITQ',
    type: 'education',
    startDate: '2020',
    endDate: '2025',
    tech: [],
  },
];
