# Ace Coach

Coach tennis quotidien pour un joueur de 13-17 ans : quiz du jour, carnet
d’entraînement, fiches match, statistiques, espace coach (tactique, tutos hors
court, conseils et exercices). Application mobile-first, hors ligne, données
sur l’appareil (`localStorage`, clé `ace-coach:v1`).

Publiée comme page unique : https://claude.ai/artifact/Y1NvVLJdj7FjCisf1PGETv

## Historique

- **25/10/2026** — première version (quiz, carnet, matchs, stats, profil,
  conseils). Son code source n’a pas été conservé ; seul le bundle publié
  existait.
- **16/11/2026** — code source **reconstruit** depuis le bundle publié
  (même clé de stockage, même schéma, mêmes contenus repris à l’identique :
  22 questions, 21 messages, 9 conseils, 15 exercices, 14 badges, 8 niveaux),
  puis étendu :
  - onglet **Coach** dans la navigation (6 entrées au lieu de 5) ;
  - **Tactique** : 10 principes adaptés du blog Sam Tennis, 3 schémas dessinés
    (court SVG), méthode d’analyse de match (5 indicateurs → exercice),
    progression « une seule priorité », et un **plan de match** à écrire avant
    de jouer (arme, point faible adverse, plan A, plan B, points importants),
    rattachable ensuite à la fiche match ;
  - **Tutos hors court** : 14 fiches en trois catégories (renforcement au
    poids du corps, yoga et mobilité, conseils et méthodes), chacune notable au
    carnet en un geste (séance physique pré-remplie) ;
  - **fiche match** : trois chiffres facultatifs (1ʳᵉˢ balles %, doubles
    fautes, fautes directes) ;
  - 9 questions tactiques de plus au quiz (tac-08 à tac-16), 3 badges de plus.

## Développement

```bash
npm install
npm run dev        # serveur de développement
npm test           # vitest : contenu + store (compatibilité des sauvegardes du 25/10)
npm run build      # tsc --noEmit puis vite build → dist/index.html (fichier unique) + dist/icons/
```

Stack : Vite 7, React 19, TypeScript, Tailwind 3, react-router 7 (HashRouter,
comme l’original), zustand, motion, recharts, lucide-react, date-fns.

## Invariants

- La clé `ace-coach:v1` et la forme de la sauvegarde ne changent pas ; tout
  champ nouveau est facultatif (`plans`, `firstServePct`, `doubleFaults`,
  `unforcedErrors`, `planId`). `tests/store.test.ts` relit une sauvegarde du
  25/10 telle quelle.
- Les codes des 14 premiers badges et les identifiants des 22 premières
  questions sont stockés chez l’utilisateur : ne jamais les renommer.
- Contenu pour adolescents : poids du corps ou élastique seulement, jamais de
  charge lourde (un test l’interdit) ; une douleur qui dure se dit à un adulte.
- Les chiffres du blog Sam Tennis (pourcentages non sourcés) ne sont pas
  repris ; seuls les principes le sont, reformulés, avec attribution.
