import { useEffect, useState } from 'react';

/**
 * ============================
 * RETORNO DO HOOK
 * ============================
 */
export interface CarreiraResult {
  isElegivel: boolean;
  mensagem: string;
  loading: boolean;
}

/**
 * ============================
 * useCarreira
 * ============================
 * Valida elegibilidade de carreira com base no score final
 *
 * Regra CDA 2026:
 * - score >= 60 → elegível
 */
export const useCarreira = (
  score?: number | null
): CarreiraResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isElegivel, setIsElegivel] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>('');

  useEffect(() => {
    /**
     * Caso o score ainda não exista (ex: carregamento da API)
     */
    if (score === undefined || score === null) {
      setIsElegivel(false);
      setMensagem('Score não disponível para avaliação.');
      setLoading(false);
      return;
    }

    setLoading(true);

    const elegivel = score >= 60;

    setIsElegivel(elegivel);
    setMensagem(
      elegivel
        ? 'Colaborador apto para progressão de mérito.'
        : 'Abaixo do score mínimo para progressão.'
    );

    setLoading(false);
  }, [score]);

  return {
    isElegivel,
    mensagem,
    loading,
  };
};
