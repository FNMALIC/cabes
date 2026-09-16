import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in ms after entering view */
  delay?: number;
  /** Animation direction */
  from?: "up" | "down" | "left" | "right" | "none";
  /** Run once (default) or every time it enters view */
  once?: boolean;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const offsets: Record<NonNullable<RevealProps["from"]>, string> = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    none: "translate-y-0",
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-none motion-reduce:opacity-100 ${
        visible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${offsets[from]}`
      } ${className}`.trim()}
    >
      {children}
    </div>
  );
}
