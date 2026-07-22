import { Link } from "react-router-dom";
import { navLinks } from "../data/content";
import { Wrap } from "./Wrap";

export function Footer() {
  return (
    <footer className="bg-footer py-12 pb-6 text-white">
      <Wrap className="flex flex-wrap items-start justify-between gap-6">
        <Link to="/" className="font-display text-[26px] font-black tracking-[0.5px]">
          CABES<span className="text-gold">.</span>
        </Link>
        <div className="flex flex-wrap gap-8 text-[13px]">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Wrap>
      <Wrap>
        <div className="my-8 h-px bg-linear-to-r from-gold to-transparent" />
        <div className="text-center text-xs opacity-50">
          © 2026 CABINET EXPRESS SERVICES Sarl — Douala, Cameroun
        </div>
      </Wrap>
    </footer>
  );
}
