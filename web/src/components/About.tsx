import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

export function About() {
  return (
    <section id="about" className="relative z-[5] -mt-[90px] py-[90px]">
      <Wrap>
        <Reveal>
          <div className="grid grid-cols-1 gap-12 bg-white p-8 shadow-about md:grid-cols-[1.2fr_0.8fr] md:gap-12 md:p-14">
            <div>
              <div className="font-mono text-xs tracking-[2px] text-blue uppercase mb-4">
                À propos de CABES
              </div>
              <h2 className="font-display mb-5 text-[34px] leading-tight font-extrabold tracking-[-0.5px] text-blue-night">
                Derrière chaque grand succès, une équipe d&apos;exception
              </h2>
              <p className="mb-3.5 max-w-[480px] text-muted">
                Cabinet Express Services accompagne entreprises, particuliers et
                institutions avec rigueur et professionnalisme pour sécuriser et
                propulser leurs activités.
              </p>
              <p className="mb-3.5 max-w-[480px] text-muted">
                Cette trajectoire est portée par un leadership inspirant et un
                collectif de talents — l&apos;alliance qui nous permet
                d&apos;offrir aujourd&apos;hui un taux de satisfaction de 99&nbsp;%.
              </p>
              <Link
                to="/cabinet"
                className="mt-2 inline-block text-sm font-semibold text-blue transition-colors hover:text-blue-deep"
              >
                En savoir plus →
              </Link>
            </div>
            <div>
              <div className="mb-5 border-t-2 border-gold pt-4 origin-left">
                <strong>Mission</strong>
                <p className="mt-1 text-[13px] text-muted">
                  Sécuriser et propulser les activités de nos partenaires par
                  des solutions concrètes.
                </p>
              </div>
              <div className="border-t-2 border-gold pt-4 origin-left">
                <strong>Engagement</strong>
                <p className="mt-1 text-[13px] text-muted">
                  19 ans de confiance, 19 ans d&apos;impact — merci à nos
                  équipes et à nos clients.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
