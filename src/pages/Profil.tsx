import { useState } from "react";
import { Link } from "react-router";
import { ChartColumn, ExternalLink, Flame, Target } from "lucide-react";
import { Badge, Button, Card, CardDescription, CardHeader, CardTitle, ProgressBar } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { levelFor } from "@/data/levels";
import { BADGES } from "@/data/badges";
import { cn } from "@/lib/utils";

export const APP_URL = "https://claude.ai/artifact/Y1NvVLJdj7FjCisf1PGETv";

function SmallField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="muted mb-1 block text-xs">{label}</span>
      {children}
    </label>
  );
}

export function ProfilPage() {
  const { profile, badges, updateProfile, repoKind } = useStore();
  const { current, next, progress } = levelFor(profile.xp);
  const [editing, setEditing] = useState(false);
  const [pseudo, setPseudo] = useState(profile.pseudo);
  const [ranking, setRanking] = useState(profile.ranking ?? "");
  const [goals, setGoals] = useState(profile.goals);

  async function save() {
    await updateProfile({ pseudo: pseudo.trim() || "Joueur", ranking: ranking.trim() || undefined, goals: goals.trim() });
    setEditing(false);
  }

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between">
        <div>
          <p className="muted text-sm">Profil</p>
          <h1 className="h-display text-2xl">{profile.pseudo}</h1>
          {profile.ranking && <Badge variant="blue" className="mt-1">Classement {profile.ranking}</Badge>}
        </div>
        <Button size="sm" variant="secondary" onClick={() => setEditing((e) => !e)}>{editing ? "Annuler" : "Modifier"}</Button>
      </header>
      {editing && (
        <Card className="space-y-3">
          <SmallField label="Pseudo"><input className="input" value={pseudo} onChange={(e) => setPseudo(e.target.value)} maxLength={40} /></SmallField>
          <SmallField label="Classement (ex. 30/2)"><input className="input" value={ranking} onChange={(e) => setRanking(e.target.value)} maxLength={10} /></SmallField>
          <SmallField label="Mes objectifs de la saison"><textarea className="input min-h-20" value={goals} onChange={(e) => setGoals(e.target.value)} maxLength={400} /></SmallField>
          <Button className="w-full" onClick={save}>Enregistrer</Button>
        </Card>
      )}
      <Card>
        <CardHeader>
          <div>
            <CardDescription>Niveau {current.level}</CardDescription>
            <CardTitle>{current.name}</CardTitle>
          </div>
          <p className="h-display text-xl text-ball-300 tabular-nums">{profile.xp} XP</p>
        </CardHeader>
        <ProgressBar value={progress} label="Progression vers le niveau suivant" />
        {next && <p className="muted mt-2 text-xs">Prochain niveau « {next.name} » à {next.minXp} XP.</p>}
      </Card>
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 text-center">
          <Flame className="mx-auto mb-1 h-5 w-5 text-orange-400" aria-hidden="true" />
          <p className="h-display text-xl tabular-nums">{profile.streakCurrent}</p>
          <p className="muted text-xs">jours de suite</p>
        </Card>
        <Card className="p-3 text-center">
          <Target className="mx-auto mb-1 h-5 w-5 text-ball-300" aria-hidden="true" />
          <p className="h-display text-xl tabular-nums">{profile.streakBest}</p>
          <p className="muted text-xs">meilleure série</p>
        </Card>
      </div>
      {profile.goals && (
        <Card>
          <CardTitle className="mb-1 text-base">Mes objectifs</CardTitle>
          <p className="whitespace-pre-line text-sm">{profile.goals}</p>
        </Card>
      )}
      <section aria-labelledby="badges">
        <h2 id="badges" className="h-display mb-2 text-lg">
          Badges <span className="muted text-sm font-normal">{badges.length}/{BADGES.length}</span>
        </h2>
        <ul className="grid grid-cols-3 gap-2">
          {BADGES.map((b) => {
            const has = badges.includes(b.code);
            return (
              <li key={b.code} className={cn("card p-3 text-center", !has && "opacity-40 grayscale")} title={b.description}>
                <p className="text-2xl" aria-hidden="true">{b.icon}</p>
                <p className="mt-1 text-[11px] font-medium leading-tight">{b.name}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <Link to="/stats" className="block">
        <Button variant="secondary" className="w-full"><ChartColumn className="h-4 w-4" aria-hidden="true" /> Mes statistiques</Button>
      </Link>
      <Card className="text-center">
        <p className="text-sm font-medium">Installer l’application</p>
        <p className="muted mb-2 text-xs">Ouvre ce lien sur ton téléphone, puis « Ajouter à l’écran d’accueil ».</p>
        <a href={APP_URL} className="inline-flex items-center gap-1 break-all text-sm text-ball-300 underline">
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />{APP_URL}
        </a>
      </Card>
      <p className="muted text-center text-xs">{repoKind === "local" ? "Données enregistrées sur cet appareil uniquement." : "Données synchronisées avec ton compte."}</p>
    </div>
  );
}
