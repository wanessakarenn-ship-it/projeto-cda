import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  AlertCircle, 
  Clock, 
  TrendingDown, 
  ChevronRight, 
  ShieldAlert,
  BellOff
} from 'lucide-react';

/**
 * 🔗 Tipagem sincronizada com o Backend
 * Sugestão de Endpoint: GET /gestao/alertas
 */
interface Alerta {
  id: string;
  nome: string;
  cargo: string;
  tipo: 'BAIXO_DESEMPENHO' | 'AVALIACAO_PENDENTE' | 'RISCO_EXPERIENCIA';
  mensagem: string;
  idColaborador: number; // Para navegação futura ao perfil do liderado
}

export const AlertasPage: React.FC = () => {
  const { user } = useAuth();

  // MOCK INICIAL - TODO: substituir por const { data } = useQuery('/gestao/alertas')
  const alertas: Alerta[] = [
    {
      id: '1',
      nome: 'Carlos Mendes',
      cargo: 'Analista de Sistemas',
      tipo: 'BAIXO_DESEMPENHO',
      mensagem: 'Desempenho abaixo do esperado (Score: 52%) no último ciclo.',
      idColaborador: 101,
    },
    {
      id: '2',
      nome: 'Fernanda Rocha',
      cargo: 'Designer',
      tipo: 'AVALIACAO_PENDENTE',
      mensagem: 'Ciclo 1T 2026 expira em 3 dias e a autoavaliação não foi iniciada.',
      idColaborador: 102,
    },
    {
      id: '3',
      nome: 'João Silva',
      cargo: 'Assistente Administrativo',
      tipo: 'RISCO_EXPERIENCIA',
      mensagem: 'Colaborador no 45º dia de experiência com gap técnico crítico.',
      idColaborador: 103,
    },
  ];

  /**
   * Mapeamento de UI baseado nos tipos do Backend
   */
  const configMap: Record<Alerta['tipo'], { style: string; label: string; icon: React.ReactNode }> = {
    BAIXO_DESEMPENHO: {
      style: 'bg-rose-50 text-rose-600 border-rose-100',
      label: 'Performance Crítica',
      icon: <TrendingDown size={18} />,
    },
    AVALIACAO_PENDENTE: {
      style: 'bg-amber-50 text-amber-600 border-amber-100',
      label: 'Pendência de Prazo',
      icon: <Clock size={18} />,
    },
    RISCO_EXPERIENCIA: {
      style: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      label: 'Acompanhamento RH',
      icon: <AlertCircle size={18} />,
    },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header com Contexto do Gestor */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert size={20} className="text-indigo-500" />
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              Central de Alertas
            </h1>
          </div>
          <p className="text-sm text-slate-500">
             Gestor: <span className="font-bold">{user?.nome}</span> • Foco em mitigação de riscos de performance.
          </p>
        </div>
        
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-rose-100 animate-pulse">
            {alertas.length} ALERTAS ATIVOS
          </span>
        </div>
      </header>

      {/* Lista de alertas */}
      <section className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {alertas.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <BellOff size={32} />
              </div>
              <p className="text-sm font-bold text-slate-400">Nenhum alerta para sua equipe hoje 🎉</p>
              <p className="text-xs text-slate-300 mt-1">Tudo operando dentro das metas estabelecidas.</p>
            </div>
          ) : (
            alertas.map((alerta) => {
              const config = configMap[alerta.tipo];
              
              return (
                <div
                  key={alerta.id}
                  className="p-6 flex items-center justify-between gap-6 hover:bg-slate-50/80 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    {/* Ícone com fundo dinâmico */}
                    <div className={`mt-1 p-3 rounded-2xl border-2 ${config.style} shadow-sm group-hover:scale-110 transition-transform`}>
                      {config.icon}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {alerta.nome}
                        </p>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${config.style}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        {alerta.cargo}
                      </p>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                        {alerta.mensagem}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                      <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-xl uppercase tracking-tighter">
                        Ver Plano de Ação
                      </span>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Footer Informativo */}
      <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <AlertCircle size={20} className="text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-bold">Resumo de Riscos</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Atualizado em Tempo Real</p>
          </div>
        </div>
        <div className="flex gap-8 pr-4">
           <div className="text-center">
              <p className="text-lg font-black">{alertas.filter(a => a.tipo === 'BAIXO_DESEMPENHO').length}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black">Performance</p>
           </div>
           <div className="text-center">
              <p className="text-lg font-black">{alertas.filter(a => a.tipo === 'AVALIACAO_PENDENTE').length}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black">Prazos</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AlertasPage;