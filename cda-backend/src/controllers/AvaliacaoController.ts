import { Request, Response } from 'express';
import { AvaliacaoService } from '../services/AvaliacaoService';

// Instanciamos o service para uso em toda a classe
const avaliacaoService = new AvaliacaoService();

export class AvaliacaoController {
  
  // ==========================================
  // MÉTODOS DE CICLO E FEEDBACK (CDA 2026)
  // ==========================================

  // Gestor avaliando Colaborador
  avaliarColaborador = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const { notas, cicloId } = req.body;
      
      // Asserção de tipo para resolver req.user e capturar o ID
      const user = req.user as any;
      const avaliadorId = user.id; 

      const resultado = await avaliacaoService.criarAvaliacao({
        avaliadoId: Number(id),
        avaliadorId: Number(avaliadorId),
        tipo: 'GESTOR_COLAB',
        notas,
        cicloId: Number(cicloId)
      });

      return res.json(resultado);
    } catch (error) {
      console.error('Erro na avaliação do gestor:', error);
      return res.status(400).json({ message: 'Erro ao processar avaliação do gestor' });
    }
  }

  // Colaborador avaliando Gestor
  avaliarLideranca = async (req: Request, res: Response) => {
    try {
      // CORREÇÃO ts(2345): Adicionado avaliadoId que é obrigatório no DTO do Service
      const { notas, comentario, cicloId, avaliadoId } = req.body;
      
      const user = req.user as any;
      const avaliadorId = user.id;

      const resultado = await avaliacaoService.enviarFeedbackLideranca({
        // Se o front não enviar o avaliadoId, tentamos usar o gestorId do token
        avaliadoId: Number(avaliadoId || user.gestorId), 
        avaliadorId: Number(avaliadorId),
        tipo: 'COLAB_GESTOR',
        notas,
        comentario,
        cicloId: Number(cicloId)
      });

      return res.json(resultado);
    } catch (error) {
      console.error('Erro no feedback de liderança:', error);
      return res.status(400).json({ message: 'Erro ao enviar feedback de liderança' });
    }
  }

  // ==========================================
  // MÉTODOS CRUD (PADRÃO)
  // ==========================================

  findAll = async (req: Request, res: Response) => {
    try {
      const { status, search } = req.query;
      const avaliacoes = await avaliacaoService.findAll({
        status: status as string,
        search: search as string
      });
      return res.json(avaliacoes);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      return res.status(500).json({ message: 'Erro interno' });
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const avaliacao = await avaliacaoService.create(req.body);
      return res.status(201).json(avaliacao);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao criar' });
    }
  }

  findById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const avaliacao = await avaliacaoService.findById(id);
      if (!avaliacao) return res.status(404).json({ message: 'Não encontrada' });
      return res.json(avaliacao);
    } catch (error) {
      return res.status(400).json({ message: 'ID inválido' });
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const avaliacao = await avaliacaoService.update(id, req.body);
      return res.json(avaliacao);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar' });
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await avaliacaoService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao deletar' });
    }
  }
}

export default new AvaliacaoController();