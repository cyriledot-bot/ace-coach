import { describe, expect, it } from "vitest";
import { findScore, parseBlock, parseDate, parseTenUp } from "@/lib/tenup";

describe("parseDate", () => {
  it("lit les dates numériques et en toutes lettres", () => {
    expect(parseDate("Match du 08/11/2026 contre X")).toBe("2026-11-08");
    expect(parseDate("le 8.11.26")).toBe("2026-11-08");
    expect(parseDate("samedi 8 nov. 2026")).toBe("2026-11-08");
    expect(parseDate("1er février 2026")).toBe("2026-02-01");
    expect(parseDate("rien ici")).toBeUndefined();
  });
});

describe("findScore", () => {
  it("accepte les séparateurs / et -, les jeux décisifs et le super jeu décisif", () => {
    expect(findScore("6/4 3/6 10/7")?.score).toBe("6-4 3-6 10-7");
    expect(findScore("7-6(5) 6-3")?.score).toBe("7-6(5) 6-3");
    expect(findScore("6/2 2/1 ab.")?.score).toBe("6-2 2-1 ab.");
  });
  it("ne prend pas un classement pour un set", () => {
    expect(findScore("Dupont 30/1")).toBeUndefined();
    expect(findScore("Martin 15/5")).toBeUndefined();
    expect(findScore("Petit 4/6")).toBeUndefined();
    // mais 4/6 accompagné d'un autre set est bien un score
    expect(findScore("Petit 4/6 6/4 6/3")?.score).toBe("4-6 6-4 6-3");
  });
});

describe("parseBlock", () => {
  it("lit une ligne tabulaire classique", () => {
    const m = parseBlock("08/11/2026\tV\tNina ROUX (30/4)\t6/4 3/6 10/7")!;
    expect(m.date).toBe("2026-11-08");
    expect(m.result).toBe("victoire");
    expect(m.opponent).toBe("Nina ROUX");
    expect(m.opponentRanking).toBe("30/4");
    expect(m.score).toBe("6-4 3-6 10-7");
    expect(m.warnings).toEqual([]);
  });
  it("déduit le résultat du score quand aucun V/D n'est écrit, et le dit", () => {
    const m = parseBlock("14 nov. 2026 · Tom BERNARD 40 · 6-3 6-4")!;
    expect(m.result).toBe("victoire");
    expect(m.opponentRanking).toBe("40");
    expect(m.opponent).toBe("Tom BERNARD");
    expect(m.warnings).toContain("résultat déduit du score (ton score en premier)");
    const d = parseBlock("14/11/2026 Tom BERNARD 40 3-6 4-6")!;
    expect(d.result).toBe("defaite");
  });
  it("lit les mots Victoire / Défaite et les classements avec slash", () => {
    const m = parseBlock("Défaite contre Léa MARTIN 15/4, 2/6 1/6, le 20/09/2026")!;
    expect(m.result).toBe("defaite");
    expect(m.opponent).toBe("Léa MARTIN");
    expect(m.opponentRanking).toBe("15/4");
    expect(m.date).toBe("2026-09-20");
  });
  it("signale ce qui manque sans refuser la ligne", () => {
    const m = parseBlock("Inconnu 6/4 6/4")!;
    expect(m.warnings).toEqual(expect.arrayContaining(["date non trouvée", "classement non trouvé"]));
    expect(parseBlock("une ligne sans score")).toBeUndefined();
  });
});

describe("parseTenUp", () => {
  it("regroupe des cartes multi-lignes, la ligne de score fermant la carte", () => {
    const text = `Tournoi du TC Melesse
08/11/2026
Nina ROUX
30/4
Défaite
4/6 3/6
Championnat par équipes
14/11/2026
Tom BERNARD
40
Victoire
6/3 6/4`;
    const out = parseTenUp(text);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({ date: "2026-11-08", opponent: expect.stringContaining("Nina ROUX"), opponentRanking: "30/4", result: "defaite", score: "4-6 3-6" });
    expect(out[1]).toMatchObject({ date: "2026-11-14", result: "victoire", score: "6-3 6-4" });
  });
  it("ignore les lignes sans score et rend une liste vide sur du bruit", () => {
    expect(parseTenUp("Mon palmarès\nSaison 2026\nAucun match")).toEqual([]);
  });
});
