import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialBrandIcons';
import type { ComponentType } from 'react';

// Inline SVG brand icons not available in lucide-react
export interface SocialLink {
  id: string;
  name: string;
  url: string;
  color: string;
  bgColor: string;
  borderColor: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  isExternal: boolean;
}

// Configure your personal links here
export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/21JSS',
    color: '#FFFFFF',
    bgColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.3)',
    Icon: GithubIcon,
    isExternal: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: '', // Add your LinkedIn URL
    color: '#0A66C2',
    bgColor: 'rgba(10,102,194,0.08)',
    borderColor: 'rgba(10,102,194,0.4)',
    Icon: LinkedinIcon,
    isExternal: true,
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:josueresendizdev@gmail.com',
    color: '#62E6D2',
    bgColor: 'rgba(98,230,210,0.08)',
    borderColor: 'rgba(98,230,210,0.3)',
    Icon: Mail,
    isExternal: false,
  },
];

// Contact config
export const contactConfig = {
  email: 'josueresendizdev@gmail.com',
  cvUrl: 'https://drive.google.com/file/d/19mH25n7j82t3Fj_sV98N_K22vD7v_8x9/view?usp=sharing', //Agregar la ruta a mi CV *ESTO SE QUEDA PENDIENTE*
};
