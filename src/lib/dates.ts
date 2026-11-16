import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export function formatDate(iso: string, pattern: string): string {
  return format(parseISO(iso), pattern, { locale: fr });
}
