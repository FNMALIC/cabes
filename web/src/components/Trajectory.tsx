import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type RefObject,
} from "react";
import { useNavigate } from "react-router-dom";
import { useTrajectoryScroll } from "../hooks/useTrajectoryScroll";

/** Extended path: starts upper-left, ends bottom-right of the full page */
const PATH_D =
  "M 100 80 C 280 200, 240 360, 420 440 S 700 520, 760 660 S 600 860, 680 1000 S 920 1180, 860 1340 S 1000 1520, 1080 1680 S 1140 1780, 1120 1900";

const VIEW_W = 1180;
const VIEW_H = 2000;
const END = { x: 1120, y: 1900 };

export function Trajectory() {
  const navigate = useNavigate();
  const pathRef = useRef<SVGPathElement>(null);
  const { progress, pathLength } = useTrajectoryScroll(
    pathRef as RefObject<SVGPathElement | null>,
  );
  const [pulse, setPulse] = useState(false);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);
  const didDrag = useRef(false);

  const arrived = progress >= 0.88;
  const dashOffset = pathLength * (1 - progress);

  const endStyle: CSSProperties = {
    left: `${(END.x / VIEW_W) * 100}%`,
    top: `${(END.y / VIEW_H) * 100}%`,
    transform: `translate(calc(-50% + ${drag.x}px), calc(-50% + ${drag.y}px))`,
  };

  const handleArriveClick = () => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    setPulse(true);
    window.setTimeout(() => setPulse(false), 900);
    navigate("/contact");
  };

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragOrigin.current = { x: e.clientX, y: e.clientY };
    didDrag.current = false;
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!dragOrigin.current) return;
    const dx = e.clientX - dragOrigin.current.x;
    const dy = e.clientY - dragOrigin.current.y;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) didDrag.current = true;
    setDrag({
      x: Math.max(-28, Math.min(28, dx * 0.35)),
      y: Math.max(-28, Math.min(28, dy * 0.35)),
    });
  };

  const onPointerUp = () => {
    dragOrigin.current = null;
    setDrag({ x: 0, y: 0 });
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
      aria-hidden={!arrived}
    >
      <svg
        className="absolute top-0 left-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
      >
        <path
          d={PATH_D}
          className="fill-none stroke-gold/20 stroke-[6]"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: dashOffset,
          }}
        />
        <path
          ref={pathRef}
          d={PATH_D}
          className={`fill-none stroke-gold stroke-[2.5] transition-[stroke-dashoffset] duration-100 ease-linear ${
            pulse ? "animate-trajectory-pulse" : ""
          }`}
        />
      </svg>

      <div
        className={`absolute z-[3] transition-[opacity,scale] duration-500 ease-out ${
          arrived
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-75 opacity-0"
        }`}
        style={endStyle}
      >
        <button
          type="button"
          onClick={handleArriveClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-label="Prendre rendez-vous — fin de trajectoire"
          className="group relative flex cursor-grab flex-col items-center gap-3 active:cursor-grabbing"
        >
          <span className="relative grid place-items-center">
            <span className="absolute h-16 w-16 rounded-full border border-gold/35 animate-ping motion-reduce:animate-none" />
            <span className="absolute h-12 w-12 rounded-full bg-gold/15" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold bg-blue-night shadow-[0_0_24px_rgba(242,169,30,0.45)] transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(242,169,30,0.65)]">
              <span className="h-3 w-3 rounded-full bg-gold" />
            </span>
          </span>

          <span className="rounded-[3px] bg-gold px-4 py-2.5 font-sans text-xs font-semibold whitespace-nowrap text-blue-night shadow-lg transition duration-300 group-hover:-translate-y-0.5">
            Prendre rendez-vous
          </span>

          <span className="font-mono text-[10px] tracking-[1.5px] text-gold/80 uppercase">
            Tirez · Cliquez
          </span>
        </button>
      </div>
    </div>
  );
}
