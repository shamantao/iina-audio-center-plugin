# Epic A Test Procedure (IINA 1.4.1)

## Scope

Epic A covers foundation behaviors:

- A1: Sidebar tab is visible and UI loads
- A2: Active playlist is displayed
- A3: Play and Remove actions work
- A4: Reveal current track action works (with OSD feedback)

## Prerequisites

- macOS with IINA `1.4.1` installed
- Local repository path:
  - `/absolute/path/to/iina-audio-center-plugin`
- A small audio sample set (3 to 5 files)

## Install Plugin In Dev Mode

1. Remove old dev link if present:

```bash
rm -f ~/Library/Application\ Support/com.colliderli.iina/plugins/iina-audio-center-plugin.iinaplugin-dev
```

2. Create dev symlink to this repository:

```bash
ln -s "/absolute/path/to/iina-audio-center-plugin" \
  ~/Library/Application\ Support/com.colliderli.iina/plugins/iina-audio-center-plugin.iinaplugin-dev
```

3. Restart IINA.

## Test Data Setup

1. Open IINA.
2. Add 3 to 5 audio files to the current playlist.
3. Start playback of one file.

## Test Cases

### TC-A1 Sidebar Tab Loads

Steps:
1. Open IINA sidebar.
2. Select tab `Audio-Center`.

Expected:
- `Audio-Center` tab exists.
- UI sections are visible: `Search`, `Current Playback`, `Playlist`.
- No blocking errors in IINA Log Viewer.

### TC-A2 Playlist Is Displayed

Steps:
1. With audio files loaded, open `Audio-Center` tab.
2. Click `Refresh`.

Expected:
- Playlist shows all loaded tracks.
- Current playing track appears highlighted.

### TC-A3 Play And Remove Actions

Steps:
1. In playlist panel, click `Play` on a non-current track.
2. Observe player switches to selected track.
3. Click `Remove` on one track.

Expected:
- Playback changes to selected track for `Play`.
- Removed track disappears from list.
- No JS crash or frozen UI.

### TC-A4 Reveal Current Track

Steps:
1. Ensure one track is currently playing.
2. Click `Reveal current track`.

Expected:
- IINA OSD displays current track index message.
- Sidebar remains responsive.

## Negative Checks

1. Empty playlist state:
- Clear playlist and open tab.
- Expected: message `Playlist is empty.` shown.

2. Repeat refresh:
- Click `Refresh` multiple times quickly.
- Expected: no duplicate UI corruption or plugin crash.

## Pass/Fail Rule

- Epic A passes if TC-A1 to TC-A4 all pass on IINA 1.4.1.
- Any blocking error in tab loading or action handling is a fail.

## Debug Tips

- In IINA, open `Window > Log Viewer`.
- Filter subsystem for plugin logs containing `Audio-Center`.
