export interface Usuario {
  id: number;
  email: string;
  nome: string;
  perfilId?: number;
  perfil_id?: number;
  firebase_uid: string;
  created_at?: Date;
  updated_at?: Date;
  // Adicione esta linha:
  perfil_nome?: 'ADMIN' | 'GESTOR' | 'COLABORADOR'; 
}