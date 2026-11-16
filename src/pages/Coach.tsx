import { Link } from "react-router";
import { ChevronRight, Dumbbell, Lightbulb, Target } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { PRINCIPLES } from "@/data/tactique";
import { TUTOS } from "@/data/tutos";
import { EXERCISES, TIPS } from "@/data/conseils";

const ENTRIES = [
  {
    to: "/coach/tactique",
    icon: Target,
    title: "Tactique",
    text: `${PRINCIPLES.length} principes, trois schémas dessinés, la méthode d’analyse de match et ton plan de match à écrire avant de jouer.`,
  },
  {
    to: "/coach/tutos",
    icon: Dumbbell,
    title: "Tutos hors court",
    text: `${TUTOS.length} fiches : renforcement au poids du corps, yoga et mobilité, conseils et méthodes pour progresser entre deux séances.`,
  },
  {
    to: "/conseils",
    icon: Lightbulb,
    title: "Conseils et exercices",
    text: `${TIPS.length} conseils (adversaires, mental, nutrition) et ${EXERCISES.length} routines : échauffement, prévention, mental avant et pendant le match.`,
  },
];

export function CoachPage() {
  return (
    <div className="space-y-4">
      <PageHeader kicker="Espace coach" title="Pour progresser" />
      <p className="muted text-sm">Trois portes. La tactique pour gagner plus de matchs avec le même tennis, le hors-court pour un corps qui suit, les conseils pour tout le reste.</p>
      <ul className="space-y-3">
        {ENTRIES.map(({ to, icon: Icon, title, text }) => (
          <li key={to}>
            <Link to={to} className="card tap flex items-center gap-4 p-4">
              <span className="rounded-2xl bg-ball-400/15 p-3"><Icon className="h-6 w-6 text-ball-300" aria-hidden="true" /></span>
              <span className="flex-1">
                <span className="block font-semibold">{title}</span>
                <span className="muted block text-xs leading-relaxed">{text}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-white/40" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="muted text-center text-xs">Ces contenus complètent le travail avec ton entraîneur, ils ne le remplacent pas.</p>
    </div>
  );
}
