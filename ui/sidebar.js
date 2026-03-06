const playlistListEl = document.getElementById("playlistList");
const statusLineEl = document.getElementById("statusLine");
const searchInputEl = document.getElementById("searchInput");

function pickScopeRadio(scope) {
  const radios = document.querySelectorAll('input[name="scope"]');
  radios.forEach((radio) => {
    radio.checked = radio.value === scope;
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderPlaylist(playlist) {
  const items = playlist && Array.isArray(playlist.items) ? playlist.items : [];
  if (!items.length) {
    playlistListEl.innerHTML = '<li class="muted">Playlist is empty.</li>';
    return;
  }

  playlistListEl.innerHTML = items
    .map((item) => {
      const currentClass = item.isCurrent ? " current" : "";
      const label = item.title || item.filename;
      const meta = [item.artist, item.album, item.genre].filter(Boolean).join(" - ");
      return `
        <li class="track${currentClass}" data-index="${item.index}">
          <div class="track-title">${escapeHtml(label)}</div>
          <div class="track-meta">${escapeHtml(meta || item.filename)}</div>
          <div class="track-actions">
            <button class="play-btn" data-clickable data-index="${item.index}">Play</button>
            <button class="remove-btn danger" data-clickable data-index="${item.index}">Remove</button>
          </div>
        </li>
      `;
    })
    .join("");
}

function send(name, data) {
  iina.postMessage(name, data);
}

searchInputEl.addEventListener("input", (event) => {
  send("set-query", event.target.value || "");
});

document.getElementById("refreshBtn").addEventListener("click", () => {
  send("request-refresh");
});

document.getElementById("revealBtn").addEventListener("click", () => {
  send("reveal-current");
});

document.querySelectorAll('input[name="scope"]').forEach((input) => {
  input.addEventListener("change", (event) => {
    if (event.target.checked) {
      send("set-scope", event.target.value);
    }
  });
});

playlistListEl.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;
  const index = Number(target.dataset.index);
  if (Number.isNaN(index)) return;

  if (target.classList.contains("play-btn")) {
    send("play-index", { index });
  }

  if (target.classList.contains("remove-btn")) {
    send("remove-index", { index });
  }
});

iina.onMessage("state", (state) => {
  if (!state) return;
  pickScopeRadio(state.scope || "both");
  if (typeof state.query === "string" && searchInputEl.value !== state.query) {
    searchInputEl.value = state.query;
  }

  const title = state.status && state.status.title ? state.status.title : "No track";
  statusLineEl.textContent = title;

  renderPlaylist(state.playlist || { items: [] });
});

send("ui-ready");
