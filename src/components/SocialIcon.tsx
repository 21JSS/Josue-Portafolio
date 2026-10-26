import { useState } from 'react';
import type { ComponentType } from 'react';

interface SocialIconProps {
  name: string;
  url?: string;
  color: string;
  bgColor: string;
  borderColor: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  isExternal?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  onClick?: () => void;
}

const sizeClass = {
  sm: { container: 'w-9 h-9', icon: 14 },
  md: { container: 'w-11 h-11', icon: 18 },
  lg: { container: 'w-14 h-14', icon: 22 },
};

export function SocialIcon({
  name,
  url,
  color,
  bgColor,
  borderColor,
  Icon,
  isExternal = false,
  size = 'md',
  showTooltip = true,
  onClick,
}: SocialIconProps) {
  const [hovered, setHovered] = useState(false);
  const { container, icon } = sizeClass[size];

  const style = {
    backgroundColor: hovered ? bgColor : 'rgba(255,255,255,0.04)',
    borderColor: hovered ? borderColor : 'rgba(255,255,255,0.1)',
    boxShadow: hovered ? `0 0 20px ${bgColor}, 0 0 40px ${bgColor}` : 'none',
    transform: hovered ? 'scale(1.12)' : 'scale(1)',
    color: hovered ? color : '#A0AAA0',
    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
  };

  const inner = (
    <span
      className={`relative group flex items-center justify-center rounded-full border ${container} cursor-pointer`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={name}
    >
      <Icon size={icon} />
      {showTooltip && (
        <span
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#151A15] border border-white/10 px-2 py-0.5 text-xs text-[#F4F7F2] opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100"
          role="tooltip"
          aria-hidden="true"
        >
          {name}
        </span>
      )}
    </span>
  );

  if (url) {
    return (
      <a
        href={url}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={`${name}${isExternal ? ' (abre en nueva pestaña)' : ''}`}
        onClick={onClick}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF80] rounded-full"
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={name}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF80] rounded-full"
    >
      {inner}
    </button>
  );
}
