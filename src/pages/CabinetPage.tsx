import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Wrap } from "../components/Wrap";
import { cabinetValues, stats, whyItems } from "../data/content";

export function CabinetPage() {
  return (
    <>
      <PageHero
        kicker="Le Cabinet"
        title="19 ans d'impact et de performance"
        subtitle="Derrière chaque grand succès, une équipe d'exception et une vision claire — au service de votre performance depuis 2007."
      />

      <section className="bg-bg py-[90px]">
        <Wrap className="grid grid-cols-1 gap-14 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="font-mono text-xs tracking-[2px] text-blue uppercase mb-4">
              Notre histoire
            </div>
            <h2 className="font-display mb-5 text-[34px] font-extrabold tracking-[-0.5px] text-blue-night">
              Près de deux décennies d&apos;expertise
            </h2>
            <p className="mb-4 max-w-[520px] text-muted">
              En 2026, Cabinet Express Services célèbre fièrement ses 19 ans
              d&apos;expérience. Une trajectoire menée de main de maître par un
              leadership inspirant et portée par un collectif de talents
              diversifiés, dynamiques et proactifs.
            </p>
            <p className="max-w-[520px] text-muted">
              C&apos;est cette alliance unique qui nous permet d&apos;offrir
              aujourd&apos;hui un taux de satisfaction de 99&nbsp;% à notre
              clientèle — particuliers, entreprises et institutions.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-6">
              {cabinetValues.map((item) => (
                <div key={item.title} className="border-t-2 border-gold pt-4">
                  <strong className="font-display text-lg text-blue-night">
                    {item.title}
                  </strong>
                  <p className="mt-1 text-[14px] text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-blue-night py-[90px] text-white">
        <Wrap>
          <Reveal>
            <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
              Chiffres clés
            </div>
            <h2 className="font-display mb-10 text-[34px] font-extrabold tracking-[-0.5px]">
              L&apos;impact de notre trajectoire
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-0.5 md:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 60}>
                <div className="border border-white/[0.08] bg-white/[0.04] px-6 py-8 text-center">
                  <div className="font-mono text-[32px] font-semibold text-gold">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs tracking-[0.5px] text-slate-mid uppercase">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="bg-bg-alt py-[90px]">
        <Wrap>
          <Reveal>
            <div className="font-mono text-xs tracking-[2px] text-blue uppercase mb-4">
              Pourquoi CABES
            </div>
            <h2 className="font-display mb-10 text-[34px] font-extrabold tracking-[-0.5px] text-blue-night">
              Ce qui nous distingue
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {whyItems.map((item, index) => (
              <Reveal key={item} delay={index * 40}>
                <div className="border-t-2 border-gold py-5">
                  <span className="text-sm font-medium text-text">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/equipe"
                className="inline-block rounded-[3px] border border-blue-night px-7 py-3.5 text-sm font-semibold text-blue-night transition hover:bg-blue-night hover:text-white"
              >
                Rencontrer l&apos;équipe
              </Link>
              <Link
                to="/expertises"
                className="inline-block rounded-[3px] bg-gold px-7 py-3.5 text-sm font-semibold text-blue-night transition hover:-translate-y-0.5"
              >
                Découvrir nos expertises
              </Link>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
