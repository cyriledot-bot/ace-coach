import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, NotebookPen } from "lucide-react";
import { Accordion, Button } from "@/components/ui";
import { TUTOS, TUTO_CATEGORIES, type Tuto, type TutoCategory } from "@/data/tutos";
import { cn } from "@/lib/utils";

const TABS = Object.keys(TUTO_CATEGORIES) as TutoCategory[];

/** Lien vers le carnet pré-rempli : une séance physique, la durée du tuto, le titre en point positif. */
export function carnetLinkFor(t: Tuto): string {
  const q = new URLSearchParams({ type: "physique", duree: String(t.durationMin), positif: t.title });
  return `/carnet/nouvelle?${q.toString()}`;
}

function TutoCard({ t }: { t: Tuto }) {
  return (
    <Accordion title={t.title} subtitle={`${t.duration}${t.frequency ? ` · ${t.frequency}` : ""}`}>
      <p className="mb-3 text-sm">{t.summary}</p>
      <p className="muted mb-2 text-xs">Matériel : {t.equipment}</p>
      <ol className="list-decimal space-y-2 pl-5 text-sm">
        {t.steps.map((s, i) => (
          <li key={i}>
            {s.text}
            {s.dose && <span className="ml-1 rounded-md bg-white/10 px-1.5 py-0.5 text-xs font-semibold text-ball-200">{s.dose}</span>}
          </li>
        ))}
      </ol>
      <p className="muted mt-3 text-xs">Pourquoi : {t.why}</p>
      {t.caution && <p className="mt-2 rounded-xl bg-amber-500/10 px-3 py-2 text-xs text-amber-200">⚠️ {t.caution}</p>}
      {t.durationMin > 0 && (
        <Link to={carnetLinkFor(t)} className="mt-3 block">
          <Button size="sm" variant="outline" className="w-full">
            <NotebookPen className="h-4 w-4" aria-hidden="true" /> Noter cette séance au carnet (+10 XP)
          </Button>
        </Link>
      )}
    </Accordion>
  );
}

export function TutosPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TutoCategory>("renforcement");
  const items = TUTOS.filter((t) => t.category === tab);
  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Retour" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <p className="muted text-sm">Espace coach</p>
          <h1 className="h-display text-2xl">Tutos hors court</h1>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-1 rounded-2xl bg-white/5 p-1" role="tablist">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("tap rounded-xl px-1 py-2 text-xs font-semibold leading-tight", tab === t ? "bg-ball-400 text-ink-950" : "text-white/70")}>
            {TUTO_CATEGORIES[t].label}
          </button>
        ))}
      </div>
      <p className="muted text-sm">{TUTO_CATEGORIES[tab].intro}</p>
      <section aria-label={TUTO_CATEGORIES[tab].label} className="space-y-2">
        {items.map((t) => <TutoCard key={t.id} t={t} />)}
      </section>
      <p className="muted text-center text-xs">Poids du corps et élastique seulement pendant la croissance. Une douleur qui dure se dit à un adulte, et au médecin si elle revient.</p>
    </div>
  );
}
