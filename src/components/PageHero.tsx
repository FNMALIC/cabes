import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Wrap } from "./Wrap";

interface PageHeroProps {
  kicker: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function PageHero({ kicker, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative bg-linear-to-br from-blue-night via-blue-deep to-blue pt-[140px] pb-20 text-white md:pb-24">
      <Wrap className="max-w-[760px]">
        <p className="animate-fade-up mb-5 font-mono text-xs tracking-[2px] text-gold uppercase">
          {kicker}
        </p>
        <h1 className="animate-fade-up font-display text-[36px] leading-[1.08] font-black tracking-[-1px] md:text-[48px] [animation-delay:100ms]">
          {title}
        </h1>
        {subtitle ? (
          <p className="animate-fade-up mt-5 max-w-[520px] text-[17px] text-slate-soft [animation-delay:200ms]">
            {subtitle}
          </p>
        ) : null}
        {children ? (
          <div className="animate-fade-up mt-8 [animation-delay:300ms]">{children}</div>
        ) : null}
        <div className="animate-fade-up mt-8 [animation-delay:280ms]">
          <Link
            to="/"
            className="font-mono text-[11px] tracking-[1.5px] text-slate-mid uppercase transition-colors hover:text-gold"
          >
            ← Accueil
          </Link>
        </div>
      </Wrap>
    </section>
  );
}
