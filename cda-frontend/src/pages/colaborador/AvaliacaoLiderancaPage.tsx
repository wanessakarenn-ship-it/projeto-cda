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
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Avaliar minha Liderança</h1>
      <p className="text-gray-600 mb-8">
        Sua avaliação é fundamental para o desenvolvimento dos nossos gestores e da cultura da empresa.
      </p>

      <div className="space-y-6">
        {/* Avaliação de Suporte */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            O quanto seu gestor te dá suporte no dia a dia? (1 a 5)
          </label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setFeedback({ ...feedback, suporte: num })}
                className={`w-10 h-10 rounded-full border ${
                  feedback.suporte === num 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                } transition-all`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Avaliação de Clareza */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            As metas e expectativas são passadas com clareza? (1 a 5)
          </label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setFeedback({ ...feedback, clareza: num })}
                className={`w-10 h-10 rounded-full border ${
                  feedback.clareza === num 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                } transition-all`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Comentário Aberto */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Comentários adicionais (Opcional)
          </label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
            rows={4}
            placeholder="O que seu gestor poderia fazer melhor?"
            value={feedback.comentario}
            onChange={e => setFeedback({...feedback, comentario: e.target.value})}
          />
        </div>

        <button 
          onClick={enviarFeedback} 
          disabled={enviando}
          className={`w-full mt-4 py-3 rounded-lg font-bold text-white transition-all ${
            enviando ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
          }`}
        >
          {enviando ? 'Enviando...' : 'Enviar Feedback'}
        </button>
      </div>
    </div>
  );
}