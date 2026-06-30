/** Événement de l'agenda (source unique de vérité — /content/evenements/*.md). */
export type EvenementMeta = {
  slug: string;
  titre: string;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  /** Heure d'ouverture (ex. « 19h00 »). */
  heure: string;
  /** Résumé court (cartes + listes + OG). */
  resume: string;
  image: string;
  /** Plat unique associé (événementiel). */
  platUnique?: string;
  tags: string[];
  lieu: string;
};

/** Événement complet (méta + contenu HTML/Markdown). */
export type Evenement = EvenementMeta & {
  /** Corps en Markdown brut. */
  contenu: string;
};

/** Article de la carte (boisson ou petite restauration). */
export type ArticleCarte = {
  nom: string;
  description?: string;
  /** Prix en euros (number) ou texte libre (ex. « selon arrivage »). */
  prix: number | string;
  /** Mise en avant local / fait maison. */
  local?: boolean;
  tags?: string[];
};

export type RubriqueCarte = {
  id: string;
  titre: string;
  note?: string;
  articles: ArticleCarte[];
};

/** Chiffre clé (impact). */
export type Chiffre = {
  valeur: string;
  suffixe?: string;
  label: string;
};

export type Partenaire = {
  nom: string;
  type: 'beneficiaire' | 'partenaire';
  description?: string;
  url?: string;
  logo?: string;
};
