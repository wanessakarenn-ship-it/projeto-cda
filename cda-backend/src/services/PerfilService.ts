import { Perfil } from '../types/Perfil';
import { PerfilRepository } from '../repositories/PerfilRepository';

const repositorio = new PerfilRepository();

type PerfilCreateDTO = Omit<
  Perfil,
  'id' | 'created_at' | 'updated_at'
>;

export class PerfilService {
  async listarTodos(): Promise<Perfil[]> {
    return repositorio.listar();
  }

  async buscarPorId(id: number): Promise<Perfil> {
    const perfil = await repositorio.buscarPorId(id);

    if (!perfil) {
      throw new Error('PERFIL_NAO_ENCONTRADO');
    }

    return perfil;
  }

  async criar(dados: PerfilCreateDTO): Promise<Perfil> {
    return repositorio.criar(dados);
  }

  async atualizar(
    id: number,
    dados: Partial<Perfil>
  ): Promise<Perfil> {
    const atualizado = await repositorio.atualizar(id, dados);

    if (!atualizado) {
      throw new Error('PERFIL_NAO_ENCONTRADO');
    }

    return atualizado;
  }

  async remover(id: number): Promise<void> {
    const ok = await repositorio.remover(id);

    if (!ok) {
      throw new Error('PERFIL_NAO_ENCONTRADO');
    }
  }
}
