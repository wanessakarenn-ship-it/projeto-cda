import PontuacaoRepository from '../repositories/PontuacaoRepository';
import { Pontuacao } from '../types/Pontuacao';
import type { PontuacaoFilters } from '../types/PontuacaoFilters';

type PontuacaoCreateDTO = Omit<
  Pontuacao,
  'id' | 'created_at' | 'updated_at'
>;

class PontuacaoService {
  async create(data: PontuacaoCreateDTO): Promise<Pontuacao> {
    return PontuacaoRepository.create(data);
  }

  async findAll(filters: PontuacaoFilters = {}): Promise<Pontuacao[]> {
    return PontuacaoRepository.findAll(filters);
  }

  async findById(id: number): Promise<Pontuacao> {
    const pontuacao = await PontuacaoRepository.findById(id);
    if (!pontuacao) {
      throw new Error('PONTUACAO_NAO_ENCONTRADA');
    }
    return pontuacao;
  }

  async update(
    id: number,
    patch: Partial<Pontuacao>
  ): Promise<Pontuacao> {
    const atualizado = await PontuacaoRepository.update(id, patch);
    if (!atualizado) {
      throw new Error('PONTUACAO_NAO_ENCONTRADA');
    }
    return atualizado;
  }

  async delete(id: number): Promise<void> {
    const ok = await PontuacaoRepository.delete(id);
    if (!ok) {
      throw new Error('PONTUACAO_NAO_ENCONTRADA');
    }
  }
}

export default new PontuacaoService();
