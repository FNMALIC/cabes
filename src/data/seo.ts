export const siteConfig = {
  name: "CABES — Cabinet Express Services",
  shortName: "CABES",
  legalName: "CABINET EXPRESS SERVICES Sarl",
  tagline: "19 ans d'impact et de performance",
  description:
    "CABES, cabinet d'expertise à Douala depuis 19 ans : formation, recouvrement, enquêtes sur fraude documentaire, suivi de contrats, affacturage et sinistres.",
  locale: "fr_CM",
  language: "fr",
  /** Canonical production origin. Overridable via VITE_SITE_URL in .env for staging/preview builds. */
  get url() {
    const fromEnv = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
    if (fromEnv) return fromEnv;
    if (typeof window !== "undefined") return window.location.origin;
    return "https://www.cabes-cm.com";
  },
  logo: "/cabes-logo.png",
  /** 1200×630 — sized for Open Graph / Twitter card previews. */
  image: "/images/og-cover.jpg",
  imageAlt: "L'équipe CABES devant les locaux à Douala",
  twitter: "",
  phone: "+237690564474",
  email: "infos.cabes@gmail.com",
  address: {
    street: "Entrée Gare Bessengué, Rue 1477 Case 451",
    city: "Douala",
    country: "CM",
    countryName: "Cameroun",
  },
} as const;

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  /** When true, page title is used as-is (no site suffix). */
  absoluteTitle?: boolean;
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
  /** Short label used in the BreadcrumbList structured data. */
  navLabel?: string;
}

const titleSuffix = "CABES | Douala";

export function formatTitle(page: PageSeo): string {
  if (page.absoluteTitle) return page.title;
  return `${page.title} — ${titleSuffix}`;
}

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    path: "/",
    title: "CABES — Cabinet Express Services | Douala",
    absoluteTitle: true,
    description: siteConfig.description,
    navLabel: "Accueil",
  },
  "/cabinet": {
    path: "/cabinet",
    title: "Le Cabinet",
    description:
      "Découvrez CABES : 19 ans d'expertise à Douala, une mission claire et un engagement orienté résultats pour sécuriser et propulser vos activités.",
    navLabel: "Le Cabinet",
  },
  "/expertises": {
    path: "/expertises",
    title: "Expertises",
    description:
      "Six domaines d'expertise CABES : formation, recouvrement, enquête sur fraude documentaire, suivi des contrats, affacturage et dossiers sinistres.",
    navLabel: "Expertises",
  },
  "/equipe": {
    path: "/equipe",
    title: "Équipe",
    description:
      "Rencontrez le leadership et l'équipe opérationnelle de CABES — un collectif multidisciplinaire au service de votre performance.",
    navLabel: "Équipe",
  },
  "/contact": {
    path: "/contact",
    title: "Contact",
    description:
      "Contactez CABES, cabinet d'expertise à Douala (Bessengué) : +237 690 564 474 · infos.cabes@gmail.com — réponse sous 24h ouvrées.",
    navLabel: "Contact",
  },
};

export const notFoundSeo: PageSeo = {
  path: "",
  title: "Page introuvable",
  description: "La page demandée n'existe pas ou a été déplacée.",
  noindex: true,
};

export function getSeoForPath(pathname: string): PageSeo {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return pageSeo[normalized] ?? { ...notFoundSeo, path: pathname };
}

export function absoluteUrl(path: string): string {
  const base = siteConfig.url;
  if (!base) return path;
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
