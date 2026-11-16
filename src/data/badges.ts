import type { Match, MatchPlan, Profile, QuizAnswer, Workout } from "@/lib/types";

export interface BadgeState {
  profile: Profile;
  quizHistory: QuizAnswer[];
  workouts: Workout[];
  matches: Match[];
  plans: MatchPlan[];
}

export interface BadgeDef {
  code: string;
  name: string;
  description: string;
  icon: string;
  check: (s: BadgeState) => boolean;
}

/** Plus longue suite de bonnes réponses, dans l'ordre des jours. */
export function longestCorrectStreak(history: QuizAnswer[]): number {
  const sorted = [...history].sort((a, b) => a.answeredOn.localeCompare(b.answeredOn));
  let best = 0;
  let run = 0;
  for (const h of sorted) {
    run = h.correct ? run + 1 : 0;
    if (run > best) best = run;
  }
  return best;
}

const correctIn = (history: QuizAnswer[], prefix: string) =>
  history.filter((h) => h.correct && h.questionId.startsWith(prefix)).length;

/** Les 14 premiers badges sont ceux du 25/10 (codes inchangés : ils sont stockés). */
export const BADGES: BadgeDef[] = [
  { code: "premier-quiz", name: "Premier service", description: "Répondre à ton premier quiz du jour.", icon: "🎾", check: (s) => s.quizHistory.length >= 1 },
  { code: "serie-3", name: "Trois de suite", description: "Trois jours de quiz consécutifs.", icon: "🔥", check: (s) => s.profile.streakBest >= 3 },
  { code: "serie-7", name: "Semaine parfaite", description: "Sept jours de quiz consécutifs.", icon: "⚡", check: (s) => s.profile.streakBest >= 7 },
  { code: "serie-30", name: "Marathonien", description: "Trente jours de quiz consécutifs.", icon: "🏆", check: (s) => s.profile.streakBest >= 30 },
  { code: "sans-faute-5", name: "Cinq sur cinq", description: "Cinq bonnes réponses de suite au quiz.", icon: "🎯", check: (s) => longestCorrectStreak(s.quizHistory) >= 5 },
  { code: "tacticien", name: "Tacticien", description: "Cinq bonnes réponses en tactique.", icon: "🧠", check: (s) => correctIn(s.quizHistory, "tac-") >= 5 },
  { code: "arbitre", name: "Arbitre de chaise", description: "Cinq bonnes réponses en règlement.", icon: "⚖️", check: (s) => correctIn(s.quizHistory, "reg-") >= 5 },
  { code: "premiere-seance", name: "Carnet ouvert", description: "Première séance notée dans le carnet.", icon: "📓", check: (s) => s.workouts.length >= 1 },
  { code: "dix-seances", name: "Dix séances", description: "Dix séances dans le carnet.", icon: "💪", check: (s) => s.workouts.length >= 10 },
  { code: "dix-heures", name: "Dix heures sur le court", description: "Dix heures d’entraînement cumulées.", icon: "⏱️", check: (s) => s.workouts.reduce((t, w) => t + w.durationMin, 0) >= 600 },
  { code: "premier-match", name: "Premier match", description: "Première fiche match remplie, avec son débrief.", icon: "🏟️", check: (s) => s.matches.length >= 1 },
  { code: "premiere-victoire", name: "Première victoire", description: "Une victoire notée dans tes fiches match.", icon: "🥇", check: (s) => s.matches.some((m) => m.result === "victoire") },
  { code: "tete-froide", name: "Tête froide", description: "Une défaite avec une attitude mentale notée 4 ou 5.", icon: "🧊", check: (s) => s.matches.some((m) => m.result === "defaite" && m.mentalScore >= 4) },
  { code: "xp-1000", name: "Mille XP", description: "Mille points d’expérience cumulés.", icon: "🌟", check: (s) => s.profile.xp >= 1000 },
  // Ajouts du 16/11.
  { code: "premier-plan", name: "Plan de match", description: "Un plan de match écrit avant de jouer.", icon: "📋", check: (s) => s.plans.length >= 1 },
  { code: "athlete-5", name: "Athlète", description: "Cinq séances physiques (renforcement, yoga, mobilité) notées au carnet.", icon: "🏋️", check: (s) => s.workouts.filter((w) => w.type === "physique").length >= 5 },
  { code: "analyste", name: "Analyste", description: "Trois fiches match avec le pourcentage de premières balles renseigné.", icon: "📊", check: (s) => s.matches.filter((m) => typeof m.firstServePct === "number").length >= 3 },
];

export function newlyUnlocked(state: BadgeState, already: string[]): string[] {
  return BADGES.filter((b) => !already.includes(b.code) && b.check(state)).map((b) => b.code);
}
