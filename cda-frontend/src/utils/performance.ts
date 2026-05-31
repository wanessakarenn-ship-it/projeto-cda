/**
 * Calcula a média ponderada das competências
 * Exemplo de peso: "30%" → 0.3
 */
export const calculateFinalScore = (
  competencias: { score: number; peso: string }[]
): number => {
  if (!competencias.length) return 0;

  const total = competencias.reduce((acc, { score, peso }) => {
    const pesoNumerico = Number(peso.replace('%', '')) / 100;

    if (Number.isNaN(pesoNumerico)) return acc;

    return acc + score * pesoNumerico;
  }, 0);

  return Number(total.toFixed(1)); // Ex: 68.9
};

/**
 * Define a cor da barra com base no atingimento da meta (Target)
 */
export const getStatusColor = (
  score: number,
  target: number
): string => {
  if (score >= target) return 'bg-emerald-500'; // Sucesso
  if (score >= target * 0.8) return 'bg-indigo-500'; // Atenção
  return 'bg-rose-500'; // Gap crítico
};
