import { useState, type FormEvent } from "react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Wrap } from "../components/Wrap";
import { contactInfo } from "../data/content";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Contact request:", form);
    setSent(true);
    setForm(initialForm);
  };

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Prendre rendez-vous"
        subtitle="Nos équipes vous répondent sous 24h ouvrées."
      />

      <section className="bg-blue-night py-[90px] text-white">
        <Wrap className="grid grid-cols-1 gap-14 md:grid-cols-2">
          <Reveal from="left">
            <div>
              <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
                Coordonnées
              </div>
              <h2 className="font-display mb-5 text-[28px] font-extrabold">
                Parlons de votre trajectoire
              </h2>
              <p className="mb-10 max-w-[420px] text-slate-mid">
                Que vous souhaitiez sécuriser une créance, former vos équipes ou
                structurer un projet — écrivez-nous.
              </p>
              {contactInfo.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 border-b border-white/12 py-4 text-sm text-slate-soft sm:flex-row sm:gap-3.5"
                >
                  <span className="min-w-[90px]">{row.label}</span>
                  <span className={row.mono ? "font-mono text-gold" : undefined}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal from="right" delay={100}>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 text-text shadow-contact md:p-12"
            >
              {sent ? (
                <div className="py-8 text-center">
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
              ) : (
                <>
                  <Field
                    label="Nom"
                    value={form.name}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, name: value }))
                    }
                    required
                  />
                  <Field
                    label="Entreprise"
                    value={form.company}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, company: value }))
                    }
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, email: value }))
                    }
                    required
                  />
                  <Field
                    label="Téléphone"
                    type="tel"
                    value={form.phone}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, phone: value }))
                    }
                  />
                  <Field
                    label="Objet"
                    value={form.subject}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, subject: value }))
                    }
                  />
                  <div className="mb-4">
                    <label className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-[3px] bg-gold px-7 py-3.5 text-sm font-semibold text-blue-night transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
                  >
                    Envoyer la demande
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: FieldProps) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
      />
    </div>
  );
}
