import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, GraduationCap, Plus } from "lucide-react";
import { Badge, Button, Card, ChipGroup, ErrorNote, Field, PageHeader, SCORE_EMOJI, ScorePicker } from "@/components/ui";
import { BadgeToast } from "@/components/BadgeToast";
import { useStore, XP_WORKOUT } from "@/store/useStore";
import { WORKOUT_TYPES } from "@/data/labels";
import { formatDate } from "@/lib/dates";
import { todayKey } from "@/lib/utils";
import type { Score5, WorkoutType } from "@/lib/types";

export function CarnetPage() {
  const { workouts, deleteWorkout } = useStore();
  const totalMin = workouts.reduce((t, w) => t + w.durationMin, 0);
  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Carnet d’entraînement"
        title="Mes séances"
        action={
          <Link to="/carnet/nouvelle">
            <Button size="sm"><Plus className="h-4 w-4" aria-hidden="true" /> Séance</Button>
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 text-center">
          <p className="h-display text-xl tabular-nums">{workouts.length}</p>
          <p className="muted text-xs">séances notées</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="h-display text-xl tabular-nums">{Math.round(totalMin / 6) / 10} h</p>
          <p className="muted text-xs">sur le court</p>
        </Card>
      </div>
      <Card className="flex items-center gap-3">
        <GraduationCap className="h-5 w-5 shrink-0 text-ball-300" aria-hidden="true" />
        <p className="text-sm">
          Échauffements, prévention, routines mentales, renforcement et yoga : <Link to="/coach" className="text-ball-300 underline">l’espace coach</Link>.
        </p>
      </Card>
      {workouts.length === 0 ? (
        <Card className="text-center">
          <p className="muted text-sm">Rien encore. Après chaque entraînement : la durée, ce que tu as ressenti, un point positif, un axe de travail.</p>
        </Card>
      ) : (
        <ul className="space-y-2">
          {workouts.map((w) => (
            <li key={w.id} className="card p-4">
              <div className="mb-1 flex items-center justify-between">
                <Badge variant="blue">{WORKOUT_TYPES[w.type]}</Badge>
                <span className="muted text-xs">{formatDate(w.date, "d MMM yyyy")} · {w.durationMin} min</span>
              </div>
              <p className="text-sm" aria-label={`effort ${w.effort}, plaisir ${w.plaisir}, concentration ${w.concentration} sur 5`}>
                Effort {SCORE_EMOJI[w.effort]} · Plaisir {SCORE_EMOJI[w.plaisir]} · Concentration {SCORE_EMOJI[w.concentration]}
              </p>
              {w.positif && <p className="mt-2 text-sm"><span className="text-emerald-300">+</span> {w.positif}</p>}
              {w.axe && <p className="text-sm"><span className="text-ball-300">→</span> {w.axe}</p>}
              <div className="mt-2 text-right">
                <button type="button" className="text-xs text-white/40 hover:text-red-300" onClick={() => deleteWorkout(w.id)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <BadgeToast />
    </div>
  );
}

const DURATIONS = [30, 45, 60, 90, 120];

/** Pré-remplissage par l'URL : /carnet/nouvelle?type=physique&duree=15&positif=Jambes%20de%20tennis (depuis un tuto). */
function usePrefill() {
  const [params] = useSearchParams();
  const type = params.get("type");
  const duree = Number(params.get("duree"));
  return {
    type: type && type in WORKOUT_TYPES ? (type as WorkoutType) : null,
    durationMin: Number.isFinite(duree) && duree >= 5 ? duree : 60,
    positif: params.get("positif") ?? "",
  };
}

export function NewWorkoutPage() {
  const navigate = useNavigate();
  const addWorkout = useStore((s) => s.addWorkout);
  const prefill = usePrefill();
  const [date, setDate] = useState(todayKey());
  const [duration, setDuration] = useState<number | null>(prefill.durationMin);
  const [type, setType] = useState<WorkoutType | null>(prefill.type);
  const [effort, setEffort] = useState<Score5 | null>(null);
  const [plaisir, setPlaisir] = useState<Score5 | null>(null);
  const [concentration, setConcentration] = useState<Score5 | null>(null);
  const [positif, setPositif] = useState(prefill.positif);
  const [axe, setAxe] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!type) return setError("Choisis le type de séance.");
    if (!duration || duration < 5) return setError("Indique une durée (au moins 5 minutes).");
    if (!effort || !plaisir || !concentration) return setError("Les trois ressentis sont demandés : c’est ce qui rend le carnet utile.");
    setError(null);
    setBusy(true);
    try {
      await addWorkout({ date, durationMin: duration, type, effort, plaisir, concentration, positif: positif.trim(), axe: axe.trim(), notes: notes.trim() || undefined });
      navigate("/carnet");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Retour" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <p className="muted text-sm">Carnet</p>
          <h1 className="h-display text-2xl">Nouvelle séance</h1>
        </div>
      </header>
      <Card className="space-y-4">
        <Field label="Date">
          <input type="date" className="input" value={date} max={todayKey()} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Type de séance">
          <ChipGroup value={type} onChange={setType} label="Type de séance" options={(Object.keys(WORKOUT_TYPES) as WorkoutType[]).map((k) => ({ value: k, label: WORKOUT_TYPES[k] }))} />
        </Field>
        <Field label="Durée">
          <ChipGroup value={duration} onChange={setDuration} label="Durée" options={DURATIONS.map((d) => ({ value: d, label: `${d} min` }))} />
          <input type="number" inputMode="numeric" min={5} max={600} className="input mt-2" placeholder="ou une autre durée en minutes" value={duration ?? ""} onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : null)} />
        </Field>
      </Card>
      <Card className="space-y-3">
        <p className="text-sm font-medium">Mon ressenti</p>
        <ScorePicker label="Effort" value={effort} onChange={setEffort} />
        <ScorePicker label="Plaisir" value={plaisir} onChange={setPlaisir} />
        <ScorePicker label="Concentration" value={concentration} onChange={setConcentration} />
      </Card>
      <Card className="space-y-4">
        <Field label="Un point positif" hint="Ce qui a bien marché aujourd’hui, en une phrase.">
          <input className="input" value={positif} onChange={(e) => setPositif(e.target.value)} maxLength={160} placeholder="Ex. : première balle régulière côté égalité" />
        </Field>
        <Field label="Un axe d’amélioration" hint="Une seule chose à travailler la prochaine fois.">
          <input className="input" value={axe} onChange={(e) => setAxe(e.target.value)} maxLength={160} placeholder="Ex. : rester bas sur le revers slicé" />
        </Field>
        <Field label="Notes (facultatif)">
          <textarea className="input min-h-20" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} />
        </Field>
      </Card>
      {error && <ErrorNote>{error}</ErrorNote>}
      <Button size="lg" className="w-full" disabled={busy} onClick={save}>Enregistrer la séance (+{XP_WORKOUT} XP)</Button>
    </div>
  );
}
