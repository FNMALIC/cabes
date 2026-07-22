import { Link } from "react-router-dom";
import { Wrap } from "./Wrap";

export function Hero() {
  return (
    <section className="relative [clip-path:polygon(0_0,100%_0,100%_92%,0_100%)] bg-linear-to-br from-blue-night via-blue-deep to-blue pt-[150px] pb-[220px] text-white">
      <Wrap className="grid max-w-[760px] grid-cols-1">
        <div className="animate-fade-up mb-5 font-mono text-xs tracking-[2px] text-gold uppercase [animation-delay:80ms]">
          Cabinet Express Services — Douala
        </div>
        <h1 className="animate-fade-up font-display text-[38px] leading-[1.05] font-black tracking-[-1px] md:text-[56px] [animation-delay:180ms]">
          19 ans d&apos;impact
          <br />
          et de performance.
        </h1>
        <p className="animate-fade-up mt-[22px] max-w-[520px] text-[17px] text-slate-soft [animation-delay:320ms]">
          En 2026, CABES célèbre près de deux décennies d&apos;expertise au
          service de votre performance — portées par un leadership inspirant et
          un collectif de talents, avec 99&nbsp;% de satisfaction client.
        </p>
        <div className="animate-fade-up mt-9 flex flex-wrap gap-3.5 [animation-delay:460ms]">
          <Link
            to="/contact"
            className="inline-block rounded-[3px] bg-gold px-7 py-3.5 text-sm font-semibold text-blue-night transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            Prendre rendez-vous
          </Link>
          <Link
            to="/cabinet"
            className="inline-block rounded-[3px] border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-white hover:bg-white/10"
          >
            Découvrir le cabinet
          </Link>
        </div>
      </Wrap>
    </section>
  );
}
