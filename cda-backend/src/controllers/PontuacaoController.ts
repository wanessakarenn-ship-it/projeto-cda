import { Request, Response } from 'express';
import PontuacaoService from '../services/PontuacaoService';

class PontuacaoController {
    /**
     * Lista as pontuações filtradas por ciclo ou colaborador.
     * Alimenta o ranking de meritocracia na interface.
     */
    async findAll(req: Request, res: Response) {
        try {
            const { ciclo_id, colaborador_id } = req.query;
            
            // Passamos os filtros para o service buscar as notas consolidadas
            const pontuacoes = await PontuacaoService.findAll({
                cicloId: ciclo_id ? Number(ciclo_id) : undefined,
                colaboradorId: colaborador_id ? Number(colaborador_id) : undefined
            });

            return res.json(pontuacoes);
        } catch (error) {
            console.error('Erro ao buscar pontuações:', error);
            return res.status(500).json({ message: 'Erro ao carregar dados de desempenho' });
        }
    }

    /**
     * Cria um novo registro de pontuação (geralmente via sistema após cálculo)
     */
    async create(req: Request, res: Response) {
        try {
            const pontuacao = await PontuacaoService.create(req.body);
            return res.status(201).json(pontuacao);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao registrar pontuação' });
        }
    }

    /**
     * Busca a pontuação detalhada de um colaborador
     */
    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

            const pontuacao = await PontuacaoService.findById(id);
            if (!pontuacao) return res.status(404).json({ message: 'Pontuação não encontrada' });
            
            return res.json(pontuacao);
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    /**
     * Atualiza uma pontuação manualmente (ajuste do RH/Gestor)
     */
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const pontuacao = await PontuacaoService.update(id, req.body);
            return res.json(pontuacao);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar pontuação' });
        }
    }

    /**
     * Remove um registro de pontuação
     */
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await PontuacaoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar pontuação' });
        }
    }
}

export default new PontuacaoController();