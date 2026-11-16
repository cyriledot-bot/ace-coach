import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui";
import { BADGES } from "@/data/badges";
import { useStore } from "@/store/useStore";

/** Toast de badge, partagé par les pages qui peuvent en débloquer (carnet, matchs, tactique). */
export function BadgeToast() {
  const fresh = useStore((s) => s.freshBadges);
  const clear = useStore((s) => s.clearFreshBadges);
  const badge = fresh.length ? BADGES.find((b) => b.code === fresh[0]) : undefined;
  return (
    <AnimatePresence>
      {badge && (
        <motion.div key="badge" role="status" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-md">
          <div className="card card-glow flex items-center gap-3 p-4">
            <span className="animate-pop text-3xl" aria-hidden="true">{badge.icon}</span>
            <div className="flex-1">
              <p className="font-semibold">Badge débloqué : {badge.name}</p>
              <p className="muted text-xs">{badge.description}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={clear} aria-label="Fermer">OK</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
