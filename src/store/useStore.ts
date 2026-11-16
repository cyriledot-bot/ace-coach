import { create } from "zustand";
import type { Match, MatchPlan, Profile, QuizAnswer, Workout } from "@/lib/types";
import { daysBetween, newId, todayKey } from "@/lib/utils";
import { QUESTIONS, XP_QUIZ } from "@/data/questions";
import { newlyUnlocked } from "@/data/badges";
import { LocalRepository, emptyProfile, LOCAL_USER_ID } from "./repository";

export const XP_WORKOUT = 10;
export const XP_MATCH = 25;
export const XP_PLAN = 10;

type NewWorkout = Omit<Workout, "id" | "userId" | "createdAt">;
type NewMatch = Omit<Match, "id" | "userId" | "createdAt">;
type NewPlan = Omit<MatchPlan, "id" | "userId" | "createdAt">;

export interface AppState {
  ready: boolean;
  repoKind: "local";
  profile: Profile;
  quizHistory: QuizAnswer[];
  workouts: Workout[];
  matches: Match[];
  plans: MatchPlan[];
  badges: string[];
  freshBadges: string[];
  init: () => Promise<void>;
  answerQuiz: (questionId: string, chosen: number) => Promise<{ correct: boolean; xp: number }>;
  addWorkout: (w: NewWorkout) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  addMatch: (m: NewMatch) => Promise<void>;
  deleteMatch: (id: string) => Promise<void>;
  addPlan: (p: NewPlan) => Promise<MatchPlan>;
  deletePlan: (id: string) => Promise<void>;
  updateProfile: (patch: Partial<Profile>) => Promise<void>;
  clearFreshBadges: () => void;
}

let repo: LocalRepository | null = null;
function repository(): LocalRepository {
  if (!repo) repo = new LocalRepository();
  return repo;
}

/** Point d'injection pour les tests : un dépôt sur un `Storage` factice. */
export function _setRepositoryForTests(r: LocalRepository | null) {
  repo = r;
}

export const useStore = create<AppState>((set, get) => ({
  ready: false,
  repoKind: "local",
  profile: emptyProfile(LOCAL_USER_ID),
  quizHistory: [],
  workouts: [],
  matches: [],
  plans: [],
  badges: [],
  freshBadges: [],

  async init() {
    const r = repository();
    const data = await r.loadAll();
    const profile = { ...data.profile };
    // Une série se casse quand un jour entier est passé sans quiz.
    if (profile.lastQuizDate && daysBetween(profile.lastQuizDate, todayKey()) > 1 && profile.streakCurrent !== 0) {
      profile.streakCurrent = 0;
      await r.saveProfile(profile);
    }
    set({ ready: true, repoKind: r.kind, ...data, plans: data.plans ?? [], profile });
  },

  async answerQuiz(questionId, chosen) {
    const r = repository();
    const q = QUESTIONS.find((x) => x.id === questionId);
    if (!q) throw new Error(`question inconnue : ${questionId}`);
    const today = todayKey();
    const { profile, quizHistory } = get();
    const already = quizHistory.find((h) => h.answeredOn === today);
    if (already) return { correct: already.correct, xp: 0 };
    const correct = chosen === q.answer;
    const xp = correct ? XP_QUIZ.bonne[q.difficulty] : XP_QUIZ.mauvaise;
    const answer: QuizAnswer = { id: newId(), userId: profile.id, questionId, answeredOn: today, chosen, correct, xpEarned: xp };
    const streak = profile.lastQuizDate && daysBetween(profile.lastQuizDate, today) === 1 ? profile.streakCurrent + 1 : 1;
    const next: Profile = { ...profile, xp: profile.xp + xp, streakCurrent: streak, streakBest: Math.max(profile.streakBest, streak), lastQuizDate: today };
    await r.addQuizAnswer(answer);
    await r.saveProfile(next);
    set({ profile: next, quizHistory: [...quizHistory, answer] });
    await refreshBadges();
    return { correct, xp };
  },

  async addWorkout(w) {
    const r = repository();
    const { profile, workouts } = get();
    const full: Workout = { ...w, id: newId(), userId: profile.id, createdAt: new Date().toISOString() };
    await r.addWorkout(full);
    const next = { ...profile, xp: profile.xp + XP_WORKOUT };
    await r.saveProfile(next);
    set({ workouts: [full, ...workouts], profile: next });
    await refreshBadges();
  },

  async deleteWorkout(id) {
    await repository().deleteWorkout(id);
    set({ workouts: get().workouts.filter((w) => w.id !== id) });
  },

  async addMatch(m) {
    const r = repository();
    const { profile, matches } = get();
    const full: Match = { ...m, id: newId(), userId: profile.id, createdAt: new Date().toISOString() };
    await r.addMatch(full);
    const next = { ...profile, xp: profile.xp + XP_MATCH };
    await r.saveProfile(next);
    set({ matches: [full, ...matches], profile: next });
    await refreshBadges();
  },

  async deleteMatch(id) {
    await repository().deleteMatch(id);
    set({ matches: get().matches.filter((m) => m.id !== id) });
  },

  async addPlan(p) {
    const r = repository();
    const { profile, plans } = get();
    const full: MatchPlan = { ...p, id: newId(), userId: profile.id, createdAt: new Date().toISOString() };
    await r.addPlan(full);
    const next = { ...profile, xp: profile.xp + XP_PLAN };
    await r.saveProfile(next);
    set({ plans: [full, ...plans], profile: next });
    await refreshBadges();
    return full;
  },

  async deletePlan(id) {
    await repository().deletePlan(id);
    set({ plans: get().plans.filter((p) => p.id !== id) });
  },

  async updateProfile(patch) {
    const next = { ...get().profile, ...patch };
    await repository().saveProfile(next);
    set({ profile: next });
  },

  clearFreshBadges() {
    set({ freshBadges: [] });
  },
}));

async function refreshBadges() {
  const { profile, quizHistory, workouts, matches, plans, badges } = useStore.getState();
  const codes = newlyUnlocked({ profile, quizHistory, workouts, matches, plans }, badges);
  if (codes.length) {
    await repository().unlockBadges(codes);
    useStore.setState({ badges: [...badges, ...codes], freshBadges: codes });
  }
}
