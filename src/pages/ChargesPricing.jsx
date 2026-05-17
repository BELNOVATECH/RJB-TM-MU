// src/pages/ChargesPricing.jsx
import { useState } from "react";
import "./styles/ChargesPricing.css";

// ── Data ──────────────────────────────────────────────────────────────────────

const INITIAL_ACCOMMODATION_ROWS = [
  { id: 1, type: "Standard Room", price: "₹ 800",   unit: "per night",       extra: "₹ 200 / person", maxOcc: "2 persons", amenities: "AC · TV · WiFi",             status: "Active" },
  { id: 2, type: "Deluxe Room",   price: "₹ 1,500", unit: "per night",       extra: "₹ 350 / person", maxOcc: "3 persons", amenities: "AC · TV · WiFi · Breakfast",  status: "Active" },
  { id: 3, type: "Family Suite",  price: "₹ 3,200", unit: "per night",       extra: "₹ 500 / person", maxOcc: "6 persons", amenities: "AC · TV · WiFi · Kitchen",    status: "Active" },
  { id: 4, type: "VIP Cottage",   price: "₹ 3,500", unit: "per night",       extra: "₹ 600 / person", maxOcc: "4 persons", amenities: "Luxury · Garden View",        status: "Active" },
  { id: 5, type: "Dormitory Bed", price: "₹ 250",   unit: "per bed / night", extra: "—",              maxOcc: "1 / bed",   amenities: "Fan · Common Bath",           status: "Active" },
];

const INITIAL_VEHICLE_ROWS = [
  { id: 1, type: "Auto Rickshaw",     perKm: "₹ 12", waiting: "₹ 50"  },
  { id: 2, type: "Small Car / Sedan", perKm: "₹ 16", waiting: "₹ 80"  },
  { id: 3, type: "SUV",               perKm: "₹ 22", waiting: "₹ 100" },
  { id: 4, type: "Mini Bus",          perKm: "₹ 35", waiting: "₹ 150" },
  { id: 5, type: "EV Vehicle",        perKm: "₹ 14", waiting: "₹ 60"  },
  { id: 6, type: "Luxury Car",        perKm: "₹ 45", waiting: "₹ 200" },
];

const INITIAL_GUIDE_ROWS = [
  { id: 1, type: "Standard Guide",   halfDay: "₹ 400",   fullDay: "₹ 750"   },
  { id: 2, type: "Senior Expert",    halfDay: "₹ 700",   fullDay: "₹ 1,300" },
  { id: 3, type: "Foreign Language", halfDay: "₹ 1,000", fullDay: "₹ 1,800" },
];

const INITIAL_FESTIVAL_ROWS = [
  { id: 1, name: "Ram Navami",    sub: "Major pilgrimage festival", period: "Apr 2026",            accomPct: 50,  vehiclePct: 30,  guidePct: 40,  type: "up",   status: "Active" },
  { id: 2, name: "Diwali Season", sub: "Festival of lights",        period: "Oct – Nov 2026",      accomPct: 35,  vehiclePct: 20,  guidePct: 25,  type: "up",   status: "Active" },
  { id: 3, name: "Peak Winter",   sub: "High tourist season",       period: "Dec 2026 – Jan 2027", accomPct: 25,  vehiclePct: 15,  guidePct: 15,  type: "up",   status: "Active" },
  { id: 4, name: "Off Season",    sub: "Monsoon low season",        period: "Jul – Aug 2026",      accomPct: -20, vehiclePct: -15, guidePct: -10, type: "down", status: "Active" },
];

const DYNAMIC_ITEMS_DEFAULT = [
  { label: "Enable AI-Based Dynamic Pricing", desc: "Automatically adjust prices based on demand forecasting", on: true  },
  { label: "Occupancy-Based Pricing",         desc: "Increase room rates when occupancy exceeds 80%",          on: true  },
  { label: "Crowd-Based Vehicle Surcharge",   desc: "Apply surcharge on peak pilgrim days",                    on: false },
  { label: "Early Booking Discount",          desc: "Discount for bookings made 7+ days in advance",           on: true  },
];

const TABS = ["Accommodation", "Vehicle", "Tour Guides", "Festival / Seasonal", "Dynamic Pricing"];

