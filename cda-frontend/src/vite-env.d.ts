/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  /** 🔗 URL base para as chamadas da API Express (ex: http://localhost:4000/api) */
  readonly PUBLIC_API_URL: string;

  /** 📝 Nome da aplicação */
  readonly PUBLIC_APP_NAME: string;

  /** 🔑 Credenciais do Firebase */
  readonly PUBLIC_FIREBASE_API_KEY: string;
  readonly PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  readonly PUBLIC_FIREBASE_PROJECT_ID: string;
  readonly PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly PUBLIC_FIREBASE_APP_ID: string;

  /** 🚀 Ambiente atual: 'development' | 'production' */
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}