import React, { useState, useEffect } from 'react';
// CORREÇÃO ts(2613): Importando com chaves {} para bater com a exportação nomeada
import { api } from '../../services/Api';
import { Loader2 } from 'lucide-react';

interface Colaborador {
  id: number;
  nome: string;
}

export function AvaliacaoGestor() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [selectedColab, setSelectedColab] = useState('');
  const [notas, setNotas] = useState({ entrega: 0, comportamento: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca liderados do gestor logado
    // Ajustado para o prefixo /api que definimos no backend
    api.get('/usuarios/liderados')
      .then(res => {
        setColaboradores(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar liderados:", err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (!selectedColab) return alert("Selecione um colaborador");

    try {
      // Ajustado para a rota correta do AvaliacaoController
      await api.post(`/avaliacoes/gestor/${selectedColab}`, {
        notas,
        cicloId: 1 // No futuro, buscar o ciclo ativo dinamicamente
      });
      alert("Avaliação do colaborador enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      alert("Erro ao enviar avaliação. Verifique o console.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-left mt-10">
      <div className="glass-card p-8 border border-slate-800/80">
        <h2 className="text-2xl font-black text-white tracking-tight mb-4">Avaliar Desempenho do Time</h2>
        
        {loading ? (
          <div className="flex items-center gap-2 text-slate-400 py-6">
            <Loader2 size={16} className="animate-spin text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Carregando liderados...</span>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Colaborador
              </label>
              <select 
                className="w-full rounded-xl border border-slate-800 bg-[#0F1424] px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                onChange={(e) => setSelectedColab(e.target.value)}
                value={selectedColab}
              >
                <option value="">Selecione um liderado</option>
                {colaboradores.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Nota de Entrega (0-10)</label>
                <input 
                  type="number" 
                  min="0" max="10"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                  onChange={(e) => setNotas({ ...notas, entrega: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Nota de Comportamento (0-10)</label>
                <input 
                  type="number" 
                  min="0" max="10"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
                  onChange={(e) => setNotas({ ...notas, comportamento: Number(e.target.value) })}
                />
              </div>
            </div>

            <button 
              onClick={handleSubmit} 
              disabled={!selectedColab}
              className={`w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-xs text-white transition-all shadow-xl flex items-center justify-center gap-2 ${
                !selectedColab ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10 active:scale-95'
              }`}
            >
              Salvar Avaliação
            </button>
          </>
        )}
      </div>
    </div>
  );
}