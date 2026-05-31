import CompetenciaRepository from '../repositories/CompetenciaRepository';
import { Competencia } from '../types/Competencia';

type CompetenciaCreateDTO = Omit<
  Competencia,
  'id' | 'created_at' | 'updated_at'
>;

export default class CompetenciaService {
  private repo = new CompetenciaRepository();

  async list(search?: string): Promise<Competencia[]> {
    return this.repo.findAll(search);
  }

  async getById(id: number): Promise<Competencia | null> {
    return this.repo.findById(id);
  }

  async create(data: CompetenciaCreateDTO): Promise<Competencia> {
    if (!data.nome) {
      throw new Error('NOME_OBRIGATORIO');
    }

    return this.repo.create(data);
  }

  async update(
    id: number,
    data: Partial<Competencia>
  ): Promise<Competencia | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
