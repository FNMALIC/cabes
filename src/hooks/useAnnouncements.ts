import { useEffect, useState } from "react";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface UseAnnouncementsResult {
  announcements: Announcement[];
  loading: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

export function useAnnouncements(): UseAnnouncementsResult {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(Boolean(API_URL));

  useEffect(() => {
    if (!API_URL) return;

    const controller = new AbortController();

    fetch(`${API_URL}/announcements`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch announcements");
        return res.json() as Promise<Announcement[]>;
      })
      .then((data) => setAnnouncements(data))
      .catch(() => {
        // Silently ignore — the section just renders nothing on failure.
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { announcements, loading };
}
