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

  // Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMeta, setEditingMeta] = useState<MetaGlobal | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [peso, setPeso] = useState(0);
  const [prazo, setPrazo] = useState('');
  const [savingMeta, setSavingMeta] = useState(false);

  // 1. Carregar metas do PostgreSQL
  const fetchMetas = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<MetaGlobal[]>('/metas');
      setMetas(data);
    } catch (error) {
      console.error("Erro ao carregar metas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetas();
  }, []);

  const handleOpenNew = () => {
    setEditingMeta(null);
    setTitulo('');
    setDescricao('');
    setPeso(0);
    setPrazo(new Date().toISOString().split('T')[0]);
    setModalOpen(true);
  };

  const handleOpenEdit = (meta: MetaGlobal) => {
    setEditingMeta(meta);
    setTitulo(meta.titulo);
    setDescricao(meta.descricao);
    setPeso(meta.peso);
    setPrazo(meta.prazo.split('T')[0]);
    setModalOpen(true);
  };

  // 2. Persistir / Atualizar nova meta no banco (POST/PUT)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMeta(true);
    try {
      const payload = {
        titulo,
        descricao,
        peso: Number(peso),
        prazo: new Date(prazo).toISOString()
      };

      if (editingMeta) {
        await api.put(`/metas/${editingMeta.id}`, payload);
        alert('Meta atualizada com sucesso!');
      } else {
        await api.post('/metas', payload);
        alert('Meta criada com sucesso!');
      }

      await fetchMetas();
      setModalOpen(false);
    } catch (error) {
      alert("Erro ao salvar meta no servidor.");
    } finally {
      setSavingMeta(false);
    }
  };

  // 3. Remover meta do banco (DELETE)
  const handleRemover = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir esta meta global?")) return;

    try {
      await api.delete(`/metas/${id}`);
      setMetas((prev) => prev.filter((meta) => meta.id !== id));
      alert('Meta removida com sucesso!');
    } catch (error) {
      alert("Erro ao remover meta.");
    }
  };

  const totalPeso = metas.reduce((acc, meta) => acc + Number(meta.peso), 0);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
        <p className="text-xs font-black uppercase tracking-widest text-center">
          Conectando ao Planejamento <br/> Estratégico...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Metas Globais
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Defina os OKRs e diretrizes no PostgreSQL que norteiam o CDA 2026.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-500/10 shrink-0"
        >
          <Plus size={18} />
          Adicionar Meta
        </button>
      </header>

      {/* Validação de Pesos Dinâmica */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
        totalPeso === 100 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
      }`}>
        <div className="flex items-center gap-3">
          <Info size={18} className={totalPeso === 100 ? 'text-emerald-400' : 'text-amber-400'} />
          <p className="text-xs font-medium">
            A soma das metas globais deve ser <b>100%</b>.
          </p>
        </div>
        <span className={`text-sm font-black ${totalPeso === 100 ? 'text-emerald-400' : 'text-white'}`}>
          Total: {totalPeso}%
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {metas.map((meta) => (
          <div
            key={meta.id}
            className="group bg-[#131A2C]/65 border border-slate-800/80 rounded-[1.5rem] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
          >
            <div className="flex flex-1 gap-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-slate-700/30 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                <Target size={24} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-200 tracking-tight">
                    {meta.titulo}
                  </h3>
                  <ArrowUpRight size={14} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  {meta.descricao}
                </p>
                
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/40 border border-slate-700/30 rounded-full text-[10px] font-black text-indigo-300 uppercase tracking-tight">
                    Peso: {meta.peso}%
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Calendar size={14} className="text-indigo-400" />
                    Prazo: {new Date(meta.prazo).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-slate-800/40 md:border-t-0 pt-4 md:pt-0 gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(meta)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-[#131A2C] rounded-xl transition-all"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleRemover(meta.id)}
                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {!loading && metas.length === 0 && (
          <div className="glass-card border-2 border-dashed border-slate-800/80 p-20 text-center">
            <Target size={40} className="mx-auto text-slate-700 mb-3" />
            <p className="text-sm font-bold text-slate-500">Nenhuma meta global no banco de dados.</p>
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
              {editingMeta ? `Editar Meta #${editingMeta.id}` : 'Nova Meta Global'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Título da Meta</label>
                <input 
                  type="text" 
                  required
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  placeholder="Ex: Aceleração Comercial"
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
                  placeholder="Descreva as principais conquistas esperadas desta meta..."
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
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Prazo Final</label>
                  <input 
                    type="date" 
                    required
                    value={prazo}
                    onChange={e => setPrazo(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                  />
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
                disabled={savingMeta}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {savingMeta && <Loader2 size={14} className="animate-spin" />}
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};