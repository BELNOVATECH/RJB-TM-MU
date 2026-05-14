// src/pages/DevotionalContent.jsx
import { useState } from "react";

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

const CONTENT_TYPES = [
  { label: "Bhajans", count: 112 },
  { label: "Slokas / Stotras", count: 68 },
  { label: "Keertans", count: 44 },
  { label: "Speeches / Pravachan", count: 30 },
  { label: "Video Discourses", count: 42 },
];

const FILTER_TABS = ["All", "Bhajans", "Slokas", "Keertans", "Speeches"];
const NAV_TABS = ["All Content", "Playlists", "Upload"];

export default function DevotionalContent() {
  const [navTab, setNavTab] = useState(0);
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

      {/* Nav Tabs + Upload */}
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
          <button className="btn-primary"><i className="ti ti-upload" /> Upload Media</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 14 }}>
        {/* Content Library */}
        <div className="card">
          <div className="card-head">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <i className="ti ti-music" style={{ fontSize: 15, color: "#b5860d" }} />
              <div className="card-title">Content library</div>
            </div>
          </div>
          {/* Filter Tabs */}
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

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Top Played */}
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

          {/* Content by Type */}
          <div className="card">
            <div className="card-head"><div className="card-title">Content by type</div></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CONTENT_TYPES.map((ct, i) => (
                <div key={ct.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < CONTENT_TYPES.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                  <div style={{ fontSize: 12, color: "#444" }}>{ct.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{ct.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
