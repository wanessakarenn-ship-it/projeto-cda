import { api } from './Api'; // Certifique-se de que o Api.ts usa PUBLIC_API_URL [cite: 2026-01-25]

export interface Ciclo {
  id: number;
  nome: string;
  data_inicio: string; // ISO (YYYY-MM-DD)
  data_fim: string;    // ISO (YYYY-MM-DD)
  status: 'ABERTO' | 'FECHADO' | 'PLANEJADO'; 
  descricao?: string;
  created_at?: string;
  updated_at?: string;
}

// DTOs para garantir que não enviamos campos automáticos do banco na criação [cite: 2026-01-25]
export type CriarCicloDTO = Omit<Ciclo, 'id' | 'created_at' | 'updated_at'>;
export type AtualizarCicloDTO = Partial<CriarCicloDTO>;

export const cicloService = {
  /**
   * 📋 Lista todos os ciclos (Ordenados por data)
   * Útil para o Dashboard de Administração.
   */
  async listar(): Promise<Ciclo[]> {
    try {
      const { data } = await api.get<Ciclo[]>('/ciclos-desempenho');
      return data;
    } catch (error) {
      console.error('Erro ao listar ciclos:', error);
      return []; // Retorna lista vazia em caso de erro para não quebrar a UI
    }
  },

  /**
   * 🎯 Busca o ciclo atualmente ativo
   * Fundamental para o fluxo de avaliação do colaborador [cite: 2026-01-25].
   */
  async buscarAtivo(): Promise<Ciclo | null> {
    try {
      const { data } = await api.get<Ciclo>('/ciclos-desempenho/ativo');
      return data;
    } catch (error) {
      // Se não houver ciclo ativo (404), tratamos como null silenciosamente
      return null;
    }
  },

  /**
   * ➕ Cria um novo ciclo no PostgreSQL via backend [cite: 2026-01-25]
   */
  async criar(payload: CriarCicloDTO): Promise<Ciclo> {
    const { data } = await api.post<Ciclo>('/ciclos-desempenho', payload);
    return data;
  },

  /**
   * 📝 Atualiza um ciclo existente
   */
  async atualizar(id: number, payload: AtualizarCicloDTO): Promise<Ciclo> {
    const { data } = await api.put<Ciclo>(`/ciclos-desempenho/${id}`, payload);
    return data;
  },

  /**
   * 🗑️ Remove um ciclo
   */
  async deletar(id: number): Promise<void> {
    await api.delete(`/ciclos-desempenho/${id}`);
  },
};