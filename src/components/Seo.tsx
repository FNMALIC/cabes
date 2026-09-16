import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  directorGeneral,
  operationalTeam,
  services,
  topManagement,
} from "../data/content";
import {
  absoluteUrl,
  formatTitle,
  getSeoForPath,
  siteConfig,
  type PageSeo,
} from "../data/seo";

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: Record<string, unknown> | null) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

const orgId = () => `${absoluteUrl("/")}#organization`;

function teamPersonEntries() {
  return [directorGeneral, ...topManagement, ...operationalTeam].map(
    (member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      image: member.image ? absoluteUrl(member.image) : undefined,
      worksFor: { "@id": orgId() },
    }),
  );
}

function applySeo(page: PageSeo) {
  const title = formatTitle(page);
  const description = page.description;
  const url = absoluteUrl(page.path || "/");
  const image = absoluteUrl(page.image ?? siteConfig.image);
  const imageAlt = page.imageAlt ?? siteConfig.imageAlt;
  const robots = page.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const isHome = page.path === "/";

  document.title = title;
  document.documentElement.lang = siteConfig.language;

  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", robots);
  upsertMeta("name", "author", siteConfig.legalName);
  upsertMeta("name", "theme-color", "#082a4b");

  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", siteConfig.shortName);
  upsertMeta("property", "og:locale", siteConfig.locale);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:image:alt", imageAlt);
  upsertMeta("property", "og:image:width", "1200");
  upsertMeta("property", "og:image:height", "630");

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);
  upsertMeta("name", "twitter:image:alt", imageAlt);

  upsertLink("canonical", url);
  upsertLink("alternate", url, "fr-CM");
  upsertLink("alternate", url, "x-default");

  upsertJsonLd("cabes-org-jsonld", {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId(),
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.image),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    areaServed: {
      "@type": "Country",
      name: siteConfig.address.countryName,
    },
    sameAs: [] as string[],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Domaines d'expertise CABES",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.detail,
          provider: { "@id": orgId() },
        },
      })),
    },
  });

  upsertJsonLd("cabes-webpage-jsonld", {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    about: { "@id": orgId() },
    inLanguage: siteConfig.language,
  });

  upsertJsonLd("cabes-breadcrumb-jsonld", {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: absoluteUrl("/"),
      },
      ...(isHome
        ? []
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: page.navLabel ?? page.title,
              item: url,
            },
          ]),
    ],
  });

  upsertJsonLd(
    "cabes-team-jsonld",
    page.path === "/equipe"
      ? {
          "@context": "https://schema.org",
          "@graph": teamPersonEntries(),
        }
      : null,
  );
}

/** Updates document head (title, meta, OG, canonical, JSON-LD) per route. */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeo(getSeoForPath(pathname));
  }, [pathname]);

  return null;
}