const ROOM_TYPE_OPTIONS    = ["Standard Room", "Deluxe Room", "Family Suite", "VIP Cottage", "Dormitory Bed", "Other"];
const UNIT_OPTIONS         = ["per night", "per bed / night", "per week"];
const STATUS_OPTIONS       = ["Active", "Inactive"];
const VEHICLE_TYPE_OPTIONS = ["Auto Rickshaw", "Small Car / Sedan", "SUV", "Mini Bus", "EV Vehicle", "Luxury Car", "Other"];
const GUIDE_TYPE_OPTIONS   = ["Standard Guide", "Senior Expert", "Foreign Language", "Other"];
const SEASON_TYPE_OPTIONS  = ["up", "down"];

const EMPTY_ROOM_FORM     = { type: "Standard Room", basePrice: "", unit: "per night", extraPerson: "", maxOcc: "", amenities: "", status: "Active" };
const EMPTY_VEHICLE_FORM  = { type: "Auto Rickshaw", perKm: "", waiting: "" };
const EMPTY_GUIDE_FORM    = { type: "Standard Guide", halfDay: "", fullDay: "" };
const EMPTY_FESTIVAL_FORM = { name: "", sub: "", period: "", accomPct: "", vehiclePct: "", guidePct: "", type: "up", status: "Active" };

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtINR(val) {
  return `₹ ${Number(val).toLocaleString("en-IN")}`;
}

function festVariant(type, pct) {
  if (type === "down") return "down";
  if (Math.abs(Number(pct)) >= 40) return "up";
  return "purple";
}

function festLabel(pct) {
  const n = Number(pct);
  return n >= 0 ? `▲ +${n}%` : `▼ ${n}%`;
}

// ── Shared atoms ──────────────────────────────────────────────────────────────

function ActionBtns({ onEdit, onDelete }) {
  return (
    <div className="cp-action-btns">
      <button className="cp-icon-btn" onClick={onEdit} title="Edit">
        <i className="ti ti-edit cp-edit-icon" />
      </button>

      <button className="cp-icon-btn cp-delete-btn" onClick={onDelete} title="Delete">
        <i className="ti ti-trash" style={{ fontSize: 12 }} />
      </button>
    </div>
  );
}

function FestBadge({ variant, children }) {
  
  return (
    <span
      className={`cp-fest-badge cp-fest-${variant}`}
    >
      {children}
    </span>
  );
}

function Toggle({ on, onToggle }) {
  return (
  <div
    onClick={onToggle}
    className={`cp-toggle ${on ? "active" : ""}`}
  >
    <div className={`cp-toggle-ball ${on ? "active" : ""}`} />
  </div>
);
}

