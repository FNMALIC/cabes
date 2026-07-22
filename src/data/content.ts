export const navLinks = [
  { label: "Le Cabinet", to: "/cabinet" },
  { label: "Expertises", to: "/expertises" },
  { label: "Équipe", to: "/equipe" },
  { label: "Contact", to: "/contact" },
] as const;

export const stats = [
  { value: "19", label: "Ans d'expérience" },
  { value: "99%", label: "Satisfaction client" },
  { value: "150+", label: "Partenaires" },
  { value: "3000", label: "Bénéficiaires" },
  { value: "05", label: "Conventions majeures" },
  { value: "05", label: "Formations nationales" },
] as const;

export const services = [
  {
    id: "01",
    title: "Formation",
    description: "Le développement continu de vos compétences.",
    detail:
      "Programmes de formation professionnelle pour renforcer les compétences de vos équipes et soutenir la performance durable de votre organisation.",
  },
  {
    id: "02",
    title: "Recouvrement",
    description: "L'optimisation et la préservation de votre trésorerie.",
    detail:
      "Recouvrement amiable et contentieux pour maximiser la récupération de vos créances tout en préservant vos relations commerciales.",
  },
  {
    id: "03",
    title: "Enquête sur fraude documentaire",
    description: "La maîtrise et la vérification de vos informations clés.",
    detail:
      "Vérification, fiabilisation et contrôle documentaire pour sécuriser vos décisions et prévenir les risques de fraude.",
  },
  {
    id: "04",
    title: "Suivi des contrats & conventions",
    description: "La sécurisation rigoureuse de vos engagements.",
    detail:
      "Pilotage et suivi de vos accords contractuels : échéances, obligations, reporting et alerte en cas de dérive.",
  },
  {
    id: "05",
    title: "Affacturage",
    description: "Rachat des créances et préfinancement de votre croissance.",
    detail:
      "Cession de créances et préfinancement pour libérer votre trésorerie et accélérer le développement de vos activités.",
  },
  {
    id: "06",
    title: "Suivi des dossiers sinistres",
    description: "Votre sérénité face à l'interprétation des textes et la défense de vos droits.",
    detail:
      "Accompagnement dans l'analyse, le suivi et la défense de vos dossiers sinistres, pour une gestion claire et maîtrisée.",
  },
] as const;

export const whyItems = [
  "19 ans d'expérience",
  "Leadership inspirant",
  "Équipe multidisciplinaire",
  "99% de satisfaction client",
  "Solutions concrètes",
  "Approche orientée résultats",
  "Professionnalisme",
  "Confidentialité",
] as const;

export const contactInfo = [
  { label: "Téléphone", value: "+237 690 564 474", mono: true },
  { label: "Email", value: "infos.cabes@gmail.com", mono: true },
  {
    label: "Adresse",
    value: "Entrée Gare Bessengué, Rue 1477 Case 451, Douala",
    mono: false,
  },
] as const;

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  quote?: string;
  image?: string;
}

export const directorGeneral: TeamMember = {
  name: "François Zavier FONKOU WOLONG",
  role: "Directeur Général",
  image: "/images/mr_fonkou_wolong.jpeg",
  bio: "Manager Coach et homme multidisciplinaire, rompu aux missions les plus complexes en vente, marketing et management des organisations. Animé par une seule passion : trouver des solutions concrètes aux difficultés des particuliers et des institutions.",
  quote:
    "Trouver des solutions concrètes aux difficultés des particuliers et des institutions.",
};

export const topManagement: TeamMember[] = [
  {
    name: "Isabelle Edith FANGOH TIGOUNFACK",
    role: "Directrice Générale Adjointe",
    bio: "Garante de la performance opérationnelle du cabinet.",
  },
  {
    name: "Cynthia Lauriane YEMELONG FOUODJI",
    role: "Directrice du Développement",
    bio: "Propulse l'expansion du cabinet au-delà des frontières.",
    image: "/images/cythia.jpeg",
  },
  {
    name: "Tatiane DJUKA TIOMELA",
    role: "Coordonnatrice",
    bio: "Véritable cheville ouvrière de l'alignement de nos équipes.",
  },
];

export const operationalTeam: TeamMember[] = [
  {
    name: "Carole MAFFO DJOTSOP",
    role: "Opératrice & Statisticienne",
    bio: "Chargée du traitement et de l'analyse des données.",
    image: "/images/Carole.jpeg",
  },
  {
    name: "Sédrique Arnauld KAMGANG",
    role: "Opérateur & Community Manager",
    bio: "Responsable de l'animation des communautés en ligne, de la création de contenu et de l'interaction avec les abonnés.",
    image: "/images/Sédrique.jpeg",
  },
  {
    name: "Jordan El HERDI FEUMBA DIBAFEU",
    role: "Opérateur Assistant de Développement",
    bio: "Apporte le soutien stratégique dans l'acquisition et le développement de nouveaux marchés.",
    image: "/images/Jordan.jpeg",
  },
  {
    name: "Merveille La Chance NGAPMI",
    role: "Opératrice & Agents Marketing",
    bio: "Chargée de la promotion des services et du déploiement des campagnes.",
    image: "/images/Merveille.jpeg",
  },
  {
    name: "Rosyne MOUMEDJUI NJENGOU",
    role: "Opératrice & Agents Marketing",
    bio: "Chargée de la promotion des services et du déploiement des campagnes.",
    image: "/images/Rosyne.jpeg",
  },
  {
    name: "Marlyse Marceline NGAH AWONO",
    role: "Opératrice & Agents Marketing",
    bio: "Chargée de la promotion des services et du déploiement des campagnes.",
    image: "/images/Marlyse.jpeg",
  },
];

export const cabinetValues = [
  {
    title: "Mission",
    text: "Sécuriser et propulser les activités de nos partenaires par des solutions concrètes.",
  },
  {
    title: "Vision",
    text: "Offrir une trajectoire de performance durable, portée par un leadership inspirant et une équipe d'exception.",
  },
  {
    title: "Engagement",
    text: "19 ans de confiance, 19 ans d'impact — au service de votre satisfaction.",
  },
] as const;
