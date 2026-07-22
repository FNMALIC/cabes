import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Wrap } from "../components/Wrap";
import {
  directorGeneral,
  operationalTeam,
  topManagement,
} from "../data/content";

function MemberCard({
  name,
  role,
  bio,
  image,
  delay = 0,
}: {
  name: string;
  role: string;
  bio: string;
  image?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="h-full border border-line bg-white p-7 transition duration-300 hover:border-gold">
        <div className="mb-5 aspect-4/3 bg-linear-to-br from-blue-night to-blue-deep overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-[12px] text-slate-mid">
              Photo
            </span>
          )}
        </div>
        <h3 className="font-display text-lg font-bold text-blue-night">
          {name}
        </h3>
        <div className="mt-1 mb-3 text-[12px] tracking-[1px] text-gold uppercase">
          {role}
        </div>
        <p className="text-[14px] text-muted">{bio}</p>
      </article>
    </Reveal>
  );
}

export function EquipePage() {
  return (
    <>
      <PageHero
        kicker="Équipe"
        title="Leadership & top management de haut vol"
        subtitle="Près de deux décennies d'expertise menées de main de maître par un leadership inspirant et portées par un collectif de talents diversifiés, dynamiques et proactifs."
      />

      <section className="overflow-hidden bg-blue-night py-[90px] text-white">
        <Wrap className="grid grid-cols-1 items-center gap-[60px] md:grid-cols-[0.6fr_1fr]">
          <Reveal from="left">
            <div className="relative aspect-3/4 max-w-[320px] overflow-hidden bg-linear-to-br from-[#123a5e] to-[#0b2540]">
              {directorGeneral.image ? (
                <img
                  src={directorGeneral.image}
                  alt={directorGeneral.name}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-[13px] text-[#7c93ab]">
                  Photo professionnelle
                </span>
              )}
            </div>
          </Reveal>
          <Reveal from="right" delay={100}>
            <div>
              <div className="font-mono text-xs tracking-[2px] text-gold uppercase mb-4">
                Direction générale
              </div>
              <h2 className="font-display text-[28px]">
                {directorGeneral.name}
              </h2>
              <div className="mt-2 mb-5 text-[13px] tracking-[1px] text-gold uppercase">
                {directorGeneral.role}, CABES
              </div>
              <p className="max-w-[480px] text-slate-soft">
                {directorGeneral.bio}
              </p>
              {directorGeneral.quote ? (
                <q className="font-display mt-6 block text-[20px] text-white">
                  {directorGeneral.quote}
                </q>
              ) : null}
            </div>
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-bg-alt py-[90px]">
        <Wrap>
          <Reveal>
            <div className="font-mono text-xs tracking-[2px] text-blue uppercase mb-4">
              Top management
            </div>
            <h2 className="font-display mb-10 text-[34px] font-extrabold tracking-[-0.5px] text-blue-night">
              La vision au quotidien
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topManagement.map((member, index) => (
              <MemberCard key={member.name} {...member} delay={index * 80} />
            ))}
          </div>
        </Wrap>
      </section>

      <section className="bg-bg py-[90px]">
        <Wrap>
          <Reveal>
            <div className="font-mono text-xs tracking-[2px] text-blue uppercase mb-4">
              Équipe opérationnelle
            </div>
            <h2 className="font-display mb-10 text-[34px] font-extrabold tracking-[-0.5px] text-blue-night">
              Un collectif de talents
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {operationalTeam.map((member, index) => (
              <MemberCard key={member.name} {...member} delay={index * 60} />
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12">
              <Link
                to="/contact"
                className="inline-block rounded-[3px] border border-blue-night px-7 py-3.5 text-sm font-semibold text-blue-night transition hover:bg-blue-night hover:text-white"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
