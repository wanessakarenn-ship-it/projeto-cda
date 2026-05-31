import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'CDA 2026 - Gestão de Desempenho',
    // Ele sai da raiz e busca o arquivo na pasta public
    template: './public/index.html',
  },
  source: {
    entry: {
      index: './src/index.tsx', 
    },
  },
  output: {
    assetPrefix: '/',
  },
});