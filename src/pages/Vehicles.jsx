// src/pages/Vehicles.jsx
import { useState } from "react";

const FLEET = [
  { reg: "UP-32 AB 1234", model: "Toyota Innova · 2022", type: "SUV", typeCls: "badge-blue", driver: "Ram Prasad", capacity: "7 pax", status: "On Trip", statusCls: "badge-green" },
  { reg: "UP-32 CD 5678", model: "Maruti Dzire · 2023", type: "Sedan", typeCls: "badge-gold", driver: "Suresh Yadav", capacity: "4 pax", status: "Available", statusCls: "badge-green" },
  { reg: "UP-32 EF 9012", model: "Force Traveller · 2021", type: "Mini Bus", typeCls: "badge-purple", driver: "Ganesh Tiwari", capacity: "14 pax", status: "On Trip", statusCls: "badge-green" },
  { reg: "UP-32 GH 3456", model: "Bajaj Auto · 2024", type: "Auto", typeCls: "badge-amber", driver: "Mohan Gupta", capacity: "3 pax", status: "Maintenance", statusCls: "badge-red" },
  { reg: "UP-32 IJ 7890", model: "Toyota Etios · 2023", type: "EV", typeCls: "badge-green", driver: "Raju Sharma", capacity: "4 pax", status: "Permit Due", statusCls: "badge-red" },
];

const FLEET_BY_TYPE = [
  { label: "Cars/Sedans", count: 18, color: "#f5c842", pct: 82 },
  { label: "SUV/Innova", count: 14, color: "#b5860d", pct: 64 },
  { label: "Auto / EV", count: 22, color: "#3b82f6", pct: 100 },
  { label: "Mini Bus", count: 6, color: "#c0392b", pct: 27 },
  { label: "Luxury", count: 4, color: "#6d28d9", pct: 18 },
];

const ALERTS = [
  { dot: "#c0392b", text: "UP-32 IJ 7890 — permit expires 17 May", sub: "3 days left" },
  { dot: "#f5c842", text: "UP-32 KL 1122 — insurance due 28 May", sub: "14 days left" },
  { dot: "#f5c842", text: "UP-32 MN 3344 — PUC due 31 May", sub: "17 days left" },
];

const TABS = ["All Vehicles", "Drivers", "Bookings", "Tracking"];

export default function Vehicles() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef9c3" }}>
            <i className="ti ti-car" style={{ color: "#b5860d" }} />
          </div>
          <div className="kpi-label">Total Fleet</div>
          <div className="kpi-value">64</div>
          <div className="kpi-sub" style={{ color: "#16a34a" }}>
            <i className="ti ti-check" style={{ fontSize: 10 }} /> 48 active today
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-user-check" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Drivers on Duty</div>
          <div className="kpi-value">41</div>
          <div className="kpi-sub" style={{ color: "#f5c842" }}>7 on break</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-calendar-check" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Bookings Today</div>
          <div className="kpi-value">128</div>
          <div className="kpi-sub"><i className="ti ti-trending-up" style={{ fontSize: 10 }} /> +18% vs yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-alert-triangle" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Permit Expiring</div>
          <div className="kpi-value">3</div>
          <div className="kpi-sub" style={{ color: "#b91c1c" }}>Action required</div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="tab-bar" style={{ marginBottom: 0 }}>
          {TABS.map((t, i) => (
            <button key={t} className={`tab-pill ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid rgba(0,0,0,0.09)", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "#888" }}>
            <i className="ti ti-search" style={{ fontSize: 13 }} /> Search vehicle / driver…
          </div>
          <button className="btn-primary"><i className="ti ti-plus" /> Add Vehicle</button>
        </div>
      </div>

      <div className="grid-equal">
        {/* Vehicle Fleet Table */}
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          {/* we'll do a 2-col inside */}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 14, marginBottom: 14 }}>
        {/* Fleet Table */}
        <div className="card">
          <div className="card-head">
            <div className="card-title">
              <i className="ti ti-list" style={{ fontSize: 14, marginRight: 6, verticalAlign: -2, color: "#b5860d" }} />
              Vehicle Fleet
            </div>
            <button className="card-action">View all →</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Driver</th>
                <th>Capacity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {FLEET.map((v) => (
                <tr key={v.reg}>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: 12 }}>{v.reg}</div>
                    <div style={{ fontSize: 10, color: "#999" }}>{v.model}</div>
                  </td>
                  <td><span className={`badge ${v.typeCls}`}>{v.type}</span></td>
                  <td style={{ fontSize: 12 }}>{v.driver}</td>
                  <td style={{ fontSize: 12 }}>{v.capacity}</td>
                  <td><span className={`badge ${v.statusCls}`}>{v.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Fleet by Type */}
          <div className="card">
            <div className="card-head"><div className="card-title">Fleet by type</div></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {FLEET_BY_TYPE.map((f) => (
                <div key={f.label} className="bar-row">
                  <div className="bar-label" style={{ width: 90 }}>{f.label}</div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: f.pct + "%", background: f.color }} /></div>
                  <div className="bar-val">{f.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiry Alerts */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">
                <i className="ti ti-alert-circle" style={{ fontSize: 14, marginRight: 5, verticalAlign: -2, color: "#c0392b" }} />
                Expiry alerts
              </div>
            </div>
            <div>
              {ALERTS.map((a, i) => (
                <div key={i} className="alert-item">
                  <div className="alert-dot" style={{ background: a.dot }} />
                  <div>
                    <div className="alert-text">{a.text}</div>
                    <div style={{ fontSize: 10, color: "#bbb", marginTop: 1 }}>{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
