# iina-audio-center-plugin

Audio-Center is an IINA plugin focused on local audio workflow:

- fast playlist visibility
- quick search UX
- sidebar-first controls
- foundation for recursive library scan and persisted playlists

## Current Stage

This repository contains **Phase 1 foundation**:

- plugin manifest (`Info.json`)
- main entry (`main.js`)
- sidebar webview UI (`ui/sidebar.html`, `ui/sidebar.css`, `ui/sidebar.js`)
- message bus between sidebar and plugin script
- basic actions: refresh, reveal current track, play item, remove item

## Install (Development)

1. Ensure IINA 1.4.0+ is installed.
2. Link plugin folder with `.iinaplugin-dev` suffix:

```bash
ln -s "$PWD" ~/Library/Application\ Support/com.colliderli.iina/plugins/iina-audio-center-plugin.iinaplugin-dev
```

3. Restart IINA.
4. Open the sidebar tab `Audio-Center`.

## Packaging

If `iina-plugin` CLI is installed:

```bash
iina-plugin pack .
```

## License

MIT
