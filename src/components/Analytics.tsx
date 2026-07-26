import { useEffect } from "react";

const DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
const SCRIPT_SRC =
  (import.meta.env.VITE_PLAUSIBLE_SCRIPT as string | undefined) ||
  "https://plausible.io/js/script.js";

/**
 * Privacy-friendly analytics (Plausible).
 * Loads only when VITE_PLAUSIBLE_DOMAIN is set — no cookies, no personal data.
 * SPA navigations are tracked automatically via the History API.
 */
export function Analytics() {
  useEffect(() => {
    if (!DOMAIN || typeof document === "undefined") return;
    if (document.querySelector(`script[data-cabes-analytics]`)) return;

    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = DOMAIN;
    script.dataset.cabesAnalytics = "true";
    script.src = SCRIPT_SRC;
    document.head.appendChild(script);
  }, []);

  return null;
}
