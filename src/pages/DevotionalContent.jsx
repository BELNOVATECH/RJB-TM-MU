// // src/pages/DevotionalContent.jsx
import { useState, useRef } from "react";

const CONTENT = [
  { icon: "ti-music",      iconBg: "#fef9c3", iconColor: "#b5860d", title: "Shri Ram Stuti",           meta: "Bhajan · Hindi · Pandit Jasraj",   tag: "Bhajan",  tagCls: "badge-amber", duration: "4:32"  },
  { icon: "ti-book",       iconBg: "#dbeafe", iconColor: "#1d4ed8", title: "Ramcharitmanas Path",       meta: "Sloka · Sanskrit · Morari Bapu",   tag: "Sloka",   tagCls: "badge-blue",  duration: "18:04" },
  { icon: "ti-microphone", iconBg: "#dcfce7", iconColor: "#15803d", title: "Jai Shri Ram Kirtan",       meta: "Keertan · Hindi + Sanskrit",       tag: "Keertan", tagCls: "badge-green", duration: "8:15"  },
  { icon: "ti-video",      iconBg: "#fee2e2", iconColor: "#b91c1c", title: "Ramayana Pravachan — Ep 1", meta: "Video Discourse · 1080p · Hindi",  tag: "Video",   tagCls: "badge-red",   duration: "42:10" },
  { icon: "ti-music",      iconBg: "#fef9c3", iconColor: "#b5860d", title: "Hanuman Chalisa",           meta: "Bhajan · Hindi · Lata Mangeshkar", tag: "Bhajan",  tagCls: "badge-amber", duration: "7:48"  },
];

const TOP_PLAYED = [
  { title: "Shri Ram Stuti",  plays: 318, pct: 100, color: "#f5c842" },
  { title: "Hanuman Chalisa", plays: 276, pct: 87,  color: "#b5860d" },
  { title: "Jai Shri Ram",    plays: 220, pct: 69,  color: "#f5e6c0" },
  { title: "Ramcharitmanas",  plays: 158, pct: 50,  color: "#f5e6c0" },
];

const CONTENT_TYPES_LIST = [
  { label: "Bhajans",              count: 112 },
  { label: "Slokas / Stotras",     count: 68  },
  { label: "Keertans",             count: 44  },
  { label: "Speeches / Pravachan", count: 30  },
  { label: "Video Discourses",     count: 42  },
];

const FILTER_TABS          = ["All", "Bhajans", "Slokas", "Keertans", "Speeches"];
const NAV_TABS             = ["All Content", "Playlists", "Upload"];
const CONTENT_TYPE_OPTIONS = ["Bhajan", "Sloka / Stotra", "Keertan", "Pravachan / Speech", "Video Discourse", "Other"];
const LANGUAGE_OPTIONS     = ["Hindi", "Sanskrit", "Hindi + Sanskrit", "Tamil", "Telugu", "Bengali", "Other"];
const STATUS_OPTIONS       = ["Published", "Draft", "Scheduled"];

const EMPTY_FORM = {
  title: "", contentType: "Bhajan", language: "Hindi",
  artist: "", description: "", tags: "", status: "Published", featured: false,
};

const RECENT_UPLOADS = [
  { title: "Shri Ram Aarti",      type: "Bhajan", size: "4.2 MB",  status: "Published", date: "13 May 2026" },
  { title: "Sunderkand Path",     type: "Sloka",  size: "12.8 MB", status: "Draft",     date: "12 May 2026" },
  { title: "Pravachan Episode 3", type: "Video",  size: "284 MB",  status: "Scheduled", date: "11 May 2026" },
];

const STATUS_BADGE = { Published: "badge-green", Draft: "badge-amber", Scheduled: "badge-blue" };

