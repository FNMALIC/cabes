import type { ReactNode } from "react";

interface WrapProps {
  children: ReactNode;
  className?: string;
}

export function Wrap({ children, className = "" }: WrapProps) {
  return (
    <div
      className={`relative mx-auto max-w-[1180px] px-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
