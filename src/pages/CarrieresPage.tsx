import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Wrap } from "../components/Wrap";
import { useJobOffers } from "../hooks/useJobOffers";

export function CarrieresPage() {
  const { jobOffers, loading } = useJobOffers();

  return (
    <>
      <PageHero
        kicker="Carrières"
        title="Offres d'emploi"
        subtitle="Rejoignez un collectif de talents au service de la performance de nos partenaires."
      />

      <section className="bg-bg py-[90px]">
        <Wrap>
          {loading ? (
            <p className="text-muted">Chargement des offres...</p>
          ) : jobOffers.length === 0 ? (
            <p className="text-muted">
              Aucune offre d'emploi n'est publiée pour le moment. Revenez bientôt ou{" "}
              <Link to="/contact" className="text-blue underline hover:text-blue-night">
                contactez-nous
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {jobOffers.map((jobOffer, index) => (
                <Reveal key={jobOffer.id} delay={index * 60}>
                  <article className="flex h-full flex-col border border-line bg-white px-[26px] py-[30px]">
                    <h2 className="font-display mb-2 text-[20px] font-bold text-blue-night">
                      {jobOffer.title}
                    </h2>
                    {jobOffer.location || jobOffer.contractType ? (
                      <div className="mb-4 flex flex-wrap gap-2 font-mono text-[11px] tracking-[1px] text-blue uppercase">
                        {jobOffer.contractType ? (
                          <span className="bg-blue/10 rounded-[3px] px-2.5 py-1">
                            {jobOffer.contractType}
                          </span>
                        ) : null}
                        {jobOffer.location ? (
                          <span className="bg-blue/10 rounded-[3px] px-2.5 py-1">
                            {jobOffer.location}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    <p className="flex-1 whitespace-pre-wrap text-[14px] leading-relaxed text-muted">
                      {jobOffer.description}
                    </p>
                    <Link
                      to="/contact"
                      className="mt-6 inline-block self-start rounded-[3px] bg-gold px-6 py-3 text-sm font-semibold text-blue-night transition hover:-translate-y-0.5"
                    >
                      Postuler
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Wrap>
      </section>
    </>
  );
}
