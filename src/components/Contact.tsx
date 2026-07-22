import { useState, type FormEvent } from "react";
import { contactInfo } from "../data/content";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Wrap } from "./Wrap";

interface FormState {
  name: string;
  company: string;
  email: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Contact request:", form);
    setForm(initialForm);
  };

  return (
    <section id="contact" className="relative z-[2] bg-blue-night py-[90px] text-white">
      <Wrap className="grid grid-cols-1 gap-14 md:grid-cols-2">
        <Reveal from="left">
          <div>
            <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
              Contact
            </div>
            <h2 className="font-display mb-5 text-[34px] font-extrabold tracking-[-0.5px]">
              Prendre rendez-vous
            </h2>
            <p className="mb-10 max-w-[600px] text-slate-mid">
              Nos équipes vous répondent sous 24h ouvrées.
            </p>
            {contactInfo.map((row) => (
              <div
                key={row.label}
                className="flex gap-3.5 border-b border-white/12 py-4 text-sm text-slate-soft transition-colors duration-300 hover:border-gold/40"
              >
                <span>{row.label}</span>
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
            className="bg-white p-8 text-text shadow-contact md:ml-auto md:max-w-[520px] md:p-12"
          >
            <Field
              label="Nom"
              value={form.name}
              onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
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
            />
            <div className="mb-4">
              <label className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">
                Message
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
              />
            </div>
            <Button type="submit" variant="gold" className="w-full text-center">
              Envoyer la demande
            </Button>
          </form>
        </Reveal>
      </Wrap>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function Field({ label, value, onChange, type = "text" }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line px-3.5 py-3 font-sans text-sm outline-none transition-colors duration-200 focus:border-blue"
      />
    </div>
  );
}
