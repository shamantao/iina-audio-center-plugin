# Audio-Center Agile Backlog

## How To Use

- `Status`: Todo | Doing | Review | Done
- Keep tasks small (0.5 to 2 days)
- Move one story at a time through the flow

## Epic A - Plugin Foundation

| ID | Story | Acceptance Criteria | Status |
|---|---|---|---|
| A1 | En tant qu'utilisateur, je vois un onglet sidebar Audio-Center. | Onglet visible, UI chargee sans erreur. | Done |
| A2 | En tant qu'utilisateur, je vois la playlist active. | Les items playlist sont affiches et rafraichissables. | Done |
| A3 | En tant qu'utilisateur, je peux jouer ou retirer un item. | Boutons Play/Remove fonctionnels. | Done |
| A4 | En tant qu'utilisateur, je peux reveler la piste courante. | Action disponible avec feedback OSD. | Done |

## Epic B - Search MVP

| ID | Story | Acceptance Criteria | Status |
|---|---|---|---|
| B1 | Je peux saisir une recherche depuis la sidebar. | Le champ envoie la requete au plugin. | Done |
| B2 | Je peux choisir le scope de recherche. | Scope playlist/library/both persiste. | Done |
| B3 | Je vois des resultats filtres playlist. | Filtrage local playlist par query. | Todo |
| B4 | La recherche est reactive. | Reponse en moins de 150 ms sur index charge. | Todo |

## Epic C - Library Indexing

| ID | Story | Acceptance Criteria | Status |
|---|---|---|---|
| C1 | Je peux choisir un dossier source. | Dossier sauvegarde en preference. | Todo |
| C2 | Le scan recursif indexe les formats audio cibles. | mp3/flac/m4a/ogg/wav indexes. | Todo |
| C3 | Les exclusions sont appliquees. | Caches, .git, node_modules ignores. | Todo |
| C4 | Les symlinks sont geres sans boucle. | Pas de boucle infinie. | Todo |

## Epic D - Playlist Management

| ID | Story | Acceptance Criteria | Status |
|---|---|---|---|
| D1 | Je peux creer une playlist Audio-Center. | Creation + nommage fonctionnels. | Todo |
| D2 | Je peux ajouter/retirer des pistes. | Modifications visibles en UI. | Todo |
| D3 | Je peux trier par tags/date d'ajout. | Ordre correct et reproductible. | Todo |
| D4 | Je peux melanger globalement ou par dossier/album. | Shuffle respecte la regle choisie. | Todo |

## Epic E - Persistence And Reliability

| ID | Story | Acceptance Criteria | Status |
|---|---|---|---|
| E1 | Je retrouve mes playlists apres restart IINA. | Donnees restaurees automatiquement. | Todo |
| E2 | Les preferences sont stables. | Scope/query/paths conserves. | Doing |
| E3 | Le plugin log proprement ses erreurs. | Logs exploitables dans Log Viewer. | Todo |

## Sprint 1 Suggestion (1 semaine)

- Finaliser B3, B4
- Livrer C1, C2
- Commencer E1 (format de stockage)

## Definition Of Done (Story)

- Critere d'acceptation valide
- Pas d'erreur bloquante en Log Viewer
- Test manuel documente dans PR
