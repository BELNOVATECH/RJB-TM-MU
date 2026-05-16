// src/pages/DevotionalContent.jsx

import { useState, useRef } from "react";
import "./styles/DevotionalContent.css";

const CONTENT = [
  { icon: "ti-music", iconBg: "#fef9c3", iconColor: "#b5860d", title: "Shri Ram Stuti", meta: "Bhajan · Hindi · Pandit Jasraj", tag: "Bhajan", tagCls: "badge-amber", duration: "4:32" },
  { icon: "ti-book", iconBg: "#dbeafe", iconColor: "#1d4ed8", title: "Ramcharitmanas Path", meta: "Sloka · Sanskrit · Morari Bapu", tag: "Sloka", tagCls: "badge-blue", duration: "18:04" },
  { icon: "ti-microphone", iconBg: "#dcfce7", iconColor: "#15803d", title: "Jai Shri Ram Kirtan", meta: "Keertan · Hindi + Sanskrit", tag: "Keertan", tagCls: "badge-green", duration: "8:15" },
  { icon: "ti-video", iconBg: "#fee2e2", iconColor: "#b91c1c", title: "Ramayana Pravachan — Ep 1", meta: "Video Discourse · 1080p · Hindi", tag: "Video", tagCls: "badge-red", duration: "42:10" },
  { icon: "ti-music", iconBg: "#fef9c3", iconColor: "#b5860d", title: "Hanuman Chalisa", meta: "Bhajan · Hindi · Lata Mangeshkar", tag: "Bhajan", tagCls: "badge-amber", duration: "7:48" },
];

const TOP_PLAYED = [
  { title: "Shri Ram Stuti", plays: 318, pct: 100, color: "#f5c842" },
  { title: "Hanuman Chalisa", plays: 276, pct: 87, color: "#b5860d" },
  { title: "Jai Shri Ram", plays: 220, pct: 69, color: "#f5e6c0" },
  { title: "Ramcharitmanas", plays: 158, pct: 50, color: "#f5e6c0" },
];

const CONTENT_TYPES_LIST = [
  { label: "Bhajans", count: 112 },
  { label: "Slokas / Stotras", count: 68 },
  { label: "Keertans", count: 44 },
  { label: "Speeches / Pravachan", count: 30 },
  { label: "Video Discourses", count: 42 },
];

const FILTER_TABS = ["All", "Bhajans", "Slokas", "Keertans", "Speeches"];
const NAV_TABS = ["All Content", "Playlists", "Upload"];
const CONTENT_TYPE_OPTIONS = ["Bhajan", "Sloka / Stotra", "Keertan", "Pravachan / Speech", "Video Discourse", "Other"];
const LANGUAGE_OPTIONS = ["Hindi", "Sanskrit", "Hindi + Sanskrit", "Tamil", "Telugu", "Bengali", "Other"];
const STATUS_OPTIONS = ["Published", "Draft", "Scheduled"];

const EMPTY_FORM = {
  title: "",
  contentType: "Bhajan",
  language: "Hindi",
  artist: "",
  description: "",
  tags: "",
  status: "Published",
  featured: false,
};

const RECENT_UPLOADS = [
  { title: "Shri Ram Aarti", type: "Bhajan", size: "4.2 MB", status: "Published", date: "13 May 2026" },
  { title: "Sunderkand Path", type: "Sloka", size: "12.8 MB", status: "Draft", date: "12 May 2026" },
  { title: "Pravachan Episode 3", type: "Video", size: "284 MB", status: "Scheduled", date: "11 May 2026" },
];

const STATUS_BADGE = {
  Published: "badge-green",
  Draft: "badge-amber",
  Scheduled: "badge-blue",
};

