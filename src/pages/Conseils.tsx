import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Accordion, Button } from "@/components/ui";
import { EXERCISES, EXERCISE_CATEGORIES, TIPS, TIP_CATEGORIES, type ExerciseCategory, type TipCategory } from "@/data/conseils";
import { cn } from "@/lib/utils";

type Tab = "conseils" | "exercices";

export function ConseilsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("conseils");
  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Retour" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <p className="muted text-sm">Espace coach</p>
          <h1 className="h-display text-2xl">Conseils et exercices</h1>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/5 p-1" role="tablist">
        {(["conseils", "exercices"] as Tab[]).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("tap rounded-xl py-2 text-sm font-semibold capitalize", tab === t ? "bg-ball-400 text-ink-950" : "text-white/70")}>
            {t}
          </button>
        ))}
      </div>
      {tab === "conseils"
        ? (Object.keys(TIP_CATEGORIES) as TipCategory[]).map((cat) => (
            <section key={cat} aria-label={TIP_CATEGORIES[cat]} className="space-y-2">
              <h2 className="h-display text-base">{TIP_CATEGORIES[cat]}</h2>
              {TIPS.filter((t) => t.category === cat).map((t) => (
                <Accordion key={t.id} title={t.title} subtitle={t.summary}>
                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    {t.points.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </Accordion>
              ))}
            </section>
          ))
        : (Object.keys(EXERCISE_CATEGORIES) as ExerciseCategory[]).map((cat) => (
            <section key={cat} aria-label={EXERCISE_CATEGORIES[cat]} className="space-y-2">
              <h2 className="h-display text-base">{EXERCISE_CATEGORIES[cat]}</h2>
              {EXERCISES.filter((e) => e.category === cat).map((e) => (
                <Accordion key={e.id} title={e.title} subtitle={e.duration}>
                  <ol className="list-decimal space-y-1 pl-5 text-sm">
                    {e.steps.map((s, i) => <li key={i}>{s}</li>)}
                  </ol>
                  <p className="muted mt-2 text-xs">Pourquoi : {e.why}</p>
                </Accordion>
              ))}
            </section>
          ))}
      <p className="muted text-center text-xs">Ces fiches complètent les consignes de ton entraîneur, elles ne les remplacent pas. Douleur qui dure : on en parle à un adulte.</p>
    </div>
  );
}
