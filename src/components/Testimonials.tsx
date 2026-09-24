import { Link } from "react-router-dom";
import { useTestimonials } from "../hooks/useTestimonials";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

const API_URL = import.meta.env.VITE_API_URL;

export function Testimonials() {
  const { testimonials, loading } = useTestimonials();

  return (
    <section className="relative z-[2] bg-bg py-[90px]">
      <Wrap>
        <Reveal>
          <div className="font-mono text-xs tracking-[2px] text-blue uppercase mb-4">
            Témoignages
          </div>
          <h2 className="font-display mb-10 text-[34px] font-extrabold tracking-[-0.5px] text-blue-night">
            Ce que disent nos partenaires
          </h2>
        </Reveal>

        {!loading && testimonials.length > 0 ? (
          <div className="mb-10 grid grid-cols-1 gap-[18px] md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 60}>
                <figure className="flex h-full flex-col border border-line bg-white px-[26px] py-[30px] text-text">
                  <blockquote className="flex-1 text-[15px] text-muted">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {testimonial.image ? (
                      <img
                        src={`${API_URL}${testimonial.image}`}
                        alt=""
                        className="size-11 shrink-0 rounded-full object-cover"
                      />
                    ) : null}
                    <div>
                      <div className="font-display text-[15px] font-bold text-blue-night">
                        {testimonial.authorName}
                      </div>
                      {testimonial.authorRole || testimonial.authorCompany ? (
                        <div className="text-[13px] text-muted">
                          {[testimonial.authorRole, testimonial.authorCompany]
                            .filter(Boolean)
                            .join(" — ")}
                        </div>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : null}

        <Reveal delay={100}>
          <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <p className="text-muted">
              Vous êtes client de CABES ? Partagez votre expérience.
            </p>
            <Link
              to="/avis"
              className="rounded-[3px] border border-blue px-6 py-3 text-sm font-semibold text-blue transition hover:bg-blue hover:text-white"
            >
              Laisser un avis
            </Link>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
