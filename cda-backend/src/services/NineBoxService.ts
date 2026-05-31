import NineBoxRepository from '../repositories/NineBoxRepository';
import { NineBox } from '../types/NineBox';

// 👉 Filtros DEVEM ser camelCase no TS
export interface NineBoxFilters {
  cicloId?: number;
  setor?: string;
}

// DTO de criação (SEM colunas automáticas)
type NineBoxCreateDTO = Omit<
  NineBox,
  'id' | 'created_at' | 'updated_at'
>;

class NineBoxService {
  async create(data: NineBoxCreateDTO): Promise<NineBox> {
    if (!data.cicloColaboradorId) {
      throw new Error('CICLO_COLABORADOR_OBRIGATORIO');
    }

    return NineBoxRepository.create(data);
  }

  async findAll(filters: NineBoxFilters = {}): Promise<NineBox[]> {
    return NineBoxRepository.findAll(filters);
  }

  async findById(id: number): Promise<NineBox | null> {
    return NineBoxRepository.findById(id);
  }

  async update(
    id: number,
    patch: Partial<NineBox>
  ): Promise<NineBox> {
    const atualizado = await NineBoxRepository.update(id, patch);

    if (!atualizado) {
      throw new Error('NINEBOX_NAO_ENCONTRADO');
    }

    return atualizado;
  }

  async delete(id: number): Promise<void> {
    await NineBoxRepository.delete(id);
  }
}

export default new NineBoxService();
