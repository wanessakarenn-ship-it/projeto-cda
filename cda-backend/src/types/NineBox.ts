// src/types/NineBox.ts
export interface NineBox {
  id?: number;

  cicloColaboradorId: number;
  posicaoXPotencial: string;
  posicaoYDesempenho: string;

  scoreCompetencias: number;
  scoreMetas: number;
  scoreFinalMerito: number;

  elegivelCarreira: boolean;

  // campos calculados / metadata
  colaboradorNome?: string;
  dataCalculo?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
