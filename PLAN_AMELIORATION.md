# Plan d'amélioration — Ace Coach

État au 16/11/2026 (commit après `8a67c26`) : 58 questions, 14 tutos,
10 principes tactiques, plan de match, 17 badges, 30 tests verts. Le plan est
classé par valeur pour le joueur divisée par le coût. Chaque item porte son
critère « c'est fait ». Barrer avec la date quand c'est livré.

## P1 — Sauvegarde et restauration des données (risque de perte)

Les données vivent dans `localStorage` d'un seul navigateur : un nettoyage
d'historique les efface. Ajouter dans Profil : « Exporter » (fichier JSON daté,
nom `ace-coach-AAAA-MM-JJ.json`) et « Importer » (fusion par identifiant,
jamais d'écrasement silencieux, aperçu du nombre de séances/matchs/plans avant
validation).
*Fait quand :* export puis import sur un navigateur vierge rend le même état,
test unitaire sur la fusion, et le profil affiche la date de la dernière
sauvegarde.

## P2 — Quiz : rotation sans répétition et mode révision

`dailyIndex` tire au hasard parmi 58 : une question peut revenir dans la même
quinzaine et certaines ne sortent jamais. Remplacer par une permutation
déterministe (graine = année) parcourue jour après jour, et ajouter un mode
« Réviser » (anciennes questions, 0 XP, badge « Réviseur » après 20).
Afficher la réussite par catégorie (tactique / culture / règlement) sur la page
quiz.
*Fait quand :* sur 58 jours consécutifs chaque question sort exactement une
fois (test), et le mode révision n'écrit jamais dans `quizHistory` du jour.

## P3 — Boucle plan de match → fiche match → relecture

- Rattacher automatiquement le plan du jour à la fiche match (même date,
  même adversaire), au lieu du choix manuel.
- Dans le débrief, une question de plus : « Plan A suivi ? » (oui / en partie /
  non) avec une phrase.
- Après 10 fiches, une carte « Ce qui revient » sur la page Stats : moyennes
  des trois chiffres, mots les plus fréquents dans « ce qui m'a déstabilisé »,
  taux de plans suivis.
*Fait quand :* un match enregistré sans choisir de plan retrouve le plan du
jour ; la carte « Ce qui revient » apparaît à partir de 10 fiches et reste
vide avant (dit explicitement).

## P4 — Tutos : programme de la semaine et minuteur

- Carte « Cette semaine » sur l'accueil : 2 renforcements + 1 mobilité
  proposés selon les séances déjà notées (jamais la veille d'un match planifié).
- Minuteur intégré dans un tuto ouvert (étape par étape, vibration en fin de
  série), pour les circuits « Jambes de tennis » et « Vitesse de pieds ».
*Fait quand :* la proposition change quand on note une séance physique ; le
minuteur fonctionne écran éteint rallumé (pas de perte d'état au retour).

## P5 — Fiches adversaires

Regrouper les fiches match par adversaire : bilan, dernier score, point faible
repéré (repris du plan de match), ce qui a marché. C'est la mémoire tactique
que l'ado n'a pas d'un tournoi à l'autre.
*Fait quand :* la page Matchs offre un filtre par adversaire et chaque
adversaire a une fiche d'une carte, alimentée sans saisie supplémentaire.

## P6 — Import Ten'Up par copier-coller

`src/lib/tenup.ts` existe (tests verts), sans écran. Il manque : la vraie page
« Mon palmarès » de Ten'Up pour caler l'analyseur, puis un écran
`/matchs/import` avec aperçu, cases à cocher, surface par défaut, et
déduplication (date + adversaire). Les matchs importés n'ont ni note mentale
ni débrief : `mentalScore` devient facultatif, les stats l'ignorent quand il
manque, le badge « Tête froide » aussi.
*Fait quand :* un collage réel importe N matchs annoncés, un second collage
n'en crée aucun en double. **Jamais d'identifiant ni de mot de passe.**

## P7 — Montre connectée

Quand la montre et le téléphone seront connus : import de l'export Garmin
Connect (durée, fréquence cardiaque moyenne, charge) dans le carnet, les trois
ressentis restant saisis à la main. Les indicateurs tactiques ne viennent pas
d'une montre (voir README, pistes notées).
*Fait quand :* un fichier d'export crée les séances manquantes sans doublon.

## P8 — Installation réelle (PWA)

Ajouter `manifest.webmanifest` et un service worker minimal (cache de la page
et des icônes) pour que Chrome/Edge proposent « Installer l'application » et
que la page s'ouvre sans réseau. Vérifier d'abord que l'hébergement artefact
sert un manifeste et autorise un service worker ; sinon, documenter le repli
(zip hors ligne, déjà testé).
*Fait quand :* l'invite d'installation apparaît sur un téléphone Android et un
PC, et la page s'ouvre en mode avion.

## P9 — Qualité continue

- ESLint (config React + TypeScript strict), `npm run lint` dans `build`.
- GitHub Actions : tests, typage, build, et le passage Playwright des 12
  routes avec des données du 25/10 (`tests/e2e`).
- Capture d'écran de référence des pages pour voir une régression visuelle.
*Fait quand :* un push rouge est visible sur GitHub avant tout merge.

## P10 — Multi-profil et partage parent

Deux profils sur le même appareil (frère, sœur) et une vue « parent » en
lecture seule (volume d'entraînement, mental en match, rien du débrief sans
accord). À discuter avec l'ado avant de coder : c'est son carnet.

## Défauts connus, à traiter au passage

- Le champ date natif s'affiche au format du navigateur (11/16/2026 sur un
  système en anglais) : afficher la date choisie en clair sous le champ.
- La barre de navigation a 6 entrées ; vérifier le rendu sous 360 px de large
  (texte « Accueil » sur une ligne).
- Les deux lots de questions du 16/11 ont été relus une fois ; faire relire
  les faits de culture et de règlement par un second regard (arbitre de club).
- `useScrollToHash` défile vers `#plan` après le rendu : sur un téléphone lent
  la position peut être décalée de la hauteur des accordéons ouverts.
