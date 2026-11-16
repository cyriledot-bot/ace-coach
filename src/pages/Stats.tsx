import { useMemo } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { addWeeks, endOfWeek, format, parseISO, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";
import { fr } from "date-fns/locale";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button, Card, CardDescription, CardTitle } from "@/components/ui";
import { useStore } from "@/store/useStore";

const COLORS = {
  win: "#c6ea11",
  loss: "#f87171",
  plaisir: "#c6ea11",
  concentration: "#60a5fa",
  mental: "#fbbf24",
  grid: "rgba(255,255,255,.08)",
  axis: "rgba(255,255,255,.55)",
};
const TOOLTIP = { background: "#0b1230", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12 };
const tick = (size: number) => ({ fill: COLORS.axis, fontSize: size });

export function StatsPage() {
  const navigate = useNavigate();
  const { workouts, matches } = useStore();

  const byMonth = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => startOfMonth(subMonths(now, 5 - i))).map((m) => {
      const key = format(m, "yyyy-MM");
      const ms = matches.filter((x) => x.date.startsWith(key));
      return { mois: format(m, "MMM", { locale: fr }), victoires: ms.filter((x) => x.result === "victoire").length, defaites: ms.filter((x) => x.result !== "victoire").length };
    });
  }, [matches]);

  const byWeek = useMemo(() => {
    const first = startOfWeek(subWeeks(new Date(), 7), { weekStartsOn: 1 });
    return Array.from({ length: 8 }, (_, i) => {
      const start = addWeeks(first, i);
      const end = endOfWeek(start, { weekStartsOn: 1 });
      const ws = workouts.filter((w) => {
        const d = parseISO(w.date);
        return d >= start && d <= end;
      });
      const avg = (f: (w: (typeof ws)[number]) => number) => (ws.length ? Math.round((ws.reduce((t, w) => t + f(w), 0) / ws.length) * 10) / 10 : null);
      return {
        semaine: format(start, "d MMM", { locale: fr }),
        heures: Math.round(ws.reduce((t, w) => t + w.durationMin, 0) / 6) / 10,
        plaisir: avg((w) => w.plaisir),
        concentration: avg((w) => w.concentration),
      };
    });
  }, [workouts]);

  const mental = useMemo(
    () =>
      [...matches]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-10)
        .map((m, i) => ({ n: i + 1, date: format(parseISO(m.date), "d/M"), mental: m.mentalScore, victoire: +(m.result === "victoire") })),
    [matches],
  );

  const empty = workouts.length === 0 && matches.length === 0;

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Retour" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <p className="muted text-sm">Suivi</p>
          <h1 className="h-display text-2xl">Mes statistiques</h1>
        </div>
      </header>
      {empty && (
        <Card className="text-center">
          <p className="muted text-sm">Les graphiques se remplissent avec tes séances et tes matchs. Commence par en noter un.</p>
        </Card>
      )}
      <Card>
        <CardTitle className="text-base">Victoires et défaites</CardTitle>
        <CardDescription className="mb-3">Six derniers mois.</CardDescription>
        <div className="h-48" role="img" aria-label="Victoires et défaites par mois">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byMonth} margin={{ left: -24, right: 4 }}>
              <CartesianGrid stroke={COLORS.grid} vertical={false} />
              <XAxis dataKey="mois" tick={tick(12)} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={tick(12)} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="victoires" name="Victoires" stackId="a" fill={COLORS.win} radius={[4, 4, 0, 0]} />
              <Bar dataKey="defaites" name="Défaites" stackId="a" fill={COLORS.loss} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <CardTitle className="text-base">Volume d’entraînement</CardTitle>
        <CardDescription className="mb-3">Heures par semaine, huit dernières semaines.</CardDescription>
        <div className="h-48" role="img" aria-label="Heures d'entraînement par semaine">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byWeek} margin={{ left: -24, right: 4 }}>
              <CartesianGrid stroke={COLORS.grid} vertical={false} />
              <XAxis dataKey="semaine" tick={tick(11)} axisLine={false} tickLine={false} />
              <YAxis tick={tick(12)} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP} />
              <Bar dataKey="heures" name="Heures" fill={COLORS.concentration} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <CardTitle className="text-base">État d’esprit à l’entraînement</CardTitle>
        <CardDescription className="mb-3">Plaisir et concentration moyens par semaine, de 1 à 5.</CardDescription>
        <div className="h-48" role="img" aria-label="Plaisir et concentration par semaine">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={byWeek} margin={{ left: -24, right: 4 }}>
              <CartesianGrid stroke={COLORS.grid} vertical={false} />
              <XAxis dataKey="semaine" tick={tick(11)} axisLine={false} tickLine={false} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={tick(12)} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="plaisir" name="Plaisir" stroke={COLORS.plaisir} strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
              <Line type="monotone" dataKey="concentration" name="Concentration" stroke={COLORS.concentration} strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <CardTitle className="text-base">Mental en match</CardTitle>
        <CardDescription className="mb-3">Ton attitude mentale auto-évaluée sur les dix derniers matchs.</CardDescription>
        <div className="h-48" role="img" aria-label="Note mentale par match">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mental} margin={{ left: -24, right: 4 }}>
              <CartesianGrid stroke={COLORS.grid} vertical={false} />
              <XAxis dataKey="date" tick={tick(11)} axisLine={false} tickLine={false} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={tick(12)} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP} />
              <Line type="monotone" dataKey="mental" name="Mental" stroke={COLORS.mental} strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
