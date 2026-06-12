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

  // Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingComp, setEditingComp] = useState<Competencia | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [peso, setPeso] = useState(0);
  const [ativa, setAtiva] = useState(true);
  const [savingComp, setSavingComp] = useState(false);

  // 1. Carregamento de dados da API
  const fetchCompetencias = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Competencia[]>('/competencias');
      setCompetencias(data);
    } catch (error) {
      console.error("Erro ao carregar competências:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetencias();
  }, []);

  // 2. Cálculo dinâmico baseado nos dados da API
  const pesoTotal = competencias
    .filter(c => c.ativa)
    .reduce((acc, curr) => acc + Number(curr.peso), 0);

  const handleOpenNew = () => {
    setEditingComp(null);
    setNome('');
    setDescricao('');
    setPeso(0);
    setAtiva(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (comp: Competencia) => {
    setEditingComp(comp);
    setNome(comp.nome);
    setDescricao(comp.descricao);
    setPeso(comp.peso);
    setAtiva(comp.ativa);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingComp(true);
    try {
      const payload = {
        nome,
        descricao,
        peso: Number(peso),
        ativa
      };

      if (editingComp) {
        await api.put(`/competencias/${editingComp.id}`, payload);
        alert('Competência atualizada com sucesso!');
      } else {
        await api.post('/competencias', payload);
        alert('Competência criada com sucesso!');
      }

      await fetchCompetencias();
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Erro ao salvar competência.');
    } finally {
      setSavingComp(false);
    }
  };

  // 3. Função para deletar (Exemplo de integração DELETE)
  const handleExcluir = async (id: number) => {
    if (!window.confirm("Deseja remover esta competência?")) return;
    
    try {
      await api.delete(`/competencias/${id}`);
      setCompetencias(prev => prev.filter(c => c.id !== id));
      alert('Competência removida com sucesso!');
    } catch (error) {
      alert("Erro ao excluir competência do banco.");
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
        <p className="text-xs font-black uppercase tracking-widest">Acessando Dicionário de Competências...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Competências Avaliadas
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Defina os pilares comportamentais e técnicos no PostgreSQL.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-500/10 shrink-0"
        >
          <PlusCircle size={18} />
          Nova Competência
        </button>
      </header>

      {/* Feedback de Regra de Negócio */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between ${
        pesoTotal > 100 ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' : 'bg-slate-800/35 border-slate-700/50 text-slate-300'
      }`}>
        <div className="flex items-center gap-3">
          <Info size={18} className={pesoTotal > 100 ? 'text-rose-400' : 'text-indigo-400'} />
          <p className="text-xs font-medium">
            A soma dos pesos das competências <b>ativas</b> deve totalizar 100% para o cálculo de mérito.
          </p>
        </div>
        <span className={`text-sm font-black ${pesoTotal > 100 ? 'text-rose-400' : 'text-white'}`}>
          Soma Total: {pesoTotal}%
        </span>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/40 border-b border-slate-800/60">
                <th className="py-5 px-8 text-[11px] font-black uppercase tracking-wider text-slate-400">Identificação</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider text-slate-400">Impacto (Peso)</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider text-slate-400 text-center">Status</th>
                <th className="py-5 px-8 text-right text-[11px] font-black uppercase tracking-wider text-slate-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {competencias.map((comp) => (
                <tr key={comp.id} className="group hover:bg-[#131A2C]/40 transition-colors">
                  <td className="py-5 px-8 max-w-md">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        {comp.nome}
                      </span>
                      <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {comp.descricao}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-24 bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${pesoTotal > 100 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                          style={{ width: `${comp.peso}%` }}
                        />
                      </div>
                      <span className="text-xs font-black text-indigo-300 w-8">
                        {comp.peso}%
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                      comp.ativa 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-slate-800/30 text-slate-400 border border-slate-700/50'
                    }`}>
                      {comp.ativa ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {comp.ativa ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>

                  <td className="py-5 px-8">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEdit(comp)}
                        className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-[#131A2C] rounded-xl transition-all"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleExcluir(comp.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
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
            <PlusCircle size={32} className="mx-auto text-slate-700 mb-4" />
            <p className="text-sm text-slate-500 font-medium">Nenhuma competência cadastrada no banco.</p>
          </div>
        )}
      </div>

      {/* Modal de Criação / Edição */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleSave}
            className="glass-card max-w-md w-full p-8 space-y-6 animate-in zoom-in-95 duration-200 border border-slate-800/80 text-left bg-[#0F1424]/95"
          >
            <h2 className="text-xl font-black text-white tracking-tight">
              {editingComp ? `Editar Competência #${editingComp.id}` : 'Nova Competência'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Nome da Competência</label>
                <input 
                  type="text" 
                  required
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Ex: Comunicação Eficaz"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Descrição</label>
                <textarea 
                  required
                  rows={3}
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                  placeholder="Descreva os comportamentos esperados desta competência..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-medium text-slate-200 focus:border-indigo-500 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Peso (%)</label>
                  <input 
                    type="number" 
                    required
                    min={0}
                    max={100}
                    value={peso}
                    onChange={e => setPeso(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Status</label>
                  <select
                    value={ativa ? 'true' : 'false'}
                    onChange={e => setAtiva(e.target.value === 'true')}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                  >
                    <option value="true">Ativa</option>
                    <option value="false">Inativa</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={savingComp}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {savingComp && <Loader2 size={14} className="animate-spin" />}
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};