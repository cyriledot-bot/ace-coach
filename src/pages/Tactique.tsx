import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Brain, ExternalLink } from "lucide-react";
import { Accordion, Badge, Button, Card, CardTitle, ErrorNote, Field } from "@/components/ui";
import { BadgeToast } from "@/components/BadgeToast";
import { CourtDiagram } from "@/components/CourtDiagram";
import { ANALYSE_METHODE, INDICATORS, PATTERNS, PRINCIPLES, PROGRESSION, SOURCE_TACTIQUE } from "@/data/tactique";
import { QUESTIONS } from "@/data/questions";
import { useStore, XP_PLAN } from "@/store/useStore";
import { formatDate } from "@/lib/dates";
import { todayKey } from "@/lib/utils";

function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);
}

function PlanDeMatch() {
  const { plans, addPlan, deletePlan } = useStore();
  const [date, setDate] = useState(todayKey());
  const [opponent, setOpponent] = useState("");
  const [weapon, setWeapon] = useState("");
  const [weakness, setWeakness] = useState("");
  const [planA, setPlanA] = useState("");
  const [planB, setPlanB] = useState("");
  const [bigPoints, setBigPoints] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function save() {
    if (!weapon.trim() || !weakness.trim()) return setError("Ton arme et son point faible : ce sont les deux lignes qui font le plan.");
    if (!planA.trim() || !planB.trim()) return setError("Un plan A et un plan B, une phrase chacun.");
    setError(null);
    await addPlan({ date, opponent: opponent.trim(), weapon: weapon.trim(), opponentWeakness: weakness.trim(), planA: planA.trim(), planB: planB.trim(), bigPoints: bigPoints.trim() });
    setOpponent(""); setWeapon(""); setWeakness(""); setPlanA(""); setPlanB(""); setBigPoints("");
    setSaved(true);
  }

  return (
    <section id="plan" className="space-y-3 scroll-mt-4">
      <div>
        <h2 className="h-display text-lg">Mon plan de match</h2>
        <p className="muted text-sm">À écrire la veille ou dans le vestiaire. Trois phrases suffisent ; tu les relis à chaque changement de côté.</p>
      </div>
      <Card className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date du match">
            <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Adversaire">
            <input className="input" value={opponent} onChange={(e) => setOpponent(e.target.value)} maxLength={60} placeholder="Prénom N." />
          </Field>
        </div>
        <Field label="Mon arme à imposer" hint="Le coup ou le schéma qui gagne mes points.">
          <input className="input" value={weapon} onChange={(e) => setWeapon(e.target.value)} maxLength={120} placeholder="Ex. : coup droit croisé lifté, haut et long" />
        </Field>
        <Field label="Son point faible à viser" hint="Repéré à l’échauffement ou au match précédent.">
          <input className="input" value={weakness} onChange={(e) => setWeakness(e.target.value)} maxLength={120} placeholder="Ex. : revers haut, il recule et remet court" />
        </Field>
        <Field label="Plan A" hint="Mon arme contre son point faible, en une phrase.">
          <input className="input" value={planA} onChange={(e) => setPlanA(e.target.value)} maxLength={160} placeholder="Ex. : tout croisé sur son revers, j’attaque la balle courte" />
        </Field>
        <Field label="Plan B" hint="Et s’il contre le plan A ?">
          <input className="input" value={planB} onChange={(e) => setPlanB(e.target.value)} maxLength={160} placeholder="Ex. : plus haut, plus lent, au centre ; balle courte puis lob" />
        </Field>
        <Field label="Sur les points importants" hint="Ce que je fais à 30-30, 30-40, 5-5.">
          <input className="input" value={bigPoints} onChange={(e) => setBigPoints(e.target.value)} maxLength={160} placeholder="Ex. : routine complète, première balle slicée sur le revers, +1 au centre" />
        </Field>
        {error && <ErrorNote>{error}</ErrorNote>}
        <Button className="w-full" onClick={save}>Enregistrer le plan (+{XP_PLAN} XP)</Button>
        {saved && <p className="text-center text-xs text-emerald-300">Plan enregistré. Après le match, tu pourras le rattacher à la fiche match.</p>}
      </Card>
      {plans.length > 0 && (
        <ul className="space-y-2">
          {plans.map((p) => (
            <li key={p.id} className="card p-4 text-sm">
              <div className="mb-1 flex items-center justify-between">
                <Badge variant="blue">{formatDate(p.date, "d MMM yyyy")}</Badge>
                <span className="muted text-xs">{p.opponent || "adversaire"}</span>
              </div>
              <p><span className="text-ball-300">Arme :</span> {p.weapon}</p>
              <p><span className="text-ball-300">Son point faible :</span> {p.opponentWeakness}</p>
              <p className="mt-1"><span className="font-semibold">A ·</span> {p.planA}</p>
              <p><span className="font-semibold">B ·</span> {p.planB}</p>
              {p.bigPoints && <p><span className="font-semibold">Points importants ·</span> {p.bigPoints}</p>}
              <div className="mt-2 text-right">
                <button type="button" className="text-xs text-white/40 hover:text-red-300" onClick={() => deletePlan(p.id)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function TactiquePage() {
  const navigate = useNavigate();
  useScrollToHash();
  return (
    <div className="space-y-6">
      <header className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Retour" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <p className="muted text-sm">Espace coach</p>
          <h1 className="h-display text-2xl">Tactique</h1>
        </div>
      </header>

      <Card className="flex items-start gap-3">
        <Brain className="mt-0.5 h-5 w-5 shrink-0 text-ball-300" aria-hidden="true" />
        <div className="text-sm">
          <p>Le même tennis gagne plus de matchs quand il est joué avec un plan. Dix principes, trois schémas, une méthode pour lire tes matchs, et ton plan à écrire avant chaque rencontre.</p>
          <p className="muted mt-2 text-xs">
            {SOURCE_TACTIQUE.note}{" "}
            <a href={SOURCE_TACTIQUE.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ball-300 underline">
              {SOURCE_TACTIQUE.nom} <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </p>
        </div>
      </Card>

      <section id="principes" className="space-y-2 scroll-mt-4">
        <h2 className="h-display text-lg">Les principes</h2>
        {PRINCIPLES.map((p, i) => {
          const quiz = p.quizId ? QUESTIONS.find((q) => q.id === p.quizId) : undefined;
          return (
            <Accordion key={p.id} title={`${i + 1}. ${p.title}`} subtitle={p.rule}>
              <p className="text-sm">{p.why}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ball-300">Sur le court</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                {p.onCourt.map((s, j) => <li key={j}>{s}</li>)}
              </ul>
              {quiz && <p className="muted mt-3 text-xs">Révisé par une question du quiz : « {quiz.question} »</p>}
            </Accordion>
          );
        })}
      </section>

      <section id="schemas" className="space-y-3 scroll-mt-4">
        <h2 className="h-display text-lg">Trois schémas à dessiner dans ta tête</h2>
        {PATTERNS.map((pat) => (
          <Card key={pat.id}>
            <CardTitle className="text-base">{pat.title}</CardTitle>
            <p className="muted mb-2 text-xs">{pat.caption}</p>
            <CourtDiagram pattern={pat} />
          </Card>
        ))}
      </section>

      <section id="analyse" className="space-y-3 scroll-mt-4">
        <h2 className="h-display text-lg">{ANALYSE_METHODE.title}</h2>
        <Card>
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            {ANALYSE_METHODE.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <Link to="/matchs/nouveau" className="mt-3 block text-sm text-ball-300 underline">Ouvrir une fiche match</Link>
        </Card>
        <div className="space-y-2">
          {INDICATORS.map((ind) => (
            <Accordion key={ind.id} title={ind.name} subtitle={ind.howToCount}>
              <p className="text-sm"><span className="font-semibold text-ball-300">Ce que ça dit :</span> {ind.meaning}</p>
              <p className="mt-2 text-sm"><span className="font-semibold text-ball-300">L’exercice :</span> {ind.drill}</p>
            </Accordion>
          ))}
        </div>
      </section>

      <section id="progression" className="space-y-2 scroll-mt-4">
        <h2 className="h-display text-lg">{PROGRESSION.title}</h2>
        <Card>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {PROGRESSION.points.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <Link to="/coach/tutos" className="mt-3 block text-sm text-ball-300 underline">Voir les méthodes dans les tutos hors court</Link>
        </Card>
      </section>

      <PlanDeMatch />
      <BadgeToast />
    </div>
  );
}
