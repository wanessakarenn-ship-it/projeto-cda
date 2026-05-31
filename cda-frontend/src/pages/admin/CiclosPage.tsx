import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/Api'; // Importando sua API Axios
import { 
  PlusCircle, Calendar, CheckCircle, Clock, 
  ChevronRight, Archive, Loader2, AlertCircle 
} from 'lucide-react';

// Tipagem alinhada com as colunas do seu banco PostgreSQL
interface Ciclo {
  id: number; // Mudou de string para number (Serial no Postgres)
  nome: string;
  data_inicio: string; // Snake_case comum em SQL
  data_fim: string;
  status: 'PLANEJADO' | 'ATIVO' | 'FINALIZADO';
}

export const CiclosPage: React.FC = () => {
  const navigate = useNavigate();
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Busca de dados via API REST (Substituindo o onSnapshot)
  useEffect(() => {
    const carregarCiclos = async () => {
      try {
        setLoading(true);
        // Rota que você criará no Node.js: router.get('/ciclos-desempenho', ...)
        const { data } = await api.get<Ciclo[]>('/ciclos-desempenho');
        setCiclos(data);
      } catch (error) {
        console.error("Erro ao buscar ciclos do backend:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarCiclos();
  }, []);

  const renderStatus = (status: Ciclo['status']) => {
    const configs = {
      ATIVO: { 
        style: "text-emerald-600 bg-emerald-50 border-emerald-100", 
        label: "Em Andamento", 
        icon: <CheckCircle size={12} /> 
      },
      PLANEJADO: { 
        style: "text-amber-600 bg-amber-50 border-amber-100", 
        label: "Agendado", 
        icon: <Clock size={12} /> 
      },
      FINALIZADO: { 
        style: "text-slate-400 bg-slate-50 border-slate-200", 
        label: "Encerrado", 
        icon: <Archive size={12} /> 
      }
    };

    const current = configs[status] || configs.PLANEJADO;

    return (
      <span className={`inline-flex items-center gap-1.5 border px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${current.style}`}>
        {current.icon}
        {current.label}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Ciclos de Desempenho
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Gerencie o cronograma estratégico e janelas de avaliação no PostgreSQL.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/ciclos/novo')}
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] bg-indigo-600 text-white text-sm font-black uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-100"
        >
          <PlusCircle size={20} />
          Novo Ciclo
        </button>
      </header>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Consultando Banco de Dados...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="py-6 px-10 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Identificação</th>
                  <th className="py-6 px-6 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Vigência (Timeline)</th>
                  <th className="py-6 px-6 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 text-center">Status</th>
                  <th className="py-6 px-10 text-right text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ciclos.map((ciclo) => (
                  <tr key={ciclo.id} className="group hover:bg-slate-50/50 transition-all">
                    <td className="py-7 px-10">
                      <div className="flex flex-col">
                        <span className="text-base font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {ciclo.nome}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Ref: #{ciclo.id}</span>
                      </div>
                    </td>

                    <td className="py-7 px-6">
                      <div className="flex items-center gap-3 text-slate-600 font-bold text-[11px] bg-white w-fit px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                        <Calendar size={14} className="text-indigo-500" />
                        <span>{new Date(ciclo.data_inicio).toLocaleDateString()}</span>
                        <span className="text-slate-300">até</span>
                        <span>{new Date(ciclo.data_fim).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-7 px-6 text-center">
                      {renderStatus(ciclo.status)}
                    </td>

                    <td className="py-7 px-10 text-right">
                      <button
                        onClick={() => navigate(`/admin/ciclos/${ciclo.id}`)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-wider hover:bg-indigo-600 transition-all"
                      >
                        Gerenciar
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && ciclos.length === 0 && (
          <div className="py-24 text-center">
             <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
             <h3 className="text-lg font-black text-slate-800">Sem ciclos no PostgreSQL</h3>
             <p className="text-sm text-slate-400">Inicie um novo ciclo estratégico para 2026.</p>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 p-6 bg-indigo-50/50 border border-indigo-100 rounded-[2rem]">
        <AlertCircle className="text-indigo-500 shrink-0 mt-0.5" size={18} />
        <p className="text-[11px] font-bold text-indigo-700 leading-relaxed uppercase">
          Apenas um ciclo pode estar "Ativo" por vez para integridade dos cálculos.
        </p>
      </div>
    </div>
  );
};