import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../data/content";
import { Logo } from "./Logo";
import { Wrap } from "./Wrap";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative transition-opacity duration-200 hover:opacity-80 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
    isActive ? "after:w-full opacity-100" : "after:w-0"
  }`;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? "bg-blue-night/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`grid bg-blue-night/80 text-slate-soft transition-[grid-template-rows] duration-300 ${
          scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <address className="overflow-hidden not-italic">
          <Wrap className="flex flex-col items-center gap-0.5 border-b border-white/10 py-2 text-center text-[11px] leading-snug md:flex-row md:flex-wrap md:justify-center md:gap-x-2 md:text-xs">
            <span className="hidden font-mono tracking-[1.5px] text-gold uppercase md:inline">
              Cabinet Express Services
            </span>
            <span className="hidden text-white/30 md:inline">|</span>
            <span>Siège social / Direction Générale : Douala – Cameroun</span>
            <span className="hidden text-white/30 md:inline">·</span>
            <span>Entrée de la gare Bessengué · Rue 14 177, Case 451</span>
            <span className="md:basis-full">
              <a
                href="tel:+237690564474"
                className="text-white underline-offset-2 hover:underline"
              >
                (+237) 690 564 474
              </a>
              {" · "}
              <a
                href="mailto:infos.cabes@gmail.com"
                className="text-white underline-offset-2 hover:underline"
              >
                infos.cabes@gmail.com
              </a>
            </span>
          </Wrap>
        </address>
      </div>

      <Wrap
        className={`grid transition-[padding] duration-300 ${
          scrolled || open ? "py-3 md:py-3.5" : "py-5 md:py-[22px]"
        } grid-cols-[40px_1fr_40px] items-center gap-4 sm:flex sm:justify-between`}
      >
        <Logo
          variant="light"
          className="animate-fade-in col-start-2 shrink-0 justify-self-center sm:justify-self-auto"
          heightClass="h-16"
          onClick={() => setOpen(false)}
        />

        <nav
          className="animate-fade-in hidden gap-5 text-sm font-medium text-white md:flex [animation-delay:120ms]"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="animate-fade-in hidden rounded-[3px] border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-white hover:bg-white/10 sm:inline-block [animation-delay:200ms]"
        >
          Prendre rendez-vous
        </Link>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="col-start-3 flex h-10 w-10 shrink-0 items-center justify-center justify-self-end text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span
              className={`h-px w-full bg-white transition ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full bg-white transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-full bg-white transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Wrap>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute top-full right-0 left-0 border-t border-white/10 bg-blue-night/95 backdrop-blur-md md:hidden"
        >
          <Wrap className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-1 py-3 text-sm font-medium text-white ${isActive ? "text-gold" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-[3px] bg-gold px-5 py-3 text-center text-sm font-semibold text-blue-night"
            >
              Prendre rendez-vous
            </Link>
          </Wrap>
        </div>
      ) : null}
    </header>
  );
}
