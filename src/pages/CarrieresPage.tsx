import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Wrap } from "../components/Wrap";
import { useJobOffers, type JobOffer } from "../hooks/useJobOffers";

const API_URL = import.meta.env.VITE_API_URL;

export function CarrieresPage() {
  const { jobOffers, loading } = useJobOffers();
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);

  const handleApplyClick = (title: string) => {
    window.location.href = `mailto:expresscabinet@yahoo.fr?subject=CANDIDATURE - ${encodeURIComponent(title.toUpperCase())}`;
  };

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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {jobOffers.map((jobOffer, index) => (
                <Reveal key={jobOffer.id} delay={index * 60}>
                  <article className="flex h-full flex-col border border-line bg-white transition hover:border-gold hover:shadow-lg">
                    {jobOffer.image ? (
                      <img
                        src={`${API_URL}${jobOffer.image}`}
                        alt=""
                        className="h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="h-44 w-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                        {jobOffer.title}
                      </div>
                    )}
                    <div className="flex flex-1 flex-col px-[26px] py-[30px]">
                      <h2 className="font-display mb-2 text-[20px] font-bold text-blue-night line-clamp-2">
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
                      <p className="flex-1 whitespace-pre-wrap text-[14px] leading-relaxed text-muted line-clamp-4">
                        {jobOffer.description}
                      </p>
                      
                      <div className="mt-6 flex items-center gap-4">
                        <button
                          onClick={() => setSelectedJob(jobOffer)}
                          className="inline-block rounded-[3px] border border-blue px-6 py-2.5 text-sm font-semibold text-blue transition hover:bg-blue hover:text-white"
                        >
                          Voir les détails
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Wrap>
      </section>

      {/* Modal for Job Offer Details */}
      <Modal isOpen={!!selectedJob} onClose={() => setSelectedJob(null)}>
        {selectedJob && (
          <div className="flex flex-col">
            {selectedJob.image && (
              <img
                src={`${API_URL}${selectedJob.image}`}
                alt=""
                className="h-64 w-full object-cover"
              />
            )}
            <div className="p-8 md:p-12">
              <h2 className="font-display mb-4 text-3xl font-bold text-blue-night">
                {selectedJob.title}
              </h2>
              
              {(selectedJob.location || selectedJob.contractType) && (
                <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs tracking-[1px] text-blue uppercase">
                  {selectedJob.contractType && (
                    <span className="bg-blue/10 rounded-[3px] px-3 py-1.5">
                      {selectedJob.contractType}
                    </span>
                  )}
                  {selectedJob.location && (
                    <span className="bg-blue/10 rounded-[3px] px-3 py-1.5">
                      {selectedJob.location}
                    </span>
                  )}
                </div>
              )}
              
              <div className="prose prose-sm prose-slate max-w-none text-muted">
                <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                  {selectedJob.description}
                </p>
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <button
                  onClick={() => handleApplyClick(selectedJob.title)}
                  className="inline-block rounded-[3px] bg-gold px-8 py-4 text-base font-semibold text-blue-night transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Postuler à cette offre
                </button>
                <p className="mt-4 text-xs text-slate-400">
                  En cliquant sur postuler, votre messagerie par défaut s'ouvrira pour envoyer votre candidature à expresscabinet@yahoo.fr.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
