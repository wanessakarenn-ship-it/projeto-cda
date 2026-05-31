import React from 'react';
import { ProgressBar } from '../../components/ProgressBar';
import { SummaryCard } from '../../components/SummaryCard';
import { useAvaliacao } from '../../contexts/AvaliacaoContext';
import { useAuth } from '../../contexts/AuthContext'; // 1. Importação do Auth
import { useLembretes } from '../../hooks/useLembretes'; // 2. Integração com Alertas

import { Target, TrendingUp, CheckCircle } from 'lucide-react';

interface Meta {
  id: number;
  titulo: string;
  progresso: number;
  meta: number;
}

/**
 * MOCK DE METAS
 * TODO: Substituir por api.get(`/metas/usuario/${user.id}`)
 */
const mockMetas: Meta[] = [
  { id: 1, titulo: 'Redução de Bugs em Produção', progresso: 72, meta: 80 },
  { id: 2, titulo: 'Entrega do Projeto Estratégico', progresso: 90, meta: 85 },
  { id: 3, titulo: 'Certificação Técnica', progresso: 100, meta: 100 },
];

export const MetasPage: React.FC = () => {
  const avaliacao = useAvaliacao();
  const { user } = useAuth(); // 3. Acesso aos dados do usuário do banco

  // 4. Hook de Lembrete: Alerta se o ciclo não estiver finalizado
  useLembretes({
    prazoFinal: "2026-03-31", // Exemplo de data vinda do backend
    status: avaliacao.status === 'Finalizado' ? 'Finalizado' : 'Em andamento',
    diasAlerta: 7
  });

  const metasConcluidas = mockMetas.filter(
    (m) => m.progresso >= m.meta
  ).length;

  const taxaConclusao = Math.round((metasConcluidas / mockMetas.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Título e Contexto */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Metas do Ciclo
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Olá, <span className="font-bold text-slate-600">{user?.nome}</span> • 
            Ciclo {avaliacao.ciclo}
          </p>
        </div>
        
        {/* Badge de Perfil vindo do Backend */}
        <div className="hidden md:block px-4 py-1.5 bg-slate-100 rounded-lg border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          Nível de Acesso: {user?.perfil}
        </div>
      </header>

      {/* Cards de Resumo */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          value={mockMetas.length}
          label="Metas Definidas"
          icon={<Target size={22} className="text-indigo-500" />}
        />

        <SummaryCard
          value={metasConcluidas}
          label="Metas Atingidas"
          icon={<CheckCircle size={22} className="text-emerald-500" />}
          isPositive
        />

        <SummaryCard
          value={`${taxaConclusao}%`}
          label="Taxa de Conclusão"
          icon={<TrendingUp size={22} className={taxaConclusao > 70 ? "text-emerald-500" : "text-amber-500"} />}
          isPositive={taxaConclusao >= 100}
        />
      </section>

      {/* Lista de Metas */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-black text-slate-800">
            Detalhamento das Metas
          </h2>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
            {avaliacao.status.toUpperCase()}
          </span>
        </div>

        <div className="space-y-10">
          {mockMetas.map((meta) => {
            const isAlcancada = meta.progresso >= meta.meta;
            
            return (
              <div key={meta.id} className="group">
                <ProgressBar
                  label={meta.titulo}
                  score={meta.progresso}
                  target={meta.meta}
                />
                
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${isAlcancada ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Status: {isAlcancada ? 
                      <span className="text-emerald-600">Meta Alcançada</span> : 
                      <span className="text-amber-600">Em andamento</span>
                    }
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rodapé de Ajuda */}
      <footer className="text-center p-6 border-t border-dashed border-slate-200">
        <p className="text-xs text-slate-400">
          Dúvidas sobre a definição de metas? <a href="#" className="text-indigo-500 font-bold hover:underline">Consulte o Guia de OKRs CDA</a>
        </p>
      </footer>
    </div>
  );
};

export default MetasPage;