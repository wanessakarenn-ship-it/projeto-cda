import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  idColaborador: number; // Para navegação ao perfil do liderado
}

export const AlertasPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
      style: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      label: 'Performance Crítica',
      icon: <TrendingDown size={18} />,
    },
    AVALIACAO_PENDENTE: {
      style: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      label: 'Pendência de Prazo',
      icon: <Clock size={18} />,
    },
    RISCO_EXPERIENCIA: {
      style: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      label: 'Acompanhamento RH',
      icon: <AlertCircle size={18} />,
    },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 text-left">
      {/* Header com Contexto do Gestor */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert size={20} className="text-indigo-400 animate-pulse" />
            <h1 className="text-3xl font-black text-white tracking-tight">
              Central de Alertas
            </h1>
          </div>
          <p className="text-sm text-slate-400 font-medium">
             Gestor: <span className="font-bold text-slate-200">{user?.nome}</span> • Foco em mitigação de riscos de performance.
          </p>
        </div>
        
        <div className="flex gap-2">
          <span className="px-4 py-2 bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[10px] font-black rounded-full shadow-lg shadow-rose-500/5 shrink-0">
            {alertas.length} ALERTAS ATIVOS
          </span>
        </div>
      </header>

      {/* Lista de alertas */}
      <section className="glass-card overflow-hidden border border-slate-800/80">
        <div className="divide-y divide-slate-800/60">
          {alertas.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-900/40 border border-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                <BellOff size={32} />
              </div>
              <p className="text-sm font-bold text-slate-400">Nenhum alerta para sua equipe hoje 🎉</p>
              <p className="text-xs text-slate-500 mt-1">Tudo operando dentro das metas estabelecidas.</p>
            </div>
          ) : (
            alertas.map((alerta) => {
              const config = configMap[alerta.tipo];
              
              return (
                <div
                  key={alerta.id}
                  onClick={() => navigate(`/gestao/colaborador/${alerta.idColaborador}`)}
                  className="p-6 flex items-center justify-between gap-6 hover:bg-[#131A2C]/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    {/* Ícone com fundo dinâmico */}
                    <div className={`mt-1 p-3 rounded-2xl border ${config.style} shadow-sm group-hover:scale-110 transition-transform`}>
                      {config.icon}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-base font-black text-slate-200 group-hover:text-indigo-400 transition-colors">
                          {alerta.nome}
                        </p>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${config.style}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                        {alerta.cargo}
                      </p>
                      <p className="text-sm text-slate-300 mt-2 leading-relaxed font-medium">
                        {alerta.mensagem}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                      <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                        Ver Plano de Ação
                      </span>
                    </div>
                    <ChevronRight size={20} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Footer Informativo */}
      <div className="p-6 glass-card border border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-center">
            <AlertCircle size={20} className="text-amber-400 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">Resumo de Riscos</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Atualizado em Tempo Real</p>
          </div>
        </div>
        <div className="flex gap-8 pr-4">
           <div className="text-center">
              <p className="text-lg font-black text-rose-400">{alertas.filter(a => a.tipo === 'BAIXO_DESEMPENHO').length}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black">Performance</p>
           </div>
           <div className="text-center">
              <p className="text-lg font-black text-amber-400">{alertas.filter(a => a.tipo === 'AVALIACAO_PENDENTE').length}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black">Prazos</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AlertasPage;