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

  // Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCiclo, setEditingCiclo] = useState<Ciclo | null>(null);
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [status, setStatus] = useState<'PLANEJADO' | 'ATIVO' | 'FINALIZADO'>('PLANEJADO');
  const [savingCiclo, setSavingCiclo] = useState(false);

  // 1. Carregamento de dados via API
  const carregarCiclos = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Ciclo[]>('/ciclos-desempenho');
      setCiclos(data);
    } catch (error) {
      console.error("Erro ao buscar ciclos do backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCiclos();
  }, []);

  const handleOpenNew = () => {
    setEditingCiclo(null);
    setNome('');
    setDataInicio('');
    setDataFim('');
    setStatus('PLANEJADO');
    setModalOpen(true);
  };

  const handleOpenEdit = (ciclo: Ciclo) => {
    setEditingCiclo(ciclo);
    setNome(ciclo.nome);
    setDataInicio(ciclo.data_inicio.split('T')[0]);
    setDataFim(ciclo.data_fim.split('T')[0]);
    setStatus(ciclo.status);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCiclo(true);
    try {
      const payload = {
        nome,
        data_inicio: new Date(dataInicio).toISOString(),
        data_fim: new Date(dataFim).toISOString(),
        status
      };

      if (editingCiclo) {
        await api.put(`/ciclos-desempenho/${editingCiclo.id}`, payload);
        alert('Ciclo atualizado com sucesso!');
      } else {
        await api.post('/ciclos-desempenho', payload);
        alert('Ciclo criado com sucesso!');
      }

      await carregarCiclos();
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Erro ao salvar ciclo.');
    } finally {
      setSavingCiclo(false);
    }
  };

  const handleExcluir = async () => {
    if (!editingCiclo) return;
    if (!window.confirm(`Tem certeza de que deseja remover o ciclo "${editingCiclo.nome}"?`)) return;

    setSavingCiclo(true);
    try {
      await api.delete(`/ciclos-desempenho/${editingCiclo.id}`);
      alert('Ciclo removido com sucesso!');
      await carregarCiclos();
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Erro ao remover ciclo.');
    } finally {
      setSavingCiclo(false);
    }
  };

  const renderStatus = (status: Ciclo['status']) => {
    const configs = {
      ATIVO: { 
        style: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", 
        label: "Em Andamento", 
        icon: <CheckCircle size={12} /> 
      },
      PLANEJADO: { 
        style: "text-amber-400 bg-amber-500/10 border-amber-500/20", 
        label: "Agendado", 
        icon: <Clock size={12} /> 
      },
      FINALIZADO: { 
        style: "text-slate-400 bg-slate-800/30 border-slate-700/50", 
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
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white tracking-tight">
            Ciclos de Desempenho
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Gerencie o cronograma estratégico e janelas de avaliação no PostgreSQL.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] bg-indigo-600 text-white text-sm font-black uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-500/10 shrink-0"
        >
          <PlusCircle size={20} />
          Novo Ciclo
        </button>
      </header>

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4 text-slate-400">
            <Loader2 className="animate-spin text-indigo-500" size={40} />
            <p className="text-xs font-black uppercase tracking-widest">Consultando Banco de Dados...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/40 border-b border-slate-800/60">
                  <th className="py-6 px-10 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Identificação</th>
                  <th className="py-6 px-6 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Vigência (Timeline)</th>
                  <th className="py-6 px-6 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 text-center">Status</th>
                  <th className="py-6 px-10 text-right text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {ciclos.map((ciclo) => (
                  <tr key={ciclo.id} className="group hover:bg-[#131A2C]/40 transition-all">
                    <td className="py-7 px-10">
                      <div className="flex flex-col">
                        <span className="text-base font-black text-slate-200 group-hover:text-indigo-400 transition-colors">
                          {ciclo.nome}
                        </span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Ref: #{ciclo.id}</span>
                      </div>
                    </td>

                    <td className="py-7 px-6">
                      <div className="flex items-center gap-3 text-slate-300 font-bold text-[11px] bg-slate-800/40 w-fit px-4 py-2 rounded-2xl border border-slate-700/30 shadow-sm">
                        <Calendar size={14} className="text-indigo-400" />
                        <span>{new Date(ciclo.data_inicio).toLocaleDateString()}</span>
                        <span className="text-slate-500">até</span>
                        <span>{new Date(ciclo.data_fim).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-7 px-6 text-center">
                      {renderStatus(ciclo.status)}
                    </td>

                    <td className="py-7 px-10 text-right">
                      <button
                        onClick={() => handleOpenEdit(ciclo)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-wider hover:bg-indigo-700 transition-all active:scale-95"
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
             <Calendar size={48} className="mx-auto text-slate-700 mb-4" />
             <h3 className="text-lg font-black text-slate-400">Sem ciclos no PostgreSQL</h3>
             <p className="text-sm text-slate-500">Inicie um novo ciclo estratégico para 2026.</p>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-[2rem]">
        <AlertCircle className="text-indigo-400 shrink-0 mt-0.5" size={18} />
        <p className="text-[11px] font-bold text-indigo-300 leading-relaxed uppercase">
          Apenas um ciclo pode estar "Ativo" por vez para integridade dos cálculos.
        </p>
      </div>

      {/* Modal Interativo de Criação/Edição */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleSave}
            className="glass-card max-w-md w-full p-8 space-y-6 animate-in zoom-in-95 duration-200 border border-slate-800/80 text-left bg-[#0F1424]/95"
          >
            <h2 className="text-xl font-black text-white tracking-tight">
              {editingCiclo ? `Editar Ciclo #${editingCiclo.id}` : 'Novo Ciclo de Desempenho'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Nome do Ciclo</label>
                <input 
                  type="text" 
                  required
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Ex: Ciclo Anual 2026"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Data Início</label>
                  <input 
                    type="date" 
                    required
                    value={dataInicio}
                    onChange={e => setDataInicio(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Data Fim</label>
                  <input 
                    type="date" 
                    required
                    value={dataFim}
                    onChange={e => setDataFim(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="PLANEJADO">Agendado (Planejado)</option>
                  <option value="ATIVO">Em Andamento (Ativo)</option>
                  <option value="FINALIZADO">Encerrado (Finalizado)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
              {editingCiclo ? (
                <button
                  type="button"
                  onClick={handleExcluir}
                  disabled={savingCiclo}
                  className="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/20 text-rose-400 rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  Remover
                </button>
              ) : <div />}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savingCiclo}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {savingCiclo && <Loader2 size={14} className="animate-spin" />}
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};