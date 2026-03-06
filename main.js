const { console, core, event, playlist, sidebar, preferences } = iina;

const STATE = {
  lastScope: preferences.get("audioCenter.scope") || "both",
  lastQuery: preferences.get("audioCenter.lastQuery") || "",
};

function normalizePlaylistItem(item, index) {
  const filename = item.filename || item.url || `Track ${index + 1}`;
  return {
    index,
    filename,
    title: item.title || "",
    artist: item.artist || "",
    album: item.album || "",
    genre: item.genre || "",
    isCurrent: !!item.playing,
  };
}

function getPlaylistSnapshot() {
  const items = playlist.list().map((item, index) => normalizePlaylistItem(item, index));
  const currentIndex = items.findIndex((entry) => entry.isCurrent);
  return {
    items,
    currentIndex,
  };
}

function postState() {
  sidebar.postMessage("state", {
    scope: STATE.lastScope,
    query: STATE.lastQuery,
    playlist: getPlaylistSnapshot(),
    status: {
      title: core.status.title || "",
      paused: !!core.status.paused,
    },
  });
}

function persistState() {
  preferences.set("audioCenter.scope", STATE.lastScope);
  preferences.set("audioCenter.lastQuery", STATE.lastQuery);
  preferences.sync();
}

function setupSidebarMessaging() {
  sidebar.onMessage("ui-ready", () => {
    postState();
  });

  sidebar.onMessage("set-scope", (scope) => {
    if (scope === "playlist" || scope === "library" || scope === "both") {
      STATE.lastScope = scope;
      persistState();
      postState();
    }
  });

  sidebar.onMessage("set-query", (query) => {
    STATE.lastQuery = typeof query === "string" ? query : "";
    persistState();
    postState();
  });

  sidebar.onMessage("request-refresh", () => {
    postState();
  });

  sidebar.onMessage("reveal-current", () => {
    const snapshot = getPlaylistSnapshot();
    if (snapshot.currentIndex >= 0) {
      core.osd(`Current track index: ${snapshot.currentIndex + 1}`);
    } else {
      core.osd("No current track found");
    }
    postState();
  });

  sidebar.onMessage("play-index", (data) => {
    if (!data || typeof data.index !== "number") return;
    if (data.index < 0 || data.index >= playlist.count()) return;
    playlist.play(data.index);
    postState();
  });

  sidebar.onMessage("remove-index", (data) => {
    if (!data || typeof data.index !== "number") return;
    if (data.index < 0 || data.index >= playlist.count()) return;
    playlist.remove(data.index);
    postState();
  });
}

function setupEventSync() {
  const refresh = () => postState();
  event.on("mpv.file-loaded", refresh);
  event.on("mpv.pause.changed", refresh);
  setInterval(refresh, 1000);
}

function init() {
  console.log("Audio-Center plugin starting...");
  sidebar.loadFile("ui/sidebar.html");
  setupSidebarMessaging();
  setupEventSync();
  postState();
}

init();
