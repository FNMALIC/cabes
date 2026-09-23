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

// TODO: confirm this is the full number — Cameroon mobiles are normally 9
// digits after the country code, and "97606453" is only 8.
const WHATSAPP_NUMBER = "23797606453";

function buildWhatsAppLink(form: ContactFormValues): string {
  const lines = [
    "Bonjour CABES, je vous contacte depuis le site.",
    form.name && `Nom : ${form.name}`,
    form.company && `Entreprise : ${form.company}`,
    form.email && `Email : ${form.email}`,
    form.phone && `Téléphone : ${form.phone}`,
    form.subject && `Objet : ${form.subject}`,
    form.message && `Message : ${form.message}`,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

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
      <a
        href={buildWhatsAppLink(form)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 border border-line px-6 py-3.5 text-center text-sm font-semibold text-text transition duration-300 hover:border-[#25D366] hover:text-[#25D366]"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.3c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.25-8.25 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z" />
        </svg>
        Envoyer via WhatsApp
      </a>
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
