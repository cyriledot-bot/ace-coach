import type { QuizCategory, QuizQuestion } from "@/lib/types";
import { QUESTIONS_ORIGINALES } from "./questions.originales";

export { QUESTIONS_ORIGINALES };

export const QUIZ_CATEGORIES: Record<QuizCategory, string> = {
  tactique: "Tactique",
  culture: "Culture tennis",
  reglement: "Règlement et arbitrage",
};

/** XP par réponse : bonne selon la difficulté, mauvaise 5 (on a appris quelque chose). */
export const XP_QUIZ = { bonne: { 1: 20, 2: 30, 3: 45 } as Record<1 | 2 | 3, number>, mauvaise: 5 };

/**
 * Questions ajoutées le 16/11, en appui de la section Tactique. Chaque
 * question reprend un principe de src/data/tactique.ts : le quiz révise
 * ce que la page explique.
 */
export const QUESTIONS_TACTIQUE_2026_11: QuizQuestion[] = [
  {
    id: "tac-08",
    category: "tactique",
    difficulty: 2,
    question: "Tu joues le schéma « deux croisés, puis un long de ligne ». À quel moment le long de ligne est-il une bonne idée ?",
    options: [
      "Dès le premier coup, pour surprendre",
      "Quand tu as les deux pieds dans le court ou que la balle adverse est courte, et que l’adversaire est déjà sorti du terrain",
      "Quand tu es loin derrière ta ligne de fond",
      "Jamais, le long de ligne est réservé aux pros",
    ],
    answer: 1,
    explanation: "Les deux croisés servent à ouvrir le court : ils déplacent l’adversaire vers le couloir. Le long de ligne n’est rentable que quand l’espace est ouvert et que tu frappes en avançant, sinon il passe au-dessus de la partie haute du filet, vers une zone plus courte, avec plus de fautes.",
  },
  {
    id: "tac-09",
    category: "tactique",
    difficulty: 2,
    question: "« Service + 1 » : tu sers slicé vers l’extérieur côté égalité. Que prépares-tu avant même de voir le retour ?",
    options: [
      "Rien, tu attends de voir",
      "Une amortie",
      "Une montée au filet systématique",
      "Un coup droit dans l’espace libre ou à contre-pied, car le retour a de bonnes chances d’arriver court ou au centre",
    ],
    answer: 3,
    explanation: "Choisir la zone du service, c’est choisir la balle que tu vas probablement recevoir. Un slice sortant emmène le relanceur hors du court : son retour revient souvent court ou au centre, et ton « +1 » est prêt : coup droit dans l’espace ouvert, ou contre-pied s’il court déjà pour se replacer.",
  },
  {
    id: "tac-10",
    category: "tactique",
    difficulty: 1,
    question: "Tu es en difficulté, très loin derrière ta ligne, sur une balle profonde. Quel coup te remet dans le point ?",
    options: [
      "Une balle haute et bombée, longue, au centre, le temps de te replacer",
      "Une frappe à plat le plus fort possible",
      "Une amortie",
      "Un long de ligne court",
    ],
    answer: 0,
    explanation: "Quand tu es dépassé, le but du coup n’est plus de gagner le point mais de rester dedans. Haut et bombé, long, au centre : la balle met du temps à revenir, l’angle offert à l’adversaire est petit, et tes jambes ont le temps de revenir au milieu.",
  },
  {
    id: "tac-11",
    category: "tactique",
    difficulty: 1,
    question: "Pourquoi « tout croisé » est-il le schéma le plus sûr pour un joueur qui débute en match ?",
    options: [
      "Parce que l’adversaire ne s’y attend pas",
      "Parce que la diagonale est plus longue et que le filet est plus bas au centre : plus de marge, moins de fautes",
      "Parce que c’est le coup le plus puissant",
      "Parce que l’arbitre l’impose",
    ],
    answer: 1,
    explanation: "La diagonale mesure plus que la ligne droite, et le filet est plus bas en son centre que sur les côtés : croiser, c’est frapper avec le plus de marge possible. L’adversaire fatigue à courir, toi tu attends la balle courte ou sa faute.",
  },
  {
    id: "tac-12",
    category: "tactique",
    difficulty: 3,
    question: "Après un match, tu veux UN chiffre qui dit ton vrai niveau. Lequel ?",
    options: [
      "Le nombre d’aces",
      "Le nombre de coups gagnants",
      "Le pourcentage de points gagnés derrière ta seconde balle",
      "La durée du match",
    ],
    answer: 2,
    explanation: "Sur seconde balle, tu n’as plus l’aide du service : ce que tu gagnes derrière, c’est ton jeu de fond, ton retour de pression et ta tête. Les gagnants flattent ; ce chiffre-là ne ment pas. Dans la fiche match, note aussi tes premières balles et tes doubles fautes.",
  },
  {
    id: "tac-13",
    category: "tactique",
    difficulty: 2,
    question: "Ton plan A (attaquer vite) ne marche pas : l’adversaire contre toutes tes attaques. Quel plan B simple essayer sur deux jeux ?",
    options: [
      "Attaquer encore plus vite",
      "Jouer plus haut et plus lent, au centre, pour lui retirer la vitesse dont il se sert",
      "Changer de raquette",
      "Servir uniquement des secondes balles",
    ],
    answer: 1,
    explanation: "Un contreur se nourrit de ta vitesse. Plus haut, plus lent, au centre : il doit produire lui-même la puissance et n’a plus d’angle. Le plan B se décide AVANT le match, au calme ; en match, on l’applique sur deux jeux avant de juger.",
  },
  {
    id: "tac-14",
    category: "tactique",
    difficulty: 2,
    question: "Dans ton débrief, tes fautes directes dépassent largement tes coups gagnants et les fautes que tu as provoquées. Que dit ce chiffre ?",
    options: [
      "Que tu n’as pas eu de chance",
      "Que tu dois frapper plus fort",
      "Que l’adversaire était trop fort",
      "Que tu prends plus de risques que ton contrôle ne le permet : vise plus de marge, une balle de plus",
    ],
    answer: 3,
    explanation: "Une faute directe est un point offert. Quand elles dominent le compte, le niveau de risque est trop haut pour ton niveau de contrôle du jour : plus de hauteur au-dessus du filet, des cibles plus loin des lignes, et l’adversaire doit gagner le point lui-même.",
  },
  {
    id: "tac-15",
    category: "tactique",
    difficulty: 2,
    question: "Ton adversaire sert-volleye sur chaque première balle. Quel retour te donne le plus de chances ?",
    options: [
      "Un retour gagnant tenté à chaque fois",
      "Un retour bas, vers ses pieds, remis en jeu le plus vite possible : qu’il volleye en dessous du filet",
      "Un lob sur chaque retour",
      "Reculer de trois mètres pour avoir du temps",
    ],
    answer: 1,
    explanation: "Le volleyeur veut une balle haute à punir. Bas, aux pieds, geste court (le slice aide), tu l’obliges à relever sa volée. Le lob est une variation, pas un plan ; le retour gagnant systématique coûte trop de fautes.",
  },
  {
    id: "tac-16",
    category: "tactique",
    difficulty: 1,
    question: "Pendant l’échauffement d’avant-match, à quoi sert surtout de bien regarder ton adversaire ?",
    options: [
      "À l’intimider",
      "À copier sa technique",
      "À repérer son point faible (souvent un côté) pour le viser aux moments importants",
      "À rien, l’échauffement c’est pour soi",
    ],
    answer: 2,
    explanation: "Cinq minutes de balles suffisent à voir quel côté il protège, s’il recule sur les balles hautes, s’il n’aime pas monter. Tu notes UN point faible et tu le gardes pour les points qui comptent : balle de break, 30-30, début de set.",
  },
];

export const QUESTIONS: QuizQuestion[] = [...QUESTIONS_ORIGINALES, ...QUESTIONS_TACTIQUE_2026_11];
