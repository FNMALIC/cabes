import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFlyers } from "../hooks/useFlyers";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

const API_URL = import.meta.env.VITE_API_URL;
const AUTOPLAY_DELAY = 6000;

export function Flyers() {
  const { flyers, loading } = useFlyers();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (flyers.length < 2 || paused) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % flyers.length);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [flyers.length, paused]);

  if (loading || flyers.length === 0) return null;

  const goTo = (i: number) => setIndex((i + flyers.length) % flyers.length);

  return (
    <section className="relative z-[2] bg-bg-alt py-[90px]">
      <Wrap>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[0.75fr_1fr]">
          <Reveal from="left">
            <div className="font-mono text-xs tracking-[2px] text-blue uppercase mb-4">
              Actualités
            </div>
            <h2 className="font-display mb-5 text-[34px] leading-tight font-extrabold tracking-[-0.5px] text-blue-night">
              Nos dernières communications
            </h2>
            <p className="mb-8 max-w-[420px] text-muted">
              Offres, campagnes et informations partagées par le cabinet —
              retrouvez-les ici avant tout le monde.
            </p>

            {flyers.length > 1 ? (
              <div className="flex items-center gap-5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Flyer précédent"
                    onClick={() => goTo(index - 1)}
                    className="flex h-10 w-10 items-center justify-center border border-line text-blue-night transition hover:border-gold hover:text-gold"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Flyer suivant"
                    onClick={() => goTo(index + 1)}
                    className="flex h-10 w-10 items-center justify-center border border-line text-blue-night transition hover:border-gold hover:text-gold"
                  >
                    →
                  </button>
                </div>
                <div className="flex gap-1.5">
                  {flyers.map((flyer, i) => (
                    <button
                      key={flyer.id}
                      type="button"
                      aria-label={`Aller au flyer ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index ? "w-6 bg-gold" : "w-1.5 bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </Reveal>

          <Reveal from="right" delay={100}>
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="relative mx-auto aspect-[3/4] w-full max-w-[380px] overflow-hidden border border-line bg-white shadow-about"
            >
              {flyers.map((flyer, i) => {
                const img = (
                  <img
                    src={`${API_URL}${flyer.image}`}
                    alt={flyer.title ?? ""}
                    className="h-full w-full object-cover"
                  />
                );
                const content = flyer.link ? (
                  flyer.link.startsWith("/") ? (
                    <Link to={flyer.link} aria-label={flyer.title ?? "Voir le flyer"} className="block h-full w-full">
                      {img}
                    </Link>
                  ) : (
                    <a
                      href={flyer.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={flyer.title ?? "Voir le flyer"}
                      className="block h-full w-full"
                    >
                      {img}
                    </a>
                  )
                ) : (
                  img
                );

                return (
                  <div
                    key={flyer.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      i === index ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
