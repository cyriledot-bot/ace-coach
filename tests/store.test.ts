import { beforeEach, describe, expect, it, vi } from "vitest";
import { LocalRepository, STORAGE_KEY, readState } from "@/store/repository";
import { _setRepositoryForTests, useStore, XP_MATCH, XP_PLAN, XP_WORKOUT } from "@/store/useStore";
import { QUESTIONS, XP_QUIZ } from "@/data/questions";
import { dailyIndex, daysBetween, todayKey } from "@/lib/utils";
import type { Match, Workout } from "@/lib/types";

class MemoryStorage implements Storage {
  private m = new Map<string, string>();
  get length() { return this.m.size; }
  clear() { this.m.clear(); }
  getItem(k: string) { return this.m.get(k) ?? null; }
  key(i: number) { return [...this.m.keys()][i] ?? null; }
  removeItem(k: string) { this.m.delete(k); }
  setItem(k: string, v: string) { this.m.set(k, String(v)); }
}

/** Sauvegarde telle que la version du 25/10 l'écrivait : sans `plans`, avec un badge et un quiz. */
const SAUVEGARDE_25_10 = {
  profile: { id: "local", pseudo: "Léo", xp: 65, streakCurrent: 1, streakBest: 2, goals: "Passer 30/3", createdAt: "2026-10-25T10:00:00.000Z", lastQuizDate: "2026-10-26" },
  quizHistory: [{ id: "a1", userId: "local", questionId: "tac-01", answeredOn: "2026-10-26", chosen: 1, correct: true, xpEarned: 20 }],
  workouts: [{ id: "w1", userId: "local", createdAt: "2026-10-26T18:00:00.000Z", date: "2026-10-26", durationMin: 60, type: "technique", effort: 4, plaisir: 5, concentration: 3, positif: "service", axe: "revers" }],
  matches: [],
  badges: ["premier-quiz", "premiere-seance"],
};

let storage: MemoryStorage;

beforeEach(() => {
  storage = new MemoryStorage();
  _setRepositoryForTests(new LocalRepository(storage));
  useStore.setState({ ready: false, quizHistory: [], workouts: [], matches: [], plans: [], badges: [], freshBadges: [] });
});

describe("compatibilité avec les sauvegardes du 25/10", () => {
  it("relit une sauvegarde sans `plans` et n'y touche pas avant la première écriture", async () => {
    storage.setItem(STORAGE_KEY, JSON.stringify(SAUVEGARDE_25_10));
    _setRepositoryForTests(new LocalRepository(storage));
    await useStore.getState().init();
    const s = useStore.getState();
    expect(s.ready).toBe(true);
    expect(s.profile.pseudo).toBe("Léo");
    expect(s.quizHistory).toHaveLength(1);
    expect(s.workouts).toHaveLength(1);
    expect(s.badges).toEqual(["premier-quiz", "premiere-seance"]);
    expect(s.plans).toEqual([]);
    // la série est cassée (dernier quiz le 26/10, bien plus d'un jour) : c'est la seule écriture attendue
    expect(s.profile.streakCurrent).toBe(0);
    const written = JSON.parse(storage.getItem(STORAGE_KEY)!);
    expect(written.quizHistory).toEqual(SAUVEGARDE_25_10.quizHistory);
    expect(written.badges).toEqual(SAUVEGARDE_25_10.badges);
  });
  it("repart propre si le stockage est vide ou illisible", () => {
    expect(readState(storage).profile.pseudo).toBe("Joueur");
    storage.setItem(STORAGE_KEY, "{pas du json");
    expect(readState(storage).workouts).toEqual([]);
  });
});

describe("quiz", () => {
  it("crédite l'XP selon la difficulté, une seule réponse par jour, et construit la série", async () => {
    await useStore.getState().init();
    const today = todayKey();
    const q = QUESTIONS[dailyIndex(today, QUESTIONS.length)];
    const r1 = await useStore.getState().answerQuiz(q.id, q.answer);
    expect(r1).toEqual({ correct: true, xp: XP_QUIZ.bonne[q.difficulty] });
    expect(useStore.getState().profile.streakCurrent).toBe(1);
    expect(useStore.getState().profile.lastQuizDate).toBe(today);
    const r2 = await useStore.getState().answerQuiz(q.id, (q.answer + 1) % 4);
    expect(r2).toEqual({ correct: true, xp: 0 });
    expect(useStore.getState().quizHistory).toHaveLength(1);
    expect(useStore.getState().badges).toContain("premier-quiz");
    expect(useStore.getState().freshBadges).toEqual(["premier-quiz"]);
  });
  it("donne 5 XP sur une mauvaise réponse", async () => {
    await useStore.getState().init();
    const q = QUESTIONS[dailyIndex(todayKey(), QUESTIONS.length)];
    const r = await useStore.getState().answerQuiz(q.id, (q.answer + 1) % 4);
    expect(r).toEqual({ correct: false, xp: XP_QUIZ.mauvaise });
  });
  it("refuse une question inconnue", async () => {
    await useStore.getState().init();
    await expect(useStore.getState().answerQuiz("xxx-99", 0)).rejects.toThrow("question inconnue");
  });
});

describe("carnet, matchs, plans", () => {
  const workout: Omit<Workout, "id" | "userId" | "createdAt"> = { date: todayKey(), durationMin: 45, type: "physique", effort: 3, plaisir: 4, concentration: 4, positif: "Jambes de tennis", axe: "" };
  const match: Omit<Match, "id" | "userId" | "createdAt"> = { date: todayKey(), opponent: "Nina", surface: "dur", tournamentType: "club", result: "defaite", score: "4-6 3-6", debriefGood: "", debriefHard: "", debriefMental: "", mentalScore: 5, firstServePct: 58, doubleFaults: 3 };

  it("crédite l'XP et persiste chaque écriture", async () => {
    await useStore.getState().init();
    await useStore.getState().addWorkout(workout);
    await useStore.getState().addMatch(match);
    const plan = await useStore.getState().addPlan({ date: todayKey(), opponent: "Nina", weapon: "coup droit", opponentWeakness: "revers haut", planA: "tout croisé", planB: "plus haut au centre", bigPoints: "" });
    const s = useStore.getState();
    expect(s.profile.xp).toBe(XP_WORKOUT + XP_MATCH + XP_PLAN);
    expect(s.plans[0].id).toBe(plan.id);
    const written = JSON.parse(storage.getItem(STORAGE_KEY)!);
    expect(written.workouts).toHaveLength(1);
    expect(written.matches[0].firstServePct).toBe(58);
    expect(written.plans).toHaveLength(1);
    expect(written.profile.xp).toBe(45);
  });
  it("débloque Tête froide, Plan de match, et compte Athlète après cinq séances physiques", async () => {
    await useStore.getState().init();
    await useStore.getState().addMatch(match);
    expect(useStore.getState().badges).toEqual(expect.arrayContaining(["premier-match", "tete-froide"]));
    await useStore.getState().addPlan({ date: todayKey(), opponent: "", weapon: "a", opponentWeakness: "b", planA: "c", planB: "d", bigPoints: "" });
    expect(useStore.getState().badges).toContain("premier-plan");
    for (let i = 0; i < 5; i++) await useStore.getState().addWorkout(workout);
    expect(useStore.getState().badges).toContain("athlete-5");
  });
  it("supprime et persiste la suppression", async () => {
    await useStore.getState().init();
    await useStore.getState().addWorkout(workout);
    const id = useStore.getState().workouts[0].id;
    await useStore.getState().deleteWorkout(id);
    expect(useStore.getState().workouts).toEqual([]);
    expect(JSON.parse(storage.getItem(STORAGE_KEY)!).workouts).toEqual([]);
  });
});

describe("utilitaires de date", () => {
  it("compte les jours entre deux clés, et la question du jour est déterministe", () => {
    expect(daysBetween("2026-10-31", "2026-11-01")).toBe(1);
    expect(daysBetween("2026-03-28", "2026-03-30")).toBe(2);
    expect(dailyIndex("2026-11-16", 30)).toBe(dailyIndex("2026-11-16", 30));
    expect(dailyIndex("2026-11-16", 30)).toBeLessThan(30);
  });
  it("todayKey est en heure locale", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 16, 23, 30));
    expect(todayKey()).toBe("2026-11-16");
    vi.useRealTimers();
  });
});
