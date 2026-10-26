interface ProfilePhotoPlaceholderProps {
  /** Optional photo URL — when provided, renders the image inside the circular frame */
  photoUrl?: string;
  /** Alt text for the photo when provided */
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

const sizeMap = {
  sm: 'w-20 h-20',
  md: 'w-32 h-32',
  lg: 'w-52 h-52',
  xl: 'w-64 h-64 md:w-80 md:h-80',
};

/**
 * Circular frame reserved for a profile photo.
 * When `photoUrl` is provided the image is rendered inside the frame.
 * When empty, only the border, glow and background are shown — NO avatars, initials or placeholders.
 */
export function ProfilePhotoPlaceholder({
  photoUrl,
  alt = '',
  size = 'xl',
  className = '',
  animate = true,
}: ProfilePhotoPlaceholderProps) {
  return (
    <div
      className={`relative ${sizeMap[size]} ${className}`}
      role={photoUrl ? 'img' : 'presentation'}
      aria-label={photoUrl ? alt : undefined}
    >
      {/* Outer halo */}
      <div
        className={`absolute inset-[-8px] rounded-full border border-[#62E6D2]/10 ${animate ? 'animate-pulse-glow' : ''}`}
        aria-hidden="true"
      />
      {/* Second halo */}
      <div
        className="absolute inset-[-16px] rounded-full border border-[#62E6D2]/05"
        aria-hidden="true"
      />

      {/* Main circle */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#62E6D2]/40 shadow-[0_0_40px_rgba(98,230,210,0.15),inset_0_0_40px_rgba(98,230,210,0.05)] bg-gradient-to-br from-[#10202B] to-[#07111A]">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Empty interior — ready for a future photo */
          <div className="w-full h-full" aria-hidden="true">
            {/* Subtle corner accent lines */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-[#62E6D2]/20 rounded-tl-sm" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-[#62E6D2]/20 rounded-br-sm" />
          </div>
        )}
      </div>

      {/* Status indicator dot */}
      <div
        className="absolute bottom-3 right-3 w-3.5 h-3.5 rounded-full bg-[#62E6D2] border-2 border-[#07111A] animate-pulse-glow"
        aria-hidden="true"
      />
    </div>
  );
}
