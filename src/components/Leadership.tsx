import { Link } from "react-router-dom";
import { directorGeneral } from "../data/content";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

export function Leadership() {
  return (
    <section
      id="leadership"
      className="relative z-[2] overflow-hidden bg-blue-night py-[90px] text-white"
    >
      <Wrap className="grid grid-cols-1 items-center gap-[60px] md:grid-cols-[0.6fr_1fr]">
        <div
          className="pointer-events-none absolute top-[-40px] right-0 z-0 font-display text-[180px] leading-none font-black text-white/[0.03]"
          aria-hidden="true"
        >
          CABES
        </div>
        <Reveal from="left">
          <div className="relative aspect-3/4 max-w-[320px] overflow-hidden bg-linear-to-br from-[#123a5e] to-[#0b2540]">
            {directorGeneral.image ? (
              <img
                src={directorGeneral.image}
                alt={directorGeneral.name}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-[13px] text-[#7c93ab]">
                Photo professionnelle
              </span>
            )}
          </div>
        </Reveal>
        <Reveal from="right" delay={120}>
          <div className="relative z-[1]">
            <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
              Notre leadership
            </div>
            <h3 className="font-display text-[26px]">{directorGeneral.name}</h3>
            <div className="mt-2 mb-5 text-[13px] tracking-[1px] text-gold uppercase">
              {directorGeneral.role}, CABES
            </div>
            <p className="max-w-[480px] text-slate-soft">{directorGeneral.bio}</p>
            {directorGeneral.quote ? (
              <q className="font-display mt-6 block text-[20px] text-white">
                {directorGeneral.quote}
              </q>
            ) : null}
            <Link
              to="/equipe"
              className="mt-8 inline-block text-sm font-semibold text-gold transition-opacity hover:opacity-80"
            >
              Rencontrer l&apos;équipe →
            </Link>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
