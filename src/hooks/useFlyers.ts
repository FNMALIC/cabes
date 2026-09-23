import { useEffect, useState } from "react";

export interface Flyer {
  id: string;
  title?: string | null;
  image: string;
  link?: string | null;
}

interface UseFlyersResult {
  flyers: Flyer[];
  loading: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

export function useFlyers(): UseFlyersResult {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [loading, setLoading] = useState(Boolean(API_URL));

  useEffect(() => {
    if (!API_URL) return;

    const controller = new AbortController();

    fetch(`${API_URL}/flyers`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch flyers");
        return res.json() as Promise<Flyer[]>;
      })
      .then((data) => setFlyers(data))
      .catch(() => {
        // Silently ignore — the section just renders nothing on failure.
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { flyers, loading };
}
