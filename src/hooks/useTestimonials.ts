import { useEffect, useState } from "react";

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole?: string | null;
  authorCompany?: string | null;
  quote: string;
  rating?: number | null;
}

interface UseTestimonialsResult {
  testimonials: Testimonial[];
  loading: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

export function useTestimonials(): UseTestimonialsResult {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(Boolean(API_URL));

  useEffect(() => {
    if (!API_URL) return;

    const controller = new AbortController();

    fetch(`${API_URL}/testimonials`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        return res.json() as Promise<Testimonial[]>;
      })
      .then((data) => setTestimonials(data))
      .catch(() => {
        // Silently ignore — the section just renders nothing on failure.
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { testimonials, loading };
}
