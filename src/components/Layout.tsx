import { NavLink, Outlet } from "react-router";
import { Brain, GraduationCap, House, NotebookPen, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Accueil", icon: House, end: true },
  { to: "/quiz", label: "Quiz", icon: Brain },
  { to: "/coach", label: "Coach", icon: GraduationCap },
  { to: "/carnet", label: "Carnet", icon: NotebookPen },
  { to: "/matchs", label: "Matchs", icon: Trophy },
  { to: "/profil", label: "Profil", icon: User },
];

function BottomNav() {
  return (
    <nav aria-label="Navigation principale" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/85 backdrop-blur-xl" style={{ paddingBottom: "var(--safe-bottom)" }}>
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-1">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn("flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors", isActive ? "text-ball-300" : "text-white/55 hover:text-white")
              }
            >
              {({ isActive }) => (
                <>
                  <span className={cn("rounded-xl px-2.5 py-1 transition-colors", isActive && "bg-ball-400/15")}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Layout() {
  return (
    <div className="min-h-dvh">
      <main className="page">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
