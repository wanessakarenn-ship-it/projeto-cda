// src/types/Perfil.ts

export interface Perfil {
  id: number;                 // PK sempre presente após persistir
  nome: string;
  descricao: string | null;

  /**
   * Se permissões vierem de JSON/array no banco
   * (ou calculadas no backend)
   */
  permissoes: string[];

  ativo: boolean;

  created_at: string;         // TIMESTAMPTZ → string
  updated_at: string;
}
