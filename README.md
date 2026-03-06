# iina-audio-center-plugin

Audio-Center is an IINA plugin focused on local audio workflow:

- fast playlist visibility
- quick search UX
- sidebar-first controls
- foundation for recursive library scan and persisted playlists

## Install (Development)

1. Ensure IINA 1.4.0+ is installed.
2. Link plugin folder with `.iinaplugin-dev` suffix:

```bash
ln -s "$PWD" ~/Library/Application\ Support/com.colliderli.iina/plugins/iina-audio-center-plugin.iinaplugin-dev
```

3. Restart IINA.
4. Ensure you are in a normal player window (not Music Mode mini UI).
5. Open the plugin sidebar using `Plugin -> Show Plugin Sidebar`.
6. Select the `Audio-Center` tab.

Note: In Music Mode, plugin sidebar tabs may not be visible.

## Current Stage

This repository contains **Phase 1 foundation**:

- plugin manifest (`Info.json`)
- main entry (`main.js`)
- sidebar webview UI (`ui/sidebar.html`, `ui/sidebar.css`, `ui/sidebar.js`)
- message bus between sidebar and plugin script
- basic actions: refresh, reveal current track, play item, remove item

## Troubleshooting

- If `Audio-Center` tab is missing, verify dev link exists:

```bash
find "$HOME/Library/Application Support/com.colliderli.iina/plugins" -maxdepth 1 -name "*.iinaplugin-dev" -ls
```

- Expected link target for this project:

```bash
~/Library/Application Support/com.colliderli.iina/plugins/iina-audio-center-plugin.iinaplugin-dev
-> /absolute/path/to/iina-audio-center-plugin
```

- If needed, recreate it:

```bash
rm -f ~/Library/Application\ Support/com.colliderli.iina/plugins/iina-audio-center-plugin.iinaplugin-dev
ln -s "$PWD" \
	~/Library/Application\ Support/com.colliderli.iina/plugins/iina-audio-center-plugin.iinaplugin-dev
```

- Then fully quit and relaunch IINA.

## Packaging

If `iina-plugin` CLI is installed:

```bash
iina-plugin pack .
```

## License

MIT
