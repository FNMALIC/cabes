import { useId, useState, type FormEvent } from "react";
import { Button } from "./Button";

export interface ContactFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

interface ContactFormProps {
  className?: string;
  onSubmitSuccess?: (values: ContactFormValues) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export function ContactForm({ className = "", onSubmitSuccess }: ContactFormProps) {
  const formId = useId();
  const [form, setForm] = useState<ContactFormValues>(initialForm);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const update =
    (field: keyof ContactFormValues) => (value: string) =>
      setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!API_URL || submitting) return;

    setSubmitting(true);
    setError(false);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");

      onSubmitSuccess?.(form);
      setSent(true);
      setForm(initialForm);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div
        className={`bg-white p-8 text-center text-text shadow-contact md:p-12 ${className}`.trim()}
        role="status"
        aria-live="polite"
      >
        <div className="font-display text-2xl font-bold text-blue-night">
          Demande envoyée
        </div>
        <p className="mt-3 text-muted">
          Merci. Nous vous recontactons sous 24h ouvrées.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-blue underline-offset-2 hover:underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-8 text-text shadow-contact md:p-12 ${className}`.trim()}
      noValidate={false}
      aria-labelledby={`${formId}-title`}
    >
      <h3 id={`${formId}-title`} className="sr-only">
        Formulaire de contact
      </h3>
      <Field
        id={`${formId}-name`}
        label="Nom"
        value={form.name}
        onChange={update("name")}
        required
        autoComplete="name"
      />
      <Field
        id={`${formId}-company`}
        label="Entreprise"
        value={form.company}
        onChange={update("company")}
        autoComplete="organization"
      />
      <Field
        id={`${formId}-email`}
        label="Email"
        type="email"
        value={form.email}
        onChange={update("email")}
        required
        autoComplete="email"
      />
      <Field
        id={`${formId}-phone`}
        label="Téléphone"
        type="tel"
        value={form.phone}
        onChange={update("phone")}
        autoComplete="tel"
      />
      <Field
        id={`${formId}-subject`}
        label="Objet"
        value={form.subject}
        onChange={update("subject")}
      />
      <div className="mb-4">
        <label
          htmlFor={`${formId}-message`}
          className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase"
        >
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={(e) => update("message")(e.target.value)}
          className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
        />
      </div>
      {error ? (
        <p role="alert" className="mb-4 text-sm text-cabes-red">
          Une erreur est survenue. Merci de réessayer ou de nous contacter directement.
        </p>
      ) : null}
      <Button
        type="submit"
        variant="gold"
        disabled={submitting}
        className="w-full text-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Envoi en cours..." : "Envoyer la demande"}
      </Button>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: FieldProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase"
      >
        {label}
        {required ? (
          <span className="text-cabes-red" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
      />
    </div>
  );
}
