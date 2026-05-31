// src/types/Pontuacao.ts
export interface Pontuacao {
  id?: number;

  avaliacaoId: number;
  competenciaId?: number;
  metaId?: number;

  nota: number;
  comentario?: string;
  pesoAplicado?: number;

  // campos auxiliares p/ frontend
  nomeReferencia?: string;
  tipoReferencia?: 'COMPETENCIA' | 'META';

  created_at?: Date | string;
  updated_at?: Date | string;
}
