import React, { memo } from 'react';

export interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CDA Logo"
      role="img"
    >
      {/* Fundo arredondado conforme RNF 2.1 */}
      <rect width="40" height="40" rx="12" fill="#0F172A" />

      {/* Letra estilizada */}
      <path
        d="M14 12V28M14 20C14 20 16 17 20 17C24 17 26 20 26 24V28"
        stroke="white"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(LogoIcon);
