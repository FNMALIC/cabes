import { contactInfo } from "../data/content";

type ContactRow = (typeof contactInfo)[number];

export function ContactValue({ row }: { row: ContactRow }) {
  if (row.label === "Téléphone") {
    return (
      <a
        href={`tel:${row.value.replace(/\s/g, "")}`}
        className={row.mono ? "font-mono text-gold" : undefined}
      >
        {row.value}
      </a>
    );
  }
  if (row.label === "Email") {
    return (
      <a
        href={`mailto:${row.value}`}
        className={row.mono ? "font-mono text-gold" : undefined}
      >
        {row.value}
      </a>
    );
  }
  return (
    <span className={row.mono ? "font-mono text-gold" : undefined}>
      {row.value}
    </span>
  );
}
