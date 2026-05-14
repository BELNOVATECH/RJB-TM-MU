// // src/pages/ChargesPricing.jsx
import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const ACCOMMODATION_ROWS = [
  { type: "Standard Room", price: "₹ 800",   unit: "per night",       extra: "₹ 200 / person", maxOcc: "2 persons", amenities: "AC · TV · WiFi" },
  { type: "Deluxe Room",   price: "₹ 1,500", unit: "per night",       extra: "₹ 350 / person", maxOcc: "3 persons", amenities: "AC · TV · WiFi · Breakfast" },
  { type: "Family Suite",  price: "₹ 3,200", unit: "per night",       extra: "₹ 500 / person", maxOcc: "6 persons", amenities: "AC · TV · WiFi · Kitchen" },
  { type: "VIP Cottage",   price: "₹ 3,500", unit: "per night",       extra: "₹ 600 / person", maxOcc: "4 persons", amenities: "Luxury · Garden View" },
  { type: "Dormitory Bed", price: "₹ 250",   unit: "per bed / night", extra: "—",              maxOcc: "1 / bed",   amenities: "Fan · Common Bath" },
];

const VEHICLE_ROWS = [
  { type: "Auto Rickshaw",     perKm: "₹ 12", waiting: "₹ 50"  },
  { type: "Small Car / Sedan", perKm: "₹ 16", waiting: "₹ 80"  },
  { type: "SUV",               perKm: "₹ 22", waiting: "₹ 100" },
  { type: "Mini Bus",          perKm: "₹ 35", waiting: "₹ 150" },
  { type: "EV Vehicle",        perKm: "₹ 14", waiting: "₹ 60"  },
  { type: "Luxury Car",        perKm: "₹ 45", waiting: "₹ 200" },
];

const GUIDE_ROWS = [
  { type: "Standard Guide",   halfDay: "₹ 400",   fullDay: "₹ 750"   },
  { type: "Senior Expert",    halfDay: "₹ 700",   fullDay: "₹ 1,300" },
  { type: "Foreign Language", halfDay: "₹ 1,000", fullDay: "₹ 1,800" },
];

const FESTIVAL_ROWS = [
  { name: "Ram Navami",    sub: "Major pilgrimage festival", period: "Apr 2026",            accom: "▲ +50%", vehicle: "▲ +30%", guide: "▲ +40%", variant: "up"     },
  { name: "Diwali Season", sub: "Festival of lights",        period: "Oct – Nov 2026",      accom: "▲ +35%", vehicle: "▲ +20%", guide: "▲ +25%", variant: "up"     },
  { name: "Peak Winter",   sub: "High tourist season",       period: "Dec 2026 – Jan 2027", accom: "▲ +25%", vehicle: "▲ +15%", guide: "▲ +15%", variant: "purple" },
  { name: "Off Season",    sub: "Monsoon low season",        period: "Jul – Aug 2026",      accom: "▼ −20%", vehicle: "▼ −15%", guide: "▼ −10%", variant: "down"   },
];

const DYNAMIC_ITEMS_DEFAULT = [
  { label: "Enable AI-Based Dynamic Pricing", desc: "Automatically adjust prices based on demand forecasting", on: true  },
  { label: "Occupancy-Based Pricing",         desc: "Increase room rates when occupancy exceeds 80%",          on: true  },
  { label: "Crowd-Based Vehicle Surcharge",   desc: "Apply surcharge on peak pilgrim days",                    on: false },
  { label: "Early Booking Discount",          desc: "Discount for bookings made 7+ days in advance",           on: true  },
];

const TABS = ["Accommodation", "Vehicle", "Tour Guides", "Festival / Seasonal", "Dynamic Pricing"];

// ── Shared atoms ──────────────────────────────────────────────────────────────

function ActionBtns() {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      <button style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid rgba(0,0,0,0.09)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
        <i className="ti ti-edit" style={{ fontSize: 12 }} />
      </button>
      <button style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid rgba(0,0,0,0.09)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#c0392b" }}>
        <i className="ti ti-trash" style={{ fontSize: 12 }} />
      </button>
    </div>
  );
}

