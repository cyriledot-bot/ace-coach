/**
 * Section Tactique — principes, schémas et méthode d'analyse.
 *
 * Inspiration : les articles du blog Sam Tennis (sam-tennis.com), notamment
 * « Comment gagner un match de tennis : 8 principes tactiques et mentaux »,
 * « Comment construire un point : les patterns tactiques gagnants »,
 * « Comment analyser son match pour progresser », « La routine entre les
 * points », « Comment gérer la pression », « Comment progresser au tennis »
 * et le guide « de 30/5 à 15 ». Les textes ci-dessous sont des reformulations
 * pour un joueur de 13-17 ans ; les chiffres avancés par ces articles ne sont
 * pas repris, faute de source vérifiable.
 */

export const SOURCE_TACTIQUE = {
  nom: "Sam Tennis",
  url: "https://www.sam-tennis.com/fr/blog",
  note: "Principes librement adaptés des articles du blog Sam Tennis. Les chiffres publiés là-bas ne sont pas repris ici.",
};

export interface Principle {
  id: string;
  title: string;
  /** La règle en une phrase, à retenir. */
  rule: string;
  /** Pourquoi ça marche, en deux ou trois phrases. */
  why: string;
  /** Ce que ça donne concrètement sur le court. */
  onCourt: string[];
  /** Identifiant de la question du quiz qui révise ce principe, s'il y en a une. */
  quizId?: string;
}

