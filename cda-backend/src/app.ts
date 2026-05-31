import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importação das Rotas
import healthRoutes from './routes/health';
import authRoutes from './routes/authRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import cicloColaboradorRoutes from './routes/cicloColaboradorRoutes';
import cicloDesempenhoRoutes from './routes/cicloDesempenhoRoutes';
import colaboradorRoutes from './routes/colaboradorRoutes';
import competenciaRoutes from './routes/competenciaRoutes';
import metaRoutes from './routes/metaRoutes';
import planoCarreiraRoutes from './routes/planoCarreiraRoutes';
import cargoRoutes from './routes/cargoRoute';
import avaliacaoRoutes from './routes/avaliacaoRoute';
import pontuacaoRoutes from './routes/pontuacaoRoutes';
import nineBoxRoutes from './routes/nineBoxRoutes';
import gestorRoutes from './routes/gestorRoutes';

dotenv.config();

const app = express();

// ====================
// Middlewares globais
// ====================

// Configuração de CORS: Essencial para integração com o Vite/React
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173',
      'https://seu-dominio-producao.com', // Adicione quando fizer deploy
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// ====================
// Definição das Rotas (Prefixadas com /api)
// ====================

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes); // Centraliza login (/me) e gestão
app.use('/api/ciclos-colaborador', cicloColaboradorRoutes);
app.use('/api/ciclos-desempenho', cicloDesempenhoRoutes);
app.use('/api/colaboradores', colaboradorRoutes);
app.use('/api/competencias', competenciaRoutes);
app.use('/api/metas', metaRoutes);
app.use('/api/plano-carreiras', planoCarreiraRoutes);
app.use('/api/cargos', cargoRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/pontuacoes', pontuacaoRoutes);
app.use('/api/nine-box', nineBoxRoutes);
app.use('/api/gestores', gestorRoutes);

// ====================
// Tratamento de Erros e 404
// ====================

// Fallback para qualquer rota /api que não exista
app.use('/api', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'ROTA_NAO_ENCONTRADA_NO_BACKEND' });
});

// Middleware global de tratamento de exceções (opcional, mas recomendado)
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'ERRO_INTERNO_DO_SERVIDOR' });
});

export default app;