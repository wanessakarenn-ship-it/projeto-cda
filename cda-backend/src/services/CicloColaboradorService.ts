import { CicloColaborador } from '../types/CicloColaborador';
import cicloColaboradorRepository from '../repositories/CicloColaboradorRepository';

class CicloColaboradorService {
  async obterTodos(): Promise<CicloColaborador[]> {
    return cicloColaboradorRepository.listar();
  }

  async obterPorId(id: number): Promise<CicloColaborador | null> {
    return cicloColaboradorRepository.buscarPorId(id) ?? null;
  }

  async obterPorCicloId(cicloId: number): Promise<CicloColaborador[]> {
    return cicloColaboradorRepository.buscarPorCicloId(cicloId);
  }

  async obterPorColaboradorId(
    colaboradorId: number
  ): Promise<CicloColaborador[]> {
    return cicloColaboradorRepository.buscarPorColaboradorId(colaboradorId);
  }

  async criar(
    cicloColaborador: Omit<
      CicloColaborador,
      'id' | 'created_at' | 'updated_at'
    >
  ): Promise<CicloColaborador> {
    return cicloColaboradorRepository.criar(cicloColaborador);
  }

  async atualizar(
    id: number,
    cicloColaborador: Partial<
      Omit<CicloColaborador, 'id' | 'created_at' | 'updated_at'>
    >
  ): Promise<CicloColaborador | null> {
    return cicloColaboradorRepository.atualizar(id, cicloColaborador) ?? null;
  }

  async remover(id: number): Promise<void> {
    cicloColaboradorRepository.remover(id);
  }
}

export default new CicloColaboradorService();
