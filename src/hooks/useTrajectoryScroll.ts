import { useCallback, useEffect, useState, type RefObject } from "react";

export interface TrajectoryState {
  progress: number;
  pathLength: number;
  ready: boolean;
}

export function useTrajectoryScroll(
  pathRef: RefObject<SVGPathElement | null>,
): TrajectoryState {
  const [state, setState] = useState<TrajectoryState>({
    progress: 0,
    pathLength: 2400,
    ready: false,
  });

  const update = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const length = path.getTotalLength() || 2400;
    const docHeight = Math.max(
      document.body.scrollHeight - window.innerHeight,
      1,
    );
    const progress = prefersReduced
      ? 1
      : Math.min(Math.max(window.scrollY / (docHeight * 0.92), 0), 1);

    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length - length * progress);

    setState({ progress, pathLength: length, ready: true });
  }, [pathRef]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const ro = new ResizeObserver(update);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [update]);

  return state;
}
