// src/types/shims-js.d.ts
// Permite imports ESM com extensão .js em projetos TypeScript

declare module '*.ts' {
  const value: any;
  export default value;
}
