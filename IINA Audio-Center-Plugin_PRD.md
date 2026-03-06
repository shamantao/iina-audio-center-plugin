# IINA Audio-Center Plugin PRD

## Language Policy (Mandatory)

- All project documentation in this repository must be written in English.
- All source code comments must be written in English.
- French is allowed only for prompt conversations and interactive discussions, not for repository artifacts.

## 1. Contexte

Audio-Center est un plugin IINA orienté musique locale, conçu pour améliorer la navigation, la recherche et la gestion de playlists audio dans IINA.

Il doit rendre les actions courantes rapides pour des bibliotheques de taille moyenne a grande (5 000 a 50 000 fichiers), tout en respectant l'architecture et les contraintes du systeme de plugins IINA.

## 2. Sources de reference

- https://iina.io/plugins/
- https://docs.iina.io/
- https://docs.iina.io/pages/getting-started
- https://docs.iina.io/pages/creating-plugins
- https://docs.iina.io/pages/dev-guide
- https://docs.iina.io/pages/webviews
- https://docs.iina.io/interfaces/IINA.API.Playlist
- https://docs.iina.io/interfaces/IINA.API.SidebarView
- https://docs.iina.io/interfaces/IINA.API.Preferences
- https://github.com/iina/iina
- https://github.com/iina/plugin-userscript
- https://github.com/iina/iina-plugin-definition

## 3. Vision Produit

Transformer la gestion audio dans IINA en un centre de controle clair et rapide:

- Retrouver instantanement le morceau en cours dans la playlist.
- Rechercher efficacement par tags et noms de fichiers.
- Construire des playlists depuis une bibliotheque locale, y compris via scan recursif.
- Trier, melanger, ajouter, retirer et rejouer sans friction.
- Retrouver à l'ouverture le morceau lu dans la playlist telle qu'elle a été jouée avant fermeture

## 4. Utilisateurs Cibles

- Prioritaire: utilisateurs IINA centres sur la musique locale.
- Contexte d'usage: collections volumineuses, ecoute continue, besoin de retrouver un titre rapidement.

## 5. Objectifs et Non-Objectifs

### 5.1 Objectifs

