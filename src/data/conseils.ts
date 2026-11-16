export type TipCategory = "tactique" | "mental" | "nutrition";
export interface Tip { id: string; category: TipCategory; title: string; summary: string; points: string[] }

export type ExerciseCategory = "echauffement" | "prevention" | "mental_avant" | "mental_pendant";
export interface Exercise { id: string; category: ExerciseCategory; title: string; duration: string; steps: string[]; why: string }

export const TIP_CATEGORIES: Record<TipCategory, string> = {
  tactique: "Tactique",
  mental: "Mental",
  nutrition: "Nutrition et hydratation",
};

export const EXERCISE_CATEGORIES: Record<ExerciseCategory, string> = {
  echauffement: "Échauffement",
  prevention: "Prévention des blessures",
  mental_avant: "Mental : avant le match",
  mental_pendant: "Mental : pendant le match",
};

/** Contenu de la version du 25/10, repris à l'identique. */
export const TIPS: Tip[] = [
  {
    id: "tip-rameur",
    category: "tactique",
    title: "Jouer contre un rameur",
    summary: "Il renvoie tout depuis le fond et attend ta faute. Ne joue pas son match.",
    points: [
      "Varie les hauteurs et les vitesses : slice bas, balle liftée haute, balle courte.",
      "Fais-le avancer avec une amortie ou une balle courte, puis joue derrière lui ou monte au filet.",
      "Accepte des échanges longs sur les points sans importance, prends des risques calculés sur les tiens.",
      "Reste patient : il gagne le jour où tu t’énerves.",
    ],
  },
  {
    id: "tip-attaquant",
    category: "tactique",
    title: "Jouer contre un gros frappeur",
    summary: "Il veut des balles à hauteur de hanche, rapides, à frapper fort. Prive-le de rythme.",
    points: [
      "Joue haut et profond en lift pour le faire reculer ; une balle haute se frappe mal.",
      "Alterne avec des slices bas qui l’obligent à relever la balle.",
      "Mets beaucoup de premières balles : il adore les secondes.",
      "Garde une bonne distance à la balle et absorbe la vitesse plutôt que d’en rajouter.",
    ],
  },
  {
    id: "tip-gaucher",
    category: "tactique",
    title: "Jouer contre un gaucher",
    summary: "Son service slicé côté avantage t’emmène hors du court sur ton revers.",
    points: [
      "Côté avantage, décale-toi un peu vers ta gauche au retour et attends le slice vers l’extérieur.",
      "Son coup droit croisé arrive sur ton revers : prépare-toi à le jouer long de ligne pour renverser l’échange.",
      "Attaque son revers (ton côté coup droit croisé) comme contre un droitier tu attaquerais le revers.",
    ],
  },
  {
    id: "tip-30-40",
    category: "mental",
    title: "Gérer la pression à 30-40",
    summary: "Balle de break contre toi : le point le plus fréquent où l’on « se contracte ».",
    points: [
      "Prends ton temps : routine complète, souffle long avant le lancer.",
      "Décide d’UNE chose simple : première balle avec effet sur le coup faible.",
      "Joue le point avec tes jambes : les pieds actifs empêchent le bras de se crisper.",
      "Si tu perds le point, c’est un jeu, pas le match : marche, respire, plan suivant.",
    ],
  },
  {
    id: "tip-mener",
    category: "mental",
    title: "Mener au score sans se relâcher",
    summary: "À 5-2, le danger n’est pas l’adversaire, c’est toi qui changes de jeu.",
    points: [
      "Continue exactement ce qui t’a amené là.",
      "Joue chaque point comme s’il était à 2-2.",
      "Ne regarde pas le tableau de score ; regarde la balle et ton plan.",
    ],
  },
  {
    id: "tip-remonter",
    category: "mental",
    title: "Revenir quand on est mené",
    summary: "Mené 1-4, le match n’est pas perdu, mais il faut changer quelque chose.",
    points: [
      "Pose-toi une question au changement de côté : qu’est-ce qui me fait perdre les points ? Trouve une réponse simple.",
      "Essaie une variation (monter au filet, jouer plus haut, viser le revers) sur deux jeux.",
      "Gagne d’abord ton jeu de service : un seul break suffit à revenir.",
      "Garde une attitude de vainqueur : l’adversaire la voit.",
    ],
  },
  {
    id: "tip-nutrition-jour-match",
    category: "nutrition",
    title: "Manger le jour d’un match",
    summary: "L’énergie du match se prépare la veille et au petit-déjeuner, pas sur le court.",
    points: [
      "Dernier vrai repas environ trois heures avant : féculents (pâtes, riz, pain), un peu de protéines, peu de gras et de fibres.",
      "Évite de tester un aliment nouveau le jour du match.",
      "Collation facile à digérer pendant le match : banane, pâte de fruits, barre de céréales, aux changements de côté.",
      "Après le match, dans l’heure : glucides et protéines pour récupérer (sandwich, yaourt, fruit).",
    ],
  },
  {
    id: "tip-hydratation",
    category: "nutrition",
    title: "Boire avant, pendant, après",
    summary: "La soif arrive après la déshydratation : bois avant d’avoir soif.",
    points: [
      "Commence à boire régulièrement dès le matin du match.",
      "Quelques gorgées à chaque changement de côté, même sans soif ; plus s’il fait chaud.",
      "Par forte chaleur ou match long, une boisson avec un peu de sucre et de sel aide à tenir.",
      "Urine claire = bonne hydratation ; foncée = bois davantage.",
    ],
  },
  {
    id: "tip-sommeil",
    category: "nutrition",
    title: "Dormir pour progresser",
    summary: "Le sommeil est la séance d’entraînement invisible : c’est là que le corps et la mémoire des gestes récupèrent.",
    points: [
      "Vise des nuits régulières, surtout les deux nuits avant un tournoi.",
      "Écrans éteints au moins trente minutes avant de dormir.",
      "Une mauvaise nuit la veille d’un match n’est pas grave si les nuits d’avant étaient bonnes.",
    ],
  },
];

