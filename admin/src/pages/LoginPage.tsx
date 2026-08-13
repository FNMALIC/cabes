import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import { ApiError } from "../api/client";

export function LoginPage() {
  const { session, loading, login } = useSessionContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/testimonials" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-line bg-white p-8 shadow-sm"
      >
        <h1 className="mb-6 text-lg font-semibold text-blue-night">
          CABES — Administration
        </h1>
        <label className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full border border-line px-3 py-2.5 text-sm outline-none focus:border-blue"
        />
        <label className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full border border-line px-3 py-2.5 text-sm outline-none focus:border-blue"
        />
        {error ? <p className="mb-4 text-sm text-red">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-night py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
