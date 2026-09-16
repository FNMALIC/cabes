import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Wrap } from "../components/Wrap";
import { services } from "../data/content";

export function ExpertisesPage() {
  return (
    <>
      <PageHero
        kicker="Expertises"
        title="Six domaines d'expertise clés"
        subtitle="Nous intervenons avec rigueur et professionnalisme pour sécuriser et propulser vos activités."
      />

      <section className="bg-bg py-[90px]">
        <Wrap>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 50}>
                <article className="flex h-full flex-col border border-line bg-white px-[26px] py-[30px] transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-service">
                  <div className="mb-[18px] flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-gold/12 font-mono text-xs text-gold">
                    {service.id}
                  </div>
                  <h2 className="font-display mb-2 text-[20px] font-bold text-blue-night">
                    {service.title}
                  </h2>
                  <p className="mb-3 text-[13px] font-medium text-muted">
                    {service.description}
                  </p>
                  <p className="mt-auto text-[14px] leading-relaxed text-muted">
                    {service.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-line pt-10">
              <p className="max-w-md text-muted">
                Un besoin spécifique ? Nos équipes construisent une approche sur
                mesure.
              </p>
              <Link
                to="/contact"
                className="rounded-[3px] bg-gold px-7 py-3.5 text-sm font-semibold text-blue-night transition hover:-translate-y-0.5"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
