import React from 'react';
import { AppRoutes } from './routes/AppRoutes';

/**
 * 🚀 Componente Principal
 * Define o fundo e a estrutura básica de visualização.
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <AppRoutes />
    </div>
  );
}

export default App;