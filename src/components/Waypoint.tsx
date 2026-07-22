import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

export function Waypoint() {
  return (
    <section className="relative z-[2] bg-blue-night py-[90px] text-center text-white">
      <Wrap>
        <Reveal>
          <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
            19 ans d&apos;impact et de performance
          </div>
          <div className="font-display text-[120px] leading-none font-black text-gold transition-transform duration-700 ease-out">
            19
          </div>
          <p className="mx-auto mt-[18px] max-w-[620px] text-[17px] text-slate-soft">
            Dix-neuf années au service de votre performance — une alliance unique
            entre vision claire et talents diversifiés, dynamiques et proactifs.
          </p>
        </Reveal>
      </Wrap>
    </section>
  );
}
