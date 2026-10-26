import { useState } from 'react';
import type { TechItem } from '../data/skills';
import { useTranslation } from 'react-i18next';

// Inline SVG paths for tech icons (recognizable brand icons)
const TECH_SVGS: Record<string, string> = {
  react: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.2" fill="none" transform="rotate(120 12 12)"/></svg>`,
  typescript: `<svg viewBox="0 0 256 256" preserveAspectRatio="xMidYMid"><path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z" fill="#3178C6"/><path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" fill="#FFF"/></svg>`,
  javascript: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630"><rect width="630" height="630" fill="#f7df1e"/><path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"/></svg>`,
  html5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 520"><path fill="#e34f26" d="M41 460L0 0h451l-41 460-185 52"/><path fill="#ef652a" d="M226 472l149-41 35-394H226"/><path fill="#ecedee" d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z"/><path fill="#fff" d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z"/></svg>`,
  css3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 520"><path fill="#0c73b8" d="M41 460L0 0h451l-41 460-185 52"/><path fill="#30a9dc" d="M226 472l149-41 35-394H226"/><path fill="#ecedee" d="M226 208H94l5 57h127zm0-114H84l5 56h137zm0 261l-124-33 7 60 117 32z"/><path fill="#fff" d="M226 265h69l-7 73-62 17v59l115-32 26-288H226v56h80l-6 58h-74z"/></svg>`,
  tailwind: `<svg fill="none" viewBox="0 0 54 33"><path fill="#38bdf8" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clip-rule="evenodd"/></svg>`,
  vite: `<svg fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/></svg>`,
  dotnet: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9"/><path d="M7 12h10M12 7v10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  nodejs: `<svg viewBox="0 0 256 292" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="nodejs-a" x1="68.188%" x2="27.823%" y1="17.487%" y2="89.755%"><stop stop-color="#41873f"/><stop offset="1" stop-color="#3fae2a"/></linearGradient><linearGradient id="nodejs-b" x1="43.277%" x2="159.245%" y1="55.169%" y2="-18.306%"><stop offset=".1376" stop-color="#41873f"/><stop offset="1" stop-color="#6cc04a"/></linearGradient></defs><path fill="url(#nodejs-a)" d="M134.923 1.832a13.85 13.85 0 0 0-13.846 0L6.787 67.801A13.8 13.8 0 0 0 0 79.745v132.208c0 4.887 2.715 9.502 6.787 11.945l114.29 65.968a13.85 13.85 0 0 0 13.846 0l114.29-65.968a13.8 13.8 0 0 0 6.787-11.945V79.745c0-4.886-2.715-9.501-6.787-11.944z"/><path fill="url(#nodejs-b)" d="m130 1 126 74v140l-126 73z"/><path fill="#fff" d="m128 69 49 28v98l-49 28-49-28V97zm0 18-33 19v76l33 19 33-19v-76z"/></svg>`,
  csharp: `<svg preserveAspectRatio="xMidYMid" viewBox="0 -1.43 255.58 290.11"><path fill="#a179dc" d="M255.57 84.45c0-4.83-1.04-9.1-3.13-12.76a24.4 24.4 0 0 0-9.24-9C209.17 43.05 175.1 23.5 141.1 3.86c-9.17-5.3-18.06-5.1-27.16.27-13.54 7.98-81.35 46.83-101.55 58.53C4.06 67.5.02 74.87 0 84.44v118.37c0 4.72 1 8.9 2.99 12.51 2.05 3.72 5.17 6.82 9.38 9.26 20.21 11.7 88.02 50.55 101.56 58.53 9.11 5.38 18 5.57 27.17.27 34.02-19.64 68.08-39.2 102.1-58.81a24.33 24.33 0 0 0 9.4-9.25c1.99-3.61 2.98-7.8 2.98-12.52z"/><path fill="#280068" d="M128.18 143.24 2.98 215.33c2.06 3.7 5.18 6.8 9.4 9.25 20.2 11.7 88.01 50.55 101.55 58.53 9.11 5.38 18 5.57 27.17.27 34.02-19.64 68.08-39.2 102.1-58.81a24.33 24.33 0 0 0 9.4-9.25z"/><path fill="#390091" d="M255.57 84.45c0-4.83-1.04-9.1-3.13-12.76l-124.26 71.55 124.41 72.07c2-3.6 2.99-7.79 3-12.51z"/><g fill="#fff"><path d="M201.9 116.3v13.47h13.47v-13.48h6.73v13.48h13.48v6.73H222.1v13.48h13.48v6.74H222.1v13.47h-6.73V156.7h-13.48v13.48h-6.73V156.7h-13.48v-6.73h13.47V136.5h-13.47v-6.74h13.47v-13.48zm13.47 20.2h-13.48v13.48h13.48z"/><path d="M128.46 48.63a94.96 94.96 0 0 1 82.26 47.45l-.16-.27-41.35 23.8A47.28 47.28 0 0 0 129 96.33h-.54a47.3 47.3 0 0 0-47.3 47.3 47.08 47.08 0 0 0 6.23 23.47 47.28 47.28 0 0 0 82.29-.27l-.2.35 41.29 23.91a94.97 94.97 0 0 1-81.25 47.54h-1.06a94.96 94.96 0 0 1-95-95 95 95 0 0 1 95-95z"/></g></svg>`,
  python: `<svg fill="none" viewBox="16 16 32 32"><path fill="url(#python-a)" d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zM27.61 18.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"/><path fill="url(#python-b)" d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"/><defs><linearGradient id="python-a" x1="19.075" x2="34.898" y1="18.782" y2="34.658" gradientUnits="userSpaceOnUse"><stop stop-color="#387eb8"/><stop offset="1" stop-color="#366994"/></linearGradient><linearGradient id="python-b" x1="28.809" x2="45.803" y1="28.882" y2="45.163" gradientUnits="userSpaceOnUse"><stop stop-color="#ffe052"/><stop offset="1" stop-color="#ffc331"/></linearGradient></defs></svg>`,
  sql: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="7" rx="8" ry="3" stroke="currentColor" stroke-width="1.5"/><path d="M4 7v5c0 1.66 3.58 3 8 3s8-1.34 8-3V7" stroke="currentColor" stroke-width="1.5"/><path d="M4 12v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  git: `<svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"><path d="M251.17 116.6 139.4 4.82a16.49 16.49 0 0 0-23.31 0l-23.21 23.2 29.44 29.45a19.57 19.57 0 0 1 24.8 24.96l28.37 28.38a19.61 19.61 0 1 1-11.75 11.06L137.28 95.4v69.64a19.62 19.62 0 1 1-16.13-.57V94.2a19.61 19.61 0 0 1-10.65-25.73L81.46 39.44 4.83 116.08a16.49 16.49 0 0 0 0 23.32L116.6 251.17a16.49 16.49 0 0 0 23.32 0l111.25-111.25a16.5 16.5 0 0 0 0-23.33" fill="#DE4C36"/></svg>`,
  threejs: `<svg viewBox="0 0 24 24"><path fill="#fff" d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z"/></svg>`,
};

