import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function applySeo(page: PageSeo) {
  const title = formatTitle(page);
  const description = page.description;
  const url = absoluteUrl(page.path || "/");
  const image = absoluteUrl(page.image ?? siteConfig.image);
  const imageAlt = page.imageAlt ?? siteConfig.imageAlt;
  const robots = page.noindex ? "noindex, nofollow" : "index, follow";

  document.title = title;
  document.documentElement.lang = siteConfig.language;

  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", robots);
  upsertMeta("name", "author", siteConfig.legalName);
  upsertMeta("name", "theme-color", "#082a4b");

  upsertMeta("property", "og:type", page.path === "/" ? "website" : "article");
  upsertMeta("property", "og:site_name", siteConfig.shortName);
  upsertMeta("property", "og:locale", siteConfig.locale);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:image:alt", imageAlt);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);
  upsertMeta("name", "twitter:image:alt", imageAlt);

  upsertLink("canonical", url);

  upsertJsonLd("cabes-org-jsonld", {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
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
    inLanguage: siteConfig.language,
  });
}

/** Updates document head (title, meta, OG, canonical, JSON-LD) per route. */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeo(getSeoForPath(pathname));
  }, [pathname]);

  return null;
}
