import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChartColumn, ChevronRight, Clock, Dumbbell, Flame, GraduationCap, Plus, Sparkles, Trophy, Zap } from "lucide-react";
import { parseISO } from "date-fns";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, ProgressBar } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useDaily } from "@/store/useDaily";
import { levelFor } from "@/data/levels";
import { QUIZ_CATEGORIES } from "@/data/questions";
import { WORKOUT_TYPES } from "@/data/labels";
import { formatDate } from "@/lib/dates";

function Stat({ icon: Icon, value, label }: { icon: typeof Clock; value: string; label: string }) {
  return (
    <div className="card p-3 text-center">
      <Icon className="mx-auto mb-1 h-4 w-4 text-white/50" aria-hidden="true" />
      <p className="h-display text-lg tabular-nums">{value}</p>
      <p className="muted text-[11px]">{label}</p>
    </div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const { profile, workouts, matches, plans } = useStore();
  const { question, message, answered } = useDaily();
  const { current, next, progress } = levelFor(profile.xp);
  const recent = workouts.slice(0, 3);
  const weekMin = workouts.filter((w) => Date.now() - parseISO(w.date).getTime() < 7 * 864e5).reduce((t, w) => t + w.durationMin, 0);
  const wins = matches.filter((m) => m.result === "victoire").length;
  const upcomingPlan = plans.find((p) => p.date >= new Date().toISOString().slice(0, 10));

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="muted text-sm">Salut {profile.pseudo} 👋</p>
          <h1 className="h-display text-2xl">Ton tennis du jour</h1>
        </div>
        <Link to="/profil" className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm" aria-label="Série et niveau">
          <Flame className={profile.streakCurrent > 0 ? "h-5 w-5 text-orange-400" : "h-5 w-5 text-white/40"} aria-hidden="true" />
          <span className="font-semibold tabular-nums">{profile.streakCurrent}</span>
        </Link>
      </header>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card flex items-start gap-3 p-4">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-ball-300" aria-hidden="true" />
        <p className="text-sm leading-relaxed">{message}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card glow={!answered}>
          <CardHeader>
            <div>
              <Badge>{QUIZ_CATEGORIES[question.category]}</Badge>
              <CardTitle className="mt-2">Quiz du jour</CardTitle>
            </div>
            {answered ? <Badge variant={answered.correct ? "success" : "neutral"}>{answered.correct ? "Réussi" : "Vu"}</Badge> : <Badge variant="blue">+XP</Badge>}
          </CardHeader>
          <CardContent>
            <p className="mb-4 font-medium leading-snug">{question.question}</p>
            <Button className="w-full" variant={answered ? "secondary" : "default"} onClick={() => navigate("/quiz")}>
              {answered ? "Relire l’explication" : "Répondre maintenant"} <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {upcomingPlan && (
        <Link to="/coach/tactique#plan" className="card flex items-center gap-3 p-4">
          <Zap className="h-5 w-5 shrink-0 text-ball-300" aria-hidden="true" />
          <div className="flex-1 text-sm">
            <p className="font-semibold">Plan de match prêt : {upcomingPlan.opponent || "prochain match"}</p>
            <p className="muted text-xs">Plan A : {upcomingPlan.planA}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-white/40" aria-hidden="true" />
        </Link>
      )}

      <Card>
        <CardHeader>
          <div>
            <CardDescription>Niveau {current.level}</CardDescription>
            <CardTitle>{current.name}</CardTitle>
          </div>
          <div className="text-right">
            <p className="h-display text-xl text-ball-300 tabular-nums">{profile.xp} XP</p>
            {next && <p className="muted text-xs">{next.minXp - profile.xp} XP avant « {next.name} »</p>}
          </div>
        </CardHeader>
        <ProgressBar value={progress} label="Progression vers le niveau suivant" />
      </Card>

      <Link to="/stats" className="grid grid-cols-3 gap-3" aria-label="Voir mes statistiques">
        <Stat icon={Clock} value={`${Math.round((weekMin / 60) * 10) / 10} h`} label="cette semaine" />
        <Stat icon={Dumbbell} value={String(workouts.length)} label="séances" />
        <Stat icon={Trophy} value={`${wins}/${matches.length}`} label="victoires" />
      </Link>

      <div className="grid grid-cols-2 gap-3">
        <Link to="/carnet/nouvelle">
          <Button variant="secondary" className="w-full">
            <Plus className="h-4 w-4" aria-hidden="true" /> Séance
          </Button>
        </Link>
        <Link to="/coach">
          <Button variant="secondary" className="w-full">
            <GraduationCap className="h-4 w-4" aria-hidden="true" /> Coach
          </Button>
        </Link>
      </div>

      <section aria-labelledby="recents">
        <div className="mb-2 flex items-center justify-between">
          <h2 id="recents" className="h-display text-lg">Derniers entraînements</h2>
          <Link to="/carnet" className="text-sm text-ball-300">Tout voir</Link>
        </div>
        {recent.length === 0 ? (
          <Card className="text-center">
            <p className="muted text-sm">Aucune séance notée. Trois lignes suffisent : durée, ressenti, un point positif.</p>
            <Link to="/carnet" className="mt-3 inline-block">
              <Button size="sm">Noter ma première séance</Button>
            </Link>
          </Card>
        ) : (
          <ul className="space-y-2">
            {recent.map((w) => (
              <li key={w.id} className="card flex items-center justify-between p-3">
                <div>
                  <p className="font-medium">{WORKOUT_TYPES[w.type]}</p>
                  <p className="muted text-xs">{formatDate(w.date, "EEEE d MMMM")} · {w.durationMin} min</p>
                </div>
                <div className="flex items-center gap-1 text-sm" aria-label={`plaisir ${w.plaisir} sur 5`}>
                  <Zap className="h-4 w-4 text-ball-300" aria-hidden="true" /> {w.plaisir}/5
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Link to="/stats" className="block">
        <Button variant="secondary" className="w-full">
          <ChartColumn className="h-4 w-4" aria-hidden="true" /> Statistiques
        </Button>
      </Link>
    </div>
  );
}
