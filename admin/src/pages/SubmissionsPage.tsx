import { Fragment, useEffect, useState } from "react";
import { api } from "../api/client";
import type { ContactSubmission, PaginatedSubmissions, SubmissionStatus } from "../api/types";

const statusLabels: Record<SubmissionStatus, string> = {
  NEW: "Nouveau",
  READ: "Lu",
  ARCHIVED: "Archivé",
};

const statusStyles: Record<SubmissionStatus, string> = {
  NEW: "bg-blue-100 text-blue-800",
  READ: "bg-line text-muted",
  ARCHIVED: "bg-line text-muted",
};

export function SubmissionsPage() {
  const [data, setData] = useState<PaginatedSubmissions | null>(null);
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const query = statusFilter ? `?status=${statusFilter}` : "";
    const result = await api.get<PaginatedSubmissions>(`/admin/contact-submissions${query}`);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const updateStatus = async (submission: ContactSubmission, status: SubmissionStatus) => {
    await api.patch(`/admin/contact-submissions/${submission.id}`, { status });
    await load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-blue-night">Demandes de contact</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as SubmissionStatus | "")}
          className="border border-line px-3 py-2 text-sm"
        >
          <option value="">Tous les statuts</option>
          <option value="NEW">Nouveau</option>
          <option value="READ">Lu</option>
          <option value="ARCHIVED">Archivé</option>
        </select>
      </div>

      {loading || !data ? (
        <p className="text-sm text-muted">Chargement...</p>
      ) : data.items.length === 0 ? (
        <p className="text-sm text-muted">Aucune demande pour le moment.</p>
      ) : (
        <div className="overflow-x-auto border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-[0.5px] text-muted uppercase">
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Objet</th>
                <th className="px-4 py-3">Reçu le</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((submission) => (
                <Fragment key={submission.id}>
                  <tr className="border-b border-line">
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium text-text">{submission.name}</div>
                      <div className="text-xs text-muted">{submission.email}</div>
                      {submission.company ? (
                        <div className="text-xs text-muted">{submission.company}</div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 align-top text-muted">{submission.subject || "—"}</td>
                    <td className="px-4 py-3 align-top text-muted">
                      {new Date(submission.createdAt).toLocaleString("fr-FR")}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className={`px-2.5 py-1 text-xs font-semibold ${statusStyles[submission.status]}`}>
                        {statusLabels[submission.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                        className="mr-3 text-blue hover:underline"
                      >
                        {expandedId === submission.id ? "Masquer" : "Voir"}
                      </button>
                      {submission.status !== "READ" ? (
                        <button
                          type="button"
                          onClick={() => updateStatus(submission, "READ")}
                          className="mr-3 text-blue hover:underline"
                        >
                          Marquer lu
                        </button>
                      ) : null}
                      {submission.status !== "ARCHIVED" ? (
                        <button
                          type="button"
                          onClick={() => updateStatus(submission, "ARCHIVED")}
                          className="text-muted hover:underline"
                        >
                          Archiver
                        </button>
                      ) : null}
                    </td>
                  </tr>
                  {expandedId === submission.id ? (
                    <tr className="border-b border-line bg-bg">
                      <td colSpan={5} className="px-4 py-3 whitespace-pre-wrap text-muted">
                        {submission.phone ? <div className="mb-2 text-xs">Téléphone : {submission.phone}</div> : null}
                        {submission.message}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
