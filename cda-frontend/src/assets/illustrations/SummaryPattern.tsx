import React, { memo } from 'react';

type SummaryPatternProps = {
  className?: string;
};

export const SummaryPattern: React.FC<SummaryPatternProps> = memo(
  ({ className }) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="diagonal-lines"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="#6366F1"
            strokeWidth="2"
            strokeOpacity="0.1"
          />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#diagonal-lines)"
      />
    </svg>
  )
);
