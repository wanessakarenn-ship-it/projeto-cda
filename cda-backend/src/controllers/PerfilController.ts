import { Request, Response } from 'express';
import { PerfilService } from '../services/PerfilService'; // ajuste conforme nome do arquivo

class PerfilController {
  private perfilService = new PerfilService();

  listarTodos = async (req: Request, res: Response) => {
    try {
      const perfis = await this.perfilService.listarTodos();
      res.json(perfis);
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: String(erro) });
      }
    }
  };

  buscarPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const perfil = await this.perfilService.buscarPorId(Number(id));
      res.json(perfil);
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(404).json({ erro: erro.message });
      } else {
        res.status(404).json({ erro: String(erro) });
      }
    }
  };

  criar = async (req: Request, res: Response) => {
    try {
      const { nome, descricao, permissoes, ativo } = req.body;
      const novoPerfil = await this.perfilService.criar({
        nome,
        descricao,
        permissoes,
        ativo
      });
      res.status(201).json(novoPerfil);
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: String(erro) });
      }
    }
  };

  atualizar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nome, descricao, permissoes, ativo } = req.body;
      const atualizado = await this.perfilService.atualizar(Number(id), {
        nome,
        descricao,
        permissoes,
        ativo
      });
      res.json(atualizado);
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(404).json({ erro: erro.message });
      } else {
        res.status(404).json({ erro: String(erro) });
      }
    }
  };

  remover = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.perfilService.remover(Number(id));
      res.status(204).send();
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(404).json({ erro: erro.message });
      } else {
        res.status(404).json({ erro: String(erro) });
      }
    }
  };
}

export default new PerfilController();