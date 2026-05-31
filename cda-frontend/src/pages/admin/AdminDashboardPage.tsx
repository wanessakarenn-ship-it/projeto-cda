import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SummaryCard } from '../../components/SummaryCard';
import { api } from '../../services/Api'; // Importando sua API configurada
import {
  Users,
  CalendarCheck,
  SlidersHorizontal,
  UploadCloud,
  ChevronRight,
  Settings,
  Target,
  Grid3X3,
  ShieldCheck,
  Loader2
} from 'lucide-react';

// Interface para tipar os dados que virão do backend
interface DashboardStats {
  totalCiclos: number;
  totalCompetencias: number;
  totalColaboradores: number;
  integridadeDados: string;
}

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Busca de dados reais da API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Você pode criar uma rota específica no Node.js para esses totais
        const { data } = await api.get<DashboardStats>('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error("Erro ao carregar estatísticas do dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="text-xs font-black uppercase tracking-widest">Carregando Ecossistema...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Cabeçalho Estratégico */}
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-indigo-600">
          <Settings size={20} className="animate-spin-slow" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Painel de Controle</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Administração do Sistema
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Central de governança do CDA 2026. Gerencie a estrutura organizacional, 
          parâmetros de performance e ciclos avaliativos em um só lugar.
        </p>
      </header>

      {/* KPIs de Ecossistema - Usando dados reais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard
          value={stats?.totalCiclos || 0}
          label="Ciclos de Gestão"
          subtitle="Janelas de Avaliação"
          icon={<CalendarCheck size={22} />}
        />

        <SummaryCard
          value={stats?.totalCompetencias || 0}
          label="Matriz de Competências"
          subtitle="Dicionário Ativo"
          icon={<SlidersHorizontal size={22} />}
        />

        <SummaryCard
          value={stats?.totalColaboradores || 0}
          label="Colaboradores"
          subtitle="Base total ativa"
          icon={<Users size={22} />}
          isPositive
        />

        <SummaryCard
          value={stats?.integridadeDados || "0%"}
          label="Integridade de Dados"
          subtitle="Sincronização via CSV"
          icon={<UploadCloud size={22} />}
          isPositive
        />
      </div>

      {/* Grid de Navegação de Gestão */}
      <div className="space-y-6">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">
          Módulos de Configuração
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ActionCard
            title="Ciclos de Desempenho"
            description="Abertura de janelas, cronogramas de feedback e períodos de PDI."
            icon={<CalendarCheck size={20} />}
            onClick={() => navigate('/admin/ciclos')}
          />

          <ActionCard
            title="Competências & Metas"
            description="Configuração de pesos, dicionário de comportamentos e OKRs globais."
            icon={<Target size={20} />}
            onClick={() => navigate('/admin/competencias')}
          />

          <ActionCard
            title="Importação em Massa"
            description="Atualização de estrutura organizacional e novos talentos via CSV."
            icon={<UploadCloud size={20} />}
            onClick={() => navigate('/admin/importacao')}
          />

          <ActionCard
            title="Matriz Nine Box"
            description="Customização de quadrantes, eixos de potencial e regras de enquadramento."
            icon={<Grid3X3 size={20} />}
            onClick={() => navigate('/admin/ninebox-config')}
          />

          <ActionCard
            title="Usuários & Permissões"
            description="Gestão de perfis de acesso (Admin, Gestor, Colaborador, RH)."
            icon={<ShieldCheck size={20} />}
            onClick={() => navigate('/admin/usuarios')}
          />

          <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex items-center justify-center text-center group hover:border-indigo-200 transition-colors">
             <p className="text-xs font-bold text-slate-400 group-hover:text-indigo-400 transition-colors cursor-default">
               Novos módulos de Auditoria <br/> em breve
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* COMPONENTE DE AÇÃO REFINADO                                        */
/* ------------------------------------------------------------------ */

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group bg-white border border-slate-200 rounded-[2rem] p-8 text-left hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 relative overflow-hidden"
    >
      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              {title}
            </h3>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pr-4">
            {description}
          </p>
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors duration-500" />
    </button>
  );
};