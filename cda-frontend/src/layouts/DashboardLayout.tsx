import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { AvaliacaoProvider } from '../contexts/AvaliacaoContext';

/**
 * DashboardLayout
 * -------------------------------------------------
 * Layout estrutural da aplicação CDA 2026 com visual premium e responsivo
 */
export const DashboardLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#090D1A] overflow-hidden font-sans antialiased selection:bg-indigo-600/30 selection:text-indigo-200 relative">
      
      {/* 🔮 Efeitos de Glow Neon no Fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none z-0" />

      {/* Sidebar Responsiva */}
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex flex-1 min-w-0 flex-col relative overflow-hidden z-10">

        {/* Header com toggle de menu móvel */}
        <Header onMenuToggle={() => setMobileOpen(!mobileOpen)} />

        {/* Conteúdo principal */}
        <main
          role="main"
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth bg-transparent flex flex-col"
        >
          <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-8 lg:p-10 animate-in fade-in slide-in-from-bottom-2 duration-700">

            {/* Contexto de Avaliação */}
            <AvaliacaoProvider>
              <Outlet />
            </AvaliacaoProvider>

          </div>

          {/* Rodapé */}
          <footer className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right mt-auto border-t border-slate-900/50">
            CDA 2026 © v1.0.4 — Sistema de Inteligência em Performance
          </footer>
        </main>
      </div>
    </div>
  );
};
