import MetaRepository from '../repositories/MetaRepository';
import { Meta } from '../types/Meta';

// DTO específico para criação
type MetaCreateDTO = Omit<
  Meta,
  'id' | 'created_at' | 'updated_at'
>;

export default class MetaService {
  private repo = new MetaRepository();

  async list(): Promise<Meta[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<Meta | null> {
    return this.repo.findById(id);
  }

  async create(data: MetaCreateDTO): Promise<Meta> {
    if (!data.titulo) {
      throw new Error('TITULO_OBRIGATORIO');
    }

    return this.repo.create(data);
  }

  async update(
    id: number,
    data: Partial<Meta>
  ): Promise<Meta | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
