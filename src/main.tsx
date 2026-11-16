import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";
import { Layout } from "@/components/Layout";
import { useStore } from "@/store/useStore";
import { HomePage } from "@/pages/Home";
import { QuizPage } from "@/pages/Quiz";
import { CarnetPage, NewWorkoutPage } from "@/pages/Carnet";
import { MatchsPage, NewMatchPage } from "@/pages/Matchs";
import { StatsPage } from "@/pages/Stats";
import { ProfilPage } from "@/pages/Profil";
import { ConseilsPage } from "@/pages/Conseils";
import { CoachPage } from "@/pages/Coach";
import { TactiquePage } from "@/pages/Tactique";
import { TutosPage } from "@/pages/Tutos";

function App() {
  const ready = useStore((s) => s.ready);
  const init = useStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);
  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center" role="status" aria-live="polite">
        <p className="muted animate-pulse">Chargement de ton coach…</p>
      </div>
    );
  }
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="carnet" element={<CarnetPage />} />
          <Route path="carnet/nouvelle" element={<NewWorkoutPage />} />
          <Route path="matchs" element={<MatchsPage />} />
          <Route path="matchs/nouveau" element={<NewMatchPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="profil" element={<ProfilPage />} />
          <Route path="conseils" element={<ConseilsPage />} />
          <Route path="coach" element={<CoachPage />} />
          <Route path="coach/tactique" element={<TactiquePage />} />
          <Route path="coach/tutos" element={<TutosPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
