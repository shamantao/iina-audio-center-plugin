# tests-uni

Repository-local test area for Audio-Center verification.

## Purpose

- `unit/`: unit-level tests for pure logic (normalization, filtering, ranking, sorting)
- `e2e/`: end-to-end scenarios validating user stories in IINA UI flows

## User Story Coverage

| US ID | Description | Test Type | Planned File |
|---|---|---|---|
| A1 | Sidebar tab visible and loads | E2E | `e2e/us-a1-sidebar-load.md` |
| A2 | Active playlist displayed | E2E | `e2e/us-a2-playlist-view.md` |
| A3 | Play and Remove actions | E2E | `e2e/us-a3-actions.md` |
| A4 | Reveal current track with feedback | E2E | `e2e/us-a4-reveal-current.md` |
| B3 | Playlist filtering by query | Unit + E2E | `unit/filter.spec.js`, `e2e/us-b3-search-playlist.md` |
| B4 | Search responsiveness | Unit + E2E | `unit/ranking.spec.js`, `e2e/us-b4-performance.md` |
| C1 | Source folder selection persistence | E2E | `e2e/us-c1-source-folder.md` |
| C2 | Recursive scan supported formats | Unit + E2E | `unit/scanner.spec.js`, `e2e/us-c2-scan-formats.md` |
| C3 | Exclusions honored | Unit + E2E | `unit/scanner.spec.js`, `e2e/us-c3-exclusions.md` |
| C4 | Symlink loop safety | Unit + E2E | `unit/scanner.spec.js`, `e2e/us-c4-symlink-loops.md` |
| D1 | Create Audio-Center playlist | E2E | `e2e/us-d1-create-playlist.md` |
| D2 | Add/remove tracks in custom playlist | E2E | `e2e/us-d2-edit-playlist.md` |
| D3 | Sort by tag/dateAdded | Unit + E2E | `unit/sort.spec.js`, `e2e/us-d3-sort.md` |
| D4 | Shuffle global/folder/album | Unit + E2E | `unit/shuffle.spec.js`, `e2e/us-d4-shuffle.md` |
| E1 | Playlist restore after restart | E2E | `e2e/us-e1-restore.md` |
| E2 | Preference stability | Unit + E2E | `unit/preferences.spec.js`, `e2e/us-e2-preferences.md` |
| E3 | Error logging quality | E2E | `e2e/us-e3-logging.md` |

## Conventions

- Keep one test spec per US when possible.
- Prefix test files with `us-<id>-...`.
- Include explicit preconditions, steps, expected results.
- Keep performance assertions deterministic and documented.
