// src/types/CicloColaborador.ts
export interface CicloColaborador {
  id?: number;
  cicloId: number;
  colaboradorId: number;
  recomendacaoExperiencia?: string;
  statusExperiencia?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
