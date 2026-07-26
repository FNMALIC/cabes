import { Link } from "react-router-dom";

type LogoVariant = "light" | "dark";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  /** Image height class — width stays auto */
  heightClass?: string;
  onClick?: () => void;
}

const sources: Record<LogoVariant, { webp: string; png: string }> = {
  light: {
    webp: "/cabes-logo-light.webp",
    png: "/cabes-logo-light.png",
  },
  dark: {
    webp: "/cabes-logo.webp",
    png: "/cabes-logo.png",
  },
};

export function Logo({
  variant = "light",
  className = "",
  heightClass = "h-10 md:h-11",
  onClick,
}: LogoProps) {
  const src = sources[variant];

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex items-center ${className}`.trim()}
      aria-label="CABES — Accueil"
    >
      <picture>
        <source srcSet={src.webp} type="image/webp" />
        <img
          src={src.png}
          alt="CABES — Cabinet Express Services"
          width={200}
          height={103}
          decoding="async"
          className={`${heightClass} w-auto`}
        />
      </picture>
    </Link>
  );
}
