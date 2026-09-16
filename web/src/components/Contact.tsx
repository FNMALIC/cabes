import { ContactForm } from "./ContactForm";
import { ContactValue } from "./ContactValue";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";
import { contactInfo } from "../data/content";

export function Contact() {
  return (
    <section id="contact" className="relative z-[2] bg-blue-night py-[90px] text-white">
      <Wrap className="grid grid-cols-1 gap-14 md:grid-cols-2">
        <Reveal from="left">
          <div>
            <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
              Contact
            </div>
            <h2 className="font-display mb-5 text-[34px] font-extrabold tracking-[-0.5px]">
              Prendre rendez-vous
            </h2>
            <p className="mb-10 max-w-[600px] text-slate-mid">
              Nos équipes vous répondent sous 24h ouvrées.
            </p>
            {contactInfo.map((row) => (
              <div
                key={row.label}
                className="flex gap-3.5 border-b border-white/12 py-4 text-sm text-slate-soft transition-colors duration-300 hover:border-gold/40"
              >
                <span>{row.label}</span>
                <ContactValue row={row} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal from="right" delay={100}>
          <ContactForm className="md:ml-auto md:max-w-[520px]" />
        </Reveal>
      </Wrap>
    </section>
  );
}
