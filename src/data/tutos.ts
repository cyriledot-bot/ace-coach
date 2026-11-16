/**
 * Tutos hors court : renforcement, yoga et mobilité, conseils et méthodes.
 * Public : joueur de 13-17 ans. Principes de prudence appliqués partout :
 * poids du corps ou élastique seulement, jamais de charge lourde pendant la
 * croissance, technique avant intensité, aucune séance « jusqu'à l'échec »,
 * et une douleur qui dure se dit à un adulte. Ces fiches complètent les
 * consignes de l'entraîneur et du médecin, elles ne les remplacent pas.
 */

export type TutoCategory = "renforcement" | "yoga" | "methodes";

export interface TutoStep {
  text: string;
  /** Dosage court, ex. « 3 × 10 », « 2 × 30 s par côté ». */
  dose?: string;
}

export interface Tuto {
  id: string;
  category: TutoCategory;
  title: string;
  summary: string;
  duration: string;
  /** Durée en minutes, pour pré-remplir le carnet. */
  durationMin: number;
  equipment: string;
  steps: TutoStep[];
  why: string;
  caution?: string;
  /** Fréquence conseillée dans la semaine. */
  frequency?: string;
}

export const TUTO_CATEGORIES: Record<TutoCategory, { label: string; intro: string }> = {
  renforcement: {
    label: "Renforcement",
    intro: "Au poids du corps ou avec un élastique. Deux séances par semaine suffisent, jamais la veille d’un match.",
  },
  yoga: {
    label: "Yoga et mobilité",
    intro: "Pour les hanches, les épaules et le dos que le tennis raidit. Lent, sans forcer, en respirant.",
  },
  methodes: {
    label: "Conseils et méthodes",
    intro: "Ce qui fait progresser entre deux entraînements : organisation, sommeil, carnet, façon d’apprendre.",
  },
};

