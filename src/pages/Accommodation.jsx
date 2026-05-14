// src/pages/Accommodation.jsx
import { useState } from "react";

// Ground floor Block A rooms
const ROOMS_BLOCK_A = [
  { num: "101", status: "occupied" },
  { num: "102", status: "occupied" },
  { num: "103", status: "available" },
  { num: "104", status: "occupied" },
  { num: "105", status: "occupied" },
  { num: "106", status: "occupied" },
  { num: "107", status: "cleaning" },
  { num: "108", status: "occupied" },
  { num: "109", status: "occupied" },
  { num: "110", status: "available" },
  { num: "111", status: "maintenance" },
  { num: "112", status: "occupied" },
  { num: "113", status: "occupied" },
  { num: "114", status: "cleaning" },
  { num: "115", status: "occupied" },
];

const ROOM_STATUS_CLASS = {
  occupied: "room-occupied",
  available: "room-available",
  cleaning: "room-cleaning",
  maintenance: "room-maintenance",
};

const OCCUPANCY_BY_BLOCK = [
  { label: "Block A", pct: 93, color: "#c0392b" },
  { label: "Block B", pct: 87, color: "#f5c842" },
  { label: "VIP Cottages", pct: 100, color: "#b5860d" },
  { label: "Dharamshala", pct: 78, color: "#e5c97a" },
];

const RECENT_CHECKINS = [
  { initials: "RS", name: "Rajesh Singh", meta: "Family · 3 nights · Check-in 14 May", room: "Room 101", status: "Checked In", statusCls: "badge-green" },
  { initials: "PD", name: "Pradeep Das", meta: "Solo · 2 nights · Check-in 14 May", room: "Room 104", status: "Checked In", statusCls: "badge-green" },
  { initials: "MJ", name: "Meena Joshi", meta: "Group · 5 nights · Check-in 13 May", room: "Room 106", status: "Staying", statusCls: "badge-blue" },
];

const PRICING = [
  { icon: "ti-home", label: "Standard Room", sub: "2 pax · AC · Attached bath", price: "₹800/night" },
  { icon: "ti-users", label: "Family Suite", sub: "6 pax · AC · Kitchenette", price: "₹1,800/night" },
  { icon: "ti-crown", label: "VIP Cottage", sub: "4 pax · Luxury · Garden view", price: "₹3,500/night" },
];

const TABS = ["Room Grid", "Bookings", "Pricing", "Export"];

export default function Accommodation() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef9c3" }}>
            <i className="ti ti-building" style={{ color: "#b5860d" }} />
          </div>
          <div className="kpi-label">Total Rooms</div>
          <div className="kpi-value">120</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-home-filled" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Occupied</div>
          <div className="kpi-value">109</div>
          <div className="kpi-sub" style={{ color: "#c0392b" }}>91% occupancy</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-door" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Available</div>
          <div className="kpi-value">11</div>
          <div className="kpi-sub" style={{ color: "#3b82f6" }}>4 cleaning</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-calendar-check" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Check-ins Today</div>
          <div className="kpi-value">28</div>
          <div className="kpi-sub" style={{ color: "#999" }}>14 check-outs</div>
        </div>
      </div>

      {/* Tab + Actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="tab-bar" style={{ marginBottom: 0 }}>
          {TABS.map((t, i) => (
            <button key={t} className={`tab-pill ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-outline">Export</button>
          <button className="btn-primary"><i className="ti ti-plus" /> New Booking</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 14 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Room Grid */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">Room occupancy map — Block A (Ground Floor)</div>
            </div>
            {/* Legend */}
            <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
              {[["Occupied", "#f5c842", "#1a0a00"], ["Available", "#dcfce7", "#15803d"], ["Cleaning", "#dbeafe", "#1d4ed8"]].map(([l, bg, color]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#666" }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: bg, border: `1px solid ${color}30` }} />
                  {l}
                </div>
              ))}
            </div>
            <div className="room-grid">
              {ROOMS_BLOCK_A.map((r) => (
                <div key={r.num} className={`room-cell ${ROOM_STATUS_CLASS[r.status]}`}>{r.num}</div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "#bbb", marginTop: 10 }}>
              <span style={{ display: "inline-block", width: 12, height: 12, background: "#fee2e2", borderRadius: 3, marginRight: 4, verticalAlign: -2 }} />
              Maintenance &nbsp;&nbsp; Tap any room to view guest details
            </div>
          </div>

          {/* Recent Check-ins */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">
                <i className="ti ti-users" style={{ fontSize: 14, marginRight: 5, verticalAlign: -2, color: "#b5860d" }} />
                Recent check-ins
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {RECENT_CHECKINS.map((g) => (
                <div key={g.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "#fdf8f0", borderRadius: 8 }}>
                  <div className="avatar-circle">{g.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{g.room} · {g.name}</div>
                    <div style={{ fontSize: 10, color: "#999" }}>{g.meta}</div>
                  </div>
                  <span className={`badge ${g.statusCls}`}>{g.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Occupancy by Block */}
          <div className="card">
            <div className="card-head"><div className="card-title">Occupancy by block</div></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {OCCUPANCY_BY_BLOCK.map((b) => (
                <div key={b.label} className="bar-row">
                  <div className="bar-label" style={{ width: 90 }}>{b.label}</div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: b.pct + "%", background: b.color }} /></div>
                  <div className="bar-val">{b.pct}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Room Type Pricing */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">Room type pricing</div>
              <button className="card-action">Edit →</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PRICING.map((p) => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8 }}>
                  <div style={{ width: 32, height: 32, background: "#fef9c3", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className={`ti ${p.icon}`} style={{ fontSize: 16, color: "#b5860d" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{p.label}</div>
                    <div style={{ fontSize: 10, color: "#999" }}>{p.sub}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1a0a00" }}>{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
