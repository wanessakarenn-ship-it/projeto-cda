import CargoRepository from '../repositories/CargoRepository';
import { Cargo } from '../types/Cargo';

const repository = new CargoRepository();

export default class CargoService {
  async list(): Promise<Cargo[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<Cargo | null> {
    return repository.findById(id);
  }

  async create(data: Partial<Cargo>): Promise<Cargo> {
    return repository.create(data);
  }

  async update(id: number, data: Partial<Cargo>): Promise<Cargo | null> {
    return repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return repository.delete(id);
  }
}