function SectionCard({ icon, title, children, onAdd, addLabel = "Add", onClose, onSave, saveLabel = "Save" }) {
  return (
    <div className="card cp-section-card">
      <div className="card-head">
        <div className="card-title cp-card-title">
         <i className={`ti ${icon} cp-card-icon`} />
          {title}
        </div>
        {onAdd && (
          <button className="btn-primary cp-small-btn" onClick={onAdd}>
            <i className="ti ti-plus" /> {addLabel}
          </button>
        )}
        {onClose && (
          <button className="btn-outline cp-small-btn" onClick={() => onClose()}>
            <i className="ti ti-x" /> Close
          </button>
        )}
      </div>

      <div className="cp-section-body">
        {children}
      </div>

      {onSave && (
        <div style={{ paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button className="btn-outline" onClick={() => onClose && onClose()}>Cancel</button>
            <button className="btn-primary" onClick={() => onSave && onSave()}>
              <i className="ti ti-device-floppy" /> {saveLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SubField({ label, defaultValue, type = "number" }) {
 return (
  <div>
    <label className="cp-subfield-label">{label}</label>

    <input
      type={type}
      defaultValue={defaultValue}
      className="cp-subfield-input"
    />
  </div>
);
}

function SaveBtn() {
 return (
  <div className="cp-save-wrap">
    <button className="btn-primary">
      <i className="ti ti-device-floppy" /> Save Changes
    </button>
  </div>
);
}

// ── Tab panels ────────────────────────────────────────────────────────────────

// rows + setRows are now passed from the parent so KPI counts stay in sync
function AccommodationTab({ rows, setRows }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(EMPTY_ROOM_FORM);

  const inputStyle = { width: "100%", padding: "7px 10px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7, fontSize: 12, fontFamily: "inherit", color: "#1a0a00", background: "#fdf8f0", outline: "none" };
  const labelStyle = { fontSize: 11, color: "#888", display: "block", marginBottom: 4, fontWeight: 500 };

  function openAdd() { setForm(EMPTY_ROOM_FORM); setEditId(null); setShowForm(true); }

  function openEdit(row) {
    const rawPrice = row.price.replace(/[₹,\s]/g, "");
    const rawExtra = row.extra === "—" ? "" : row.extra.replace(/[₹,\s]/g, "").replace("/person", "").trim();
    const rawOcc   = row.maxOcc.replace(" persons", "").replace(" / bed", "").trim();
    setForm({ type: row.type, basePrice: rawPrice, unit: row.unit, extraPerson: rawExtra, maxOcc: rawOcc, amenities: row.amenities, status: row.status });
    setEditId(row.id);
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditId(null); setForm(EMPTY_ROOM_FORM); }

  function handleSave() {
    if (!form.type.trim() || !form.basePrice) return;
    const formatted = {
      type:      form.type,
      price:     fmtINR(form.basePrice),
      unit:      form.unit,
      extra:     form.extraPerson ? `${fmtINR(form.extraPerson)} / person` : "—",
      maxOcc:    form.unit === "per bed / night" ? `${form.maxOcc} / bed` : `${form.maxOcc} persons`,
      amenities: form.amenities,
      status:    form.status,
    };
    if (editId !== null) {
      setRows(prev => prev.map(r => r.id === editId ? { ...r, ...formatted } : r));
    } else {
      setRows(prev => [...prev, { id: Date.now(), ...formatted }]);
    }
    closeForm();
  }

  function handleDelete(id) { setRows(prev => prev.filter(r => r.id !== id)); }

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-head">
        <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <i className="ti ti-building" style={{ fontSize: 15, color: "#b5860d" }} />
          Accommodation Charges
        </div>
        <button className="btn-primary" style={{ fontSize: 11, padding: "5px 12px" }} onClick={openAdd}>
          <i className="ti ti-plus" /> Add Room Type
        </button>
      </div>

      {showForm && (
        <SectionCard title={editId !== null ? `Edit: ${form.type}` : "Add New Room Type"} icon="ti-building" onClose={closeForm} onSave={handleSave} saveLabel={editId !== null ? "Update Room Type" : "Save Room Type"}>
          <div className="cp-form-grid">
            <div className="cp-full-span">
              <label style={labelStyle}>Room Type *</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle}>
                {ROOM_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Base Price (₹) *</label>
              <input type="number" value={form.basePrice} onChange={e => setForm({ ...form, basePrice: e.target.value })} placeholder="e.g. 800" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Price Unit</label>
              <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} style={inputStyle}>
                {UNIT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Extra Person Charge (₹)</label>
              <input type="number" value={form.extraPerson} onChange={e => setForm({ ...form, extraPerson: e.target.value })} placeholder="e.g. 200" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Max Occupancy</label>
              <input type="number" value={form.maxOcc} onChange={e => setForm({ ...form, maxOcc: e.target.value })} placeholder="e.g. 2" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="cp-full-span">
              <label style={labelStyle}>Amenities</label>
              <input type="text" value={form.amenities} onChange={e => setForm({ ...form, amenities: e.target.value })} placeholder="e.g. AC · TV · WiFi · Breakfast" style={inputStyle} />
            </div>
          </div>
        </SectionCard>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Room Type</th><th>Base Price / Night</th><th>Extra Person Charge</th>
            <th>Max Occupancy</th><th>Amenities</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td style={{ fontWeight: 500 }}>{r.type}</td>
              <td>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1a0a00" }}>{r.price}</div>
                <div style={{ fontSize: 10, color: "#999" }}>{r.unit}</div>
              </td>
              <td style={{ color: "#555" }}>{r.extra}</td>
              <td style={{ color: "#555" }}>{r.maxOcc}</td>
              <td><span className="badge badge-gold">{r.amenities}</span></td>
              <td><span className={r.status === "Active" ? "badge badge-green" : "badge badge-amber"}>{r.status}</span></td>
              <td><ActionBtns onEdit={() => openEdit(r)} onDelete={() => handleDelete(r.id)} /></td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={7} style={{ textAlign: "center", padding: "28px 0", color: "#bbb", fontSize: 12 }}>No room types added yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function VehicleTab({ rows, setRows }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(EMPTY_VEHICLE_FORM);

  const inputStyle = { width: "100%", padding: "7px 10px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7, fontSize: 12, fontFamily: "inherit", color: "#1a0a00", background: "#fdf8f0", outline: "none" };
  const labelStyle = { fontSize: 11, color: "#888", display: "block", marginBottom: 4, fontWeight: 500 };

  function openAdd() { setForm(EMPTY_VEHICLE_FORM); setEditId(null); setShowForm(true); }

  function openEdit(row) {
    setForm({ type: row.type, perKm: row.perKm.replace(/[₹\s]/g, ""), waiting: row.waiting.replace(/[₹\s]/g, "") });
    setEditId(row.id);
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditId(null); setForm(EMPTY_VEHICLE_FORM); }

  function handleSave() {
    if (!form.type.trim() || !form.perKm) return;
    const formatted = { type: form.type, perKm: fmtINR(form.perKm), waiting: form.waiting ? fmtINR(form.waiting) : "—" };
    if (editId !== null) {
      setRows(prev => prev.map(r => r.id === editId ? { ...r, ...formatted } : r));
    } else {
      setRows(prev => [...prev, { id: Date.now(), ...formatted }]);
    }
    closeForm();
  }

  function handleDelete(id) { setRows(prev => prev.filter(r => r.id !== id)); }

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-head">
        <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <i className="ti ti-car" style={{ fontSize: 15, color: "#b5860d" }} />
          Vehicle Charges
        </div>
        <button className="btn-primary" style={{ fontSize: 11, padding: "5px 12px" }} onClick={openAdd}>
          <i className="ti ti-plus" /> Add Vehicle Type
        </button>
      </div>

      {showForm && (
        <SectionCard
          title={editId !== null ? `Edit: ${form.type}` : "Add New Vehicle Type"}
          icon="ti-car"
          onClose={closeForm}
          onSave={handleSave}
          saveLabel={editId !== null ? "Update Vehicle" : "Save Vehicle"}
        >
          <div className="cp-form-grid">
            {/* ── Vehicle Type dropdown — explicit value + onChange so options render correctly ── */}
            <div className="cp-full-span">
              <label style={labelStyle}>Vehicle Type *</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                style={inputStyle}
              >
                {VEHICLE_TYPE_OPTIONS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Per KM Rate (₹) *</label>
              <input
                type="number"
                value={form.perKm}
                onChange={e => setForm({ ...form, perKm: e.target.value })}
                placeholder="e.g. 12"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Waiting Charge / hr (₹)</label>
              <input
                type="number"
                value={form.waiting}
                onChange={e => setForm({ ...form, waiting: e.target.value })}
                placeholder="e.g. 50"
                style={inputStyle}
              />
            </div>
          </div>
        </SectionCard>
      )}

      <table className="data-table">
        <thead>
          <tr><th>Vehicle Type</th><th>Per KM (₹)</th><th>Waiting / hr</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td style={{ fontWeight: 500 }}>{r.type}</td>
              <td><div style={{ fontSize: 15, fontWeight: 600, color: "#1a0a00" }}>{r.perKm}</div></td>
              <td style={{ color: "#555" }}>{r.waiting}</td>
              <td><ActionBtns onEdit={() => openEdit(r)} onDelete={() => handleDelete(r.id)} /></td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={4} style={{ textAlign: "center", padding: "28px 0", color: "#bbb", fontSize: 12 }}>No vehicle types added yet.</td></tr>
          )}
        </tbody>
      </table>

      <div style={{ paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 10, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Additional Charges</div>
        <div className="cp-grid-4">
          <SubField label="Driver Allowance / day (₹)" defaultValue="500" />
          <SubField label="Toll Charges"                defaultValue="At actuals" type="text" />
          <SubField label="Multi-day Discount (%)"      defaultValue="10" />
          <SubField label="Night Surcharge (%)"         defaultValue="20" />
        </div>
        <SaveBtn />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function GuideTab({ rows, setRows }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(EMPTY_GUIDE_FORM);

  const inputStyle = { width: "100%", padding: "7px 10px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7, fontSize: 12, fontFamily: "inherit", color: "#1a0a00", background: "#fdf8f0", outline: "none" };
  const labelStyle = { fontSize: 11, color: "#888", display: "block", marginBottom: 4, fontWeight: 500 };

  function openAdd() { setForm(EMPTY_GUIDE_FORM); setEditId(null); setShowForm(true); }

  function openEdit(row) {
    setForm({ type: row.type, halfDay: row.halfDay.replace(/[₹,\s]/g, ""), fullDay: row.fullDay.replace(/[₹,\s]/g, "") });
    setEditId(row.id);
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditId(null); setForm(EMPTY_GUIDE_FORM); }

  function handleSave() {
    if (!form.type.trim() || !form.halfDay || !form.fullDay) return;
    const formatted = { type: form.type, halfDay: fmtINR(form.halfDay), fullDay: fmtINR(form.fullDay) };
    if (editId !== null) {
      setRows(prev => prev.map(r => r.id === editId ? { ...r, ...formatted } : r));
    } else {
      setRows(prev => [...prev, { id: Date.now(), ...formatted }]);
    }
    closeForm();
  }

  function handleDelete(id) { setRows(prev => prev.filter(r => r.id !== id)); }

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-head">
        <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <i className="ti ti-license" style={{ fontSize: 15, color: "#b5860d" }} />
          Guide Charges
        </div>
        <button className="btn-primary" style={{ fontSize: 11, padding: "5px 12px" }} onClick={openAdd}>
          <i className="ti ti-plus" /> Add Guide Type
        </button>
      </div>

      {showForm && (
        <SectionCard title={editId !== null ? `Edit: ${form.type}` : "Add New Guide Type"} icon="ti-license" onClose={closeForm} onSave={handleSave} saveLabel={editId !== null ? "Update Guide" : "Save Guide"}>
          <div className="cp-form-grid">
            <div className="cp-full-span">
              <label style={labelStyle}>Guide Type *</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle}>
                {GUIDE_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Half Day Rate (₹) *</label>
              <input type="number" value={form.halfDay} onChange={e => setForm({ ...form, halfDay: e.target.value })} placeholder="e.g. 400" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Full Day Rate (₹) *</label>
              <input type="number" value={form.fullDay} onChange={e => setForm({ ...form, fullDay: e.target.value })} placeholder="e.g. 750" style={inputStyle} />
            </div>
          </div>
        </SectionCard>
      )}

      <table className="data-table">
        <thead>
          <tr><th>Guide Type</th><th>Half Day</th><th>Full Day</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td style={{ fontWeight: 500 }}>{r.type}</td>
              <td><div style={{ fontSize: 15, fontWeight: 600, color: "#1a0a00" }}>{r.halfDay}</div></td>
              <td><div style={{ fontSize: 15, fontWeight: 600, color: "#1a0a00" }}>{r.fullDay}</div></td>
              <td><ActionBtns onEdit={() => openEdit(r)} onDelete={() => handleDelete(r.id)} /></td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={4} style={{ textAlign: "center", padding: "28px 0", color: "#bbb", fontSize: 12 }}>No guide types added yet.</td></tr>
          )}
        </tbody>
      </table>

      <div style={{ paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 10, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Surcharges & Additional</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          <SubField label="Group (10+) Discount (%)"      defaultValue="15" />
          <SubField label="Festival Season Surcharge (%)" defaultValue="25" />
          <SubField label="Night Tour Surcharge (%)"      defaultValue="30" />
        </div>
        <SaveBtn />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function FestivalTab({ rows, setRows }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(EMPTY_FESTIVAL_FORM);

  const inputStyle = { width: "100%", padding: "7px 10px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7, fontSize: 12, fontFamily: "inherit", color: "#1a0a00", background: "#fdf8f0", outline: "none" };
  const labelStyle = { fontSize: 11, color: "#888", display: "block", marginBottom: 4, fontWeight: 500 };

  function openAdd() { setForm(EMPTY_FESTIVAL_FORM); setEditId(null); setShowForm(true); }

  function openEdit(row) {
    setForm({ name: row.name, sub: row.sub, period: row.period, accomPct: String(row.accomPct), vehiclePct: String(row.vehiclePct), guidePct: String(row.guidePct), type: row.type, status: row.status });
    setEditId(row.id);
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditId(null); setForm(EMPTY_FESTIVAL_FORM); }

  function handleSave() {
    if (!form.name.trim() || !form.period.trim()) return;
    const formatted = {
      name: form.name, sub: form.sub, period: form.period,
      accomPct: Number(form.accomPct), vehiclePct: Number(form.vehiclePct), guidePct: Number(form.guidePct),
      type: form.type, status: form.status,
    };
    if (editId !== null) {
      setRows(prev => prev.map(r => r.id === editId ? { ...r, ...formatted } : r));
    } else {
      setRows(prev => [...prev, { id: Date.now(), ...formatted }]);
    }
    closeForm();
  }

  function handleDelete(id) { setRows(prev => prev.filter(r => r.id !== id)); }

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-head">
        <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <i className="ti ti-calendar-event" style={{ fontSize: 15, color: "#b5860d" }} />
          Festival / Seasonal Pricing
        </div>
        <button className="btn-primary" style={{ fontSize: 11, padding: "5px 12px" }} onClick={openAdd}>
          <i className="ti ti-plus" /> Add Festival Period
        </button>
      </div>

      {showForm && (
        <SectionCard title={editId !== null ? `Edit: ${form.name}` : "Add New Festival Period"} icon="ti-calendar-event" onClose={closeForm} onSave={handleSave} saveLabel={editId !== null ? "Update Festival" : "Save Festival"}>
          <div className="cp-form-grid">
            <div>
              <label style={labelStyle}>Festival / Season Name *</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ram Navami" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Sub Title</label>
              <input type="text" value={form.sub} onChange={e => setForm({ ...form, sub: e.target.value })} placeholder="e.g. Major pilgrimage festival" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Period *</label>
              <input type="text" value={form.period} onChange={e => setForm({ ...form, period: e.target.value })} placeholder="e.g. Apr 2026" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Accommodation % (use − for discount)</label>
              <input type="number" value={form.accomPct} onChange={e => setForm({ ...form, accomPct: e.target.value })} placeholder="e.g. 50 or -20" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Vehicle % (use − for discount)</label>
              <input type="number" value={form.vehiclePct} onChange={e => setForm({ ...form, vehiclePct: e.target.value })} placeholder="e.g. 30 or -15" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Guide % (use − for discount)</label>
              <input type="number" value={form.guidePct} onChange={e => setForm({ ...form, guidePct: e.target.value })} placeholder="e.g. 40 or -10" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Season Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle}>
                {SEASON_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </SectionCard>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Festival / Season</th><th>Period</th><th>Accommodation</th>
            <th>Vehicle</th><th>Guide</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>
                <div style={{ fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "#999" }}>{r.sub}</div>
              </td>
              <td style={{ color: "#555", fontSize: 12 }}>{r.period}</td>
              <td><FestBadge variant={festVariant(r.type, r.accomPct)}>{festLabel(r.accomPct)}</FestBadge></td>
              <td><FestBadge variant={festVariant(r.type, r.vehiclePct)}>{festLabel(r.vehiclePct)}</FestBadge></td>
              <td><FestBadge variant={festVariant(r.type, r.guidePct)}>{festLabel(r.guidePct)}</FestBadge></td>
              <td><span className={r.status === "Active" ? "badge badge-green" : "badge badge-amber"}>{r.status}</span></td>
              <td><ActionBtns onEdit={() => openEdit(r)} onDelete={() => handleDelete(r.id)} /></td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={7} style={{ textAlign: "center", padding: "28px 0", color: "#bbb", fontSize: 12 }}>No festival periods added yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

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
      <div className="cp-grid-2">
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
        <button className="btn-primary"><i className="ti ti-device-floppy" /> Save Configuration</button>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function ChargesPricing() {
  const [activeTab, setActiveTab] = useState(0);

  // ── State lifted to parent so KPI cards always reflect current counts ──
  const [accommodationRows, setAccommodationRows] = useState(INITIAL_ACCOMMODATION_ROWS);
  const [vehicleRows, setVehicleRows]             = useState(INITIAL_VEHICLE_ROWS);
  const [guideRows, setGuideRows]                 = useState(INITIAL_GUIDE_ROWS);
  const [festivalRows, setFestivalRows]           = useState(INITIAL_FESTIVAL_ROWS);

  return (
    <div className="chargespricing-page">
      {/* KPI Row — counts now derived from live state */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef9c3" }}>
            <i className="ti ti-building" style={{ color: "#b5860d" }} />
          </div>
          <div className="kpi-label">Accommodation Types</div>
          <div className="kpi-value">{accommodationRows.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-car" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Vehicle Types</div>
          <div className="kpi-value">{vehicleRows.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-license" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Guide Categories</div>
          <div className="kpi-value">{guideRows.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-calendar-event" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Festival Pricing Rules</div>
          <div className="kpi-value">{festivalRows.length}</div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="tab-bar" style={{ marginBottom: 16 }}>
        {TABS.map((t, i) => (
          <button key={t} className={`tab-pill ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
        ))}
      </div>

      {/* Tab Content — rows + setRows passed as props */}
      {activeTab === 0 && <AccommodationTab rows={accommodationRows} setRows={setAccommodationRows} />}
      {activeTab === 1 && <VehicleTab       rows={vehicleRows}       setRows={setVehicleRows}       />}
      {activeTab === 2 && <GuideTab         rows={guideRows}         setRows={setGuideRows}         />}
      {activeTab === 3 && <FestivalTab      rows={festivalRows}      setRows={setFestivalRows}      />}
      {activeTab === 4 && <DynamicTab />}
    </div>
  );
}