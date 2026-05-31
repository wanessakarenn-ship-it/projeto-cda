import React, { memo } from 'react';

interface DefaultAvatarProps {
  name: string;
  size?: string; // classes Tailwind (ex: "w-10 h-10")
}

export const DefaultAvatar: React.FC<DefaultAvatarProps> = memo(
  ({ name, size = 'w-10 h-10' }) => {
    // Extrai iniciais de forma segura
    const initials = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <div
        className={`${size} rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm`}
        role="img"
        aria-label={`Avatar de ${name}`}
      >
        <span className="text-indigo-600 font-bold text-xs tracking-tighter select-none">
          {initials || '?'}
        </span>
      </div>
    );
  }
);
