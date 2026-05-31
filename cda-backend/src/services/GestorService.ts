import GestorRepository from '../repositories/GestorRepository';
import { Gestor } from '../types/Gestor';

class GestorService {
  async create(gestor: Gestor): Promise<Gestor> {
    return GestorRepository.create(gestor);
  }

  async findAll(): Promise<Gestor[]> {
    return GestorRepository.findAll();
  }

  async findById(id: number): Promise<Gestor | null> {
    return GestorRepository.findById(id);
  }

  async update(
    id: number,
    patch: Partial<Gestor>
  ): Promise<Gestor> {
    const atualizado = await GestorRepository.update(id, patch);
    if (!atualizado) {
      throw new Error('GESTOR_NAO_ENCONTRADO');
    }
    return atualizado;
  }

  async delete(id: number): Promise<void> {
    const removed = await GestorRepository.delete(id);

    // Se o repository retornar boolean
    if (removed === false) {
      throw new Error('GESTOR_NAO_ENCONTRADO');
    }
  }
}

export default new GestorService();