interface TechIconProps extends TechItem {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function TechIcon({ name, icon, color, bgColor, borderColor, level, size = 'md', showLabel = false }: TechIconProps) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  const sizeClass = size === 'sm' ? 'w-10 h-10' : size === 'md' ? 'w-12 h-12' : 'w-14 h-14';
  const iconSize = size === 'sm' ? 18 : size === 'md' ? 22 : 26;

  const svgContent = TECH_SVGS[icon] || TECH_SVGS['sql'];

  return (
    <div className="flex flex-col items-center gap-2 group relative">
      <div
        className={`relative flex items-center justify-center rounded-full border ${sizeClass} transition-all duration-200 cursor-default`}
        style={{
          backgroundColor: hovered ? bgColor : 'rgba(255,255,255,0.04)',
          borderColor: hovered ? borderColor : 'rgba(255,255,255,0.1)',
          boxShadow: hovered ? `0 0 20px ${bgColor}` : 'none',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          color: hovered ? color : '#A0AAA0',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="img"
        aria-label={`${name} — ${t(`skills.levels.${level}`)}`}
      >
        <div
          className="shrink-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
          style={{ width: iconSize, height: iconSize }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        {/* Tooltip */}
        <span
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#151A15] border border-white/10 px-2 py-0.5 text-xs text-[#F4F7F2] opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 z-10"
          role="tooltip"
          aria-hidden="true"
        >
          {name}
          <span className="block text-center" style={{ color }}>
            {t(`skills.levels.${level}`)}
          </span>
        </span>
      </div>

      {showLabel && (
        <span className="text-xs text-[#A0AAA0] font-medium text-center leading-tight max-w-[60px] truncate">
          {name}
        </span>
      )}
    </div>
  );
}