export const TUTOS: Tuto[] = [
  // ---------------------------------------------------------------- renforcement
  {
    id: "renf-jambes",
    category: "renforcement",
    title: "Jambes de tennis",
    summary: "Le circuit de base : squats, fentes, sauts latéraux. Les jambes gagnent les matchs que le bras croit perdre.",
    duration: "15 min",
    durationMin: 15,
    equipment: "Aucun. Une ligne au sol ou un bâton.",
    frequency: "2 fois par semaine, pas la veille d’un match",
    steps: [
      { text: "Échauffement : 2 min de corde à sauter imaginaire, montées de genoux, pas chassés." },
      { text: "Squats, pieds largeur d’épaules, dos droit, descends comme pour t’asseoir, genoux dans l’axe des pieds.", dose: "3 × 12" },
      { text: "Fentes avant alternées, le genou arrière frôle le sol sans le toucher.", dose: "3 × 8 par jambe" },
      { text: "Sauts latéraux pieds joints par-dessus la ligne, réception souple, genoux fléchis.", dose: "3 × 20 s" },
      { text: "Fentes latérales (position du coup droit en bout de course), pousse sur la jambe pliée pour revenir.", dose: "2 × 8 par côté" },
      { text: "Montées sur la pointe des pieds, lentes, 2 s en haut.", dose: "2 × 15" },
      { text: "Repos 45 s entre les séries. Finis par 2 min de marche et d’étirements doux des quadriceps et des mollets." },
    ],
    why: "Le tennis, c’est des centaines de petites accélérations et de freinages. Des jambes plus fortes arrivent plus tôt sur la balle, restent basses sur le revers, et tiennent le troisième set.",
    caution: "Qualité du mouvement d’abord : si la technique se dégrade, arrête la série. Pas de charge sur les épaules pendant la croissance.",
  },
  {
    id: "renf-epaule-dos",
    category: "renforcement",
    title: "Épaule et dos solides",
    summary: "Les petits muscles de l’épaule et le haut du dos, ceux que le service use et que personne ne travaille.",
    duration: "12 min",
    durationMin: 12,
    equipment: "Un élastique léger (bande de fitness).",
    frequency: "2 à 3 fois par semaine, même en période de matchs",
    steps: [
      { text: "Cercles de bras avant puis arrière, lents, amplitude complète.", dose: "2 × 15" },
      { text: "Rotations externes : coude collé au corps plié à 90°, élastique tenu devant, ouvre vers l’extérieur sans décoller le coude.", dose: "3 × 15 par bras" },
      { text: "Tirage élastique vers la poitrine, coudes le long du corps, omoplates qui se rapprochent.", dose: "3 × 12" },
      { text: "« Y » et « T » : penché en avant, dos plat, bras tendus montés en Y puis écartés en T, pouces vers le ciel.", dose: "2 × 10 chaque" },
      { text: "Pompes sur les genoux ou sur les pieds, corps gainé, coudes à 45°.", dose: "3 × 8 à 12" },
      { text: "Superman : allongé sur le ventre, décolle bras et jambes 2 s, repose.", dose: "2 × 10" },
    ],
    why: "Le service et le smash répètent le même geste des centaines de fois. Une coiffe des rotateurs forte et des omoplates qui tiennent protègent l’épaule et donnent un bras plus relâché, donc plus rapide.",
    caution: "Élastique léger, mouvements lents, zéro douleur dans l’épaule. Une gêne qui revient à chaque service : on en parle.",
  },
  {
    id: "renf-gainage",
    category: "renforcement",
    title: "Gainage et rotation",
    summary: "Le tronc transmet la force des jambes vers la raquette. S’il fuit, le bras compense et se fatigue.",
    duration: "8 min",
    durationMin: 8,
    equipment: "Un tapis. Élastique facultatif.",
    frequency: "3 fois par semaine, après la séance ou le soir",
    steps: [
      { text: "Planche sur les avant-bras, corps aligné, fessiers serrés, respiration normale.", dose: "3 × 30 s" },
      { text: "Planche latérale, hanche haute, main libre vers le ciel.", dose: "2 × 20 s par côté" },
      { text: "Dead bug : sur le dos, bras et jambes à 90°, allonge bras droit et jambe gauche sans creuser le dos, reviens, alterne.", dose: "2 × 10 par côté" },
      { text: "Rotations debout avec élastique (pallof press) : élastique accroché sur le côté, tends les bras devant toi et tiens contre la traction.", dose: "2 × 10 par côté" },
      { text: "Pont fessier : sur le dos, pieds à plat, monte le bassin, 2 s en haut.", dose: "2 × 12" },
    ],
    why: "Le coup droit est une rotation : jambes, hanches, tronc, épaule, raquette. Un tronc stable accélère la raquette sans forcer le bras et protège le bas du dos sur le service.",
  },
  {
    id: "renf-pieds",
    category: "renforcement",
    title: "Vitesse de pieds",
    summary: "Dix minutes qui font gagner le mètre qui manque sur les balles courtes.",
    duration: "10 min",
    durationMin: 10,
    equipment: "Aucun. Quatre repères au sol (chaussures, bouteilles).",
    frequency: "1 à 2 fois par semaine, idéalement avant une séance de tennis",
    steps: [
      { text: "Split-step en rythme : petit saut et réception pieds écartés, 2 s de pause, recommence.", dose: "3 × 10" },
      { text: "Pas chassés entre deux repères à 3 m, touche le sol à chaque extrémité.", dose: "4 × 20 s" },
      { text: "Sprints de 5 m avec départ en split-step, retour en marchant.", dose: "6" },
      { text: "Étoile : du centre, cours vers chacun des quatre repères et reviens, dans l’ordre annoncé par un partenaire (ou choisi au hasard).", dose: "3 tours" },
      { text: "Simulation : split-step, déplacement, coup droit à vide en équilibre, replacement. Puis revers.", dose: "2 × 8" },
    ],
    why: "Arriver tôt, c’est frapper en équilibre, donc avec de la marge. Le split-step au moment où l’adversaire frappe est le geste le plus rentable du tennis, et il se travaille sans balle.",
  },
  {
    id: "renf-semaine",
    category: "renforcement",
    title: "Ma semaine type",
    summary: "Comment placer le renforcement autour des entraînements et des matchs sans arriver fatigué sur le court.",
    duration: "Lecture 3 min",
    durationMin: 0,
    equipment: "Un agenda.",
    steps: [
      { text: "Deux séances de renforcement par semaine, de 10 à 15 min, les jours sans match et de préférence après le tennis, pas avant." },
      { text: "Épaule et dos (élastique) : peut se faire les jours de tennis, après la séance, c’est court." },
      { text: "Yoga et mobilité : le soir ou le lendemain d’un match, quand les jambes sont lourdes." },
      { text: "La veille d’un match : rien de nouveau, rien d’intense. Mobilité douce et sommeil." },
      { text: "Un jour sans rien par semaine. Le corps progresse quand il récupère." },
    ],
    why: "La fatigue cachée fait plus de blessures que les exercices eux-mêmes. Un plan simple protège : on sait quand on force et quand on récupère.",
    caution: "Pendant une poussée de croissance, douleurs au genou (sous la rotule) ou au talon sont fréquentes : on réduit les sauts, et on en parle à un adulte ou au médecin.",
  },
  // ---------------------------------------------------------------- yoga et mobilité
  {
    id: "yoga-matin",
    category: "yoga",
    title: "Réveil du corps, 10 minutes",
    summary: "Une routine douce du matin ou avant d’aller au club : colonne, hanches, épaules.",
    duration: "10 min",
    durationMin: 10,
    equipment: "Un tapis.",
    frequency: "Tous les jours si tu veux, c’est doux",
    steps: [
      { text: "Chat-vache : à quatre pattes, dos rond en expirant, dos creux en inspirant.", dose: "10 respirations" },
      { text: "Chien tête en bas : mains et pieds au sol, bassin vers le ciel, talons qui cherchent le sol, pédale avec les jambes.", dose: "5 respirations" },
      { text: "Fente basse : un pied devant, genou arrière au sol, bassin vers l’avant, bras vers le ciel.", dose: "5 respirations par côté" },
      { text: "Pigeon doux : jambe avant pliée devant toi, jambe arrière tendue, buste droit puis penché.", dose: "5 respirations par côté" },
      { text: "Torsion allongée : sur le dos, genoux pliés basculés d’un côté, bras en croix, regard de l’autre côté.", dose: "5 respirations par côté" },
      { text: "Assis, respiration lente : inspire 4 temps, expire 6 temps.", dose: "10 cycles" },
    ],
    why: "Le tennis raidit les hanches (position basse) et ferme les épaules (service, raquette devant). Dix minutes de mobilité par jour rendent les gestes plus amples et plus relâchés.",
    caution: "Jamais de douleur vive : on cherche une tension agréable. Sur les étirements, on respire, on ne force pas avec les mains.",
  },
  {
    id: "yoga-hanches-ischios",
    category: "yoga",
    title: "Hanches et ischios après la séance",
    summary: "Le retour au calme qui évite les jambes lourdes du lendemain.",
    duration: "12 min",
    durationMin: 12,
    equipment: "Un tapis, un mur.",
    frequency: "Après chaque entraînement intense ou match",
    steps: [
      { text: "Marche lente 2 min, respiration qui redescend." },
      { text: "Jambes au mur : allongé sur le dos, fesses contre le mur, jambes levées contre le mur.", dose: "2 min" },
      { text: "Étirement des ischios : allongé, une jambe tendue vers le ciel tenue derrière la cuisse, l’autre pliée au sol.", dose: "30 s par côté, 2 fois" },
      { text: "Fessiers : sur le dos, cheville sur le genou opposé, attrape la cuisse et rapproche-la.", dose: "30 s par côté" },
      { text: "Quadriceps : debout ou sur le côté, talon vers la fesse, genoux l’un contre l’autre, bassin droit.", dose: "30 s par côté" },
      { text: "Mollets : mains au mur, jambe arrière tendue, talon au sol.", dose: "30 s par côté" },
      { text: "Papillon : assis, plantes des pieds l’une contre l’autre, dos droit, genoux qui descendent sans forcer.", dose: "1 min" },
    ],
    why: "Les étirements après l’effort se font sur des muscles chauds, en douceur : on garde l’amplitude, on aide la récupération, on dort mieux.",
  },
  {
    id: "yoga-epaules-dos",
    category: "yoga",
    title: "Épaules et haut du dos",
    summary: "Pour un service plus haut et une raquette plus libre derrière la tête.",
    duration: "8 min",
    durationMin: 8,
    equipment: "Un tapis, un mur, un bâton ou une serviette.",
    frequency: "2 à 3 fois par semaine",
    steps: [
      { text: "Enfiler l’aiguille : à quatre pattes, passe un bras sous l’autre, épaule et tempe au sol, dos qui tourne.", dose: "5 respirations par côté" },
      { text: "Ouverture au mur : avant-bras contre le mur, coude à hauteur d’épaule, tourne le buste de l’autre côté.", dose: "30 s par côté" },
      { text: "Passage de bâton : bâton tenu large à deux mains, passe-le devant puis derrière la tête, bras tendus, sans cambrer.", dose: "10 passages lents" },
      { text: "Enfant avec bras tendus : à genoux, fesses sur les talons, bras loin devant, front au sol.", dose: "1 min" },
      { text: "Cobra doux : allongé sur le ventre, mains sous les épaules, décolle la poitrine, bassin au sol.", dose: "5 respirations" },
    ],
    why: "Le lancer de balle, l’armé et la frappe du service demandent des épaules qui s’ouvrent et un haut du dos qui s’étend. Si ça ne vient pas de là, ça vient du bas du dos, et il n’aime pas ça.",
  },
  {
    id: "yoga-respiration-soir",
    category: "yoga",
    title: "Respiration et sommeil",
    summary: "Cinq minutes pour s’endormir plus vite la veille d’un match, ou après une défaite qui tourne dans la tête.",
    duration: "5 min",
    durationMin: 5,
    equipment: "Un lit.",
    frequency: "Le soir, surtout avant un tournoi",
    steps: [
      { text: "Allongé, une main sur le ventre : inspire par le nez en gonflant le ventre, 4 temps." },
      { text: "Expire lentement par la bouche, 6 à 8 temps, comme pour faire trembler une bougie sans l’éteindre." },
      { text: "Dix cycles. Si les pensées reviennent, compte les expirations, c’est tout.", dose: "10 cycles" },
      { text: "Balayage : relâche les pieds, les mollets, les cuisses, le ventre, les épaules, la mâchoire, les yeux, une zone par expiration." },
      { text: "Écrans éteints au moins trente minutes avant. Le match se rejoue demain au carnet, pas ce soir." },
    ],
    why: "Une expiration plus longue que l’inspiration ralentit le cœur et calme le système nerveux. C’est le même outil qu’entre deux points, en version longue.",
  },
  // ---------------------------------------------------------------- méthodes
  {
    id: "meth-une-priorite",
    category: "methodes",
    title: "Une seule priorité à la fois",
    summary: "La méthode qui fait progresser le plus vite : ton maillon faible, trois à quatre semaines, puis le suivant.",
    duration: "Lecture 3 min",
    durationMin: 0,
    equipment: "Un téléphone pour te filmer, ton carnet.",
    steps: [
      { text: "Filme dix minutes d’échanges et un jeu de service. La vidéo montre ce que tu ne sens pas." },
      { text: "Choisis UN point faible, le plus coûteux en match (souvent : seconde balle, revers sous pression, replacement)." },
      { text: "Pendant trois à quatre semaines, chaque séance commence par vingt minutes dessus, avec une consigne simple." },
      { text: "Note dans le carnet, à chaque séance, un axe : toujours le même tant que la priorité ne change pas." },
      { text: "Après un mois, refilme. Compare. Puis passe au maillon suivant, ou renforce ton arme." },
    ],
    why: "Travailler tout en même temps, c’est ne rien changer. Le cerveau automatise un geste à la fois ; un mois de répétitions ciblées vaut six mois de séances « un peu de tout ».",
  },
  {
    id: "meth-semaine",
    category: "methodes",
    title: "Organiser sa semaine avec le lycée ou le collège",
    summary: "Tennis, devoirs, sommeil : les trois tiennent si on les écrit.",
    duration: "Lecture 3 min",
    durationMin: 0,
    equipment: "Un agenda, le dimanche soir.",
    steps: [
      { text: "Le dimanche, pose dans l’agenda : entraînements, matchs, et les devoirs longs. Les trous restants sont pour le renforcement et le repos." },
      { text: "Sommeil : vise 8 à 10 heures par nuit, régulières. C’est la recommandation des sociétés de médecine du sommeil pour les 13-18 ans, et c’est là que le geste s’enregistre." },
      { text: "Le sac de tennis se prépare la veille : raquettes, cordage vérifié, balles, eau, collation, tenue de rechange." },
      { text: "Devoirs avant l’entraînement quand c’est possible : après, la tête est vide et le lit attire." },
      { text: "Un soir par semaine sans tennis, sans écran de match : amis, lecture, rien. C’est de l’entraînement aussi." },
    ],
    why: "La fatigue scolaire et la fatigue sportive s’additionnent. Un joueur reposé apprend plus vite et se blesse moins ; un emploi du temps écrit enlève la charge de décider chaque jour.",
  },
  {
    id: "meth-carnet",
    category: "methodes",
    title: "Tenir son carnet : trois lignes, dix matchs",
    summary: "Le carnet ne sert pas à écrire, il sert à relire.",
    duration: "2 min par séance",
    durationMin: 0,
    equipment: "Cette application.",
    steps: [
      { text: "Après chaque séance : durée, trois ressentis, un point positif, un axe. Pas plus." },
      { text: "Après chaque match : score, trois chiffres (premières balles, doubles fautes, fautes directes), ce qui a marché, ce qui a déstabilisé, l’attitude mentale." },
      { text: "Tous les dix matchs, relis les fiches d’un coup. Ce qui revient trois fois est ta prochaine priorité." },
      { text: "Montre la relecture à ton entraîneur : dix fiches disent plus qu’une discussion." },
    ],
    why: "La mémoire d’un match est trompeuse : on retient le dernier point. Dix fiches relues ensemble montrent les motifs, et les motifs sont ce qu’on peut entraîner.",
  },
  {
    id: "meth-regarder",
    category: "methodes",
    title: "Apprendre en regardant un match",
    summary: "Regarder un match de pro avec une question, pas seulement pour le spectacle.",
    duration: "Un set",
    durationMin: 0,
    equipment: "Un match à la télé ou en ligne, ton carnet.",
    steps: [
      { text: "Choisis une question avant de regarder : « où sert-il sur balle de break ? », « combien de croisés avant un long de ligne ? », « que fait-il entre les points ? »." },
      { text: "Regarde un set entier avec cette seule question. Note ce que tu vois, pas ce que tu penses." },
      { text: "Compte : sur dix points importants, combien de premières balles sur le revers adverse ? Combien de changements de direction ?" },
      { text: "Essaie une chose observée à ta prochaine séance, et note-la au carnet." },
    ],
    why: "Les pros appliquent les mêmes principes que toi, avec plus de régularité : tout croisé, service + 1, routine entre les points. Les voir en vrai rend le principe évident.",
  },
  {
    id: "meth-charge",
    category: "methodes",
    title: "Gérer la charge et la croissance",
    summary: "Progresser sans se blesser : écouter les signaux, alterner les blocs.",
    duration: "Lecture 3 min",
    durationMin: 0,
    equipment: "Un peu d’honnêteté avec soi-même.",
    steps: [
      { text: "Alterne les blocs : quelques semaines centrées sur l’entraînement, puis quelques semaines de matchs. Les deux à fond en même temps, c’est la blessure." },
      { text: "Signaux à respecter : douleur qui dure plus de deux jours, douleur qui revient au même endroit, fatigue au réveil plusieurs jours de suite." },
      { text: "Pendant une poussée de croissance : les tendons suivent moins vite que les os. On réduit les sauts et les séries de services, on garde la mobilité." },
      { text: "Une douleur, surtout au genou, au talon, au coude ou au bas du dos, se dit à un adulte et, si elle dure, au médecin. Jouer avec, c’est perdre un mois pour gagner une séance." },
    ],
    why: "À ton âge, le corps change vite. Les bons joueurs de 20 ans sont ceux qui n’ont pas passé leurs 15 ans blessés.",
    caution: "Ce tuto ne remplace pas un avis médical. Au doute, on consulte.",
  },
];