// ── Upload Tab ────────────────────────────────────────────────────────────────
function UploadTab() {
  const [form, setForm]           = useState(EMPTY_FORM);
  const [mediaFile, setMediaFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [dragOver, setDragOver]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [done, setDone]           = useState(false);
  const mediaRef = useRef();
  const thumbRef = useRef();

  const inp = {
    width: "100%", padding: "7px 10px",
    border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7,
    fontSize: 12, fontFamily: "inherit", color: "#1a0a00",
    background: "#fdf8f0", outline: "none",
  };
  const lbl = { fontSize: 11, color: "#888", display: "block", marginBottom: 4, fontWeight: 500 };

  function onDrop(e) {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) setMediaFile(f);
  }

  function handleUpload() {
    if (!mediaFile || !form.title.trim()) return;
    setUploading(true); setProgress(0); setDone(false);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 16 + 5;
      if (p >= 100) {
        p = 100; clearInterval(iv);
        setUploading(false); setDone(true);
      }
      setProgress(Math.round(p));
    }, 250);
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setMediaFile(null); setThumbFile(null);
    setProgress(0); setDone(false); setUploading(false);
  }

  function fmtSize(bytes) {
    if (!bytes) return "";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 14, alignItems: "start" }}>

      {/* ── Left: form ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Drop zone */}
        <div className="card">
          <div className="card-head">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <i className="ti ti-upload" style={{ fontSize: 15, color: "#b5860d" }} />
              Media File *
            </div>
            {mediaFile && !done && (
              <button onClick={() => setMediaFile(null)}
                style={{ fontSize: 11, padding: "3px 9px", background: "none", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 6, cursor: "pointer", color: "#888" }}>
                <i className="ti ti-x" /> Clear
              </button>
            )}
          </div>

          <input ref={mediaRef} type="file" accept="audio/*,video/*" style={{ display: "none" }}
            onChange={e => { if (e.target.files[0]) setMediaFile(e.target.files[0]); }} />

          {!mediaFile ? (
            /* Drop zone */
            <div
              onClick={() => mediaRef.current.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              style={{
                border: `2px dashed ${dragOver ? "#f5c842" : "rgba(0,0,0,0.13)"}`,
                borderRadius: 10, padding: "40px 20px",
                background: dragOver ? "#fffbeb" : "#fdf8f0",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#fef9c3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="ti ti-cloud-upload" style={{ fontSize: 26, color: "#b5860d" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a0a00", marginBottom: 4 }}>
                  Drop your file here or{" "}
                  <span style={{ color: "#b5860d", textDecoration: "underline" }}>browse</span>
                </div>
                <div style={{ fontSize: 11, color: "#aaa" }}>
                  Supports MP3, MP4, WAV, OGG, FLAC · Max 500 MB
                </div>
              </div>
            </div>
          ) : (
            /* File selected */
            <div style={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", background: "#fdf8f0", padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: mediaFile.type.startsWith("video") ? "#fee2e2" : "#fef9c3",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <i className={`ti ${mediaFile.type.startsWith("video") ? "ti-video" : "ti-music"}`}
                    style={{ fontSize: 22, color: mediaFile.type.startsWith("video") ? "#b91c1c" : "#b5860d" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1a0a00", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {mediaFile.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{fmtSize(mediaFile.size)}</div>
                </div>
                {done && (
                  <span className="badge badge-green">
                    <i className="ti ti-check" style={{ fontSize: 10 }} /> Uploaded
                  </span>
                )}
              </div>

              {(uploading || done) && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: "#888" }}>{done ? "Upload complete" : "Uploading…"}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#b5860d" }}>{progress}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 99,
                      background: done ? "#16a34a" : "#f5c842",
                      width: `${progress}%`, transition: "width 0.25s ease",
                    }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content details form */}
        <div className="card">
          <div className="card-head">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <i className="ti ti-forms" style={{ fontSize: 15, color: "#b5860d" }} />
              Content Details
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={lbl}>Title *</label>
              <input type="text" value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Shri Ram Stuti" style={inp} />
            </div>

            <div>
              <label style={lbl}>Content Type</label>
              <select value={form.contentType} onChange={e => setForm({ ...form, contentType: e.target.value })} style={inp}>
                {CONTENT_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label style={lbl}>Language</label>
              <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} style={inp}>
                {LANGUAGE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label style={lbl}>Artist / Speaker</label>
              <input type="text" value={form.artist}
                onChange={e => setForm({ ...form, artist: e.target.value })}
                placeholder="e.g. Pandit Jasraj" style={inp} />
            </div>

            <div>
              <label style={lbl}>Publish Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inp}>
                {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={lbl}>Tags <span style={{ color: "#bbb", fontWeight: 400 }}>(comma-separated)</span></label>
              <input type="text" value={form.tags}
                onChange={e => setForm({ ...form, tags: e.target.value })}
                placeholder="e.g. Ram, Ayodhya, Morning Prayer" style={inp} />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={lbl}>Description</label>
              <textarea value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of this content…"
                rows={3} style={{ ...inp, resize: "vertical", lineHeight: 1.6 }} />
            </div>

            {/* Thumbnail picker */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={lbl}>Thumbnail Image <span style={{ color: "#bbb", fontWeight: 400 }}>(optional)</span></label>
              <input ref={thumbRef} type="file" accept="image/*" style={{ display: "none" }}
                onChange={e => { if (e.target.files[0]) setThumbFile(e.target.files[0]); }} />
              <div onClick={() => thumbRef.current.click()} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 12px", border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 7, background: "#fdf8f0", cursor: "pointer",
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 7, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-photo" style={{ fontSize: 16, color: "#999" }} />
                </div>
                <div style={{ flex: 1 }}>
                  {thumbFile
                    ? <span style={{ fontSize: 12, color: "#1a0a00", fontWeight: 500 }}>{thumbFile.name}</span>
                    : <span style={{ fontSize: 12, color: "#aaa" }}>Click to select thumbnail (JPG, PNG, WEBP)</span>
                  }
                </div>
                {thumbFile && (
                  <button onClick={e => { e.stopPropagation(); setThumbFile(null); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: 14 }}>
                    <i className="ti ti-x" />
                  </button>
                )}
              </div>
            </div>

            {/* Featured toggle */}
            <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, background: "#fdf8f0" }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "#1a0a00" }}>Feature on Home Screen</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>Pin at the top of the devotional section</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: form.featured ? "#b5860d" : "#bbb" }}>{form.featured ? "Yes" : "No"}</span>
                <div onClick={() => setForm({ ...form, featured: !form.featured })} style={{
                  width: 38, height: 22, borderRadius: 11,
                  background: form.featured ? "#f5c842" : "#e5e7eb",
                  position: "relative", cursor: "pointer", transition: "background 0.2s",
                }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%", background: "#fff",
                    position: "absolute", top: 3, left: form.featured ? 19 : 3,
                    transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
            <button className="btn-outline" onClick={handleReset} disabled={uploading}>
              <i className="ti ti-refresh" /> Reset
            </button>
            {done ? (
              <button className="btn-primary" style={{ background: "#16a34a" }} onClick={handleReset}>
                <i className="ti ti-check" /> Done — Upload Another
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={handleUpload}
                disabled={uploading || !mediaFile || !form.title.trim()}
                style={{ opacity: (!mediaFile || !form.title.trim()) ? 0.5 : 1, cursor: (!mediaFile || !form.title.trim()) ? "not-allowed" : "pointer" }}
              >
                {uploading
                  ? <><i className="ti ti-loader-2" style={{ display: "inline-block", animation: "spin 1s linear infinite" }} /> Uploading {progress}%…</>
                  : <><i className="ti ti-upload" /> Upload Media</>
                }
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
    <div>
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="tab-bar" style={{ marginBottom: 0 }}>
          {NAV_TABS.map((t, i) => (
            <button key={t} className={`tab-pill ${navTab === i ? "active" : ""}`} onClick={() => setNavTab(i)}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid rgba(0,0,0,0.09)", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "#888" }}>
            <i className="ti ti-search" style={{ fontSize: 13 }} /> Search bhajans, slokas…
          </div>
          {/* Clicking this switches directly to the Upload tab */}
          <button className="btn-primary" onClick={() => setNavTab(2)}>
            <i className="ti ti-upload" /> Upload Media
          </button>
        </div>
      </div>

      {/* All Content */}
      {navTab === 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 14 }}>
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

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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