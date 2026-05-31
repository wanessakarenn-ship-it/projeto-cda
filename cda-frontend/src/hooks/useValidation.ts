import { useCallback } from 'react';

/**
 * Modelo mínimo de Competência para validação
 * Vem diretamente do BACKEND (pontuação / avaliação)
 */
export interface CompetenciaValidacao {
  id: number | string;
  nota: number | null; // Nota real vinda do banco
  obrigatoria?: boolean; // futuro: permitir filtros por regra
}

/**
 * Resultado da validação do ciclo
 */
export interface ResultadoValidacao {
  podeFinalizar: boolean;
  totalPendentes: number;
  pendentes: CompetenciaValidacao[];
  erro: string | null;
}

/**
 * ============================
 * useValidation
 * ============================
 * Regra RF 1.3:
 * Todas as competências OBRIGATÓRIAS devem possuir nota válida (> 0)
 */
export const useValidation = () => {
  const validarCiclo = useCallback(
    (
      competencias: CompetenciaValidacao[] = []
    ): ResultadoValidacao => {
      /* ============================
       * 1. Filtra competências pendentes
       * ============================ */
      const pendentes = competencias.filter((c) => {
        // Se futuramente existir obrigatoriedade
        if (c.obrigatoria === false) return false;

        return c.nota === null || c.nota === undefined || c.nota <= 0;
      });

      /* ============================
       * 2. Resultado
       * ============================ */
      const totalPendentes = pendentes.length;

      return {
        podeFinalizar: totalPendentes === 0,
        totalPendentes,
        pendentes,
        erro:
          totalPendentes > 0
            ? `Existem ${totalPendentes} competência(s) obrigatória(s) pendente(s) de avaliação.`
            : null,
      };
    },
    []
  );

  return { validarCiclo };
};
