import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | LinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#62E6D2] text-[#07111A] font-semibold hover:bg-[#7AF0DD] shadow-[0_0_20px_rgba(98,230,210,0.25)] hover:shadow-[0_0_30px_rgba(98,230,210,0.4)]',
  secondary:
    'bg-transparent border border-[#62E6D2]/40 text-[#62E6D2] hover:bg-[#62E6D2]/10 hover:border-[#62E6D2]/70',
  ghost:
    'bg-transparent text-[#A2B4BE] hover:text-[#F2F7FA] hover:bg-white/05',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'ui-button--sm text-sm',
  md: 'ui-button--md text-sm',
  lg: 'ui-button--lg text-base',
};

export function Button({ variant = 'primary', size = 'md', children, className = '', icon, ...props }: Props) {
  const base =
    'ui-button inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#62E6D2] active:scale-95';
  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as LinkProps;
    return (
      <a href={href} className={classes} {...rest}>
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </a>
    );
  }

  const { ...rest } = props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
