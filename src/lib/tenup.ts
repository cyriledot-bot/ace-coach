/**
 * Analyseur du texte copié depuis le palmarès Ten'Up (ou toute liste de
 * matchs collée à la main). Aucune connexion, aucun secret : l'utilisateur
 * copie sa page, l'appli en tire date, adversaire, classement, score, résultat.
 *
 * Le format exact de Ten'Up n'est pas documenté publiquement ; l'analyseur
 * est donc tolérant et chaque ligne garde un avertissement quand un champ a
 * été deviné. L'aperçu dans l'appli laisse corriger avant d'importer.
 */
import type { MatchResult } from "./types";

export interface ParsedMatch {
  /** AAAA-MM-JJ si trouvée. */
  date?: string;
  opponent: string;
  opponentRanking?: string;
  score: string;
  result?: MatchResult;
  warnings: string[];
  raw: string;
}

const MONTHS: Record<string, number> = {
  janv: 1, janvier: 1, fev: 2, "fév": 2, fevr: 2, "févr": 2, "février": 2, fevrier: 2, mars: 3, avr: 4, avril: 4, mai: 5, juin: 6,
  juil: 7, juillet: 7, aout: 8, "août": 8, sept: 9, septembre: 9, oct: 10, octobre: 10, nov: 11, novembre: 11, dec: 12, "déc": 12, "décembre": 12, decembre: 12,
};

const DATE_NUM = /\b(\d{1,2})[/.](\d{1,2})[/.](\d{2,4})\b/;
const DATE_TXT = /\b(\d{1,2})(?:er)?\s+([a-zéû]{3,9})\.?\s+(\d{4})\b/i;

/** Classements FFT : NC, 40, 30/5…30, 15/5…15, 5/6…0, négatifs, numérotés, et les promos « P ». */
const RANKING = /^(?:NC|40|30(?:\/[1-5])?|15(?:\/[1-5])?|[0-5](?:\/6)?|-(?:2\/6|4\/6|15|30)|N°?\s?\d+|P\d+)$/i;

/** Un set : jeux de 0 à 7 des deux côtés, ou super jeu décisif (10-8, 11-9…). Séparateur - ou /. */
const SET = /\b(\d{1,2})\s*[-/]\s*(\d{1,2})(?:\s*\((\d{1,2})\))?/g;

function isSet(a: number, b: number): boolean {
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  if (max <= 7) return true;
  return max >= 10 && max - min >= 2 && (max === 10 || max - min === 2);
}

export function parseDate(text: string): string | undefined {
  const n = text.match(DATE_NUM);
  if (n) {
    const d = Number(n[1]);
    const m = Number(n[2]);
    let y = Number(n[3]);
    if (y < 100) y += 2000;
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  const t = text.match(DATE_TXT);
  if (t) {
    const m = MONTHS[t[2].toLowerCase()];
    if (m) return `${t[3]}-${String(m).padStart(2, "0")}-${String(Number(t[1])).padStart(2, "0")}`;
  }
  return undefined;
}

interface ScoreFound {
  score: string;
  setsFirst: number;
  setsSecond: number;
  start: number;
  end: number;
  retired: boolean;
}

/** Trouve la plus longue suite de sets contigus (séparés par des espaces ou des virgules). */
export function findScore(text: string): ScoreFound | undefined {
  const sets: { a: number; b: number; tb?: string; start: number; end: number }[] = [];
  for (const m of text.matchAll(SET)) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (isSet(a, b)) sets.push({ a, b, tb: m[3], start: m.index!, end: m.index! + m[0].length });
  }
  if (!sets.length) return undefined;
  // regrouper les sets contigus
  const groups: (typeof sets)[] = [];
  for (const s of sets) {
    const g = groups.at(-1);
    if (g && /^[\s,;]*$/.test(text.slice(g.at(-1)!.end, s.start))) g.push(s);
    else groups.push([s]);
  }
  const best = groups.reduce((x, y) => (y.length > x.length ? y : x));
  // un set isolé « 4/6 » peut être un classement : on l'exige accompagné, sauf s'il porte un jeu décisif ou un score > 7
  if (best.length === 1) {
    const s = best[0];
    const lonely = text.slice(s.start, s.end).trim();
    if (RANKING.test(lonely) && !s.tb) return undefined;
  }
  let setsFirst = 0;
  let setsSecond = 0;
  for (const s of best) {
    if (s.a > s.b) setsFirst += 1;
    else if (s.b > s.a) setsSecond += 1;
  }
  const end = best.at(-1)!.end;
  const retired = /\b(ab\.?|abandon|w\.?o\.?|forfait)\b/i.test(text.slice(end, end + 16));
  const score = best.map((s) => `${s.a}-${s.b}${s.tb ? `(${s.tb})` : ""}`).join(" ") + (retired ? " ab." : "");
  return { score, setsFirst, setsSecond, start: best[0].start, end, retired };
}

