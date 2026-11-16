import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Plus, Trophy } from "lucide-react";
import { Badge, Button, Card, ChipGroup, ErrorNote, Field, PageHeader, ScorePicker } from "@/components/ui";
import { BadgeToast } from "@/components/BadgeToast";
import { useStore, XP_MATCH } from "@/store/useStore";
import { SURFACES, TOURNAMENT_TYPES } from "@/data/labels";
import { formatDate } from "@/lib/dates";
import { todayKey } from "@/lib/utils";
import type { MatchResult, Score5, Surface, TournamentType } from "@/lib/types";

const RESULT_LABEL: Record<MatchResult, string> = { victoire: "Victoire", defaite: "Défaite", abandon: "Abandon" };
const RESULT_VARIANT: Record<MatchResult, "success" | "danger" | "neutral"> = { victoire: "success", defaite: "danger", abandon: "neutral" };

export function MatchsPage() {
  const { matches, deleteMatch, plans } = useStore();
  const wins = matches.filter((m) => m.result === "victoire").length;
  const losses = matches.length - wins;
  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Suivi des matchs"
        title="Mes matchs"
        action={
          <Link to="/matchs/nouveau">
            <Button size="sm"><Plus className="h-4 w-4" aria-hidden="true" /> Match</Button>
          </Link>
        }
      />
      <Card className="flex items-center gap-4">
        <Trophy className="h-8 w-8 text-ball-300" aria-hidden="true" />
        <div>
          <p className="h-display text-xl tabular-nums">
            {wins} victoire{wins > 1 ? "s" : ""} · {losses} défaite{losses > 1 ? "s" : ""}
          </p>
          <p className="muted text-xs">Le débrief compte plus que le score : il rapporte {XP_MATCH} XP, gagné ou perdu.</p>
        </div>
      </Card>
      {matches.length === 0 ? (
        <Card className="text-center">
          <p className="muted text-sm">Aucun match. Après le prochain : score, surface, trois chiffres et trois questions de débrief.</p>
          <Link to="/coach/tactique#plan" className="mt-2 inline-block text-sm text-ball-300 underline">Avant le match : écrire un plan</Link>
        </Card>
      ) : (
        <ul className="space-y-2">
          {matches.map((m) => {
            const plan = m.planId ? plans.find((p) => p.id === m.planId) : undefined;
            const hasStats = typeof m.firstServePct === "number" || typeof m.doubleFaults === "number" || typeof m.unforcedErrors === "number";
            return (
              <li key={m.id} className="card p-4">
                <div className="mb-1 flex items-center justify-between">
                  <Badge variant={RESULT_VARIANT[m.result]}>{RESULT_LABEL[m.result]}</Badge>
                  <span className="muted text-xs">{formatDate(m.date, "d MMM yyyy")}</span>
                </div>
                <p className="font-medium">
                  {m.score || "score non noté"}{" "}
                  <span className="muted font-normal">contre {m.opponent || "adversaire"}{m.opponentRanking ? ` (${m.opponentRanking})` : ""}</span>
                </p>
                <p className="muted text-xs">{SURFACES[m.surface]} · {TOURNAMENT_TYPES[m.tournamentType]} · mental {m.mentalScore}/5</p>
                {hasStats && (
                  <p className="mt-1 text-xs text-white/80">
                    {typeof m.firstServePct === "number" && <>1ʳᵉˢ balles {m.firstServePct} % · </>}
                    {typeof m.doubleFaults === "number" && <>doubles fautes {m.doubleFaults} · </>}
                    {typeof m.unforcedErrors === "number" && <>fautes directes ≈ {m.unforcedErrors}</>}
                  </p>
                )}
                {plan && <p className="mt-1 text-xs text-ball-300">Plan suivi : {plan.planA}</p>}
                {m.debriefGood && <p className="mt-2 text-sm"><span className="text-emerald-300">+</span> {m.debriefGood}</p>}
                {m.debriefHard && <p className="text-sm"><span className="text-red-300">−</span> {m.debriefHard}</p>}
                {m.debriefMental && <p className="text-sm"><span className="text-ball-300">🧠</span> {m.debriefMental}</p>}
                <div className="mt-2 text-right">
                  <button type="button" className="text-xs text-white/40 hover:text-red-300" onClick={() => deleteMatch(m.id)}>Supprimer</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <BadgeToast />
    </div>
  );
}

function numberOrUndefined(s: string, min: number, max: number): number | undefined {
  if (s.trim() === "") return undefined;
  const n = Number(s);
  if (!Number.isFinite(n)) return undefined;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function NewMatchPage() {
  const navigate = useNavigate();
  const addMatch = useStore((s) => s.addMatch);
  const plans = useStore((s) => s.plans);
  const [date, setDate] = useState(todayKey());
  const [opponent, setOpponent] = useState("");
  const [ranking, setRanking] = useState("");
  const [surface, setSurface] = useState<Surface | null>(null);
  const [tournament, setTournament] = useState<TournamentType | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [score, setScore] = useState("");
  const [good, setGood] = useState("");
  const [hard, setHard] = useState("");
  const [mental, setMental] = useState("");
  const [mentalScore, setMentalScore] = useState<Score5 | null>(null);
  const [firstServe, setFirstServe] = useState("");
  const [doubleFaults, setDoubleFaults] = useState("");
  const [unforced, setUnforced] = useState("");
  const [planId, setPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const recentPlans = plans.slice(0, 5);

  async function save() {
    if (!result) return setError("Victoire, défaite ou abandon ?");
    if (!surface || !tournament) return setError("Indique la surface et le type de match.");
    if (!mentalScore) return setError("Note ton attitude mentale de 1 à 5 : c’est la ligne la plus utile de la fiche.");
    setError(null);
    setBusy(true);
    try {
      await addMatch({
        date,
        opponent: opponent.trim(),
        opponentRanking: ranking.trim() || undefined,
        surface,
        tournamentType: tournament,
        result,
        score: score.trim(),
        debriefGood: good.trim(),
        debriefHard: hard.trim(),
        debriefMental: mental.trim(),
        mentalScore,
        firstServePct: numberOrUndefined(firstServe, 0, 100),
        doubleFaults: numberOrUndefined(doubleFaults, 0, 99),
        unforcedErrors: numberOrUndefined(unforced, 0, 999),
        planId: planId ?? undefined,
      });
      navigate("/matchs");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Retour" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <p className="muted text-sm">Matchs</p>
          <h1 className="h-display text-2xl">Fiche match</h1>
        </div>
      </header>
      <Card className="space-y-4">
        <Field label="Résultat">
          <ChipGroup value={result} onChange={setResult} label="Résultat" options={[{ value: "victoire", label: "Victoire" }, { value: "defaite", label: "Défaite" }, { value: "abandon", label: "Abandon" }]} />
        </Field>
        <Field label="Score" hint="Comme tu le dis : « 6-4 3-6 10-7 ».">
          <input className="input" value={score} onChange={(e) => setScore(e.target.value)} maxLength={40} placeholder="6-4 3-6 10-7" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Adversaire">
            <input className="input" value={opponent} onChange={(e) => setOpponent(e.target.value)} maxLength={60} placeholder="Prénom N." />
          </Field>
          <Field label="Son classement">
            <input className="input" value={ranking} onChange={(e) => setRanking(e.target.value)} maxLength={10} placeholder="30/1" />
          </Field>
        </div>
        <Field label="Date">
          <input type="date" className="input" value={date} max={todayKey()} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Surface">
          <ChipGroup value={surface} onChange={setSurface} label="Surface" options={(Object.keys(SURFACES) as Surface[]).map((k) => ({ value: k, label: SURFACES[k] }))} />
        </Field>
        <Field label="Type de match">
          <ChipGroup value={tournament} onChange={setTournament} label="Type de match" options={(Object.keys(TOURNAMENT_TYPES) as TournamentType[]).map((k) => ({ value: k, label: TOURNAMENT_TYPES[k] }))} />
        </Field>
        {recentPlans.length > 0 && (
          <Field label="Plan de match suivi" hint="Facultatif : le plan écrit avant ce match.">
            <ChipGroup value={planId} onChange={setPlanId} label="Plan de match" options={recentPlans.map((p) => ({ value: p.id, label: `${p.date} · ${p.opponent || "sans nom"}` }))} />
          </Field>
        )}
      </Card>
      <Card className="space-y-4">
        <div>
          <p className="text-sm font-medium">Trois chiffres</p>
          <p className="muted text-xs">Facultatifs, mais ce sont eux qui montrent les tendances après dix matchs. <Link to="/coach/tactique#analyse" className="text-ball-300 underline">Pourquoi ces trois-là</Link>.</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field label="1ʳᵉˢ balles %">
            <input className="input" type="number" inputMode="numeric" min={0} max={100} value={firstServe} onChange={(e) => setFirstServe(e.target.value)} placeholder="60" />
          </Field>
          <Field label="Doubles fautes">
            <input className="input" type="number" inputMode="numeric" min={0} max={99} value={doubleFaults} onChange={(e) => setDoubleFaults(e.target.value)} placeholder="3" />
          </Field>
          <Field label="Fautes directes">
            <input className="input" type="number" inputMode="numeric" min={0} max={999} value={unforced} onChange={(e) => setUnforced(e.target.value)} placeholder="≈ 20" />
          </Field>
        </div>
      </Card>
      <Card className="space-y-4">
        <p className="text-sm font-medium">Débrief guidé</p>
        <Field label="Ce qui a bien marché">
          <textarea className="input min-h-16" value={good} onChange={(e) => setGood(e.target.value)} maxLength={300} placeholder="Un coup, un plan, une attitude…" />
        </Field>
        <Field label="Ce qui m’a déstabilisé">
          <textarea className="input min-h-16" value={hard} onChange={(e) => setHard(e.target.value)} maxLength={300} placeholder="Son service ? Le vent ? Mon impatience ?" />
        </Field>
        <Field label="Mon attitude mentale">
          <textarea className="input min-h-16" value={mental} onChange={(e) => setMental(e.target.value)} maxLength={300} placeholder="Entre les points, après une faute, sur les points importants…" />
        </Field>
        <ScorePicker label="Mental, de 1 à 5" value={mentalScore} onChange={setMentalScore} />
      </Card>
      {error && <ErrorNote>{error}</ErrorNote>}
      <Button size="lg" className="w-full" disabled={busy} onClick={save}>Enregistrer le match (+{XP_MATCH} XP)</Button>
    </div>
  );
}
