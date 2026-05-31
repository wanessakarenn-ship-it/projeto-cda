import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { AvaliacaoProvider } from '../contexts/AvaliacaoContext';

/**
 * DashboardLayout
 * -------------------------------------------------
 * Layout estrutural da aplicação CDA 2026
 * - NÃO controla autenticação
 * - NÃO conhece regras de permissão
 * - Apenas organiza UI + injeta contextos visuais
 *
 * 🔐 Proteção acontece em RequireAuth.tsx
 */
export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">

      {/* Sidebar fixa */}
      <Sidebar />

      <div className="flex flex-1 min-w-0 flex-col relative overflow-hidden">

        {/* Header */}
        <Header />

        {/* Conteúdo principal */}
        <main
          role="main"
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth bg-[#F8FAFC] flex flex-col"
        >
          <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-8 lg:p-10 animate-in fade-in slide-in-from-bottom-2 duration-700">

            {/* Contexto de Avaliação */}
            <AvaliacaoProvider>
              <Outlet />
            </AvaliacaoProvider>

          </div>

          {/* Rodapé */}
          <footer className="px-10 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-right mt-auto border-t border-slate-100/50">
            CDA 2026 © v1.0.4 — Sistema de Inteligência em Performance
          </footer>
        </main>
      </div>
    </div>
  );
};
