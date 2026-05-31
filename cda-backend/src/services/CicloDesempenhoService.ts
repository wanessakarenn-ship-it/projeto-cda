import { CicloDesempenhoRepository } from '../repositories/CicloDesempenhoRepository';
import { CicloDesempenho } from '../types/CicloDesempenho';

export class CicloDesempenhoService {
  private repository = new CicloDesempenhoRepository();

  listar() {
    return this.repository.findAll();
  }

  buscarPorId(id: number) {
    return this.repository.findById(id);
  }

  criar(data: Omit<CicloDesempenho, 'id'>) {
    return this.repository.create(data);
  }

  async atualizar(id: number, data: Partial<CicloDesempenho>) {
    await this.repository.update(id, data);
  }

  async remover(id: number) {
    await this.repository.delete(id);
  }
}
