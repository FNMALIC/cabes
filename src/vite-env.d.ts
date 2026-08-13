/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_PLAUSIBLE_SCRIPT?: string;
  /** Production site origin, e.g. https://www.cabes.cm (no trailing slash) */
  readonly VITE_SITE_URL?: string;
  /** Backend API base URL, e.g. http://localhost:4000 or https://api.cabes.cm (no trailing slash) */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
