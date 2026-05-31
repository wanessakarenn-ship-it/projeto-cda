import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TrendingUp, Users, HelpCircle, Info } from 'lucide-react';

interface NineBoxItem {
  id: number;
  nome: string;
  merito: number;
  potencial: number;
  quadrante: string;
}

export const NineBoxPage: React.FC = () => {
  const { user } = useAuth();

  // 🔹 MOCK - TODO: api.get('/gestao/nine-box')
  const colaboradores: NineBoxItem[] = [
    { id: 1, nome: 'Ana García', merito: 85, potencial: 90, quadrante: 'Alto / Alto' },
    { id: 2, nome: 'Carlos Mendes', merito: 78, potencial: 65, quadrante: 'Médio / Médio' },
    { id: 3, nome: 'Marina Lopes', merito: 92, potencial: 88, quadrante: 'Alto / Alto' },
    { id: 4, nome: 'João Pedro', merito: 55, potencial: 45, quadrante: 'Baixo / Baixo' },
  ];

  /**
   * Ordem correta para renderizar de cima para baixo (Eixo Y: Mérito)
   * e da esquerda para a direita (Eixo X: Potencial)
   */
  const matrizLayout = [
    'Alto / Baixo', 'Alto / Médio', 'Alto / Alto',
    'Médio / Baixo', 'Médio / Médio', 'Médio / Alto',
    'Baixo / Baixo', 'Baixo / Médio', 'Baixo / Alto',
  ];

  const getQuadranteStyle = (quadrante: string) => {
    if (quadrante === 'Alto / Alto') return 'bg-emerald-50/50 border-emerald-200 text-emerald-700';
    if (quadrante === 'Baixo / Baixo') return 'bg-rose-50/50 border-rose-200 text-rose-700';
    if (quadrante.includes('Alto') || quadrante.includes('Médio / Médio')) return 'bg-indigo-50/30 border-indigo-100 text-indigo-700';
    return 'bg-slate-50 border-slate-200 text-slate-600';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={20} className="text-indigo-500" />
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Matriz Nine Box
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Análise estratégica de talentos: <span className="font-bold">{user?.nome}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-400">
          <Users size={14} />
          {colaboradores.length} Colaboradores Mapeados
        </div>
      </header>

      {/* Grid Nine Box (3x3) */}
      <section className="relative group">
        {/* Rótulos de Eixo */}
        <div className="absolute -left-12 top-1/2 -rotate-90 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hidden xl:block">
          Eixo Mérito (Performance)
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hidden xl:block">
          Eixo Potencial
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matrizLayout.map((quadrante) => {
            const pessoas = colaboradores.filter((c) => c.quadrante === quadrante);
            const style = getQuadranteStyle(quadrante);

            return (
              <div
                key={quadrante}
                className={`rounded-[2rem] border-2 p-6 min-h-[200px] transition-all hover:shadow-xl hover:shadow-slate-100/50 flex flex-col ${style}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest opacity-70">
                    {quadrante}
                  </h3>
                  <div className="w-5 h-5 rounded-full bg-white/50 flex items-center justify-center text-[10px] font-bold">
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
                        className="flex flex-col bg-white/80 backdrop-blur-sm border border-white rounded-xl px-4 py-3 shadow-sm hover:translate-x-1 transition-transform cursor-default"
                      >
                        <span className="text-xs font-black text-slate-700 leading-none">
                          {pessoa.nome}
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500" style={{ width: `${pessoa.merito}%` }} />
                          </div>
                          <span className="text-[9px] font-bold text-slate-400">{pessoa.merito}%</span>
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

      {/* Legenda e Info */}
      <footer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-wrap gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm items-center">
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wide">Talentos Chave</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wide">Desenvolvimento</span>
          </div>
          <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            <span className="text-[10px] font-black text-rose-700 uppercase tracking-wide">Atenção Crítica</span>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-[2rem] flex items-center gap-4">
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