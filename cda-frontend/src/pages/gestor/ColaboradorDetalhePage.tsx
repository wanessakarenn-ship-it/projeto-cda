import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProfileCard } from '../../components/ProfileCard';
import { SummaryCard } from '../../components/SummaryCard';
import { ProgressBar } from '../../components/ProgressBar';
import { ArrowLeft, UserRound, Target, Award } from 'lucide-react'; // Corrigido aqui

export const ColaboradorDetalhePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const colaborador = {
    nome: 'Ana García',
    cargo: 'Analista de Produto',
    localizacao: 'São Paulo · BR',
    avatar: `https://ui-avatars.com/api/?name=Ana+Garcia&background=6366F1&color=fff`,
    orgInfo: 'Produto · Squad Growth · Gestor: Carlos Mendes',
  };

  const resumo = {
    scoreFinal: 68.9,
    competencias: 72,
    metas: 65,
    aderencia: 78,
  };

  const competencias = [
    { label: 'Comunicação', score: 75, target: 80 },
    { label: 'Entrega de Resultados', score: 62, target: 75 },
    { label: 'Trabalho em Equipe', score: 70, target: 70 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 text-left">
      <nav className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Detalhe do Colaborador
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            ID do Sistema: {id}
          </p>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <ProfileCard
            name={colaborador.nome}
            role={colaborador.cargo}
            location={colaborador.localizacao}
            avatar={colaborador.avatar}
            orgInfo={colaborador.orgInfo}
          />
          
          <div className="p-6 bg-[#131A2C]/65 border border-slate-800/80 rounded-[2rem] text-slate-200 overflow-hidden relative">
            <Award className="absolute -right-4 -bottom-4 text-white/5" size={100} />
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">
              Análise de Promoção
            </p>
            <p className="text-sm font-medium leading-relaxed relative z-10">
              {resumo.scoreFinal >= 60 
                ? "Colaboradora elegível para progressão de nível no próximo comitê." 
                : "Ainda não atingiu o score mínimo necessário para promoção."}
            </p>
          </div>
        </aside>

        <main className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard label="Score Final" value={`${resumo.scoreFinal}%`} icon={<Target size={16} />} />
            <SummaryCard label="Competências" value={`${resumo.competencias}%`} />
            <SummaryCard label="Metas" value={`${resumo.metas}%`} />
            <SummaryCard label="Aderência" value={`${resumo.aderencia}%`} isPositive={resumo.aderencia >= 75} />
          </div>

          <section className="glass-card p-8 space-y-8 border border-slate-800/80">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                  <UserRound size={18} />
                </div>
                <h2 className="text-sm font-black text-slate-200 uppercase tracking-wider">
                  Desempenho por Competência
                </h2>
              </div>
            </div>

            <div className="space-y-8">
              {competencias.map((item) => (
                <ProgressBar
                  key={item.label}
                  label={item.label}
                  score={item.score}
                  target={item.target}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ColaboradorDetalhePage;