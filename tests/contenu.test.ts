import { describe, expect, it } from "vitest";
import { QUESTIONS, QUESTIONS_ORIGINALES, QUESTIONS_TACTIQUE_2026_11, QUESTIONS_2026_11_B } from "@/data/questions";
import { BADGES } from "@/data/badges";
import { PRINCIPLES, PATTERNS, INDICATORS } from "@/data/tactique";
import { TUTOS, TUTO_CATEGORIES } from "@/data/tutos";
import { TIPS, EXERCISES } from "@/data/conseils";
import { MESSAGES_DU_JOUR } from "@/data/messages";
import { LEVELS } from "@/data/levels";

const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe("banque de questions", () => {
  it("conserve les 22 questions du 25/10 avec leurs identifiants", () => {
    expect(QUESTIONS_ORIGINALES).toHaveLength(22);
    expect(QUESTIONS_ORIGINALES.map((q) => q.id)).toEqual([
      "tac-01", "tac-02", "tac-03", "tac-04", "tac-05", "tac-06", "tac-07",
      "cul-01", "cul-02", "cul-03", "cul-04", "cul-05", "cul-06", "cul-07",
      "reg-01", "reg-02", "reg-03", "reg-04", "reg-05", "reg-06", "reg-07", "reg-08",
    ]);
  });
  it("a des identifiants uniques, quatre options, et une réponse dans les options", () => {
    expect(unique(QUESTIONS.map((q) => q.id))).toBe(true);
    for (const q of QUESTIONS) {
      expect(q.options, q.id).toHaveLength(4);
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answer, q.id).toBeLessThan(q.options.length);
      expect([1, 2, 3]).toContain(q.difficulty);
      expect(q.explanation.length, q.id).toBeGreaterThan(40);
    }
  });
  it("préfixe les questions tactiques par tac- (le badge Tacticien compte dessus)", () => {
    for (const q of QUESTIONS) {
      const prefix = { tactique: "tac-", culture: "cul-", reglement: "reg-" }[q.category];
      expect(q.id.startsWith(prefix), q.id).toBe(true);
    }
  });
  it("ne met pas la bonne réponse toujours à la même place dans les ajouts", () => {
    for (const lot of [QUESTIONS_TACTIQUE_2026_11, QUESTIONS_2026_11_B]) {
      const positions = new Set(lot.map((q) => q.answer));
      expect(positions.size).toBeGreaterThanOrEqual(3);
    }
  });
  it("compte 58 questions : 22 d’origine, 9 puis 27 ajoutées le 16/11", () => {
    expect(QUESTIONS_2026_11_B).toHaveLength(27);
    expect(QUESTIONS).toHaveLength(58);
    const byCat = { tactique: 0, culture: 0, reglement: 0 };
    for (const q of QUESTIONS) byCat[q.category] += 1;
    expect(byCat).toEqual({ tactique: 24, culture: 15, reglement: 19 });
  });
});

describe("badges", () => {
  it("garde les 14 codes stockés dans les sauvegardes existantes", () => {
    expect(BADGES.slice(0, 14).map((b) => b.code)).toEqual([
      "premier-quiz", "serie-3", "serie-7", "serie-30", "sans-faute-5", "tacticien", "arbitre",
      "premiere-seance", "dix-seances", "dix-heures", "premier-match", "premiere-victoire", "tete-froide", "xp-1000",
    ]);
    expect(unique(BADGES.map((b) => b.code))).toBe(true);
  });
});

describe("tactique", () => {
  it("relie chaque principe à une question existante du quiz", () => {
    const ids = new Set(QUESTIONS.map((q) => q.id));
    for (const p of PRINCIPLES) {
      expect(p.onCourt.length, p.id).toBeGreaterThanOrEqual(2);
      if (p.quizId) expect(ids.has(p.quizId), `${p.id} → ${p.quizId}`).toBe(true);
    }
    expect(unique(PRINCIPLES.map((p) => p.id))).toBe(true);
  });
  it("dessine des schémas dans le court (0-100 × 0-200)", () => {
    for (const pat of PATTERNS) {
      expect(pat.shots.length).toBeGreaterThanOrEqual(2);
      for (const s of pat.shots) {
        for (const [x, y] of [s.from, s.to]) {
          expect(x).toBeGreaterThanOrEqual(0);
          expect(x).toBeLessThanOrEqual(100);
          expect(y).toBeGreaterThanOrEqual(0);
          expect(y).toBeLessThanOrEqual(200);
        }
      }
    }
    expect(INDICATORS.length).toBe(5);
  });
});

describe("tutos hors court", () => {
  it("couvre les trois catégories demandées avec des étapes et un pourquoi", () => {
    const cats = Object.keys(TUTO_CATEGORIES);
    expect(cats).toEqual(["renforcement", "yoga", "methodes"]);
    for (const c of cats) expect(TUTOS.filter((t) => t.category === c).length, c).toBeGreaterThanOrEqual(4);
    expect(unique(TUTOS.map((t) => t.id))).toBe(true);
    for (const t of TUTOS) {
      expect(t.steps.length, t.id).toBeGreaterThanOrEqual(4);
      expect(t.why.length, t.id).toBeGreaterThan(40);
      expect(t.durationMin, t.id).toBeGreaterThanOrEqual(0);
    }
  });
  it("ne propose aucune charge lourde : poids du corps ou élastique seulement", () => {
    const interdits = /haltère|barre\b|kg\b|charge lourde|squat barre|développé couché/i;
    for (const t of TUTOS.filter((x) => x.category === "renforcement")) {
      expect(t.equipment, t.id).not.toMatch(interdits);
      for (const s of t.steps) expect(s.text, t.id).not.toMatch(interdits);
    }
  });
});

describe("contenu du 25/10 repris à l'identique", () => {
  it("compte 9 conseils, 15 exercices, 21 messages, 8 niveaux", () => {
    expect(TIPS).toHaveLength(9);
    expect(EXERCISES).toHaveLength(15);
    expect(MESSAGES_DU_JOUR).toHaveLength(21);
    expect(LEVELS).toHaveLength(8);
    expect(LEVELS.at(-1)).toEqual({ level: 8, name: "Tête de série", minXp: 5000 });
  });
});