export const EXERCISES: Exercise[] = [
  {
    id: "ech-01",
    category: "echauffement",
    title: "Activation cardio",
    duration: "3 à 4 min",
    steps: [
      "Trottiner autour du court",
      "Montées de genoux, talons-fesses",
      "Pas chassés dans les deux sens",
      "Course arrière légère",
    ],
    why: "Faire monter la température du corps et le rythme cardiaque avant de solliciter les articulations.",
  },
  {
    id: "ech-02",
    category: "echauffement",
    title: "Mobilité articulaire",
    duration: "3 min",
    steps: [
      "Cercles de bras, avant puis arrière",
      "Rotations du buste, bras tendus",
      "Cercles de hanches et de chevilles",
      "Fentes avant avec rotation du tronc",
    ],
    why: "Préparer épaules, hanches et chevilles aux amplitudes du service et des déplacements.",
  },
  {
    id: "ech-03",
    category: "echauffement",
    title: "Gammes avec raquette",
    duration: "5 min",
    steps: [
      "Mini-tennis dans les carrés de service, en contrôle",
      "Reculer progressivement jusqu’à la ligne de fond",
      "Quelques volées, quelques smashs",
      "Services à vitesse croissante",
    ],
    why: "Retrouver la sensation de balle et la coordination avant de frapper fort.",
  },
  {
    id: "ech-04",
    category: "echauffement",
    title: "Jambes vives",
    duration: "2 min",
    steps: [
      "Dix sprints courts de 5 m, départ en split-step",
      "Déplacements latéraux avec simulation de coup droit et revers",
      "Trois accélérations vers le filet",
    ],
    why: "Réveiller le système nerveux : les premiers points d’un match se gagnent avec les jambes.",
  },
  {
    id: "pre-01",
    category: "prevention",
    title: "Épaule : coiffe des rotateurs",
    duration: "5 min, 3 fois par semaine",
    steps: [
      "Élastique léger, coude collé au corps : rotations externes, 2 × 15",
      "Rotations internes, 2 × 15",
      "« Y » et « T » bras tendus, penché en avant, 2 × 10",
      "Lent et contrôlé, sans douleur",
    ],
    why: "Le service répété fatigue les petits muscles de l’épaule : les renforcer évite les tendinites.",
  },
  {
    id: "pre-02",
    category: "prevention",
    title: "Gainage du tronc",
    duration: "6 min",
    steps: [
      "Planche face : 3 × 30 s",
      "Planche latérale de chaque côté : 2 × 20 s",
      "Dead bug : 2 × 10 par côté",
      "Respirer normalement, bassin stable",
    ],
    why: "Un tronc solide transmet la force des jambes vers la raquette et protège le bas du dos.",
  },
  {
    id: "pre-03",
    category: "prevention",
    title: "Chevilles et genoux",
    duration: "4 min",
    steps: [
      "Équilibre sur une jambe, yeux ouverts puis fermés : 2 × 30 s",
      "Sauts latéraux pieds joints par-dessus une ligne : 3 × 20 s",
      "Réceptions de saut en amorti, genoux dans l’axe des pieds",
    ],
    why: "Les changements de direction sollicitent chevilles et genoux : la stabilité se travaille.",
  },
  {
    id: "pre-04",
    category: "prevention",
    title: "Retour au calme et étirements",
    duration: "5 min après la séance",
    steps: [
      "Marche lente 1 à 2 min",
      "Étirements doux : mollets, ischios, quadriceps, fessiers, 20 à 30 s chacun",
      "Épaule : bras croisé devant la poitrine, 20 s de chaque côté",
      "Boire et manger quelque chose dans l’heure",
    ],
    why: "Le retour au calme aide la récupération ; les étirements se font sans forcer, jamais à froid.",
  },
  {
    id: "men-01",
    category: "mental_avant",
    title: "Respiration 4-6",
    duration: "2 min",
    steps: [
      "Assis ou debout, épaules relâchées",
      "Inspire par le nez sur 4 temps",
      "Expire lentement par la bouche sur 6 temps",
      "Dix cycles ; l’expiration plus longue calme le rythme cardiaque",
    ],
    why: "Avant un match ou un point important, l’expiration longue fait redescendre la tension.",
  },
  {
    id: "men-02",
    category: "mental_avant",
    title: "Plan de match en trois phrases",
    duration: "3 min, la veille ou dans le vestiaire",
    steps: [
      "« Mon point fort à imposer : … »",
      "« Le coup faible de l’adversaire à viser : … »",
      "« Ce que je fais sur les points importants : … »",
      "Relire ces trois phrases à chaque changement de côté",
    ],
    why: "Un plan simple et écrit évite de réfléchir à tout sous pression.",
  },
  {
    id: "men-03",
    category: "mental_avant",
    title: "Visualisation du premier jeu",
    duration: "2 min",
    steps: [
      "Ferme les yeux, imagine le court, le bruit de la balle",
      "Vois-toi servir ton premier point : lancer, frappe, placement",
      "Vois-toi gagner un échange avec ton coup fort",
      "Ouvre les yeux, secoue les jambes, c’est parti",
    ],
    why: "Le cerveau prépare les gestes qu’il a imaginés ; l’entrée en match est plus fluide.",
  },
  {
    id: "men-04",
    category: "mental_pendant",
    title: "Routine au service",
    duration: "Avant chaque première balle",
    steps: [
      "Dos à l’adversaire une seconde, souffle long",
      "Décide : zone et effet, une seule intention",
      "Place les pieds, rebondis la balle toujours le même nombre de fois",
      "Lancer, frappe, et joue le point",
    ],
    why: "La routine rend le service identique à 0-0 et à 30-40 : c’est elle qui tient sous pression.",
  },
  {
    id: "men-05",
    category: "mental_pendant",
    title: "Routine au retour",
    duration: "Avant chaque retour",
    steps: [
      "Regarde le lancer de balle adverse, pas le serveur",
      "Choisis ta position (avancée sur seconde balle)",
      "Split-step au moment de la frappe",
      "Première intention : retour profond au centre si rien de mieux",
    ],
    why: "Le split-step et une intention simple font gagner le temps qui manque sur les gros services.",
  },
  {
    id: "men-06",
    category: "mental_pendant",
    title: "Les 15 secondes entre deux points",
    duration: "Après chaque point",
    steps: [
      "Réaction : poing serré sur un bon point, cordage vers les yeux sur un mauvais, pas de commentaire",
      "Relâchement : marche vers le fond, respire, épaules basses",
      "Préparation : décide du point suivant",
      "Rituel : rebonds de balle, et c’est reparti",
    ],
    why: "Entre les points, ce que tu fais de ton corps décide de ce que fera ta tête au point suivant.",
  },
  {
    id: "men-07",
    category: "mental_pendant",
    title: "Changement de côté utile",
    duration: "90 secondes",
    steps: [
      "Assieds-toi, serviette, boisson : d’abord le corps",
      "Une phrase sur ce qui marche, une sur ce qui est à changer",
      "Relis ton plan en trois phrases",
      "Lève-toi avant la fin du temps, prêt à jouer",
    ],
    why: "Le changement de côté sert à récupérer et à décider, pas à refaire le match dans sa tête.",
  },
];
