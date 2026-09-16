import { whyItems } from "../data/content";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

export function Why() {
  return (
    <section className="relative z-[2] bg-blue-night py-[90px] text-white">
      <Wrap>
        <Reveal>
          <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
            Pourquoi choisir CABES
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {whyItems.map((item, index) => (
            <Reveal key={item} delay={index * 50}>
              <div className="group border-t-2 border-gold py-5 transition duration-300 hover:translate-x-1">
                <span className="text-sm font-medium transition-colors duration-300 group-hover:text-gold">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
