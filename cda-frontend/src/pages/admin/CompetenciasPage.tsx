import React, { useState, useEffect } from 'react';
import { api } from '../../services/Api'; // Sua instância do Axios
import { 
  PlusCircle, Edit3, Trash2, Sliders, 
  CheckCircle2, XCircle, Info, Loader2 
} from 'lucide-react';

interface Competencia {
  id: number;
  nome: string;
  descricao: string;
  peso: number;
  ativa: boolean;
}

export const CompetenciasPage: React.FC = () => {
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Carregamento de dados da API
  useEffect(() => {
    const fetchCompetencias = async () => {
      try {
        setLoading(true);
        // Rota no seu Node.js: router.get('/competencias', ...)
        const { data } = await api.get<Competencia[]>('/competencias');
        setCompetencias(data);
      } catch (error) {
        console.error("Erro ao carregar competências:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetencias();
  }, []);

  // 2. Cálculo dinâmico baseado nos dados da API
  const pesoTotal = competencias
    .filter(c => c.ativa)
    .reduce((acc, curr) => acc + Number(curr.peso), 0);

  // 3. Função para deletar (Exemplo de integração DELETE)
  const handleExcluir = async (id: number) => {
    if (!window.confirm("Deseja remover esta competência?")) return;
    
    try {
      await api.delete(`/competencias/${id}`);
      setCompetencias(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      alert("Erro ao excluir competência do banco.");
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-xs font-black uppercase tracking-widest">Acessando Dicionário de Competências...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Competências Avaliadas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Defina os pilares comportamentais e técnicos no PostgreSQL.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-100"
        >
          <PlusCircle size={18} />
          Nova Competência
        </button>
      </header>

      {/* Feedback de Regra de Negócio */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between ${
        pesoTotal > 100 ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <Info size={18} className={pesoTotal > 100 ? 'text-rose-500' : 'text-slate-400'} />
          <p className="text-xs font-medium text-slate-600">
            A soma dos pesos das competências <b>ativas</b> deve totalizar 100% para o cálculo de mérito.
          </p>
        </div>
        <span className={`text-sm font-black ${pesoTotal > 100 ? 'text-rose-600' : 'text-slate-900'}`}>
          Soma Total: {pesoTotal}%
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-5 px-8 text-[11px] font-black uppercase tracking-wider text-slate-400">Identificação</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider text-slate-400">Impacto (Peso)</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider text-slate-400 text-center">Status</th>
                <th className="py-5 px-8 text-right text-[11px] font-black uppercase tracking-wider text-slate-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {competencias.map((comp) => (
                <tr key={comp.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="py-5 px-8 max-w-md">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {comp.nome}
                      </span>
                      <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {comp.descricao}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${pesoTotal > 100 ? 'bg-rose-400' : 'bg-indigo-500'}`}
                          style={{ width: `${comp.peso}%` }}
                        />
                      </div>
                      <span className="text-xs font-black text-slate-700 w-8">
                        {comp.peso}%
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                      comp.ativa 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {comp.ativa ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {comp.ativa ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>

                  <td className="py-5 px-8">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleExcluir(comp.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && competencias.length === 0 && (
          <div className="py-20 text-center">
            <PlusCircle size={32} className="mx-auto text-slate-200 mb-4" />
            <p className="text-sm text-slate-400 font-medium">Nenhuma competência cadastrada no banco.</p>
          </div>
        )}
      </div>
    </div>
  );
};