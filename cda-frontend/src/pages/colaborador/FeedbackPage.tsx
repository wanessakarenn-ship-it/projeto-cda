import React from 'react';
import { SummaryCard } from '../../components/SummaryCard';
import { useAvaliacao } from '../../contexts/AvaliacaoContext';
import { useCarreira } from '../../hooks/useCarreira';
import { useAuth } from '../../contexts/AuthContext'; // 1. Importação para contexto de usuário

import { MessageSquareText, ShieldCheck, AlertTriangle } from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const avaliacao = useAvaliacao();
  const { user } = useAuth(); // 2. Acesso ao usuário (útil para logs ou futuras buscas)

  /**
   * MELHORIA ROBUSTA: 
   * Como agora estamos usando o backend real, evite manipular strings (replace/replace).
   * O ideal é usar o valor numérico puro que vem do seu cálculo de performance.
   */
  const scoreFinal = avaliacao.resultadoFinal || 0; 

  const carreira = useCarreira(scoreFinal);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* TÍTULO */}
      <header>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Feedback do Ciclo
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Ciclo {avaliacao.ciclo} • Status: {avaliacao.status}
        </p>
      </header>

      {/* RESUMO DE INDICADORES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          value={avaliacao.formatted.final} // 3. Usa a versão formatada (68,9%) para exibição
          label="Resultado Final"
          icon={<ShieldCheck size={22} />}
          isPositive={carreira.isElegivel}
        />

        <SummaryCard
          value={avaliacao.formatted.competencias}
          label="Competências"
        />

        <SummaryCard
          value={avaliacao.formatted.diferenca}
          label="Diferença para Meta"
        />
      </section>

      {/* ÁREA DE FEEDBACK TEXTUAL */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
        <div className="flex items-center gap-3">
          <MessageSquareText className="text-indigo-500" size={22} />
          <h2 className="text-lg font-black text-slate-800">
            Feedback do Gestor
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Olá, <span className="font-bold text-slate-900">{user?.nome}</span>. 
            Você apresentou um desempenho consistente ao longo do ciclo,
            demonstrando boa capacidade de entrega e comprometimento com os
            objetivos propostos.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-indigo-100 pl-4">
            "Recomendamos foco no desenvolvimento contínuo e atenção às metas de
            médio prazo definidas junto à liderança."
          </p>
        </div>
      </section>

      {/* STATUS DE CARREIRA / ELEGIBILIDADE */}
      <section
        className={`rounded-2xl p-6 border flex items-start gap-4 transition-all duration-300 ${
          carreira.isElegivel
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm shadow-emerald-100'
            : 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm shadow-amber-100'
        }`}
      >
        <div className="shrink-0 p-2 bg-white/50 rounded-lg">
          {carreira.isElegivel ? (
            <ShieldCheck size={22} className="text-emerald-600" />
          ) : (
            <AlertTriangle size={22} className="text-amber-600" />
          )}
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-tight">
            Status de Elegibilidade de Carreira
          </h3>
          <p className="text-sm mt-1 leading-snug font-medium">
            {carreira.mensagem}
          </p>
        </div>
      </section>
    </div>
  );
};

export default FeedbackPage;