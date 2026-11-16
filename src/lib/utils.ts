import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Date locale au format AAAA-MM-JJ (jamais UTC : le quiz du jour change à minuit local). */
export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Nombre de jours entre deux clés AAAA-MM-JJ (b − a), insensible aux changements d'heure. */
export function daysBetween(a: string, b: string): number {
  const ms = new Date(b + "T12:00:00").getTime() - new Date(a + "T12:00:00").getTime();
  return Math.round(ms / 864e5);
}

/** Hachage déterministe d'une clé de jour vers [0, n) : la même question pour tout le monde le même jour. */
export function dailyIndex(key: string, n: number): number {
  const num = Number(key.replaceAll("-", ""));
  return Math.abs(Math.imul(num, 2654435761) >>> 0) % n;
}

export function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
