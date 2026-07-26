import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Wrap } from "../components/Wrap";

export function NotFoundPage() {
  return (
    <>
      <PageHero
        kicker="Erreur 404"
        title="Page introuvable"
        subtitle="Cette adresse n'existe pas ou a été déplacée."
      />
      <section className="bg-bg py-[90px]">
        <Wrap>
          <p className="mb-8 max-w-md text-muted">
            Vérifiez l&apos;URL ou retournez à l&apos;accueil pour poursuivre
            votre navigation.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              to="/"
              className="inline-block rounded-[3px] bg-gold px-7 py-3.5 text-sm font-semibold text-blue-night transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              to="/contact"
              className="inline-block rounded-[3px] border border-blue-night px-7 py-3.5 text-sm font-semibold text-blue-night transition hover:bg-blue-night hover:text-white"
            >
              Nous contacter
            </Link>
          </div>
        </Wrap>
      </section>
    </>
  );
}
