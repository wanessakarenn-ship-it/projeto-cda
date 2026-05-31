import React, { useState, useEffect } from 'react';
import { api } from '../../services/Api'; // Sua instância do Axios
import { Plus, Target, Calendar, Trash2, Info, ArrowUpRight, Loader2 } from 'lucide-react';

interface MetaGlobal {
  id: number;
  titulo: string;
  descricao: string;
  peso: number;
  prazo: string;
}

export const MetasGlobaisPage: React.FC = () => {
  const [metas, setMetas] = useState<MetaGlobal[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Carregar metas do PostgreSQL
  useEffect(() => {
    const fetchMetas = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<MetaGlobal[]>('/metas-globais');
        setMetas(data);
      } catch (error) {
        console.error("Erro ao carregar metas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetas();
  }, []);

  // 2. Persistir nova meta no banco (POST)
  const handleAdicionar = async () => {
    // Exemplo simplificado: No futuro, você pode abrir um Modal com formulário
    const novaMetaMock = {
      titulo: 'Nova Meta Estratégica',
      descricao: 'Defina o objetivo global aqui.',
      peso: 0,
      prazo: new Date().toISOString().split('T')[0],
    };

    try {
      const { data } = await api.post<MetaGlobal>('/metas-globais', novaMetaMock);
      setMetas((prev) => [...prev, data]);
    } catch (error) {
      alert("Erro ao criar meta no servidor.");
    }
  };

  // 3. Remover meta do banco (DELETE)
  const handleRemover = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir esta meta global?")) return;

    try {
      await api.delete(`/metas-globais/${id}`);
      setMetas((prev) => prev.filter((meta) => meta.id !== id));
    } catch (error) {
      alert("Erro ao remover meta.");
    }
  };

  const totalPeso = metas.reduce((acc, meta) => acc + Number(meta.peso), 0);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-xs font-black uppercase tracking-widest text-center">
          Conectando ao Planejamento <br/> Estratégico...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Metas Globais
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Defina os OKRs e diretrizes no PostgreSQL que norteiam o CDA 2026.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdicionar}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={18} />
          Adicionar Meta
        </button>
      </header>

      {/* Validação de Pesos Dinâmica */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
        totalPeso === 100 ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'
      }`}>
        <div className="flex items-center gap-3">
          <Info size={18} className={totalPeso === 100 ? 'text-emerald-600' : 'text-amber-600'} />
          <p className="text-xs font-medium text-slate-700">
            A soma das metas globais deve ser <b>100%</b>.
          </p>
        </div>
        <span className={`text-sm font-black ${totalPeso === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
          Total: {totalPeso}%
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {metas.map((meta) => (
          <div
            key={meta.id}
            className="group bg-white border border-slate-200 rounded-[1.5rem] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-1 gap-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                <Target size={24} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-800 tracking-tight">
                    {meta.titulo}
                  </h3>
                  <ArrowUpRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                  {meta.descricao}
                </p>
                
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-tight">
                    Peso: {meta.peso}%
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Calendar size={14} />
                    Prazo: {new Date(meta.prazo).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end border-t md:border-t-0 pt-4 md:pt-0 gap-2">
              <button
                type="button"
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleRemover(meta.id)}
                className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {!loading && metas.length === 0 && (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center">
            <Target size={40} className="mx-auto text-slate-200 mb-3" />
            <p className="text-sm font-bold text-slate-400">Nenhuma meta global no banco de dados.</p>
          </div>
        )}
      </div>
    </div>
  );
};