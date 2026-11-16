import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, CircleX, Flame, Lightbulb } from "lucide-react";
import { Badge, Button, Card, CardContent } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useDaily } from "@/store/useDaily";
import { QUESTIONS, QUIZ_CATEGORIES } from "@/data/questions";
import { BADGES } from "@/data/badges";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

export function QuizPage() {
  const { question, answered } = useDaily();
  const { answerQuiz, profile, freshBadges, clearFreshBadges, quizHistory } = useStore();
  const [chosen, setChosen] = useState<number | null>(answered?.chosen ?? null);
  const [result, setResult] = useState<{ correct: boolean; xp: number } | null>(answered ? { correct: answered.correct, xp: answered.xpEarned } : null);
  const [busy, setBusy] = useState(false);
  const done = result !== null;

  async function validate() {
    if (chosen === null || done || busy) return;
    setBusy(true);
    try {
      const r = await answerQuiz(question.id, chosen);
      setResult(r);
      if (navigator.vibrate) navigator.vibrate(r.correct ? [30, 40, 30] : 60);
    } finally {
      setBusy(false);
    }
  }

  const total = quizHistory.length;
  const good = quizHistory.filter((h) => h.correct).length;
  const fresh = freshBadges.length ? BADGES.find((b) => b.code === freshBadges[0]) : undefined;

  return (
    <div className="space-y-4">
      <header>
        <p className="muted text-sm">Quiz quotidien</p>
        <h1 className="h-display text-2xl">Une question, chaque jour</h1>
      </header>
      <div className="flex items-center gap-2 text-sm">
        <Badge variant="neutral">
          <Flame className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" /> série {profile.streakCurrent}
        </Badge>
        <Badge variant="neutral">{good}/{total} bonnes réponses</Badge>
      </div>

      <Card glow={!done}>
        <div className="mb-3 flex items-center justify-between">
          <Badge>{QUIZ_CATEGORIES[question.category]}</Badge>
          <span className="muted text-xs">difficulté {"●".repeat(question.difficulty)}{"○".repeat(3 - question.difficulty)}</span>
        </div>
        <p className="mb-4 text-lg font-semibold leading-snug">{question.question}</p>
        <ul className="space-y-2" role="radiogroup" aria-label="Réponses">
          {question.options.map((opt, i) => {
            const selected = chosen === i;
            const isGood = done && i === question.answer;
            const isBad = done && selected && i !== question.answer;
            return (
              <li key={i}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={done}
                  onClick={() => setChosen(i)}
                  className={cn(
                    "tap flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                    !done && (selected ? "border-ball-400 bg-ball-400/15" : "border-white/10 bg-white/5 hover:bg-white/10"),
                    isGood && "border-emerald-400 bg-emerald-500/15",
                    isBad && "border-red-400 bg-red-500/15",
                    done && !isGood && !isBad && "border-white/5 bg-white/5 opacity-60",
                  )}
                >
                  <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold", selected || isGood ? "bg-white text-ink-950" : "bg-white/10")}>{LETTERS[i]}</span>
                  <span className="flex-1">{opt}</span>
                  {isGood && <CircleCheck className="h-5 w-5 shrink-0 text-emerald-300" aria-label="bonne réponse" />}
                  {isBad && <CircleX className="h-5 w-5 shrink-0 text-red-300" aria-label="ta réponse" />}
                </button>
              </li>
            );
          })}
        </ul>
        {!done && (
          <Button className="mt-4 w-full" size="lg" disabled={chosen === null || busy} onClick={validate}>
            Valider ma réponse
          </Button>
        )}
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
            <Card className={result.correct ? "border-emerald-400/40" : "border-white/10"}>
              <div className="mb-2 flex items-center justify-between">
                <p className="h-display text-lg">{result.correct ? "Bien joué !" : "Pas cette fois"}</p>
                {result.xp > 0 && <Badge variant={result.correct ? "success" : "neutral"}>+{result.xp} XP</Badge>}
              </div>
              <CardContent className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-ball-300" aria-hidden="true" />
                <p>{question.explanation}</p>
              </CardContent>
              <p className="muted mt-3 text-xs">Prochaine question demain. Une seule réponse compte par jour, même en revenant plus tard.</p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fresh && (
          <motion.div key="badges" role="status" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-md">
            <div className="card card-glow flex items-center gap-3 p-4">
              <span className="animate-pop text-3xl" aria-hidden="true">{fresh.icon}</span>
              <div className="flex-1">
                <p className="font-semibold">Badge débloqué : {fresh.name}</p>
                <p className="muted text-xs">{fresh.description}</p>
              </div>
              <Button size="sm" variant="ghost" onClick={clearFreshBadges} aria-label="Fermer">OK</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="muted text-center text-xs">{QUESTIONS.length} questions dans la banque · tactique, culture, règlement</p>
    </div>
  );
}
