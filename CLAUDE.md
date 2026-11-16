# Ace Coach — consignes de projet

Application tennis pour un joueur de 13-17 ans (quiz, carnet, matchs, stats,
espace coach). Lire `README.md` (état, commandes, invariants) puis
**`PLAN_AMELIORATION.md`** (ce qui est prévu, par priorité, avec le critère
« c'est fait »). Barrer les items du plan au fur et à mesure, avec la date.

## Règles

- `npm test` et `npm run build` verts avant tout commit ; un passage navigateur
  (Playwright est pré-installé dans les sessions cloud) sur les pages touchées.
- Compatibilité des sauvegardes : clé `ace-coach:v1`, champs nouveaux
  facultatifs, identifiants de questions et codes de badges jamais renommés.
  `tests/store.test.ts` relit une sauvegarde du 25/10 ; ne pas l'affaiblir.
- Publication : `dist/index.html` + `dist/icons/` sur l'artefact
  https://claude.ai/artifact/Y1NvVLJdj7FjCisf1PGETv (même URL, sinon les
  données de l'utilisateur ne sont plus sous la page). Copier aussi les
  sources modifiées sous `source/` de l'artefact.
- Contenu pour adolescent : poids du corps ou élastique, jamais de charge
  lourde ; une douleur qui dure se dit à un adulte ; chiffres non sourcés
  refusés (les pourcentages du blog Sam Tennis ne sont pas repris).
- Jamais d'identifiant ni de mot de passe (Ten'Up ou autre) : import par
  copier-coller uniquement.
- Format : réponses concises, français, une tâche par session.
