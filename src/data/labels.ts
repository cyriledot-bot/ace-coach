import type { Surface, TournamentType, WorkoutType } from "@/lib/types";

export const WORKOUT_TYPES: Record<WorkoutType, string> = {
  technique: "Technique",
  physique: "Physique",
  tactique: "Tactique",
  match_entrainement: "Match d’entraînement",
};

export const SURFACES: Record<Surface, string> = {
  terre_battue: "Terre battue",
  dur: "Dur",
  gazon: "Gazon",
  moquette: "Moquette",
  indoor: "Indoor",
};

export const TOURNAMENT_TYPES: Record<TournamentType, string> = {
  amical: "Amical",
  entrainement: "Entraînement",
  club: "Match de club",
  tournoi_officiel: "Tournoi officiel",
  championnat: "Championnat par équipes",
};
