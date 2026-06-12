import React from 'react';
import { ProfileCard } from '../../components/ProfileCard';
import { SummaryCard } from '../../components/SummaryCard';
import { ProgressBar } from '../../components/ProgressBar';

import { useAvaliacao } from '../../contexts/AvaliacaoContext';
import { usePerformance } from '../../hooks/usePerformance';
import { useCarreira } from '../../hooks/useCarreira';
import { useAuth } from '../../contexts/AuthContext'; // 1. Importação do Auth

import { ShieldCheck, Trophy, TrendingUp } from 'lucide-react';

const ColaboradorDashboardPage: React.FC = () => {
  const avaliacao = useAvaliacao();
  const { user } = useAuth(); // 2. Acesso ao usuário real (id, nome, perfil)

  // MOCK DE COMPETÊNCIAS 
  // TODO: Substituir por api.get('/pontuacao/me') futuramente
  const competencias = [
    { id: 1, nome: 'Comunicação', categoria: 'Geral' as const, nota: 72 },
    { id: 2, nome: 'Entrega de Resultados', categoria: 'Geral' as const, nota: 65 },
    { id: 3, nome: 'Conhecimento Técnico', categoria: 'Específica' as const, nota: 70 },
  ];

  const performance = usePerformance(competencias);
  const carreira = useCarreira(performance.scoreFinal);

  return (
    <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-500 text-left">
      
      {/* COLUNA ESQUERDA: Perfil e KPIs Rápidos */}
      <aside className="col-span-12 lg:col-span-4 space-y-6">
        <ProfileCard 
          name={user?.nome ?? 'Usuário'} // 3. Nome dinâmico
          role={user?.perfil === 'COLABORADOR' ? 'Colaborador' : 'Gestor/Adm'} // 4. Cargo via Perfil
          avatar={`https://ui-avatars.com/api/?name=${user?.nome}&background=6366F1&color=fff`}
        />

        <div className="grid grid-cols-1 gap-4">
          <SummaryCard
            value={`${performance.scoreFinal}%`} // 5. Usa score calculated pelo hook
            label="Resultado Final"
            subtitle={carreira.mensagem}
            icon={<ShieldCheck size={22} />}
            isPositive={carreira.isElegivel}
          />

          <div className="grid grid-cols-2 gap-4">
            <SummaryCard
              value={avaliacao.formatted.competencias}
              label="Competências"
              icon={<Trophy size={22} />}
            />

            <SummaryCard
              value={`${performance.aderencia}%`}
              label="Aderência"
              icon={<TrendingUp size={22} />}
              isPositive={performance.aderencia >= 75}
            />
          </div>
        </div>
      </aside>

      {/* COLUNA DIREITA: Visão Geral de Performance */}
      <main className="col-span-12 lg:col-span-8 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Meu Desempenho
            </h2>
            <p className="text-sm text-slate-400 font-medium mt-1">
              Ciclo {avaliacao.ciclo} • Status: {avaliacao.status}
            </p>
          </div>

          <div
            className="px-4 py-2 rounded-xl text-xs font-black uppercase border bg-indigo-500/10 border-indigo-500/25 text-indigo-400 shadow-xl shadow-indigo-500/5"
          >
            Score Final {performance.scoreFinal}%
          </div>
        </header>

        {/* Seção de Barras de Progresso */}
        <section className="glass-card border border-slate-800/80 p-8 space-y-8">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider">Progresso dos Indicadores</h3>
            <p className="text-xs text-slate-500 font-bold uppercase">Acompanhamento real em relação às metas do ciclo.</p>
          </div>

          <div className="space-y-8">
            <ProgressBar
              label="Resultado Geral Consolidado"
              score={performance.scoreFinal}
              target={85}
            />

            <ProgressBar
              label="Média de Competências"
              score={performance.scoreFinal} // Alinhado com o hook de performance
              target={80}
            />

            <ProgressBar
              label="Aderência ao Cargo Atual"
              score={performance.aderencia} 
              target={75}
            />
          </div>
        </section>

        {/* Bloco de Elegibilidade */}
        <section
          className={`rounded-[2rem] p-6 border transition-all ${
            carreira.isElegivel
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/5'
              : 'bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/5'
          }`}
        >
          <div className="flex items-center gap-3">
            {carreira.isElegivel ? <ShieldCheck size={20} /> : <TrendingUp size={20} />}
            <p className="text-sm font-black uppercase tracking-wider">Status de Carreira</p>
          </div>
          <p className="text-sm mt-2 leading-relaxed font-medium">
            {carreira.mensagem}
          </p>
        </section>
      </main>
    </div>
  );
};

export default ColaboradorDashboardPage;