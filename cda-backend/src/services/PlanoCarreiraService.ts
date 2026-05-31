import PlanoCarreiraRepository from '../repositories/PlanoCarreiraRepository';
import { PlanoCarreira } from '../types/PlanoCarreira';

type PlanoCarreiraCreateDTO = Omit<
  PlanoCarreira,
  'id' | 'created_at' | 'updated_at'
>;

export default class PlanoCarreiraService {
  private repo = new PlanoCarreiraRepository();

  async list(): Promise<PlanoCarreira[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<PlanoCarreira> {
    const plano = await this.repo.findById(id);

    if (!plano) {
      throw new Error('PLANO_CARREIRA_NAO_ENCONTRADO');
    }

    return plano;
  }

  async create(data: PlanoCarreiraCreateDTO): Promise<PlanoCarreira> {
    return this.repo.create(data);
  }

  async update(
    id: number,
    data: Partial<PlanoCarreira>
  ): Promise<PlanoCarreira> {
    const atualizado = await this.repo.update(id, data);

    if (!atualizado) {
      throw new Error('PLANO_CARREIRA_NAO_ENCONTRADO');
    }

    return atualizado;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
