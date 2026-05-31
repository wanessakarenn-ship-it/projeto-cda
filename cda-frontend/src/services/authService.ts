import { api } from './Api'; // Certifique-se de que o Api.ts usa PUBLIC_API_URL

export interface UsuarioAuth {
  id: number;
  nome: string;
  perfil: 'ADMIN' | 'GESTOR' | 'COLABORADOR';
  email?: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: UsuarioAuth;
}

export const authService = {
  /**
   * 🔐 Login
   * Envia as credenciais para o backend e persiste o acesso localmente.
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // A chamada agora aponta para o seu backend real (localhost:4000)
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);

    // 🔒 Persistência local segura
    localStorage.setItem('@CDA:token', data.token);
    localStorage.setItem('@CDA:user', JSON.stringify(data.usuario));

    return data;
  },

  /**
   * 👤 Sincronização de Perfil (GET /usuarios/me)
   * Valida o token e atualiza os dados do usuário.
   */
  async me(): Promise<UsuarioAuth> {
    try {
      const { data } = await api.get<UsuarioAuth>('/usuarios/me');
      
      // Atualiza o cache local com os dados mais recentes do PostgreSQL via Prisma
      localStorage.setItem('@CDA:user', JSON.stringify(data));
      
      return data;
    } catch (error) {
      // 🛡️ Se o token expirou ou o servidor caiu, limpa os dados para evitar tela branca
      this.logout();
      throw error;
    }
  },

  /**
   * 🚪 Logout
   * Limpa todas as chaves do CDA no armazenamento local.
   */
  logout() {
    localStorage.removeItem('@CDA:token');
    localStorage.removeItem('@CDA:user');
  },

  /**
   * 🛠️ Helpers de Recuperação
   */
  getStoredUser(): UsuarioAuth | null {
    const user = localStorage.getItem('@CDA:user');
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('@CDA:token');
  }
};