function FestBadge({ variant, children }) {
  const map = {
    up:     { background: "rgba(196,75,42,0.10)",  color: "#c0392b", border: "1px solid rgba(196,75,42,0.25)"  },
    down:   { background: "rgba(22,163,74,0.10)",  color: "#15803d", border: "1px solid rgba(22,163,74,0.25)"  },
    purple: { background: "rgba(120,80,200,0.10)", color: "#7c3aed", border: "1px solid rgba(120,80,200,0.25)" },
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 10.5, fontWeight: 600, whiteSpace: "nowrap", ...map[variant] }}>
      {children}
    </span>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{ width: 38, height: 22, borderRadius: 11, background: on ? "#f5c842" : "#e5e7eb", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
    >
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 19 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
  );
}

function SectionCard({ icon, title, children, onAdd, addLabel = "Add" }) {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-head">
        <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <i className={`ti ${icon}`} style={{ fontSize: 15, color: "#b5860d" }} />
          {title}
        </div>
        <button className="btn-primary" style={{ fontSize: 11, padding: "5px 12px" }} onClick={onAdd}>
          <i className="ti ti-plus" /> {addLabel}
        </button>
      </div>
      {children}
    </div>
  );
}

function SubField({ label, defaultValue, type = "number" }) {
  return (
    <div>
      <label style={{ fontSize: 10.5, color: "#888", display: "block", marginBottom: 4 }}>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        style={{ width: "100%", padding: "6px 10px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7, fontSize: 12, fontFamily: "inherit", background: "#fdf8f0" }}
      />
    </div>
  );
}

function SaveBtn() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
      <button className="btn-primary">
        <i className="ti ti-device-floppy" /> Save Changes
      </button>
    </div>
  );
}

// ── Tab panels ────────────────────────────────────────────────────────────────

