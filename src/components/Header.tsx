import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../data/content";
import { Wrap } from "./Wrap";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative transition-opacity duration-200 hover:opacity-80 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
    isActive ? "after:w-full opacity-100" : "after:w-0"
  }`;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 right-0 left-0 z-20 py-[26px]">
      <Wrap className="flex items-center justify-between">
        <Link
          to="/"
          className="animate-fade-in font-display text-[26px] font-black tracking-[0.5px] text-white"
          onClick={() => setOpen(false)}
        >
          CABES<span className="text-gold">.</span>
        </Link>

        <nav className="animate-fade-in hidden gap-[30px] text-sm font-medium text-white md:flex [animation-delay:120ms]">
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
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
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
        <div className="absolute top-full right-0 left-0 border-t border-white/10 bg-blue-night/95 backdrop-blur-md md:hidden">
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
