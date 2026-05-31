// src/types/Gestor.ts
export interface Gestor {
  id?: number;
  usuarioId: number | null;
  nome: string;
  cargoId: number | null;
  gestorId: number | null;
  matricula: string;
  ativo: boolean;
  created_at?: string;
  updated_at?: string;
}