function UploadTab() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [mediaFile, setMediaFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const mediaRef = useRef();
  const thumbRef = useRef();

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);

    const f = e.dataTransfer.files[0];
    if (f) setMediaFile(f);
  }

  function handleUpload() {
    if (!mediaFile || !form.title.trim()) return;

    setUploading(true);
    setProgress(0);
    setDone(false);

    let p = 0;

    const iv = setInterval(() => {
      p += Math.random() * 16 + 5;

      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setUploading(false);
        setDone(true);
      }

      setProgress(Math.round(p));
    }, 250);
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setMediaFile(null);
    setThumbFile(null);
    setProgress(0);
    setDone(false);
    setUploading(false);
  }

  function fmtSize(bytes) {
    if (!bytes) return "";

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="upload-grid">

      <div className="upload-left">

        <div className="card">

          <div className="card-head">

            <div className="card-title upload-title">
              <i className="ti ti-upload upload-icon" />
              Media File *
            </div>

            {mediaFile && !done && (
              <button
                onClick={() => setMediaFile(null)}
                className="clear-btn"
              >
                <i className="ti ti-x" />
                Clear
              </button>
            )}
          </div>

          <input
            ref={mediaRef}
            type="file"
            accept="audio/*,video/*"
            className="hidden-input"
            onChange={(e) => {
              if (e.target.files[0]) {
                setMediaFile(e.target.files[0]);
              }
            }}
          />

          {!mediaFile ? (
            <div
              onClick={() => mediaRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`drop-zone ${dragOver ? "drag-active" : ""}`}
            >

              <div className="upload-circle">
                <i className="ti ti-cloud-upload upload-cloud-icon" />
              </div>

              <div className="drop-content">

                <div className="drop-title">
                  Drop your file here or{" "}
                  <span className="browse-link">browse</span>
                </div>

                <div className="drop-subtitle">
                  Supports MP3, MP4, WAV, OGG, FLAC · Max 500 MB
                </div>

              </div>

            </div>
          ) : (

            <div className="selected-file-card">

              <div className="selected-file-top">

                <div
                  className={`file-icon-wrapper ${
                    mediaFile.type.startsWith("video")
                      ? "video-bg"
                      : "music-bg"
                  }`}
                >
                  <i
                    className={`ti ${
                      mediaFile.type.startsWith("video")
                        ? "ti-video"
                        : "ti-music"
                    } file-type-icon`}
                  />
                </div>

                <div className="file-info">

                  <div className="file-name">
                    {mediaFile.name}
                  </div>

                  <div className="file-size">
                    {fmtSize(mediaFile.size)}
                  </div>

                </div>

                {done && (
                  <span className="badge badge-green">
                    <i className="ti ti-check badge-icon" />
                    Uploaded
                  </span>
                )}

              </div>

              {(uploading || done) && (

                <div className="progress-wrapper">

                  <div className="progress-head">

                    <span className="progress-label">
                      {done ? "Upload complete" : "Uploading…"}
                    </span>

                    <span className="progress-percent">
                      {progress}%
                    </span>

                  </div>

                  <div className="progress-bar">

                    <div
                      className={`progress-fill ${
                        done ? "progress-success" : "progress-loading"
                      }`}
                      style={{ width: `${progress}%` }}
                    />

                  </div>

                </div>

              )}

            </div>
          )}

        </div>

  


{/* Content details form */}
<div className="card">

  <div className="card-head">

    <div className="card-title upload-title">
      <i className="ti ti-forms upload-icon" />
      Content Details
    </div>

  </div>

  <div className="details-grid">

    <div className="full-width">

      <label className="form-label">
        Title *
      </label>

      <input
        type="text"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        placeholder="e.g. Shri Ram Stuti"
        className="form-input"
      />

    </div>

    <div>

      <label className="form-label">
        Content Type
      </label>

      <select
        value={form.contentType}
        onChange={e => setForm({ ...form, contentType: e.target.value })}
        className="form-input"
      >
        {CONTENT_TYPE_OPTIONS.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

    </div>

    <div>

      <label className="form-label">
        Language
      </label>

      <select
        value={form.language}
        onChange={e => setForm({ ...form, language: e.target.value })}
        className="form-input"
      >
        {LANGUAGE_OPTIONS.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

    </div>

    <div>

      <label className="form-label">
        Artist / Speaker
      </label>

      <input
        type="text"
        value={form.artist}
        onChange={e => setForm({ ...form, artist: e.target.value })}
        placeholder="e.g. Pandit Jasraj"
        className="form-input"
      />

    </div>

    <div>

      <label className="form-label">
        Publish Status
      </label>

      <select
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
        className="form-input"
      >
        {STATUS_OPTIONS.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

    </div>

    <div className="full-width">

      <label className="form-label">
        Tags <span className="light-text">(comma-separated)</span>
      </label>

      <input
        type="text"
        value={form.tags}
        onChange={e => setForm({ ...form, tags: e.target.value })}
        placeholder="e.g. Ram, Ayodhya, Morning Prayer"
        className="form-input"
      />

    </div>

    <div className="full-width">

      <label className="form-label">
        Description
      </label>

      <textarea
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        placeholder="Brief description of this content…"
        rows={3}
        className="form-input form-textarea"
      />

    </div>

    {/* Thumbnail picker */}
    <div className="full-width">

      <label className="form-label">
        Thumbnail Image <span className="light-text">(optional)</span>
      </label>

      <input
        ref={thumbRef}
        type="file"
        accept="image/*"
        className="hidden-input"
        onChange={e => {
          if (e.target.files[0]) {
            setThumbFile(e.target.files[0]);
          }
        }}
      />

      <div
        onClick={() => thumbRef.current.click()}
        className="thumb-picker"
      >

        <div className="thumb-icon-box">
          <i className="ti ti-photo thumb-icon" />
        </div>

        <div className="thumb-text">

          {thumbFile ? (
            <span className="thumb-file-name">
              {thumbFile.name}
            </span>
          ) : (
            <span className="thumb-placeholder">
              Click to select thumbnail (JPG, PNG, WEBP)
            </span>
          )}

        </div>

        {thumbFile && (

          <button
            onClick={e => {
              e.stopPropagation();
              setThumbFile(null);
            }}
            className="thumb-remove-btn"
          >
            <i className="ti ti-x" />
          </button>

        )}

      </div>

    </div>

    {/* Featured toggle */}
    <div className="featured-toggle">

      <div>

        <div className="featured-title">
          Feature on Home Screen
        </div>

        <div className="featured-subtitle">
          Pin at the top of the devotional section
        </div>

      </div>

      <div className="toggle-right">

        <span className={`toggle-text ${form.featured ? "toggle-active" : ""}`}>
          {form.featured ? "Yes" : "No"}
        </span>

        <div
          onClick={() => setForm({ ...form, featured: !form.featured })}
          className={`toggle-switch ${form.featured ? "switch-active" : ""}`}
        >

          <div
            className={`toggle-circle ${form.featured ? "circle-active" : ""}`}
          />

        </div>

      </div>

    </div>

  </div>

  {/* Actions */}
  <div className="action-buttons">

    <button
      className="btn-outline"
      onClick={handleReset}
      disabled={uploading}
    >
      <i className="ti ti-refresh" />
      Reset
    </button>

    {done ? (

      <button
        className="btn-primary done-btn"
        onClick={handleReset}
      >
        <i className="ti ti-check" />
        Done — Upload Another
      </button>

    ) : (

      <button
        className={`btn-primary ${
          (!mediaFile || !form.title.trim())
            ? "disabled-btn"
            : ""
        }`}
        onClick={handleUpload}
        disabled={uploading || !mediaFile || !form.title.trim()}
      >

        {uploading ? (
          <>
            <i className="ti ti-loader-2 spin-icon" />
            Uploading {progress}%…
          </>
        ) : (
          <>
            <i className="ti ti-upload" />
            Upload Media
          </>
        )}

      </button>

    )}

  </div>

</div>
        </div>

      {/* ── Right: guidelines + recent + storage ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Guidelines */}
        <div className="card">
          <div className="card-head">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <i className="ti ti-info-circle" style={{ fontSize: 15, color: "#b5860d" }} />
              Upload Guidelines
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "ti-music",    color: "#b5860d", bg: "#fef9c3", label: "Audio",    info: "MP3, WAV, OGG, FLAC · Max 100 MB" },
              { icon: "ti-video",    color: "#b91c1c", bg: "#fee2e2", label: "Video",    info: "MP4, MKV, WEBM · Max 500 MB" },
              { icon: "ti-photo",    color: "#1d4ed8", bg: "#dbeafe", label: "Thumbnail",info: "JPG, PNG, WEBP · Min 400×400 px" },
              { icon: "ti-language", color: "#15803d", bg: "#dcfce7", label: "Language", info: "Select the primary spoken language" },
            ].map(g => (
              <div key={g.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: g.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`ti ${g.icon}`} style={{ fontSize: 15, color: g.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "#1a0a00" }}>{g.label}</div>
                  <div style={{ fontSize: 10.5, color: "#aaa" }}>{g.info}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 12px", background: "#fffbeb", border: "1px solid rgba(245,200,66,0.4)", borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: "#92400e", lineHeight: 1.6 }}>
              <i className="ti ti-alert-triangle" style={{ fontSize: 12, marginRight: 5 }} />
              Ensure all content is authentic and respectful. Content violating community standards will be removed.
            </div>
          </div>
        </div>

        {/* Recent uploads */}
        <div className="card">
          <div className="card-head">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <i className="ti ti-clock" style={{ fontSize: 15, color: "#b5860d" }} />
              Recent Uploads
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {RECENT_UPLOADS.map((r, i) => (
              <div key={r.title} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 0",
                borderBottom: i < RECENT_UPLOADS.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 7, background: "#fef9c3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`ti ${r.type === "Video" ? "ti-video" : r.type === "Sloka" ? "ti-book" : "ti-music"}`}
                    style={{ fontSize: 15, color: "#b5860d" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#1a0a00", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</div>
                  <div style={{ fontSize: 10.5, color: "#aaa" }}>{r.size} · {r.date}</div>
                </div>
                <span className={`badge ${STATUS_BADGE[r.status]}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage */}
        <div className="card">
          <div className="card-head">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <i className="ti ti-database" style={{ fontSize: 15, color: "#b5860d" }} />
              Storage Usage
            </div>
          </div>
          {[
            { label: "Audio Files", used: 68, color: "#f5c842" },
            { label: "Video Files", used: 84, color: "#c0392b" },
            { label: "Thumbnails",  used: 12, color: "#3b82f6" },
          ].map(s => (
            <div key={s.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "#555" }}>{s.label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#1a0a00" }}>{s.used}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: "rgba(0,0,0,0.07)" }}>
                <div style={{ height: "100%", borderRadius: 99, background: s.color, width: `${s.used}%` }} />
              </div>
            </div>
          ))}
          <div style={{ fontSize: 10.5, color: "#aaa", marginTop: 6 }}>12.4 GB of 20 GB used</div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function DevotionalContent() {
  const [navTab, setNavTab]       = useState(0);
  const [filterTab, setFilterTab] = useState(0);

  return (
    <div className="devotional-page">
      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef9c3" }}>
            <i className="ti ti-music" style={{ color: "#b5860d" }} />
          </div>
          <div className="kpi-label">Total Tracks</div>
          <div className="kpi-value">284</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-player-play" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Plays Today</div>
          <div className="kpi-value">1,420</div>
          <div className="kpi-sub"><i className="ti ti-trending-up" style={{ fontSize: 10 }} /> +34%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-playlist" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Playlists</div>
          <div className="kpi-value">18</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-video" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Video Discourses</div>
          <div className="kpi-value">42</div>
        </div>
      </div>

      {/* Nav + Upload button */}
      <div className="top-nav devotional-top-nav">
        <div className="tab-bar nav-tabs" style={{ marginBottom: 0 }}>
          {NAV_TABS.map((t, i) => (
            <button key={t} className={`tab-pill ${navTab === i ? "active" : ""}`} onClick={() => setNavTab(i)}>{t}</button>
          ))}
        </div>

        <div className="search-upload-wrap">
          <div className="search-box devotional-search-wrap" style={{ minWidth: 0 }}>
            <i className="ti ti-search search-icon" style={{ fontSize: 13, color: "#888" }} />

            <input
              type="text"
              placeholder="Search bhajans, slokas…"
              className="devotional-search-input"
              style={{ border: "none", outline: "none", fontSize: 12, background: "transparent", flex: 1, minWidth: 0 }}
            />
          </div>

          {/* Clicking this switches directly to the Upload tab */}
          <button className="btn-primary" onClick={() => setNavTab(2)}>
            <i className="ti ti-upload" /> Upload Media
          </button>
        </div>
      </div>

      {/* All Content */}
      {navTab === 0 && (
        <div className="devotional-content-grid">
          <div className="card">
            <div className="card-head">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <i className="ti ti-music" style={{ fontSize: 15, color: "#b5860d" }} />
                <div className="card-title">Content library</div>
              </div>
            </div>
            <div className="tab-bar">
              {FILTER_TABS.map((t, i) => (
                <button key={t} className={`tab-pill ${filterTab === i ? "active" : ""}`} onClick={() => setFilterTab(i)}>{t}</button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CONTENT.map((c) => (
                <div key={c.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fdf8f0"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className={`ti ${c.icon}`} style={{ fontSize: 18, color: c.iconColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{c.title}</div>
                    <div style={{ fontSize: 10.5, color: "#999", marginTop: 1 }}>{c.meta}</div>
                  </div>
                  <span className={`badge ${c.tagCls}`}>{c.tag}</span>
                  <div style={{ fontSize: 11, color: "#999", marginLeft: 4, width: 36, textAlign: "right" }}>{c.duration}</div>
                  <button style={{ background: "#f5c842", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                    <i className="ti ti-player-play" style={{ fontSize: 12, color: "#1a0a00" }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="devotional-sidebar-cards">
            <div className="card">
              <div className="card-head"><div className="card-title">Top played today</div></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {TOP_PLAYED.map((t) => (
                  <div key={t.title} className="bar-row">
                    <div className="bar-label" style={{ width: 100 }}>{t.title}</div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: t.pct + "%", background: t.color }} /></div>
                    <div className="bar-val">{t.plays}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-head"><div className="card-title">Content by type</div></div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {CONTENT_TYPES_LIST.map((ct, i) => (
                  <div key={ct.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < CONTENT_TYPES_LIST.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                    <div style={{ fontSize: 12, color: "#444" }}>{ct.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{ct.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Playlists placeholder */}
      {navTab === 1 && (
        <div className="card" style={{ padding: "52px 0", textAlign: "center" }}>
          <i className="ti ti-playlist" style={{ fontSize: 36, color: "#f5c842", display: "block", marginBottom: 12 }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1a0a00", marginBottom: 6 }}>Playlists</div>
          <div style={{ fontSize: 12, color: "#aaa" }}>Playlist management coming soon.</div>
        </div>
      )}

      {/* Upload tab */}
      {navTab === 2 && <UploadTab />}
    </div>
  );
}





































// // // src/pages/DevotionalContent.jsx
// import { useState, useRef } from "react";
// import "./styles/DevotionalContent.css";

// const CONTENT = [
//   { icon: "ti-music",      iconBg: "#fef9c3", iconColor: "#b5860d", title: "Shri Ram Stuti",           meta: "Bhajan · Hindi · Pandit Jasraj",   tag: "Bhajan",  tagCls: "badge-amber", duration: "4:32"  },
//   { icon: "ti-book",       iconBg: "#dbeafe", iconColor: "#1d4ed8", title: "Ramcharitmanas Path",       meta: "Sloka · Sanskrit · Morari Bapu",   tag: "Sloka",   tagCls: "badge-blue",  duration: "18:04" },
//   { icon: "ti-microphone", iconBg: "#dcfce7", iconColor: "#15803d", title: "Jai Shri Ram Kirtan",       meta: "Keertan · Hindi + Sanskrit",       tag: "Keertan", tagCls: "badge-green", duration: "8:15"  },
//   { icon: "ti-video",      iconBg: "#fee2e2", iconColor: "#b91c1c", title: "Ramayana Pravachan — Ep 1", meta: "Video Discourse · 1080p · Hindi",  tag: "Video",   tagCls: "badge-red",   duration: "42:10" },
//   { icon: "ti-music",      iconBg: "#fef9c3", iconColor: "#b5860d", title: "Hanuman Chalisa",           meta: "Bhajan · Hindi · Lata Mangeshkar", tag: "Bhajan",  tagCls: "badge-amber", duration: "7:48"  },
// ];

// const TOP_PLAYED = [
//   { title: "Shri Ram Stuti",  plays: 318, pct: 100, color: "#f5c842" },
//   { title: "Hanuman Chalisa", plays: 276, pct: 87,  color: "#b5860d" },
//   { title: "Jai Shri Ram",    plays: 220, pct: 69,  color: "#f5e6c0" },
//   { title: "Ramcharitmanas",  plays: 158, pct: 50,  color: "#f5e6c0" },
// ];

// const CONTENT_TYPES_LIST = [
//   { label: "Bhajans",              count: 112 },
//   { label: "Slokas / Stotras",     count: 68  },
//   { label: "Keertans",             count: 44  },
//   { label: "Speeches / Pravachan", count: 30  },
//   { label: "Video Discourses",     count: 42  },
// ];

// const FILTER_TABS          = ["All", "Bhajans", "Slokas", "Keertans", "Speeches"];
// const NAV_TABS             = ["All Content", "Playlists", "Upload"];
// const CONTENT_TYPE_OPTIONS = ["Bhajan", "Sloka / Stotra", "Keertan", "Pravachan / Speech", "Video Discourse", "Other"];
// const LANGUAGE_OPTIONS     = ["Hindi", "Sanskrit", "Hindi + Sanskrit", "Tamil", "Telugu", "Bengali", "Other"];
// const STATUS_OPTIONS       = ["Published", "Draft", "Scheduled"];

// const EMPTY_FORM = {
//   title: "", contentType: "Bhajan", language: "Hindi",
//   artist: "", description: "", tags: "", status: "Published", featured: false,
// };

// const RECENT_UPLOADS = [
//   { title: "Shri Ram Aarti",      type: "Bhajan", size: "4.2 MB",  status: "Published", date: "13 May 2026" },
//   { title: "Sunderkand Path",     type: "Sloka",  size: "12.8 MB", status: "Draft",     date: "12 May 2026" },
//   { title: "Pravachan Episode 3", type: "Video",  size: "284 MB",  status: "Scheduled", date: "11 May 2026" },
// ];

// const STATUS_BADGE = { Published: "badge-green", Draft: "badge-amber", Scheduled: "badge-blue" };

// // ── Upload Tab ────────────────────────────────────────────────────────────────
// export default function UploadTab() {
//   const [form, setForm]           = useState(EMPTY_FORM);
//   const [mediaFile, setMediaFile] = useState(null);
//   const [thumbFile, setThumbFile] = useState(null);
//   const [dragOver, setDragOver]   = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress]   = useState(0);
//   const [done, setDone]           = useState(false);
//   const mediaRef = useRef();
//   const thumbRef = useRef();

//   const inp = {
//     width: "100%", padding: "7px 10px",
//     border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7,
//     fontSize: 12, fontFamily: "inherit", color: "#1a0a00",
//     background: "#fdf8f0", outline: "none",
//   };
//   const lbl = { fontSize: 11, color: "#888", display: "block", marginBottom: 4, fontWeight: 500 };

//   function onDrop(e) {
//     e.preventDefault(); setDragOver(false);
//     const f = e.dataTransfer.files[0];
//     if (f) setMediaFile(f);
//   }

//   function handleUpload() {
//     if (!mediaFile || !form.title.trim()) return;
//     setUploading(true); setProgress(0); setDone(false);
//     let p = 0;
//     const iv = setInterval(() => {
//       p += Math.random() * 16 + 5;
//       if (p >= 100) {
//         p = 100; clearInterval(iv);
//         setUploading(false); setDone(true);
//       }
//       setProgress(Math.round(p));
//     }, 250);
//   }

//   function handleReset() {
//     setForm(EMPTY_FORM);
//     setMediaFile(null); setThumbFile(null);
//     setProgress(0); setDone(false); setUploading(false);
//   }

//   function fmtSize(bytes) {
//     if (!bytes) return "";
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   }

// return (
//   <div className="devotional-layout">

//     {/* ── Left: form ── */}
//     <div className="upload-left">

//       {/* Drop zone */}
//       <div className="card">

//         <div className="card-head">
//           <div className="card-title flex-row">
//             <i className="ti ti-upload icon-yellow" />
//             Media File *
//           </div>

//           {mediaFile && !done && (
//             <button
//               onClick={() => setMediaFile(null)}
//               className="btn-clear"
//             >
//               <i className="ti ti-x" /> Clear
//             </button>
//           )}
//         </div>

//         <input
//           ref={mediaRef}
//           type="file"
//           accept="audio/*,video/*"
//           className="hidden-input"
//           onChange={e => {
//             if (e.target.files[0]) {
//               setMediaFile(e.target.files[0]);
//             }
//           }}
//         />

//         {!mediaFile ? (

//           /* DROP ZONE */
//           <div
//             className={`drop-zone ${dragOver ? "active" : ""}`}
//             onClick={() => mediaRef.current.click()}
//             onDragOver={e => {
//               e.preventDefault();
//               setDragOver(true);
//             }}
//             onDragLeave={() => setDragOver(false)}
//             onDrop={onDrop}
//           >

//             <div className="drop-icon">
//               <i className="ti ti-cloud-upload" />
//             </div>

//             <div className="center-text">

//               <div className="drop-title">
//                 Drop your file here or <span>browse</span>
//               </div>

//               <div className="drop-sub">
//                 Supports MP3, MP4, WAV, OGG, FLAC · Max 500 MB
//               </div>

//             </div>

//           </div>

//         ) : (

//           /* FILE SELECTED */
//           <div className="file-box">

//             <div className="file-row">

//               <div
//                 className={`file-icon ${
//                   mediaFile.type.startsWith("video")
//                     ? "video"
//                     : "audio"
//                 }`}
//               >
//                 <i
//                   className={`ti ${
//                     mediaFile.type.startsWith("video")
//                       ? "ti-video"
//                       : "ti-music"
//                   }`}
//                 />
//               </div>

//               <div className="file-info">

//                 <div className="file-name">
//                   {mediaFile.name}
//                 </div>

//                 <div className="file-size">
//                   {fmtSize(mediaFile.size)}
//                 </div>

//               </div>

//               {done && (
//                 <span className="badge badge-green">
//                   <i className="ti ti-check" style={{ fontSize: 10 }} />
//                   {" "}Uploaded
//                 </span>
//               )}

//             </div>

//             {(uploading || done) && (

//               <div style={{ marginTop: 12 }}>

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: 5
//                   }}
//                 >
//                   <span
//                     style={{
//                       fontSize: 11,
//                       color: "#888"
//                     }}
//                   >
//                     {done ? "Upload complete" : "Uploading…"}
//                   </span>

//                   <span
//                     style={{
//                       fontSize: 11,
//                       fontWeight: 600,
//                       color: "#b5860d"
//                     }}
//                   >
//                     {progress}%
//                   </span>
//                 </div>

//                 <div
//                   style={{
//                     height: 6,
//                     borderRadius: 99,
//                     background: "rgba(0,0,0,0.07)",
//                     overflow: "hidden"
//                   }}
//                 >
//                   <div
//                     style={{
//                       height: "100%",
//                       borderRadius: 99,
//                       background: done ? "#16a34a" : "#f5c842",
//                       width: `${progress}%`,
//                       transition: "width 0.25s ease"
//                     }}
//                   />
//                 </div>

//               </div>

//             )}

//           </div>

//         )}

// {/* Actions */}
// <div className="action-row">

//   <button
//     className="btn-outline"
//     onClick={handleReset}
//     disabled={uploading}
//   >
//     <i className="ti ti-refresh" /> Reset
//   </button>

//   {done ? (
//     <button
//       className="btn-primary btn-success"
//       onClick={handleReset}
//     >
//       <i className="ti ti-check" />
//       {" "}Done — Upload Another
//     </button>
//   ) : (
//     <button
//       className={`btn-primary ${
//         (!mediaFile || !form.title.trim())
//           ? "btn-disabled"
//           : ""
//       }`}
//       onClick={handleUpload}
//       disabled={uploading || !mediaFile || !form.title.trim()}
//     >
//       {uploading ? (
//         <>
//           <i className="ti ti-loader-2 spin-icon" />
//           {" "}Uploading {progress}%…
//         </>
//       ) : (
//         <>
//           <i className="ti ti-upload" />
//           {" "}Upload Media
//         </>
//       )}
//     </button>
//   )}
// </div>

// </div>
// </div>

// {/* ── Right: guidelines + recent + storage ── */}
// <div className="upload-right">

//   {/* Guidelines */}
//   <div className="card">

//     <div className="card-head">
//       <div className="card-title flex-row">
//         <i className="ti ti-info-circle icon-yellow" />
//         Upload Guidelines
//       </div>
//     </div>

//     <div className="guideline-list">

//       {[
//         {
//           icon: "ti-music",
//           color: "#b5860d",
//           bg: "#fef9c3",
//           label: "Audio",
//           info: "MP3, WAV, OGG, FLAC · Max 100 MB"
//         },
//         {
//           icon: "ti-video",
//           color: "#b91c1c",
//           bg: "#fee2e2",
//           label: "Video",
//           info: "MP4, MKV, WEBM · Max 500 MB"
//         },
//         {
//           icon: "ti-photo",
//           color: "#1d4ed8",
//           bg: "#dbeafe",
//           label: "Thumbnail",
//           info: "JPG, PNG, WEBP · Min 400×400 px"
//         },
//         {
//           icon: "ti-language",
//           color: "#15803d",
//           bg: "#dcfce7",
//           label: "Language",
//           info: "Select the primary spoken language"
//         },
//       ].map(g => (

//         <div key={g.label} className="guideline-item">

//           <div
//             className="guideline-icon"
//             style={{ background: g.bg }}
//           >
//             <i
//               className={`ti ${g.icon}`}
//               style={{ color: g.color }}
//             />
//           </div>

//           <div>
//             <div className="guideline-title">
//               {g.label}
//             </div>

//             <div className="guideline-info">
//               {g.info}
//             </div>
//           </div>

//         </div>

//       ))}

//     </div>

//     <div className="warning-box">
//       <div className="warning-text">
//         <i
//           className="ti ti-alert-triangle"
//           style={{ fontSize: 12, marginRight: 5 }}
//         />
//         Ensure all content is authentic and respectful.
//         Content violating community standards will be removed.
//       </div>
//     </div>

//   </div>

//   {/* Recent uploads */}
//   <div className="card">

//     <div className="card-head">
//       <div className="card-title flex-row">
//         <i className="ti ti-clock icon-yellow" />
//         Recent Uploads
//       </div>
//     </div>

//     <div className="recent-list">

//       {RECENT_UPLOADS.map((r, i) => (

//         <div
//           key={r.title}
//           className="recent-item"
//           style={{
//             borderBottom:
//               i < RECENT_UPLOADS.length - 1
//                 ? "1px solid rgba(0,0,0,0.05)"
//                 : "none",
//           }}
//         >

//           <div className="recent-icon">

//             <i
//               className={`ti ${
//                 r.type === "Video"
//                   ? "ti-video"
//                   : r.type === "Sloka"
//                   ? "ti-book"
//                   : "ti-music"
//               }`}
//             />

//           </div>

//           <div className="recent-info">

//             <div className="recent-title">
//               {r.title}
//             </div>

//             <div className="recent-meta">
//               {r.size} · {r.date}
//             </div>

//           </div>

//           <span className={`badge ${STATUS_BADGE[r.status]}`}>
//             {r.status}
//           </span>

//         </div>

//       ))}

//     </div>

//   </div>

//   {/* Storage */}
//   <div className="card">

//     <div className="card-head">
//       <div className="card-title flex-row">
//         <i className="ti ti-database icon-yellow" />
//         Storage Usage
//       </div>
//     </div>

//     {[
//       {
//         label: "Audio Files",
//         used: 68,
//         color: "#f5c842"
//       },
//       {
//         label: "Video Files",
//         used: 84,
//         color: "#c0392b"
//       },
//       {
//         label: "Thumbnails",
//         used: 12,
//         color: "#3b82f6"
//       },
//     ].map(s => (

//       <div key={s.label} className="storage-item">

//         <div className="storage-head">

//           <span className="storage-label">
//             {s.label}
//           </span>

//           <span className="storage-percent">
//             {s.used}%
//           </span>

//         </div>

//         <div className="storage-track">

//           <div
//             className="storage-fill"
//             style={{
//               background: s.color,
//               width: `${s.used}%`,
//             }}
//           />

//         </div>

//       </div>

//     ))}

//     <div className="storage-total">
//       12.4 GB of 20 GB used
//     </div>

//   </div>

// </div>

// </div>
// );
// }