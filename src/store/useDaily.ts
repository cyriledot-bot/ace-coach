import { useMemo } from "react";
import { QUESTIONS } from "@/data/questions";
import { MESSAGES_DU_JOUR } from "@/data/messages";
import { dailyIndex, todayKey } from "@/lib/utils";
import { useStore } from "./useStore";

/** Question et message du jour, identiques pour tout le monde un jour donné. */
export function useDaily() {
  const today = todayKey();
  const history = useStore((s) => s.quizHistory);
  return useMemo(() => {
    const question = QUESTIONS[dailyIndex(today, QUESTIONS.length)];
    const message = MESSAGES_DU_JOUR[dailyIndex(today + "m", MESSAGES_DU_JOUR.length)];
    const answered = history.find((h) => h.answeredOn === today) ?? null;
    return { today, question, message, answered };
  }, [today, history]);
}