- Afficher et piloter la playlist active depuis un panneau dedie.
- Fournir une recherche unifiee: playlist active + bibliotheque indexee.
- Permettre la creation de playlists a partir de repertoires (recursif).
- Supporter tri et melange avances (tags, date d'ajout, shuffle global, shuffle par dossier/album).
- Sauvegarder automatiquement les playlists Audio-Center entre sessions IINA.

### 5.2 Non-Objectifs (MVP)

- Streaming distant (Jellyfin, Spotify, etc.).
- Edition avancee des tags audio.
- Synchronisation cloud des playlists.
- Moteur de recommandation automatique.

## 6. Perimetre MVP (choix utilisateur)

Niveau cible: **MVP rapide (fonctionnel, UI simple)**.

Le MVP doit prioriser la robustesse fonctionnelle, la performance et la modularité sur la sophistication visuelle.

## 7. Exigences Fonctionnelles

### 7.1 Playlist Active

- Voir la liste des pistes avec surlignage de la piste en cours.
- Action "reveler lecture en cours" (scroll/focus automatique).
- Actions sur elements:
- lire un item, supprimer un item, deplacer un item (haut/bas ou index).
- operation multi-selection (si supportee par l'UI choisie).

### 7.2 Recherche

- Barre de recherche unique avec mode rapide.
- Portee configurable:
- playlist active, bibliotheque indexee, ou les deux.
- Champs recherches:
- nom de fichier, titre, artiste, album, genre.
- Resultats tries par pertinence simple (exact > prefixe > contient).

### 7.3 Bibliotheque Locale

- Selection d'un ou plusieurs repertoires racine.
- Indexation recursive des fichiers audio.
- Extensions supportees MVP:
- `.mp3`, `.flac`, `.m4a`, `.ogg`, `.wav`.
- Filtres de scan:
- exclure dossiers caches.
- exclure dossiers techniques (ex: `.git`, `node_modules`).
- inclure symlinks (avec protection anti-boucle).

### 7.4 Creation et Gestion de Playlists

- Creer une playlist Audio-Center depuis:
- selection manuelle dans la bibliotheque.
- scan recursif d'un repertoire.
- Ajouter/retirer des pistes.
- Trier par:
- tags (artiste, album, titre).
- date d'ajout.
- Melanger:
- shuffle global.
- shuffle par dossier/album.
- Envoyer playlist ou selection vers playlist IINA active.

### 7.5 Persistance

- Sauvegarde automatique locale des playlists Audio-Center.
- Restauration au redemarrage IINA.
- Conservation des preferences utilisateur (scope recherche, dernier dossier, mode tri).

## 8. UX et Interface

### 8.1 Emplacement UI

- UI principale dans un **Sidebar Tab** IINA (`sidebarTab` + `iina.sidebar`).
- Structure minimale:
- section Recherche.
- section Playlist active.
- section Bibliotheque.
- section Actions (tri/melange/creation).

### 8.2 Comportements UX Cles

- Retour visuel immediat des actions (OSD optionnel + feedback dans la sidebar).
- Navigation clavier basique (focus champ recherche, valider lecture).
- Etat vide explicite (aucune piste, aucun resultat, scan en cours).

## 9. Exigences Techniques IINA

### 9.1 Architecture Plugin

- Package `.iinaplugin` avec `Info.json` obligatoire.
- `entry` principal (main entry) pour pilotage player/playlist.
- `globalEntry` optionnel pour initialisation globale (non requis MVP sauf besoin menu global).

### 9.2 APIs IINA utilisees

- `iina.playlist`: `list`, `add`, `remove`, `move`, `play`, etc.
- `iina.sidebar`: `loadFile`, `show`, `postMessage`, `onMessage`.
- `iina.event`: synchro avec changements de lecture.
- `iina.file`: scan et persistance locale.
- `iina.preferences`: `get`, `set`, `sync`.
- `iina.console`: logs debug.

### 9.3 Messaging Webview

- UI sidebar en webview HTML/JS.
- Communication bi-directionnelle via `postMessage` / `onMessage`.
- Donnees echangees en JSON serializable uniquement.

### 9.4 Permissions Info.json

Permissions minimales attendues:

- `file-system` (scan repertoire + persistance locale).
- `show-osd` (si notification OSD utilisee).

Optionnelles selon implementation:

- `network-request` (non requis MVP).
- `video-overlay` (non requis MVP, car UI principale en sidebar).

## 10. Contraintes et Performance

- Baseline JS: compatibilite ES6 (JavaScriptCore selon version macOS).
- Eviter les dependances lourdes pour MVP.
- Pour 5k-50k fichiers:
- scan non bloquant (traitement par lots si necessaire).
- index memoire compact (champs utiles uniquement).
- filtrage recherche sous 150 ms sur index deja charge (objectif UX).

## 11. Donnees et Modeles (MVP)

### 11.1 Entite Track

- `id` (stable)
- `path`
- `filename`
- `title`
- `artist`
- `album`
- `genre`
- `duration` (optionnel MVP)
- `dateAdded`

### 11.2 Entite PlaylistAudioCenter

- `id`
- `name`
- `trackIds[]`
- `createdAt`
- `updatedAt`
- `source` (manual | recursive-scan)

## 12. Critères d'Acceptation

- Le morceau en cours est localisable en 1 action depuis la sidebar.
- Recherche active sur playlist + bibliotheque avec resultats pertinents.
- Creation d'une playlist recursive depuis un repertoire fonctionnelle.
- Tri par tags/date et shuffle global/par dossier operationnels.
- Sauvegarde/restauration automatique des playlists apres redemarrage IINA.
- Aucune erreur bloquante dans Log Viewer sur scenario nominal.

## 13. Plan de Livraison

### Phase 1: Foundation

- Squelette plugin (`Info.json`, entry, sidebar HTML).
- Bus de messages sidebar <-> plugin.
- Lecture playlist active + surlignage piste courante.

### Phase 2: Bibliotheque et Recherche

- Scan recursif + filtres + index interne.
- Recherche multi-champs.
- Vue resultats + action ajout playlist.

### Phase 3: Gestion Playlists

- CRUD playlists Audio-Center.
- Tri et melange selon regles MVP.
- Persistance automatique + preferences.

### Phase 4: Stabilisation MVP

- Scenarios de test.
- Optimisation perf scan/recherche.
- Documentation installation/utilisation.

## 14. Tests MVP

- Tests fonctionnels manuels:
- import recursif sur dossiers reels.
- recherche sur tags + filename.
- tri/melange + verification ordre obtenu.
- persistance apres restart IINA.
- Tests robustesse:
- chemins invalides, dossiers vides, symlinks cycliques.
- Tests performance:
- benchmark scan initial et recherche sur dataset 5k puis 50k.

## 15. Risques et Mitigations

- Risque: lenteur sur bibliotheques volumineuses.
- mitigation: index incremental, lots de traitement, debounce recherche.
- Risque: qualite heterogene des tags.
- mitigation: fallback filename prioritaire + normalisation simple.
- Risque: differences environnement macOS/JSCore.
- mitigation: syntaxe ES6 compatible, bundling prudent.

## 16. Definition of Done (MVP)

- Plugin installable et charge sans erreur.
- Sidebar Audio-Center exploitable de bout en bout.
- Fonctions coeur (recherche, playlist, scan recursif, tri/melange, persistance) validees.
- PRD et guide utilisateur aligns avec implementation.
