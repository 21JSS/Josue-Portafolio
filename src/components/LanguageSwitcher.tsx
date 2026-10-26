import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.slice(0, 2) ?? 'es';

  const toggle = (lang: string) => {
    if (lang !== currentLang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-0.5 ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {(['es', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => toggle(lang)}
          aria-pressed={currentLang === lang}
          aria-label={`Switch to ${lang === 'es' ? 'Spanish' : 'English'}`}
          className={`
            relative rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest
            transition-all duration-200
            ${currentLang === lang
              ? 'bg-[#B8FF80] text-[#080A08] shadow-[0_0_12px_rgba(184,255,128,0.4)]'
              : 'text-[#A0AAA0] hover:text-[#F4F7F2]'
            }
          `}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
