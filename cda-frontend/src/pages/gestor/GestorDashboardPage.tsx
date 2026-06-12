import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SummaryCard } from '../../components/SummaryCard';
import { EvaluatorCard } from '../../components/EvaluatorCard';
import { CompetenciaRow } from '../../components/CompetenciaRow';
import { Users, BarChart3, Target, AlertCircle } from 'lucide-react';

export const GestorDashboardPage: React.FC = () => {
  const { user } = useAuth();

  // 🔹 TODO: Substituir por useQuery('/gestao/dashboard-summary')
  const resumoEquipe = {
    colaboradores: 8,
    mediaMerito: 78.5,
    mediaPotencial: 72.1,
    alertas: 2,
  };

  const avaliadores = [
    {
      name: 'Carlos Mendes',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendes&background=6366F1&color=fff',
      percentage: '60%',
      status: 'Realizado',
      isMain: true,
    },
    {
      name: 'Marina Lopes',
      avatar: 'https://ui-avatars.com/api/?name=Marina+Lopes&background=F59E0B&color=fff',
      percentage: '40%',
      status: 'Pendente',
    },
  ];

  const competenciasEquipe = [
    { label: 'Comunicação', weight: 'Alta', score: 76, target: 80, level: 3 },
    { label: 'Entrega de Resultados', weight: 'Crítica', score: 64, target: 75, level: 2 },
    { label: 'Trabalho em Equipe', weight: 'Média', score: 82, target: 70, level: 4 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 text-left">
      {/* Cabeçalho Contextual */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Dashboard de Gestão
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-1">
            Gestor: <span className="font-bold text-slate-200">{user?.nome}</span> • Acompanhamento de Performance 2026
          </p>
        </div>
        <div className="flex gap-2">
           <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-wider border border-indigo-500/20">
             Ciclo: 1T2026
           </div>
        </div>
      </header>

      {/* Cards de Métricas Agregadas */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          label="Equipe Direta"
          value={resumoEquipe.colaboradores}
          icon={<Users size={18} className="text-slate-400" />}
        />
        <SummaryCard
          label="Média de Mérito"
          value={`${resumoEquipe.mediaMerito}%`}
          isPositive={resumoEquipe.mediaMerito >= 75}
          icon={<BarChart3 size={18} className="text-emerald-500" />}
        />
        <SummaryCard
          label="Potencial Médio"
          value={`${resumoEquipe.mediaPotencial}%`}
          icon={<Target size={18} className="text-indigo-500" />}
        />
        <SummaryCard
          label="Alertas Críticos"
          value={resumoEquipe.alertas}
          isPositive={resumoEquipe.alertas === 0}
          icon={<AlertCircle size={18} className={resumoEquipe.alertas > 0 ? "text-rose-500" : "text-emerald-500"} />}
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status dos Avaliadores (Filtro de Processo) */}
        <section className="glass-card p-8 space-y-6 border border-slate-800/80 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              Progresso do Ciclo
            </h2>
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Avaliadores</span>
          </div>

          <div className="space-y-4 flex-1">
            {avaliadores.map((item, index) => (
              <EvaluatorCard
                key={index}
                name={item.name}
                avatar={item.avatar}
                percentage={item.percentage}
                status={item.status as any}
                isMain={item.isMain}
              />
            ))}
          </div>
          
          <button className="w-full py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 border-t border-slate-800/60 mt-4 transition-colors">
            Cobrar Pendências
          </button>
        </section>

        {/* Heatmap de Competências da Equipe */}
        <section className="lg:col-span-2 glass-card overflow-hidden border border-slate-800/80 flex flex-col">
          <div className="px-8 py-6 border-b border-slate-800/60 bg-slate-900/40 flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              Gap de Competências (Média Equipe)
            </h2>
            <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-rose-500" title="Abaixo da Meta" />
               <div className="w-2 h-2 rounded-full bg-emerald-500" title="Na Meta" />
            </div>
          </div>

          <div className="divide-y divide-slate-800/60">
            {competenciasEquipe.map((comp) => (
              <div key={comp.label} className="hover:bg-[#131A2C]/40 transition-colors">
                <CompetenciaRow
                  label={comp.label}
                  weight={comp.weight}
                  score={comp.score}
                  target={comp.target}
                  level={comp.level}
                />
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-slate-900/40 border-t border-slate-800/60">
             <p className="text-[10px] text-slate-500 leading-relaxed italic">
               * Os valores acima representam a média aritmética de todos os liderados diretos no ciclo atual.
             </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GestorDashboardPage;