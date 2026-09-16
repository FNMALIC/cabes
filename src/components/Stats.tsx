import { stats } from "../data/content";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

export function Stats() {
  return (
    <section className="relative z-[2] bg-blue-night py-[90px] text-white">
      <Wrap>
        <Reveal>
          <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
            Chiffres clés
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-0.5 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <div className="border border-white/[0.08] bg-white/[0.04] px-6 py-8 text-center transition duration-300 hover:bg-white/[0.07]">
                <div className="font-mono text-[32px] font-semibold text-gold">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs tracking-[0.5px] text-slate-mid uppercase">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
