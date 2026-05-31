import AvaliacaoRepository from '../repositories/AvaliacaoRepository';
import { Avaliacao } from '../types/Avaliacao';

interface AvaliacaoFilters {
  status?: string;
  search?: string;
}

// Interface para os dados de criação de avaliação de desempenho
interface CreateAvaliacaoDTO {
  avaliadoId: number;
  avaliadorId: number;
  tipo: 'GESTOR_COLAB' | 'COLAB_GESTOR';
  notas: Record<string, number>;
  cicloId: number;
  comentario?: string;
}

class AvaliacaoService {
  // MÉTODOS DO CICLO DE DESEMPENHO (CDA 2026)
  
  async criarAvaliacao(dados: CreateAvaliacaoDTO) {
    // Aqui você pode adicionar lógica de negócio, como validar se o ciclo está aberto
    return AvaliacaoRepository.create(dados as any);
  }

  async enviarFeedbackLideranca(dados: CreateAvaliacaoDTO) {
    // Lógica para feedback ascendente (colaborador avaliando gestor)
    return AvaliacaoRepository.create(dados as any);
  }

  // MÉTODOS CRUD PADRÃO
  
  async create(avaliacao: Avaliacao): Promise<Avaliacao> {
    return AvaliacaoRepository.create(avaliacao);
  }

  async findAll(filters: AvaliacaoFilters = {}): Promise<Avaliacao[]> {
    return AvaliacaoRepository.findAll(filters);
  }

  async findById(id: number): Promise<Avaliacao | null> {
    return AvaliacaoRepository.findById(id);
  }

  async update(id: number, patch: Partial<Avaliacao>): Promise<Avaliacao> {
    return AvaliacaoRepository.update(id, patch);
  }

  async delete(id: number): Promise<void> {
    return AvaliacaoRepository.delete(id);
  }
}

// Exportamos a CLASSE para que o Controller possa dar 'new'
// OU exportamos a instância. Para bater com o seu Controller, vamos exportar a classe:
export { AvaliacaoService };