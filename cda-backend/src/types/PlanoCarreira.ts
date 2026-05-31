// src/types/PlanoCarreira.ts

export interface PlanoCarreira {
  id: number;                 // PK sempre presente
  nome: string;
  descricao: string | null;
  versao: string | null;
  publicado: boolean;
  created_at: string;         // TIMESTAMPTZ → string
  updated_at: string;
}
