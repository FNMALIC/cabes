import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api/client";
import type { Testimonial } from "../api/types";

const emptyForm = {
  authorName: "",
  authorRole: "",
  authorCompany: "",
  quote: "",
  rating: "",
  order: "0",
};

type FormState = typeof emptyForm;

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.get<Testimonial[]>("/admin/testimonials");
      setTestimonials(data);
    } catch {
      setError("Impossible de charger les témoignages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setForm({
      authorName: testimonial.authorName,
      authorRole: testimonial.authorRole ?? "",
      authorCompany: testimonial.authorCompany ?? "",
      quote: testimonial.quote,
      rating: testimonial.rating ? String(testimonial.rating) : "",
      order: String(testimonial.order),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      authorName: form.authorName,
      authorRole: form.authorRole || undefined,
      authorCompany: form.authorCompany || undefined,
      quote: form.quote,
      rating: form.rating ? Number(form.rating) : undefined,
      order: form.order ? Number(form.order) : 0,
    };

    try {
      if (editingId) {
        await api.patch(`/admin/testimonials/${editingId}`, payload);
      } else {
        await api.post("/admin/testimonials", payload);
      }
      cancelEdit();
      await load();
    } catch {
      setError("Impossible d'enregistrer le témoignage.");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublished = async (testimonial: Testimonial) => {
    await api.patch(`/admin/testimonials/${testimonial.id}`, { published: !testimonial.published });
    await load();
  };

  const remove = async (testimonial: Testimonial) => {
    if (!window.confirm(`Supprimer le témoignage de ${testimonial.authorName} ?`)) return;
    await api.delete(`/admin/testimonials/${testimonial.id}`);
    if (editingId === testimonial.id) cancelEdit();
    await load();
  };

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-blue-night">Témoignages</h1>

      <form onSubmit={handleSubmit} className="mb-10 border border-line bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-blue-night">
          {editingId ? "Modifier le témoignage" : "Nouveau témoignage"}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Nom" value={form.authorName} onChange={(v) => setForm((f) => ({ ...f, authorName: v }))} required />
          <Field label="Rôle" value={form.authorRole} onChange={(v) => setForm((f) => ({ ...f, authorRole: v }))} />
          <Field label="Entreprise" value={form.authorCompany} onChange={(v) => setForm((f) => ({ ...f, authorCompany: v }))} />
          <Field label="Note (1-5)" type="number" value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
          <Field label="Ordre d'affichage" type="number" value={form.order} onChange={(v) => setForm((f) => ({ ...f, order: v }))} />
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">Citation</label>
          <textarea
            required
            rows={3}
            value={form.quote}
            onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
            className="w-full border border-line px-3 py-2.5 text-sm outline-none focus:border-blue"
          />
        </div>
        {error ? <p className="mt-4 text-sm text-red">{error}</p> : null}
        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-night px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {editingId ? "Enregistrer" : "Ajouter"}
          </button>
          {editingId ? (
            <button type="button" onClick={cancelEdit} className="px-5 py-2.5 text-sm font-medium text-muted">
              Annuler
            </button>
          ) : null}
        </div>
      </form>

      {loading ? (
        <p className="text-sm text-muted">Chargement...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-sm text-muted">Aucun témoignage pour le moment.</p>
      ) : (
        <div className="overflow-x-auto border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-[0.5px] text-muted uppercase">
                <th className="px-4 py-3">Auteur</th>
                <th className="px-4 py-3">Citation</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 align-top">
                    <div className="font-medium text-text">{testimonial.authorName}</div>
                    {testimonial.authorRole || testimonial.authorCompany ? (
                      <div className="text-xs text-muted">
                        {[testimonial.authorRole, testimonial.authorCompany].filter(Boolean).join(" — ")}
                      </div>
                    ) : null}
                  </td>
                  <td className="max-w-md px-4 py-3 align-top text-muted">{testimonial.quote}</td>
                  <td className="px-4 py-3 align-top">
                    <button
                      type="button"
                      onClick={() => togglePublished(testimonial)}
                      className={`px-2.5 py-1 text-xs font-semibold ${
                        testimonial.published ? "bg-green-100 text-green-800" : "bg-line text-muted"
                      }`}
                    >
                      {testimonial.published ? "Publié" : "Masqué"}
                    </button>
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    <button type="button" onClick={() => startEdit(testimonial)} className="mr-3 text-blue hover:underline">
                      Modifier
                    </button>
                    <button type="button" onClick={() => remove(testimonial)} className="text-red hover:underline">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}

function Field({ label, value, onChange, type = "text", required }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs tracking-[0.5px] text-muted uppercase">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line px-3 py-2.5 text-sm outline-none focus:border-blue"
      />
    </div>
  );
}
