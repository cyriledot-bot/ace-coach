import type { Pattern } from "@/data/tactique";

/**
 * Court vu de dessus, 100 × 200 (largeur × longueur), moi en bas.
 * Les tirs sont des flèches numérotées dans l'ordre du schéma.
 */
export function CourtDiagram({ pattern }: { pattern: Pattern }) {
  const line = "rgba(255,255,255,.55)";
  return (
    <svg viewBox="-6 -12 112 228" className="mx-auto h-56 w-auto" role="img" aria-label={`Schéma : ${pattern.title}`}>
      <defs>
        <marker id={`arrow-${pattern.id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d4f22e" />
        </marker>
      </defs>
      {/* terrain : couloirs à 0-12 et 88-100, carrés de service entre 60 et 140, ligne médiane à 100 */}
      <rect x="0" y="0" width="100" height="200" fill="#2563eb22" stroke={line} strokeWidth="1.2" />
      <line x1="12" y1="0" x2="12" y2="200" stroke={line} strokeWidth="0.8" />
      <line x1="88" y1="0" x2="88" y2="200" stroke={line} strokeWidth="0.8" />
      <line x1="12" y1="60" x2="88" y2="60" stroke={line} strokeWidth="0.8" />
      <line x1="12" y1="140" x2="88" y2="140" stroke={line} strokeWidth="0.8" />
      <line x1="50" y1="60" x2="50" y2="140" stroke={line} strokeWidth="0.8" />
      <line x1="0" y1="100" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.6" strokeDasharray="2 1.5" />
      {pattern.shots.map((s, i) => {
        const [x1, y1] = s.from;
        const [x2, y2] = s.to;
        const t = s.at ?? 0.5;
        const mx = x1 + (x2 - x1) * t;
        const my = y1 + (y2 - y1) * t;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d4f22e" strokeWidth="1.8" strokeOpacity={0.9} markerEnd={`url(#arrow-${pattern.id})`} />
            <circle cx={mx} cy={my} r={s.label.length > 2 ? 7 : 6} fill="#070b1a" stroke="#d4f22e" strokeWidth="1" />
            <text x={mx} y={my + 2.2} textAnchor="middle" fontSize={s.label.length > 2 ? 4.6 : 7} fontWeight="700" fill="#e8ff5a">{s.label}</text>
          </g>
        );
      })}
      <circle cx={pattern.shots[0].from[0]} cy={pattern.shots[0].from[1]} r="4" fill="#e8ff5a" />
      <text x="50" y="210" textAnchor="middle" fontSize="6" fill={line}>moi</text>
      <text x="50" y="-4" textAnchor="middle" fontSize="6" fill={line}>adversaire</text>
    </svg>
  );
}
