import React, { memo } from 'react';

interface IconProps {
  className?: string;
}

/* ============================
   ✅ Realizado
   ============================ */
export const CheckIcon: React.FC<IconProps> = memo(
  ({ className = 'w-4 h-4' }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Status realizado"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#ECFDF5"      /* Verde pastel */
        stroke="#10B981"
        strokeWidth="2"
      />
      <path
        d="M8 12L11 15L16 9"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

/* ============================
   ⏳ Pendente
   ============================ */
export const PendingIcon: React.FC<IconProps> = memo(
  ({ className = 'w-4 h-4' }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Status pendente"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#F8FAFC"      /* Cinza claro */
        stroke="#CBD5E1"
        strokeWidth="2"
      />
    </svg>
  )
);
