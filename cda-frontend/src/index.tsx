import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Estilos confirmados na pasta styles
import './styles/global.css'; 
import './styles/animations.css';

// Importações com caminhos explícitos para resolver o ts(2307)
import App from './App'; // Adicione a extensão se o TS estiver rigoroso
import { AuthProvider } from './contexts/AuthContext'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}