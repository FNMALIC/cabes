import { useCallback, useEffect, useState } from "react";
import { api, ApiError } from "../api/client";

interface Session {
  email: string;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get<Session>("/auth/me");
      setSession(data);
    } catch (error) {
      setSession(error instanceof ApiError && error.status === 401 ? null : null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.post<Session>("/auth/login", { email, password });
    setSession(data);
  }, []);

  const logout = useCallback(async () => {
    await api.post("/auth/logout");
    setSession(null);
  }, []);

  return { session, loading, login, logout };
}
