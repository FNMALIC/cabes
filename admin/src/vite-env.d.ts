/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend API base URL, e.g. http://localhost:4000 (no trailing slash) */
  readonly VITE_ADMIN_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
