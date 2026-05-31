import React, { useState, useEffect } from 'react';
import { api } from '../../services/Api'; // Sua instância do Axios
import { Grid3X3, Save, Info, Loader2, CheckCircle } from 'lucide-react';

interface NineBoxConfig {
  id: number;
  posicao_x: number; // Potencial (1-3)
  posicao_y: number; // Desempenho (1-3)
  nome_quadrante: string;
  descricao: string;
  cor: string;
}

export const NineBoxConfigPage: React.FC = () => {
  const [configuracoes, setConfiguracoes] = useState<NineBoxConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 1. Carregar configurações do PostgreSQL
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<NineBoxConfig[]>('/configuracoes/nine-box');
        
        // Ordenar para garantir que a grade faça sentido visual (opcional)
        const sortedData = data.sort((a, b) => 
          (b.posicao_y - a.posicao_y) || (a.posicao_x - b.posicao_x)
        );
        
        setConfiguracoes(sortedData);
      } catch (error) {
        console.error("Erro ao carregar matriz Nine Box:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfigs();
  }, []);

  const handleChange = (id: number, field: string, value: string | number) => {
    setConfiguracoes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    if (showSuccess) setShowSuccess(false);
  };

  // 2. Salvar as alterações em lote (Bulk Update)
  const handleSalvar = async () => {
    try {
      setSaving(true);
      // Rota no Node.js: router.put('/configuracoes/nine-box', ...)
      await api.put('/configuracoes/nine-box', { quadrantes: configuracoes });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert("Erro ao salvar configurações da matriz.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-xs font-black uppercase tracking-widest">Renderizando Matriz de Talentos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Configuração da Nine Box
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Personalize os nomes, definições e cores dos 9 quadrantes estratégicos.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSalvar}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {showSuccess ? 'Configurações Salvas!' : 'Salvar Matriz'}
        </button>
      </header>

      {/* Alerta Informativo */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-5 flex gap-4 items-center">
        <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-600">
          <Info size={20} />
        </div>
        <p className="text-xs text-indigo-800 leading-relaxed font-medium">
          A matriz correlaciona <b>Potencial (Eixo X)</b> e <b>Desempenho (Eixo Y)</b>. 
          As alterações afetam diretamente os relatórios de sucessão de 2026.
        </p>
      </div>

      

      {/* Grid de Quadrantes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {configuracoes.map((item) => (
          <div
            key={item.id}
            className="group bg-white border border-slate-200 rounded-[2.5rem] p-6 space-y-6 hover:border-indigo-300 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                  style={{ 
                    backgroundColor: item.cor,
                    boxShadow: `0 8px 20px -6px ${item.cor}`
                  }}
                >
                  <Grid3X3 size={20} strokeWidth={2.5} />
                </div>

                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Posição {item.posicao_x}x{item.posicao_y}
                  </span>
                  <h3 className="text-base font-black text-slate-900 leading-none">
                    {item.nome_quadrante || 'Sem Nome'}
                  </h3>
                </div>
              </div>

              <div className="relative w-8 h-8 rounded-lg border-2 border-slate-100 overflow-hidden shadow-sm">
                <input
                  type="color"
                  value={item.cor}
                  onChange={(e) => handleChange(item.id, 'cor', e.target.value)}
                  className="absolute inset-[-4px] w-[150%] h-[150%] cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Rótulo</label>
                <input
                  type="text"
                  value={item.nome_quadrante}
                  onChange={(e) => handleChange(item.id, 'nome_quadrante', e.target.value)}
                  className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-2.5 text-xs font-bold text-slate-700 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Definição do Perfil</label>
                <textarea
                  rows={3}
                  value={item.descricao}
                  onChange={(e) => handleChange(item.id, 'descricao', e.target.value)}
                  className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-2.5 text-xs font-medium text-slate-600 focus:border-indigo-500 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showSuccess && (
        <div className="fixed bottom-8 right-8 flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right-10">
          <CheckCircle className="text-emerald-400" size={20} />
          <span className="text-sm font-bold uppercase tracking-tight">Matriz atualizada com sucesso!</span>
        </div>
      )}
    </div>
  );
};