function AccommodationTab() {
  return (
    <SectionCard icon="ti-building" title="Accommodation Charges" addLabel="Add Room Type">
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", padding: "12px 0 14px", borderBottom: "1px solid rgba(0,0,0,0.06)", flexWrap: "wrap" }}>
        {[
          { label: "Room Type", el: "select", opts: ["Standard Room", "Deluxe Room", "Family Suite", "Dormitory Bed"] },
          { label: "Base Price / Night (₹)", el: "input", placeholder: "₹ 0", defaultValue: "800",  type: "number" },
          { label: "Extra Person (₹)",       el: "input", placeholder: "₹ 0", defaultValue: "200",  type: "number" },
          { label: "Max Occupancy",          el: "input", placeholder: "Persons", defaultValue: "2", type: "number" },
        ].map((f) => (
          <div key={f.label}>
            <label style={{ fontSize: 10.5, color: "#888", display: "block", marginBottom: 4 }}>{f.label}</label>
            {f.el === "select" ? (
              <select style={{ padding: "6px 10px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7, fontSize: 12, fontFamily: "inherit", background: "#fdf8f0", minWidth: 140 }}>
                {f.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input type={f.type} defaultValue={f.defaultValue} placeholder={f.placeholder}
                style={{ padding: "6px 10px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7, fontSize: 12, fontFamily: "inherit", background: "#fdf8f0", width: 110 }} />
            )}
          </div>
        ))}
        <button className="btn-primary" style={{ whiteSpace: "nowrap" }}>Add Row</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Room Type</th><th>Base Price / Night</th><th>Extra Person Charge</th>
            <th>Max Occupancy</th><th>Amenities</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ACCOMMODATION_ROWS.map((r) => (
            <tr key={r.type}>
              <td style={{ fontWeight: 500 }}>{r.type}</td>
              <td>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1a0a00" }}>{r.price}</div>
                <div style={{ fontSize: 10, color: "#999" }}>{r.unit}</div>
              </td>
              <td style={{ color: "#555" }}>{r.extra}</td>
              <td style={{ color: "#555" }}>{r.maxOcc}</td>
              <td><span className="badge badge-gold">{r.amenities}</span></td>
              <td><span className="badge badge-green">Active</span></td>
              <td><ActionBtns /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

function VehicleTab() {
  return (
    <SectionCard icon="ti-car" title="Vehicle Charges" addLabel="Add Vehicle Type">
      <table className="data-table">
        <thead>
          <tr>
            <th>Vehicle Type</th><th>Per KM (₹)</th><th>Waiting / hr</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {VEHICLE_ROWS.map((r) => (
            <tr key={r.type}>
              <td style={{ fontWeight: 500 }}>{r.type}</td>
              <td><div style={{ fontSize: 15, fontWeight: 600, color: "#1a0a00" }}>{r.perKm}</div></td>
              <td style={{ color: "#555" }}>{r.waiting}</td>
              <td><ActionBtns /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 10, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Additional Charges
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          <SubField label="Driver Allowance / day (₹)" defaultValue="500" />
          <SubField label="Toll Charges"                defaultValue="At actuals" type="text" />
          <SubField label="Multi-day Discount (%)"      defaultValue="10" />
          <SubField label="Night Surcharge (%)"         defaultValue="20" />
        </div>
        <SaveBtn />
      </div>
    </SectionCard>
  );
}

function GuideTab() {
  return (
    <SectionCard icon="ti-license" title="Guide Charges" addLabel="Add Guide Type">
      <table className="data-table">
        <thead>
          <tr>
            <th>Guide Type</th><th>Half Day</th><th>Full Day</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {GUIDE_ROWS.map((r) => (
            <tr key={r.type}>
              <td style={{ fontWeight: 500 }}>{r.type}</td>
              <td><div style={{ fontSize: 15, fontWeight: 600, color: "#1a0a00" }}>{r.halfDay}</div></td>
              <td><div style={{ fontSize: 15, fontWeight: 600, color: "#1a0a00" }}>{r.fullDay}</div></td>
              <td><ActionBtns /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 10, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Surcharges & Additional
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          <SubField label="Group (10+) Discount (%)"      defaultValue="15" />
          <SubField label="Festival Season Surcharge (%)" defaultValue="25" />
          <SubField label="Night Tour Surcharge (%)"      defaultValue="30" />
        </div>
        <SaveBtn />
      </div>
    </SectionCard>
  );
}

function FestivalTab() {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-head">
        <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <i className="ti ti-calendar-event" style={{ fontSize: 15, color: "#b5860d" }} />
          Festival / Seasonal Pricing
        </div>
        <button className="btn-primary" style={{ fontSize: 11, padding: "5px 12px" }}>
          <i className="ti ti-plus" /> Add Festival Period
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Festival / Season</th><th>Period</th><th>Accommodation</th>
            <th>Vehicle</th><th>Guide</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {FESTIVAL_ROWS.map((r) => (
            <tr key={r.name}>
              <td>
                <div style={{ fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "#999" }}>{r.sub}</div>
              </td>
              <td style={{ color: "#555", fontSize: 12 }}>{r.period}</td>
              <td><FestBadge variant={r.variant}>{r.accom}</FestBadge></td>
              <td><FestBadge variant={r.variant}>{r.vehicle}</FestBadge></td>
              <td><FestBadge variant={r.variant}>{r.guide}</FestBadge></td>
              <td><span className="badge badge-green">Active</span></td>
              <td><ActionBtns /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DynamicTab() {
  const [items, setItems] = useState(DYNAMIC_ITEMS_DEFAULT);
  const toggle = (i) => setItems(prev => prev.map((it, idx) => idx === i ? { ...it, on: !it.on } : it));

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <i className="ti ti-adjustments" style={{ fontSize: 15, color: "#b5860d" }} />
          Dynamic Pricing Configuration
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {items.map((item, i) => (
          <div key={item.label} style={{ padding: 14, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, display: "flex", alignItems: "flex-start", gap: 12, background: "#fdf8f0" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "#999" }}>{item.desc}</div>
            </div>
            <Toggle on={item.on} onToggle={() => toggle(i)} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <button className="btn-primary">
          <i className="ti ti-device-floppy" /> Save Configuration
        </button>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function ChargesPricing() {
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
          <div className="kpi-label">Accommodation Types</div>
          <div className="kpi-value">5</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-car" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Vehicle Types</div>
          <div className="kpi-value">6</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-license" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Guide Categories</div>
          <div className="kpi-value">3</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-calendar-event" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Festival Pricing Rules</div>
          <div className="kpi-value">4</div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="tab-bar" style={{ marginBottom: 16 }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            className={`tab-pill ${activeTab === i ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 0 && <AccommodationTab />}
      {activeTab === 1 && <VehicleTab />}
      {activeTab === 2 && <GuideTab />}
      {activeTab === 3 && <FestivalTab />}
      {activeTab === 4 && <DynamicTab />}
    </div>
  );
}
