import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TrendingUp, Users, HelpCircle } from 'lucide-react';
import { api } from '../../services/Api';

interface NineBoxItem {
  id: number;
  nome: string;
  merito: number;
  potencial: number;
  quadrante: string;
}

export const NineBoxPage: React.FC = () => {
  const { user } = useAuth();
  const [colaboradores, setColaboradores] = useState<NineBoxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'matrix' | 'list'>('matrix');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/nine-box');
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const mapped = response.data.map((item: any) => {
            const meritScore = item.score_final_merito ? parseFloat(item.score_final_merito) : 0;
            const meritoValue = meritScore <= 10 ? Math.round(meritScore * 10) : Math.round(meritScore);
            
            const potentialScore = item.score_competencias ? parseFloat(item.score_competencias) : 0;
            const potencialValue = potentialScore <= 10 ? Math.round(potentialScore * 10) : Math.round(potentialScore);

            const y = item.posicao_y_desempenho || 'Médio';
            const x = item.posicao_x_potencial || 'Médio';

            return {
              id: item.id,
              nome: item.colaboradorNome || item.colaborador_nome || 'Colaborador',
              merito: meritoValue,
              potencial: potencialValue,
              quadrante: `${y} / ${x}`
            };
          });
          setColaboradores(mapped);
        } else {
          // Default mock data if empty
          setColaboradores([
            { id: 1, nome: 'Ana García', merito: 85, potencial: 90, quadrante: 'Alto / Alto' },
            { id: 2, nome: 'Carlos Mendes', merito: 78, potencial: 65, quadrante: 'Médio / Médio' },
            { id: 3, nome: 'Marina Lopes', merito: 92, potencial: 88, quadrante: 'Alto / Alto' },
            { id: 4, nome: 'João Pedro', merito: 55, potencial: 45, quadrante: 'Baixo / Baixo' },
          ]);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do Nine Box:', err);
        // Fallback mock data
        setColaboradores([
          { id: 1, nome: 'Ana García', merito: 85, potencial: 90, quadrante: 'Alto / Alto' },
          { id: 2, nome: 'Carlos Mendes', merito: 78, potencial: 65, quadrante: 'Médio / Médio' },
          { id: 3, nome: 'Marina Lopes', merito: 92, potencial: 88, quadrante: 'Alto / Alto' },
          { id: 4, nome: 'João Pedro', merito: 55, potencial: 45, quadrante: 'Baixo / Baixo' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const matrizLayout = [
    'Alto / Baixo', 'Alto / Médio', 'Alto / Alto',
    'Médio / Baixo', 'Médio / Médio', 'Médio / Alto',
    'Baixo / Baixo', 'Baixo / Médio', 'Baixo / Alto',
  ];

  const getQuadranteStyle = (quadrante: string) => {
    if (quadrante === 'Alto / Alto') {
      return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200 hover:border-emerald-500/50 hover:shadow-emerald-500/5';
    }
    if (quadrante === 'Baixo / Baixo') {
      return 'bg-rose-500/10 border-rose-500/30 text-rose-200 hover:border-rose-500/50 hover:shadow-rose-500/5';
    }
    if (quadrante.includes('Alto') || quadrante.includes('Médio / Médio')) {
      return 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200 hover:border-indigo-500/50 hover:shadow-indigo-500/5';
    }
    return 'bg-slate-800/35 border-slate-700/50 text-slate-300 hover:border-slate-700 hover:shadow-slate-500/5';
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin mb-4" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Carregando Matriz...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={20} className="text-indigo-500" />
            <h1 className="text-2xl font-black text-white tracking-tight">
              Matriz Nine Box
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Análise estratégica de talentos: <span className="font-bold">{user?.nome}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Toggle de Visualização (Apenas Mobile) */}
          <div className="flex bg-[#131A2C]/60 p-1 rounded-xl border border-slate-800/80 md:hidden">
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${
                viewMode === 'matrix'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Matriz
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Lista
            </button>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-[#131A2C]/65 border border-slate-800/80 rounded-xl text-[10px] font-black uppercase text-slate-300">
            <Users size={14} className="text-indigo-500" />
            {colaboradores.length} Colaboradores Mapeados
          </div>
        </div>
      </header>

      {/* Grid Nine Box (3x3) - Visível no desktop ou se selecionado no mobile */}
      <div className={`w-full overflow-x-auto custom-scrollbar ${viewMode === 'list' ? 'hidden md:block' : 'block'}`}>
        <section className="relative pl-14 pb-14 pt-4 pr-4 min-w-[850px] md:min-w-0 group">
          {/* Rótulos de Eixo */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 whitespace-nowrap">
            Eixo Mérito (Performance)
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 whitespace-nowrap">
            Eixo Potencial
          </div>

          <div className="grid grid-cols-3 gap-4">
            {matrizLayout.map((quadrante) => {
              const pessoas = colaboradores.filter((c) => c.quadrante === quadrante);
              const style = getQuadranteStyle(quadrante);

              return (
                <div
                  key={quadrante}
                  className={`rounded-[2rem] border-2 p-6 min-h-[220px] transition-all flex flex-col ${style}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest opacity-80">
                      {quadrante}
                    </h3>
                    <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                      {pessoas.length}
                    </div>
                  </div>

                  {pessoas.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-[10px] uppercase font-bold opacity-30 tracking-tighter italic">Vazio</span>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {pessoas.map((pessoa) => (
                        <li
                          key={pessoa.id}
                          className="flex flex-col bg-[#0B0F19]/60 backdrop-blur-sm border border-slate-800/60 rounded-xl px-4 py-3 shadow-sm hover:translate-x-1 hover:border-indigo-500/50 transition-all cursor-default"
                        >
                          <span className="text-xs font-black text-slate-200 leading-none">
                            {pessoa.nome}
                          </span>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="h-1 flex-1 bg-slate-950 rounded-full overflow-hidden">
                               <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${pessoa.merito}%` }} />
                            </div>
                            <span className="text-[9px] font-bold text-indigo-300">{pessoa.merito}%</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Lista Móvel Stacked - Visível apenas se selecionada no mobile */}
      {viewMode === 'list' && (
        <div className="space-y-4 md:hidden animate-in fade-in duration-300">
          {matrizLayout.map((quadrante) => {
            const pessoas = colaboradores.filter((c) => c.quadrante === quadrante);
            if (pessoas.length === 0) return null;
            const style = getQuadranteStyle(quadrante);
            
            return (
              <div 
                key={quadrante} 
                className={`rounded-[2rem] border-2 p-5 flex flex-col ${style}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider">{quadrante}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                    {pessoas.length} {pessoas.length === 1 ? 'colaborador' : 'colaboradores'}
                  </span>
                </div>
                <ul className="space-y-2">
                  {pessoas.map((pessoa) => (
                    <li
                      key={pessoa.id}
                      className="flex flex-col bg-[#0B0F19]/60 backdrop-blur-sm border border-slate-800/60 rounded-xl px-4 py-3 shadow-sm"
                    >
                      <span className="text-sm font-bold text-slate-200">{pessoa.nome}</span>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Mérito:</span>
                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${pessoa.merito}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-indigo-300">{pessoa.merito}%</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* Legenda e Info */}
      <footer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-wrap gap-4 glass-card p-6 items-center">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wide">Talentos Chave</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-wide">Desenvolvimento</span>
          </div>
          <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            <span className="text-[10px] font-black text-rose-300 uppercase tracking-wide">Atenção Crítica</span>
          </div>
        </div>

        <div className="glass-card border-indigo-500/20 text-white p-6 flex items-center gap-4">
          <HelpCircle className="text-indigo-400 shrink-0" size={24} />
          <p className="text-[11px] leading-relaxed opacity-80">
            A matriz ajuda a identificar quem está pronto para promoção e quem precisa de PDI (Plano de Desenvolvimento Individual).
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NineBoxPage;