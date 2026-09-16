import { Link } from "react-router-dom";
import { services } from "../data/content";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

export function Services() {
  return (
    <section id="services" className="relative z-[2] bg-bg py-[90px]">
      <Wrap>
        <Reveal>
          <div className="font-mono text-xs tracking-[2px] text-blue uppercase mb-4">
            Nos domaines d&apos;expertise
          </div>
          <h2 className="font-display mb-5 text-[34px] font-extrabold tracking-[-0.5px] text-blue-night">
            Six domaines d&apos;intervention
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 60}>
              <Link
                to="/expertises"
                className="block border border-line bg-white px-[26px] py-[30px] text-text transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-service"
              >
                <div className="mb-[18px] flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-gold/12 font-mono text-xs text-gold">
                  {service.id}
                </div>
                <h4 className="font-display mb-2 text-[17px] font-bold">
                  {service.title}
                </h4>
                <p className="text-[13px] text-muted">{service.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-8">
            <Link
              to="/expertises"
              className="text-sm font-semibold text-blue transition-colors hover:text-blue-deep"
            >
              Voir toutes les expertises →
            </Link>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
