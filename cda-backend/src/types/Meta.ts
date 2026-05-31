export interface Meta {
  id: number;               // PK sempre existe após persistir
  titulo: string;
  descricao: string | null;
  peso: number;
  prazo: string | null;     // DATE no PostgreSQL → string no backend
  created_at: string;       // ISO string
  updated_at: string;
}
