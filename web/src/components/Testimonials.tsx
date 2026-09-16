import { useTestimonials } from "../hooks/useTestimonials";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

export function Testimonials() {
  const { testimonials, loading } = useTestimonials();

  if (loading || testimonials.length === 0) return null;

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
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 60}>
              <figure className="flex h-full flex-col border border-line bg-white px-[26px] py-[30px] text-text">
                <blockquote className="flex-1 text-[15px] text-muted">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6">
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
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
