export interface UsuarioToken {
  firebase_uid: string;
  email?: string;
  id: number; // Certifique-se que este campo existe aqui
  perfil: 'ADMIN' | 'GESTOR' | 'COLABORADOR';
}