const RESULT_WORDS: [RegExp, MatchResult][] = [
  [/\b(victoire|gagn[ée]e?|vainqueur|win)\b/i, "victoire"],
  [/\b(d[ée]faite|perdu[e]?|battu[e]?|loss)\b/i, "defaite"],
];

function cleanName(s: string): string {
  return s
    .replace(/\b(contre|vs\.?|c\.|face à|adversaire|résultat|score|classement|date|match|simple|double|dames|messieurs)\b/gi, " ")
    .replace(/[|•·:;,()\[\]\t]+/g, " ")
    .replace(/\b[VD]\b/g, " ")
    .replace(/\b(le|la|les|du|de|des|au|à|en|et)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Analyse un bloc de texte (une ligne, ou plusieurs lignes d'une même carte). */
export function parseBlock(block: string): ParsedMatch | undefined {
  const raw = block.trim();
  if (!raw) return undefined;
  const scoreFound = findScore(raw);
  if (!scoreFound) return undefined;
  const warnings: string[] = [];
  let rest = raw.slice(0, scoreFound.start) + " " + raw.slice(scoreFound.end).replace(/^\s*(ab\.?|abandon|w\.?o\.?|forfait)\b/i, " ");

  const date = parseDate(raw);
  if (date) rest = rest.replace(DATE_NUM, " ").replace(DATE_TXT, " ");
  else warnings.push("date non trouvée");

  let result: MatchResult | undefined;
  for (const [re, r] of RESULT_WORDS) {
    if (re.test(rest)) {
      result = r;
      rest = rest.replace(re, " ");
      break;
    }
  }
  const vd = rest.match(/(?:^|\s)([VD])(?=\s|$)/);
  if (!result && vd) result = vd[1].toUpperCase() === "V" ? "victoire" : "defaite";
  if (!result) {
    if (scoreFound.setsFirst !== scoreFound.setsSecond) {
      result = scoreFound.setsFirst > scoreFound.setsSecond ? "victoire" : "defaite";
      warnings.push("résultat déduit du score (ton score en premier)");
    } else {
      warnings.push("résultat non trouvé");
    }
  }
  if (scoreFound.retired && result === undefined) result = "abandon";

  let opponentRanking: string | undefined;
  const tokens = rest.split(/\s+/).filter(Boolean);
  const kept: string[] = [];
  for (const tok of tokens) {
    const t = tok.replace(/^[(\[,;]+|[)\],;.]+$/g, "");
    if (!opponentRanking && RANKING.test(t)) opponentRanking = t.toUpperCase();
    else kept.push(tok);
  }
  const opponent = cleanName(kept.join(" "));
  if (!opponent) warnings.push("adversaire non trouvé");
  if (!opponentRanking) warnings.push("classement non trouvé");
  return { date, opponent, opponentRanking, score: scoreFound.score, result, warnings, raw };
}

/**
 * Découpe le texte collé en blocs : une ligne par match si chaque ligne porte
 * un score, sinon des cartes de plusieurs lignes séparées par le score (la
 * ligne de score clôt la carte).
 */
export function parseTenUp(text: string): ParsedMatch[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const out: ParsedMatch[] = [];
  let buffer: string[] = [];
  for (const line of lines) {
    buffer.push(line);
    if (findScore(line)) {
      const m = parseBlock(buffer.join(" "));
      if (m) out.push(m);
      buffer = [];
    } else if (buffer.length > 6) {
      buffer.shift();
    }
  }
  return out;
}
