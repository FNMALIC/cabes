import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Wrap } from "../components/Wrap";
import { useAnnouncements } from "../hooks/useAnnouncements";

const API_URL = import.meta.env.VITE_API_URL;

export function AnnoncesPage() {
  const { announcements, loading } = useAnnouncements();

  return (
    <>
      <PageHero
        kicker="Actualités"
        title="Annonces"
        subtitle="Les dernières informations et actualités du Cabinet Express Services."
      />

      <section className="bg-bg py-[90px]">
        <Wrap className="max-w-[760px]">
          {loading ? (
            <p className="text-muted">Chargement des annonces...</p>
          ) : announcements.length === 0 ? (
            <p className="text-muted">Aucune annonce n'est publiée pour le moment.</p>
          ) : (
            <div className="flex flex-col gap-5">
              {announcements.map((announcement, index) => (
                <Reveal key={announcement.id} delay={index * 60}>
                  <article className="border border-line bg-white">
                    {announcement.image ? (
                      <img
                        src={`${API_URL}${announcement.image}`}
                        alt=""
                        className="h-52 w-full object-cover"
                      />
                    ) : null}
                    <div className="px-[26px] py-[30px]">
                    <time
                      dateTime={announcement.createdAt}
                      className="font-mono text-[11px] tracking-[1.5px] text-blue uppercase"
                    >
                      {new Date(announcement.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h2 className="font-display mt-2 mb-3 text-[20px] font-bold text-blue-night">
                      {announcement.title}
                    </h2>
                    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-muted">
                      {announcement.content}
                    </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Wrap>
      </section>
    </>
  );
}
