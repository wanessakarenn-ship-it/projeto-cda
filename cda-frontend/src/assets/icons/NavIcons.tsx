import React, { memo } from 'react';

interface IconProps {
  className?: string;
}

/* ============================
   🏠 Home
   ============================ */
export const HomeIcon: React.FC<IconProps> = memo(
  ({ className = 'w-5 h-5' }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Início"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  )
);

/* ============================
   📊 Gráfico / Performance
   ============================ */
export const ChartIcon: React.FC<IconProps> = memo(
  ({ className = 'w-5 h-5' }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Indicadores e gráficos"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
);
