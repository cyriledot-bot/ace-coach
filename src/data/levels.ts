export interface Level { level: number; name: string; minXp: number }

export const LEVELS: Level[] = [
  { level: 1, name: "Débutant", minXp: 0 },
  { level: 2, name: "Balle orange", minXp: 150 },
  { level: 3, name: "Balle verte", minXp: 400 },
  { level: 4, name: "Compétiteur", minXp: 800 },
  { level: 5, name: "Quatrième série", minXp: 1400 },
  { level: 6, name: "Troisième série", minXp: 2200 },
  { level: 7, name: "Deuxième série", minXp: 3300 },
  { level: 8, name: "Tête de série", minXp: 5000 },
];

export function levelFor(xp: number): { current: Level; next: Level | undefined; progress: number } {
  let current = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.minXp) current = l;
  const next = LEVELS.find((l) => l.minXp > current.minXp);
  const progress = next ? (xp - current.minXp) / (next.minXp - current.minXp) : 1;
  return { current, next, progress };
}
