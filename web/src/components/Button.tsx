import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "gold" | "ghost";

const base =
  "inline-block cursor-pointer rounded-[3px] px-7 py-3.5 text-sm font-semibold transition duration-300 ease-out";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-blue-night hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "border border-white/50 text-white hover:border-white hover:bg-white/10 active:bg-white/5",
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({
  variant = "gold",
  children,
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "gold",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