export const PRINCIPLES: Principle[] = [
  {
    id: "une-balle-de-plus",
    title: "Une balle de plus",
    rule: "À ton niveau, le match se gagne en faisant moins de fautes, pas plus de coups gagnants.",
    why: "La plupart des points en match de jeunes et de club se terminent par une faute directe. Celui qui remet une balle de plus oblige l’autre à prendre le risque, et c’est lui qui craque.",
    onCourt: [
      "Cible : un mètre à l’intérieur des lignes, un mètre au-dessus du filet.",
      "Sur les deux premiers coups de l’échange, zéro faute gratuite.",
      "Tu ne « joues petit » pas : tu joues long, haut et au centre, avec des jambes actives.",
    ],
    quizId: "tac-14",
  },
  {
    id: "point-faible",
    title: "Trouve son point faible, garde-le pour les points qui comptent",
    rule: "Dès l’échauffement, repère UN point faible. Vise-le sur les points importants, pas sur tous.",
    why: "Presque tout le monde a un côté qu’il protège, en général le revers, ou une balle qu’il n’aime pas : haute, courte, slicée. Viser ce point tout le temps l’habitue ; le viser à 30-30 ou sur balle de break fait basculer le jeu.",
    onCourt: [
      "Échauffement : regarde quel côté il contourne, s’il recule sur les balles hautes, s’il tape faux en avançant.",
      "Note-le dans ton plan de match (en bas de cette page).",
      "Moments importants : service sur ce côté, puis le « +1 » dans l’espace libre.",
    ],
    quizId: "tac-16",
  },
  {
    id: "service-plus-un",
    title: "Service + 1",
    rule: "Décide la zone du service ET le coup suivant avant de lancer la balle.",
    why: "La zone de ton service décide de la balle que tu vas recevoir. Un slice vers l’extérieur ramène souvent un retour court au centre ; un service au corps ramène une balle molle au milieu. Si tu sais ce qui arrive, ton deuxième coup est déjà prêt.",
    onCourt: [
      "Côté égalité : slice extérieur, puis coup droit dans l’espace libre.",
      "Côté avantage : service sur le revers (ou kick au-dessus de l’épaule), puis coup droit croisé.",
      "Sur ton jeu de service, tu dois gagner plus d’un point sur deux derrière ta première balle, sinon le plan n’existe pas : baisse la vitesse, monte le pourcentage.",
    ],
    quizId: "tac-09",
  },
  {
    id: "retour",
    title: "Le retour : d’abord en jeu",
    rule: "Un retour en jeu et profond vaut mieux que trois retours gagnants et sept fautes.",
    why: "Beaucoup de jeux de retour se perdent sur des retours ratés, pas sur des services imparables. Remettre la balle profonde au centre annule l’avantage du serveur ; attaquer, c’est pour la seconde balle.",
    onCourt: [
      "Première balle : geste court, retour profond au centre (le slice aide sur une balle rapide).",
      "Seconde balle : avance d’un pas, prends la balle tôt, retourne profond ou sur son point faible.",
      "Split-step au moment où il frappe, pas avant.",
    ],
    quizId: "tac-15",
  },
  {
    id: "deux-croises-un-long",
    title: "Deux croisés, puis un long de ligne",
    rule: "Les deux premiers coups ouvrent le court, le troisième finit le travail.",
    why: "Croiser deux fois emmène l’adversaire vers le couloir. Une fois qu’il est loin de sa ligne, le long de ligne tombe dans l’espace vide. Jouer long de ligne trop tôt, c’est frapper au-dessus de la partie haute du filet, vers une zone courte, et offrir l’angle croisé à l’adversaire.",
    onCourt: [
      "Long de ligne seulement si tu as les deux pieds dans le court ou si sa balle est courte.",
      "Exercice : cinq croisés d’affilée, long de ligne sur la sixième balle (un plot comme cible).",
      "Sans espace ouvert, un troisième croisé est le bon choix : patience.",
    ],
    quizId: "tac-08",
  },
  {
    id: "tout-croise",
    title: "Tout croisé : le schéma de sécurité",
    rule: "Quand tu doutes, croise. La diagonale est plus longue et le filet plus bas au centre.",
    why: "C’est le schéma qui offre le plus de marge et qui fatigue le plus l’adversaire. Tu le gardes jusqu’à sa faute ou jusqu’à une balle très courte que tu attaques en avançant.",
    onCourt: [
      "Coup droit croisé lifté, haut au-dessus du filet, cible à deux mètres de la ligne de fond.",
      "Revers croisé : même idée, même hauteur.",
      "Tu changes de direction seulement sur une balle courte ou avec les pieds dans le court.",
    ],
    quizId: "tac-11",
  },
  {
    id: "haut-et-bombe",
    title: "En difficulté : haut, bombé, au centre",
    rule: "Quand tu es débordé, le but du coup est de rester dans le point, pas de le gagner.",
    why: "Une balle haute et longue au centre met du temps à revenir, laisse peu d’angle à l’adversaire et te donne le temps de te replacer. Frapper fort à plat en courant, c’est la faute presque à coup sûr.",
    onCourt: [
      "Loin derrière la ligne, balle profonde : lift haut, deux à trois mètres au-dessus du filet, au centre.",
      "Replace-toi pendant que la balle vole.",
      "Même réflexe sur une balle qui te surprend dans le mauvais pied.",
    ],
    quizId: "tac-10",
  },
  {
    id: "plan-a-plan-b",
    title: "Un plan A, un plan B, écrits avant",
    rule: "Sans plan, le premier imprévu te fait paniquer. Avec un plan B, tu sais quoi faire même mené.",
    why: "Le plan A, c’est ton arme contre son point faible. Le plan B répond à la question « et s’il contre mon plan A ? ». Exemple : s’il renvoie toutes tes attaques, joue plus haut et plus lent au centre pour casser sa vitesse. Décidé au calme la veille, il s’applique sans réfléchir.",
    onCourt: [
      "Écris les deux plans dans le plan de match ci-dessous, en une phrase chacun.",
      "Donne au plan A deux jeux avant de juger ; au plan B deux jeux aussi.",
      "Au changement de côté, relis tes deux phrases, pas le score.",
    ],
    quizId: "tac-13",
  },
  {
    id: "rameur",
    title: "Contre celui qui renvoie tout",
    rule: "Ne joue pas son match : fais-le monter avec une balle courte, puis lobe ou passe.",
    why: "Le « rameur » gagne les échanges réguliers depuis le fond. Tout ce qui le sort de cette zone (balle courte, slice bas, montée au filet) lui demande un geste qu’il maîtrise moins.",
    onCourt: [
      "Amortie ou balle courte quand il est loin derrière, puis lob s’il monte mal.",
      "Slice bas pour qu’il relève la balle, puis attaque la balle haute qui suit.",
      "Patience sur les points sans importance ; prise de risque calculée sur les tiens.",
    ],
    quizId: "tac-02",
  },
  {
    id: "points-importants",
    title: "Les points importants : plus lent, plus simple",
    rule: "À 30-30, 30-40, 5-5 : prends tes vingt secondes, respire, choisis UNE intention.",
    why: "Sous pression, on accélère et on complique : double faute, long de ligne impossible. La routine (relâcher, récupérer, refocaliser, rituel) ramène le point important au niveau d’un point ordinaire, et c’est exactement ce qu’il faut.",
    onCourt: [
      "Dos à l’adversaire, souffle long, cordage dans la main.",
      "Décide : zone du service, effet, premier coup. Une seule intention.",
      "Même routine point gagné, point perdu : c’est elle qui tient quand le bras tremble.",
    ],
    quizId: "tac-03",
  },
];

/** Dessins de schémas : coordonnées dans un court vu de dessus, 0-100 en largeur, 0-200 en longueur. */
export interface Shot {
  from: [number, number];
  to: [number, number];
  label: string;
  /** Position de l'étiquette le long de la flèche, de 0 (départ) à 1 (arrivée). 0,5 par défaut. */
  at?: number;
}
export interface Pattern {
  id: string;
  title: string;
  caption: string;
  shots: Shot[];
}

