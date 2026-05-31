import { useMemo } from 'react';

/**
 * Tipo da competência vinda do backend
 * Ajuste os nomes se sua API mudar
 */
export interface CompetenciaPerformance {
  id: number;
  nome: string;
  categoria: 'Geral' | 'Específica';
  nota: number;      // nota real (0–100)
  peso?: number;     // opcional (para média ponderada futura)
}

/**
 * Retorno do hook usePerformance
 */
export interface PerformanceResult {
  gerais: CompetenciaPerformance[];
  especificas: CompetenciaPerformance[];
  scoreFinal: number;
  aderencia: number;
  diferenca: number;
  statusCor: string;
  statusBg: string;
}

/**
 * ============================
 * usePerformance
 * ============================
 * Calcula métricas de desempenho do colaborador
 * com base em competências vindas do BACKEND
 */
export const usePerformance = (
  competencias: CompetenciaPerformance[] = []
): PerformanceResult => {
  return useMemo(() => {
    /* ============================
     * 1. Separação por categoria
     * ============================ */
    const gerais = competencias.filter(
      (c) => c.categoria === 'Geral'
    );

    const especificas = competencias.filter(
      (c) => c.categoria === 'Específica'
    );

    /* ============================
     * 2. Cálculo do Score Final
     * ============================ */
    const totalNotas = competencias.reduce((acc, curr) => {
      return acc + (Number(curr.nota) || 0);
    }, 0);

    const scoreFinal =
      competencias.length > 0
        ? Number((totalNotas / competencias.length).toFixed(1))
        : 0;

    /* ============================
     * 3. Aderência à meta da empresa
     * ============================ */
    const metaEmpresa = 85; // pode vir do backend futuramente

    const aderencia =
      metaEmpresa > 0
        ? Math.round((scoreFinal / metaEmpresa) * 100)
        : 0;

    /* ============================
     * 4. Lacuna (Gap)
     * ============================ */
    const diferenca = Number((scoreFinal - metaEmpresa).toFixed(1));

    /* ============================
     * 5. Feedback visual (UI)
     * ============================ */
    const statusCor =
      aderencia >= 75
        ? 'text-emerald-500'
        : aderencia >= 50
        ? 'text-amber-500'
        : 'text-rose-500';

    const statusBg =
      aderencia >= 75
        ? 'bg-emerald-50'
        : aderencia >= 50
        ? 'bg-amber-50'
        : 'bg-rose-50';

    return {
      gerais,
      especificas,
      scoreFinal,
      aderencia,
      diferenca,
      statusCor,
      statusBg,
    };
  }, [competencias]);
};
