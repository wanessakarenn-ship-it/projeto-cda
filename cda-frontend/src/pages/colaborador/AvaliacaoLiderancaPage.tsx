import React, { useState } from 'react';
import { api } from '../../services/Api'; // Importação corrigida com chaves

export function AvaliacaoLideranca() {
  const [feedback, setFeedback] = useState({ 
    suporte: 0, 
    clareza: 0, 
    comentario: "" 
  });
  const [enviando, setEnviando] = useState(false);

  const enviarFeedback = async () => {
    // Validação básica
    if (feedback.suporte === 0 || feedback.clareza === 0) {
      return alert("Por favor, preencha as notas antes de enviar.");
    }

    setEnviando(true);
    try {
      await api.post('/avaliacoes/lideranca', {
        notas: {
          suporte: feedback.suporte,
          clareza: feedback.clareza
        },
        comentario: feedback.comentario,
        cicloId: 1 // No futuro, isso pode vir de um contexto de Ciclo Ativo
      });

      alert("Feedback ao gestor enviado com sucesso!");
      // Limpa o formulário após o envio
      setFeedback({ suporte: 0, clareza: 0, comentario: "" });
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      alert("Houve um erro ao enviar seu feedback. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-left">
      <div className="glass-card p-8 border border-slate-800/80">
        <h1 className="text-3xl font-black text-white tracking-tight">Avaliar minha Liderança</h1>
        <p className="text-sm text-slate-400 mt-2 mb-8">
          Sua avaliação é fundamental para o desenvolvimento dos nossos gestores e da cultura da empresa.
        </p>

        <div className="space-y-6">
          {/* Avaliação de Suporte */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
              O quanto seu gestor te dá suporte no dia a dia? (1 a 5)
            </label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFeedback({ ...feedback, suporte: num })}
                  className={`w-10 h-10 rounded-full border text-xs font-black transition-all ${
                    feedback.suporte === num 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-indigo-500/50 hover:bg-[#131A2C]/60'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Avaliação de Clareza */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
              As metas e expectativas são passadas com clareza? (1 a 5)
            </label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFeedback({ ...feedback, clareza: num })}
                  className={`w-10 h-10 rounded-full border text-xs font-black transition-all ${
                    feedback.clareza === num 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-indigo-500/50 hover:bg-[#131A2C]/60'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Comentário Aberto */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              Comentários adicionais (Opcional)
            </label>
            <textarea 
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs font-medium text-slate-200 focus:border-indigo-500 outline-none transition-all resize-none" 
              rows={4}
              placeholder="O que seu gestor poderia fazer melhor?"
              value={feedback.comentario}
              onChange={e => setFeedback({...feedback, comentario: e.target.value})}
            />
          </div>

          <button 
            type="button"
            onClick={enviarFeedback} 
            disabled={enviando}
            className={`w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-xs text-white transition-all shadow-xl flex items-center justify-center gap-2 ${
              enviando ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10 active:scale-95'
            }`}
          >
            {enviando ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        </div>
      </div>
    </div>
  );
}