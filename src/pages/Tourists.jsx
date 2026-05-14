// src/pages/Tourists.jsx
import { useState } from "react";

const TOURISTS = [
  {
    initials: "RM", name: "sheethal Mishra", phone: "+91 98765 43210",
    from: "Varanasi, UP", checkin: "14 May 2026", group: "Family · 4",
    services: ["Pooja", "Vehicle"], status: "Active", statusCls: "badge-green",
  },
  {
    initials: "PK", name: "Priya Kumari", phone: "+91 87654 32109",
    from: "Mumbai, MH", checkin: "13 May 2026", group: "Solo · 1",
    services: ["Cottage"], status: "Checked In", statusCls: "badge-blue",
  },
  {
    initials: "AS", name: "Anil Sharma", phone: "+91 76543 21098",
    from: "New Delhi", checkin: "14 May 2026", group: "Group · 12",
    services: ["Pooja", "Guide", "Bus"], status: "Active", statusCls: "badge-green",
  },
  {
    initials: "GN", name: "Geeta Nair", phone: "+91 65432 10987",
    from: "Kochi, KL", checkin: "15 May 2026", group: "Family · 6",
    services: ["Cottage"], status: "Upcoming", statusCls: "badge-amber",
  },
  {
    initials: "RV", name: "Rohit Verma", phone: "+91 54321 09876",
    from: "Patna, BR", checkin: "14 May 2026", group: "Family · 3",
    services: ["Pooja", "Guide"], status: "Active", statusCls: "badge-green",
  },
];

const SERVICE_COLORS = {
  Pooja: { bg: "#fef9c3", color: "#b5860d" },
  Vehicle: { bg: "#dbeafe", color: "#1d4ed8" },
  Cottage: { bg: "#dcfce7", color: "#15803d" },
  Guide: { bg: "#ede9fe", color: "#6d28d9" },
  Bus: { bg: "#fee2e2", color: "#b91c1c" },
};

const TABS = ["All Tourists", "Tour Guides", "Group Bookings"];

export default function Tourists() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef9c3" }}>
            <i className="ti ti-users" style={{ color: "#b5860d" }} />
          </div>
          <div className="kpi-label">Total Registered</div>
          <div className="kpi-value">12,480</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-map-pin" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Currently Visiting</div>
          <div className="kpi-value">3,870</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-license" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Active Guides</div>
          <div className="kpi-value">48</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-clock" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Pending Approvals</div>
          <div className="kpi-value">14</div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-head">
          {/* Tabs */}
          <div className="tab-bar" style={{ marginBottom: 0 }}>
            {TABS.map((t, i) => (
              <button key={t} className={`tab-pill ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-outline">Export</button>
            <button className="btn-outline">Filter</button>
            <button className="btn-primary"><i className="ti ti-plus" /> Add Tourist</button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Tourist</th>
              <th>From</th>
              <th>Check-in</th>
              <th>Group</th>
              <th>Services</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {TOURISTS.map((t) => (
              <tr key={t.phone}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div className="avatar-circle">{t.initials}</div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 12 }}>{t.name}</div>
                      <div style={{ fontSize: 10, color: "#999" }}>{t.phone}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 12, color: "#555" }}>{t.from}</td>
                <td style={{ fontSize: 12, color: "#555" }}>{t.checkin}</td>
                <td style={{ fontSize: 12 }}>{t.group}</td>
                <td>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {t.services.map((s) => (
                      <span key={s} style={{
                        fontSize: 10, padding: "2px 7px", borderRadius: 20,
                        background: SERVICE_COLORS[s]?.bg || "#f3f4f6",
                        color: SERVICE_COLORS[s]?.color || "#555",
                        fontWeight: 500,
                      }}>{s}</span>
                    ))}
                  </div>
                </td>
                <td><span className={`badge ${t.statusCls}`}>{t.status}</span></td>
                <td>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 14 }}>
                    <i className="ti ti-dots-vertical" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 11, color: "#999" }}>Showing 5 of 12,480 tourists</div>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3].map((p) => (
              <button key={p} style={{
                width: 28, height: 28, borderRadius: 6, fontSize: 11,
                background: p === 1 ? "#f5c842" : "none",
                color: p === 1 ? "#1a0a00" : "#999",
                border: p === 1 ? "none" : "1px solid rgba(0,0,0,0.09)",
                cursor: "pointer", fontFamily: "inherit", fontWeight: p === 1 ? 600 : 400,
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
