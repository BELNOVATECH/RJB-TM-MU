import { useState } from "react";
import { createPortal } from "react-dom";
import "./Vehicles.css";
 
const INITIAL_FLEET = [
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
const TYPE_OPTIONS = ["SUV", "Sedan", "Mini Bus", "Auto", "EV", "Luxury"];
const STATUS_OPTIONS = ["Available", "On Trip", "Maintenance", "Permit Due"];
 
const TYPE_CLS_MAP = {
  SUV: "badge-blue",
  Sedan: "badge-gold",
  "Mini Bus": "badge-purple",
  Auto: "badge-amber",
  EV: "badge-green",
  Luxury: "badge-purple",
};
 
const STATUS_CLS_MAP = {
  Available: "badge-green",
  "On Trip": "badge-green",
  Maintenance: "badge-red",
  "Permit Due": "badge-red",
};
 
const EMPTY_FORM = {
  reg: "",
  vehicleName: "",
  year: "",
  type: "SUV",
  driver: "",
  capacity: "",
  status: "Available",
};
 
// ── ADD VEHICLE MODAL (rendered via Portal into document.body) ──
function AddVehicleModal({ onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
 
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };
 
  const validate = () => {
    const errs = {};
    if (!form.reg.trim()) errs.reg = "Registration number is required";
    if (!form.vehicleName.trim()) errs.vehicleName = "Vehicle name is required";
    if (!form.year.trim()) errs.year = "Year is required";
    else if (!/^\d{4}$/.test(form.year.trim())) errs.year = "Enter a valid 4-digit year";
    if (!form.driver.trim()) errs.driver = "Driver name is required";
    if (!form.capacity.trim()) errs.capacity = "Capacity is required";
    return errs;
  };
 
  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSave({
      reg: form.reg.trim().toUpperCase(),
      model: `${form.vehicleName.trim()} · ${form.year.trim()}`,
      type: form.type,
      typeCls: TYPE_CLS_MAP[form.type] || "badge-blue",
      driver: form.driver.trim(),
      capacity: `${form.capacity.trim()} pax`,
      status: form.status,
      statusCls: STATUS_CLS_MAP[form.status] || "badge-green",
    });
  };
 
 


 
  const modal = (
   <div className="vehicle-modal-overlay"
      onMouseDown={onClose}
    >
      <div className="vehicle-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="vehicle-modal-header">
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>
              🚗 Add New Vehicle
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>
              Fill in all details to register the vehicle
            </div>
          </div>
          <button
  onClick={onClose}
  className="vehicle-close-btn"
>
            ×
          </button>
        </div>
 
        {/* Divider */}
        <div className="vehicle-divider" />
 
        {/* Form Fields */}
        <div className="vehicle-form-grid">
 
          {/* Registration Number — full width */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="vehicle-label">Registration Number *</label>
            <input
              name="reg"
              value={form.reg}
              onChange={handleChange}
              placeholder="e.g. UP-32 AB 1234"
              autoComplete="off"
              className={`vehicle-input ${errors.reg ? "vehicle-input-error" : ""}`}
            />
            {errors.reg && <div className="vehicle-error">{errors.reg}</div>}
          </div>
 
          {/* Vehicle Name */}
          <div>
            <label className="vehicle-label">Vehicle Name *</label>
            <input
              name="vehicleName"
              value={form.vehicleName}
              onChange={handleChange}
              placeholder="e.g. Toyota Innova"
              autoComplete="off"
             className={`vehicle-input ${errors.vehicleName ? "vehicle-input-error" : ""}`}
            />
            {errors.vehicleName && <div className="vehicle-error">{errors.vehicleName}</div>}
          </div>
 
          {/* Year */}
          <div>
            <label className="vehicle-label">Year *</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="e.g. 2024"
              maxLength={4}
              autoComplete="off"
              className={`vehicle-input ${errors.year ? "vehicle-input-error" : ""}`}
            />
            {errors.year && <div className="vehicle-error">{errors.year}</div>}
          </div>
 
          {/* Type */}
          <div>
            <label className="vehicle-label">Vehicle Type *</label>
            <select className="vehicle-input" name="type" value={form.type} onChange={handleChange}>
              {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
 
          {/* Status */}
          <div>
            <label className="vehicle-label">Status *</label>
            <select className="vehicle-input" name="status" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
 
          {/* Driver Name */}
          <div>
            <label className="vehicle-label">Driver Name *</label>
            <input
              name="driver"
              value={form.driver}
              onChange={handleChange}
              placeholder="e.g. Ramesh Kumar"
              autoComplete="off"
              className={`vehicle-input ${errors.driver ? "vehicle-input-error" : ""}`}
            />
            {errors.driver && <div className="vehicle-error">{errors.driver}</div>}
          </div>
 
          {/* Capacity */}
          <div>
            <label className="vehicle-label">Capacity (passengers) *</label>
            <input
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="e.g. 7"
              type="number"
              min={1}
              className={`vehicle-input ${errors.capacity ? "vehicle-input-error" : ""}`}
            />
            {errors.capacity && <div className="vehicle-error">{errors.capacity}</div>}
          </div>
 
        </div>
 
        {/* Divider */}
       <div className="vehicle-divider vehicle-divider-footer" />
 
        {/* Footer Buttons */}
        <div className="vehicle-modal-footer">
          <button
  onClick={onClose}
  className="vehicle-cancel-btn"
>
            Cancel
          </button>
          <button
  onClick={handleSave}
  className="vehicle-save-btn"
>
            💾 Save Vehicle
          </button>
        </div>
      </div>
    </div>
  );
 
  // ✅ Portal: renders directly into document.body
  // This escapes any parent overflow:hidden / transform / z-index stacking traps
  return createPortal(modal, document.body);
}
 
// ── MAIN PAGE ──
export default function Vehicles() {
  const [activeTab, setActiveTab] = useState(0);
  const [fleet, setFleet] = useState(INITIAL_FLEET);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
 
  const handleSave = (newVehicle) => {
    setFleet((prev) => [newVehicle, ...prev]);
    setShowModal(false);
  };
  const handleDelete = (reg) => {
  setFleet((prev) =>
    prev.filter((v) => v.reg !== reg)
  );
};

const handleEdit = (vehicle) => {
  alert(`Edit feature for ${vehicle.reg}`);
};
  const filteredFleet = fleet.filter((v) =>
  v.reg.toLowerCase().includes(searchTerm.toLowerCase()) ||
  v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
  v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
  v.model.toLowerCase().includes(searchTerm.toLowerCase())
);
 
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
          <div className="kpi-value">{fleet.length}</div>
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
          <div className="kpi-value">
  {
    fleet.filter(
      (v) =>
        v.status === "Available" ||
        v.status === "On Trip"
    ).length
  }
</div>
          <div className="kpi-sub" style={{ color: "#f5c842" }}>7 on break</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-calendar-check" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Bookings Today</div>
          <div className="kpi-value">128</div>
          <div className="kpi-sub">
            <i className="ti ti-trending-up" style={{ fontSize: 10 }} /> +18% vs yesterday
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-alert-triangle" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Permit Expiring</div>
          <div className="kpi-value">
  {
    fleet.filter(
      (v) => v.status === "Permit Due"
    ).length
  }
</div>
          <div className="kpi-sub" style={{ color: "#b91c1c" }}>Action required</div>
        </div>
      </div>
 
      {/* Tab bar + actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="tab-bar" style={{ marginBottom: 0 }}>
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
        <div style={{ display: "flex", gap: 8 }}>
         <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.09)",
    borderRadius: 8,
    padding: "6px 12px",
  }}
>
  <i className="ti ti-search" style={{ fontSize: 13, color: "#888" }} />

  <input
    type="text"
    placeholder="Search vehicle / driver..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      border: "none",
      outline: "none",
      fontSize: 12,
      background: "transparent",
      width: 180,
    }}
  />
</div>
 
          {/* ✅ Add Vehicle button */}
          <button
            className="btn-primary"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <i className="ti ti-plus" /> Add Vehicle
          </button>
        </div>
      </div>
 
      {/* Main content grid */}
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFleet.map((v, idx) => (
                <tr key={v.reg + idx}>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: 12 }}>{v.reg}</div>
                    <div style={{ fontSize: 10, color: "#999" }}>{v.model}</div>
                  </td>
                  <td><span className={`badge ${v.typeCls}`}>{v.type}</span></td>
                  <td style={{ fontSize: 12 }}>{v.driver}</td>
                  <td style={{ fontSize: 12 }}>{v.capacity}</td>
                  <td><span className={`badge ${v.statusCls}`}>{v.status}</span></td>
                  <td>
  <div className="table-action-btns">
    <button
      className="table-icon-btn"
      onClick={() => handleEdit(v)}
    >
      <i className="ti ti-edit" />
    </button>

    <button
      className="table-icon-btn delete"
      onClick={() => handleDelete(v.reg)}
    >
      <i className="ti ti-trash" />
    </button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 
        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div className="card-head"><div className="card-title">Fleet by type</div></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {FLEET_BY_TYPE.map((f) => (
                <div key={f.label} className="bar-row">
                  <div className="bar-label" style={{ width: 90 }}>{f.label}</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: f.pct + "%", background: f.color }} />
                  </div>
                  <div className="bar-val">{f.count}</div>
                </div>
              ))}
            </div>
          </div>
 
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
 
      {/* ✅ Modal via Portal — bypasses all parent z-index/overflow traps */}
      {showModal && (
        <AddVehicleModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}