/** Moi en bas (y proche de 200), adversaire en haut (y proche de 0). */
export const PATTERNS: Pattern[] = [
  {
    id: "tout-croise",
    title: "Tout croisé",
    caption: "Mes croisés contre ses croisés, haut et long, jusqu’à sa faute ou sa balle courte.",
    shots: [
      { from: [80, 186], to: [24, 22], label: "moi", at: 0.25 },
      { from: [16, 26], to: [72, 190], label: "lui", at: 0.25 },
    ],
  },
  {
    id: "deux-croises-un-long",
    title: "Deux croisés, un long de ligne",
    caption: "Les coups 1 et 2 l’emmènent vers le couloir ; le coup 3 part dans l’espace vide, pieds dans le court.",
    shots: [
      { from: [80, 186], to: [26, 22], label: "1" },
      { from: [66, 172], to: [10, 34], label: "2" },
      { from: [72, 150], to: [84, 14], label: "3" },
    ],
  },
  {
    id: "service-plus-un",
    title: "Service extérieur + 1",
    caption: "Côté égalité : slice vers l’extérieur, retour court au centre, coup droit dans l’espace libre.",
    shots: [
      { from: [58, 198], to: [8, 108], label: "S" },
      { from: [8, 108], to: [50, 150], label: "R" },
      { from: [50, 150], to: [88, 20], label: "+1" },
    ],
  },
];

/** Méthode d'analyse de match : un indicateur, ce qu'il révèle, l'exercice qui le corrige. */
export interface Indicator {
  id: string;
  name: string;
  howToCount: string;
  meaning: string;
  drill: string;
}

export const INDICATORS: Indicator[] = [
  {
    id: "premieres-balles",
    name: "Premières balles en jeu",
    howToCount: "Sur dix services, combien de premières balles sont en jeu ? Note-le en pourcentage dans la fiche match.",
    meaning: "En dessous de six sur dix, tu joues trop de secondes balles sous pression : la vitesse de ta première est trop haute pour ta précision du jour.",
    drill: "Panier de 30 services à 80 % de vitesse, cible le grand carré, compte les réussites. L’objectif est le pourcentage, pas l’ace.",
  },
  {
    id: "doubles-fautes",
    name: "Doubles fautes",
    howToCount: "Compte-les par set, c’est facile et ça ne ment pas.",
    meaning: "Plus de deux par set, c’est un point donné sur chacun de tes jeux : ta seconde balle manque de lift ou de routine.",
    drill: "Vingt minutes par séance seulement sur la seconde balle : kick ou slice, cible haute au-dessus du filet, même rituel à chaque fois.",
  },
  {
    id: "fautes-directes",
    name: "Fautes directes contre points provoqués",
    howToCount: "Estime tes fautes directes par set. En face, compte les fois où tu as forcé l’adversaire à jouer en bout de course, pas tes coups gagnants.",
    meaning: "Si tes fautes directes dépassent largement tes gagnants plus tes balles provoquées, tu prends plus de risques que ton contrôle ne le permet.",
    drill: "Échanges de vingt frappes sans faute avec un partenaire, puis quarante. La régularité se compte, elle ne se devine pas.",
  },
  {
    id: "seconde-balle",
    name: "Points gagnés derrière ta seconde balle",
    howToCount: "Sur tes secondes balles, combien de points as-tu gagnés ? Un sur deux est un bon chiffre.",
    meaning: "C’est le chiffre qui dit ton vrai niveau : sans l’aide du service, que vaut ton jeu de fond et ta tête ?",
    drill: "Jeux joués uniquement avec une seconde balle, le point commence vraiment au retour : tu apprends à jouer derrière.",
  },
  {
    id: "balles-de-break",
    name: "Balles de break converties",
    howToCount: "Nombre de balles de break obtenues, nombre gagnées.",
    meaning: "En convertir peu est souvent un signe mental : précipitation ou crispation sur le point qui compte, plus qu’un problème de coup.",
    drill: "Points joués à 30-40 fictif à l’entraînement, avec la routine complète avant chaque point. Le corps doit reconnaître la situation.",
  },
];

export const ANALYSE_METHODE = {
  title: "Après chaque match : trois chiffres, une note, un exercice",
  steps: [
    "Dans la fiche match, note trois chiffres : premières balles en jeu (%), doubles fautes, fautes directes (estimation par set).",
    "Note chaque secteur de 1 à 5 : service, retour, fond de court, filet, mental. La fiche demande déjà la note mentale.",
    "Choisis UN indicateur à améliorer et l’exercice qui va avec, dans la table ci-dessus. Un seul.",
    "Après dix matchs, relis tes fiches : les motifs qui reviennent sont ta feuille de route pour l’entraînement.",
  ],
};

export const PROGRESSION = {
  title: "Progresser : une seule priorité à la fois",
  points: [
    "Identifie ton maillon le plus faible (filme-toi dix minutes : la vidéo ne discute pas) et consacre-lui l’essentiel de tes séances pendant trois à quatre semaines. Puis passe au suivant.",
    "Compte les répétitions de qualité, pas les heures : cinquante services avec une intention valent plus que deux cents à la chaîne.",
    "Alterne des blocs : quelques semaines d’entraînement, puis quelques semaines de matchs. Le corps et la tête ont besoin des deux, pas en même temps.",
    "Quand ton jeu est posé, renforce aussi ton arme : on monte en devenant injouable sur un coup, pas seulement en gommant ses défauts.",
  ],
};
