/**
 * Formata valores percentuais para exibição em labels pequenas
 * Ex: 68.9 → "68,9%"
 */
export const formatPercent = (value: number): string => {
  if (Number.isNaN(value)) return '0%';

  return `${value.toFixed(1).replace('.', ',')}%`;
};

/**
 * Mascara nomes longos para manter o layout limpo em resoluções menores
 */
export const truncateName = (name: string, limit: number = 20): string => {
  if (!name) return '';

  const trimmed = name.trim();

  return trimmed.length > limit
    ? `${trimmed.slice(0, limit)}…`
    : trimmed;
};
