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
    <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-500">
      
      {/* COLUNA ESQUERDA: Perfil e KPIs Rápidos */}
      <aside className="col-span-12 lg:col-span-4 space-y-6">
        <ProfileCard 
          name={user?.nome ?? 'Usuário'} // 3. Nome dinâmico
          role={user?.perfil === 'COLABORADOR' ? 'Colaborador' : 'Gestor/Adm'} // 4. Cargo via Perfil
          avatar={`https://ui-avatars.com/api/?name=${user?.nome}&background=6366F1&color=fff`}
        />

        <div className="grid grid-cols-1 gap-4">
          <SummaryCard
            value={`${performance.scoreFinal}%`} // 5. Usa score calculado pelo hook
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
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Meu Desempenho
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Ciclo {avaliacao.ciclo} • Status: {avaliacao.status}
            </p>
          </div>

          <div
            className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all ${performance.statusBg} ${performance.statusCor}`}
          >
            Score Final {performance.scoreFinal}%
          </div>
        </header>

        {/* Seção de Barras de Progresso */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-700">Progresso dos Indicadores</h3>
            <p className="text-xs text-slate-400">Acompanhamento real em relação às metas do ciclo.</p>
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
          className={`rounded-2xl p-6 border transition-all ${
            carreira.isElegivel
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm shadow-emerald-100'
              : 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm shadow-amber-100'
          }`}
        >
          <div className="flex items-center gap-3">
            {carreira.isElegivel ? <ShieldCheck size={20} /> : <TrendingUp size={20} />}
            <p className="text-sm font-black uppercase tracking-tight">Status de Carreira</p>
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