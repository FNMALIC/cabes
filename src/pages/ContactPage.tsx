import { ContactForm } from "../components/ContactForm";
import { ContactValue } from "../components/ContactValue";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Wrap } from "../components/Wrap";
import { contactInfo } from "../data/content";

export function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Prendre rendez-vous"
        subtitle="Nos équipes vous répondent sous 24h ouvrées."
      />

      <section className="bg-blue-night py-[90px] text-white">
        <Wrap className="grid grid-cols-1 gap-14 md:grid-cols-2">
          <Reveal from="left">
            <div>
              <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
                Coordonnées
              </div>
              <h2 className="font-display mb-5 text-[28px] font-extrabold">
                Parlons de votre trajectoire
              </h2>
              <p className="mb-10 max-w-[420px] text-slate-mid">
                Que vous souhaitiez sécuriser une créance, former vos équipes ou
                structurer un projet — écrivez-nous.
              </p>
              {contactInfo.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 border-b border-white/12 py-4 text-sm text-slate-soft sm:flex-row sm:gap-3.5"
                >
                  <span className="min-w-[90px]">{row.label}</span>
                  <ContactValue row={row} />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal from="right" delay={100}>
            <ContactForm />
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
