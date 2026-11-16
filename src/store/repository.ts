import type { Match, MatchPlan, PersistedState, Profile, QuizAnswer, Workout } from "@/lib/types";

/** Clé de stockage inchangée depuis la version du 25/10 : les données existantes sont relues telles quelles. */
export const STORAGE_KEY = "ace-coach:v1";
export const LOCAL_USER_ID = "local";

export function emptyProfile(id: string): Profile {
  return { id, pseudo: "Joueur", xp: 0, streakCurrent: 0, streakBest: 0, goals: "", createdAt: new Date().toISOString() };
}

function emptyState(): PersistedState {
  return { profile: emptyProfile(LOCAL_USER_ID), quizHistory: [], workouts: [], matches: [], badges: [], plans: [] };
}

export function readState(storage: Storage = localStorage): PersistedState {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedState;
      // `plans` n'existe pas dans les sauvegardes antérieures au 16/11.
      return { ...parsed, plans: parsed.plans ?? [] };
    }
  } catch {
    /* stockage indisponible ou illisible : on repart propre, sans écraser */
  }
  return emptyState();
}

function writeState(state: PersistedState, storage: Storage = localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota ou navigation privée : l'app reste utilisable en mémoire */
  }
}

/**
 * Dépôt local. Même interface que la version du 25/10 (`kind: "local"`),
 * avec les plans de match en plus. Toute écriture ré-enregistre l'état entier.
 */
export class LocalRepository {
  readonly kind = "local" as const;
  private state: PersistedState;

  constructor(private readonly storage: Storage = localStorage) {
    this.state = readState(storage);
  }

  async loadAll(): Promise<PersistedState> {
    this.state = readState(this.storage);
    return { ...this.state };
  }
  async saveProfile(profile: Profile) {
    this.state.profile = profile;
    this.persist();
  }
  async addQuizAnswer(answer: QuizAnswer) {
    this.state.quizHistory = [...this.state.quizHistory.filter((a) => a.answeredOn !== answer.answeredOn), answer];
    this.persist();
  }
  async addWorkout(w: Workout) {
    this.state.workouts = [w, ...this.state.workouts];
    this.persist();
  }
  async deleteWorkout(id: string) {
    this.state.workouts = this.state.workouts.filter((w) => w.id !== id);
    this.persist();
  }
  async addMatch(m: Match) {
    this.state.matches = [m, ...this.state.matches];
    this.persist();
  }
  async deleteMatch(id: string) {
    this.state.matches = this.state.matches.filter((m) => m.id !== id);
    this.persist();
  }
  async addPlan(p: MatchPlan) {
    this.state.plans = [p, ...(this.state.plans ?? [])];
    this.persist();
  }
  async deletePlan(id: string) {
    this.state.plans = (this.state.plans ?? []).filter((p) => p.id !== id);
    this.persist();
  }
  async unlockBadges(codes: string[]) {
    this.state.badges = Array.from(new Set([...this.state.badges, ...codes]));
    this.persist();
  }
  private persist() {
    writeState(this.state, this.storage);
  }
}
