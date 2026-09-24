import { useId, useState, type FormEvent } from "react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Wrap } from "../components/Wrap";

const API_URL = import.meta.env.VITE_API_URL;

interface FormValues {
  authorName: string;
  authorRole: string;
  authorCompany: string;
  quote: string;
  rating: number;
}

const initialForm: FormValues = {
  authorName: "",
  authorRole: "",
  authorCompany: "",
  quote: "",
  rating: 0,
};

export function AvisPage() {
  const formId = useId();
  const [form, setForm] = useState<FormValues>(initialForm);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const update = <K extends keyof FormValues>(field: K, value: FormValues[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!API_URL || submitting || form.rating === 0) return;

    setSubmitting(true);
    setError(false);

    try {
      const response = await fetch(`${API_URL}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: form.authorName,
          authorRole: form.authorRole || undefined,
          authorCompany: form.authorCompany || undefined,
          quote: form.quote,
          rating: form.rating,
        }),
      });
      if (!response.ok) throw new Error("Request failed");

      setSent(true);
      setForm(initialForm);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        kicker="Témoignages"
        title="Laissez votre avis"
        subtitle="Votre expérience compte — partagez-la avec nous. Après validation par notre équipe, elle pourra être publiée sur le site."
      />

      <section className="bg-bg py-[90px]">
        <Wrap className="max-w-[620px]">
          <Reveal>
            {sent ? (
              <div className="bg-white p-8 text-center text-text shadow-contact md:p-12" role="status" aria-live="polite">
                <div className="font-display text-2xl font-bold text-blue-night">
                  Merci pour votre avis
                </div>
                <p className="mt-3 text-muted">
                  Il sera publié sur le site après validation par notre équipe.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-blue underline-offset-2 hover:underline"
                >
                  Laisser un autre avis
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 text-text shadow-contact md:p-12"
                aria-labelledby={`${formId}-title`}
              >
                <h3 id={`${formId}-title`} className="sr-only">
                  Formulaire d'avis
                </h3>

                <div className="mb-5">
                  <span className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">
                    Votre note <span className="text-cabes-red">*</span>
                  </span>
                  <StarPicker value={form.rating} onChange={(v) => update("rating", v)} />
                </div>

                <div className="mb-4">
                  <label htmlFor={`${formId}-name`} className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">
                    Nom <span className="text-cabes-red">*</span>
                  </label>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    required
                    autoComplete="name"
                    value={form.authorName}
                    onChange={(e) => update("authorName", e.target.value)}
                    className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
                  />
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${formId}-role`} className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">
                      Fonction
                    </label>
                    <input
                      id={`${formId}-role`}
                      type="text"
                      value={form.authorRole}
                      onChange={(e) => update("authorRole", e.target.value)}
                      className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${formId}-company`} className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">
                      Entreprise
                    </label>
                    <input
                      id={`${formId}-company`}
                      type="text"
                      autoComplete="organization"
                      value={form.authorCompany}
                      onChange={(e) => update("authorCompany", e.target.value)}
                      className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor={`${formId}-quote`} className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">
                    Votre avis <span className="text-cabes-red">*</span>
                  </label>
                  <textarea
                    id={`${formId}-quote`}
                    rows={5}
                    required
                    value={form.quote}
                    onChange={(e) => update("quote", e.target.value)}
                    className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
                  />
                </div>

                {error ? (
                  <p role="alert" className="mb-4 text-sm text-cabes-red">
                    Une erreur est survenue. Merci de réessayer.
                  </p>
                ) : null}
                {form.rating === 0 && !error ? (
                  <p className="mb-4 text-xs text-muted">Veuillez sélectionner une note avant d'envoyer.</p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting || form.rating === 0}
                  className="w-full rounded-[3px] bg-gold px-7 py-3.5 text-center text-sm font-semibold text-blue-night transition duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Envoi en cours..." : "Envoyer mon avis"}
                </button>
              </form>
            )}
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="flex gap-1.5" role="radiogroup" aria-label="Note sur 5 étoiles">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
          onClick={() => onChange(star)}
          className="p-0.5"
        >
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill={star <= value ? "#f2a91e" : "none"}
            stroke={star <= value ? "#f2a91e" : "#c9c5bd"}
            strokeWidth="1.5"
          >
            <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17.6l-5.9 3 1.3-6.6-4.9-4.6 6.6-.7z" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  );
}
