import { useEffect, useState } from "react";

export interface JobOffer {
  id: string;
  title: string;
  location?: string | null;
  contractType?: string | null;
  positions: number;
  description: string;
  image?: string | null;
}

interface UseJobOffersResult {
  jobOffers: JobOffer[];
  loading: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

export function useJobOffers(): UseJobOffersResult {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(Boolean(API_URL));

  useEffect(() => {
    if (!API_URL) return;

    const controller = new AbortController();

    fetch(`${API_URL}/job-offers`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job offers");
        return res.json() as Promise<JobOffer[]>;
      })
      .then((data) => setJobOffers(data))
      .catch(() => {
        // Silently ignore — the section just renders nothing on failure.
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { jobOffers, loading };
}
