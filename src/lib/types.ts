export type QuizCategory = "tactique" | "culture" | "reglement";
export type Difficulty = 1 | 2 | 3;

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  difficulty: Difficulty;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuizAnswer {
  id: string;
  userId: string;
  questionId: string;
  answeredOn: string;
  chosen: number;
  correct: boolean;
  xpEarned: number;
}

export type WorkoutType = "technique" | "physique" | "tactique" | "match_entrainement";
export type Score5 = 1 | 2 | 3 | 4 | 5;

export interface Workout {
  id: string;
  userId: string;
  createdAt: string;
  date: string;
  durationMin: number;
  type: WorkoutType;
  effort: Score5;
  plaisir: Score5;
  concentration: Score5;
  positif: string;
  axe: string;
  notes?: string;
}

export type Surface = "terre_battue" | "dur" | "gazon" | "moquette" | "indoor";
export type TournamentType = "amical" | "entrainement" | "club" | "tournoi_officiel" | "championnat";
export type MatchResult = "victoire" | "defaite" | "abandon";

export interface Match {
  id: string;
  userId: string;
  createdAt: string;
  date: string;
  opponent: string;
  opponentRanking?: string;
  surface: Surface;
  tournamentType: TournamentType;
  result: MatchResult;
  score: string;
  debriefGood: string;
  debriefHard: string;
  debriefMental: string;
  mentalScore: Score5;
  /** Ajouts 16/11 (méthode d'analyse de match) : tous facultatifs, l'historique n'en a pas. */
  firstServePct?: number;
  doubleFaults?: number;
  unforcedErrors?: number;
  planId?: string;
}

/** Plan de match écrit AVANT le match (page Tactique). */
export interface MatchPlan {
  id: string;
  userId: string;
  createdAt: string;
  date: string;
  opponent: string;
  weapon: string;
  opponentWeakness: string;
  planA: string;
  planB: string;
  bigPoints: string;
}

export interface Profile {
  id: string;
  pseudo: string;
  xp: number;
  streakCurrent: number;
  streakBest: number;
  goals: string;
  createdAt: string;
  lastQuizDate?: string;
  ranking?: string;
}

/** Forme exacte de `localStorage["ace-coach:v1"]`. `plans` est absent des anciennes sauvegardes. */
export interface PersistedState {
  profile: Profile;
  quizHistory: QuizAnswer[];
  workouts: Workout[];
  matches: Match[];
  badges: string[];
  plans?: MatchPlan[];
}
