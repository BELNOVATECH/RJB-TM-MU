// // src/pages/TouristSpots.jsx
import { useState } from "react";

const INITIAL_SPOTS = [
  { id: 1, name: "Ram Janmabhoomi Temple", category: "Temple / Shrine", district: "Ayodhya", timing: "6:00 AM – 10:00 PM", status: "Active", featured: true, visits: "2,840/day", color: "#3D2B0A", lat: "26.7983", lng: "82.1951", entry: "Free" },
  { id: 2, name: "Hanuman Garhi", category: "Temple / Shrine", district: "Ayodhya", timing: "5:00 AM – 9:00 PM", status: "Active", featured: true, visits: "1,620/day", color: "#0A2830", lat: "26.7971", lng: "82.1948", entry: "Free" },
  { id: 3, name: "Kanak Bhawan", category: "Temple / Shrine", district: "Ayodhya", timing: "8:00 AM – 12:00 PM", status: "Active", featured: false, visits: "980/day", color: "#281A06", lat: "26.7954", lng: "82.1945", entry: "Free" },
  { id: 4, name: "Saryu Ghat", category: "Ghat", district: "Ayodhya", timing: "Open 24 hrs", status: "Active", featured: true, visits: "1,240/day", color: "#0A1E0A", lat: "26.7921", lng: "82.1912", entry: "Free" },
  { id: 5, name: "Ram Ki Paidi", category: "Historical Site", district: "Ayodhya", timing: "Open 24 hrs", status: "Active", featured: false, visits: "820/day", color: "#200A28", lat: "26.7900", lng: "82.1905", entry: "Free" },
  { id: 6, name: "Treta Ke Thakur", category: "Temple / Shrine", district: "Ayodhya", timing: "7:00 AM – 8:00 PM", status: "Inactive", featured: false, visits: "—", color: "#1A1208", lat: "26.7860", lng: "82.1880", entry: "Free" },
];

const CATEGORIES = ["All", "Temple / Shrine", "Ghat", "Historical Site", "Museum", "Nearby Attraction"];
const CATEGORY_OPTIONS = ["Temple / Shrine", "Ghat", "Historical Site", "Museum", "Nearby Attraction"];
const STATUS_OPTIONS = ["Active", "Inactive"];

const EMPTY_FORM = {
  name: "", category: "Temple / Shrine", district: "Ayodhya",
  openTime: "", closeTime: "", status: "Active",
  featured: false, lat: "", lng: "", entry: "Free",
};

export default function TouristSpots() {
  const [spots, setSpots] = useState(INITIAL_SPOTS);
  const [activeCat, setActiveCat] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState("");

  const filtered = spots.filter((s) => {
    const catMatch = activeCat === 0 || s.category === CATEGORIES[activeCat];
    const searchMatch = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const totalSpots = spots.length;
  const activeCount = spots.filter((s) => s.status === "Active").length;
  const featuredCount = spots.filter((s) => s.featured).length;
  const inactiveCount = spots.filter((s) => s.status === "Inactive").length;

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(spot) {
    const [openTime, closeTime] = spot.timing.includes("–")
      ? spot.timing.split("–").map((t) => t.trim())
      : [spot.timing, ""];
    setForm({
      name: spot.name,
      category: spot.category,
      district: spot.district,
      openTime: openTime === "Open 24 hrs" ? "Open 24 hrs" : openTime,
      closeTime: openTime === "Open 24 hrs" ? "" : closeTime,
      status: spot.status,
      featured: spot.featured,
      lat: spot.lat || "",
      lng: spot.lng || "",
      entry: spot.entry || "Free",
    });
    setEditId(spot.id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_FORM);
  }

  function handleSave() {
    if (!form.name.trim()) return;
    const timing =
      form.openTime === "Open 24 hrs"
        ? "Open 24 hrs"
        : form.openTime && form.closeTime
        ? `${form.openTime} – ${form.closeTime}`
        : form.openTime || "—";

    if (editId !== null) {
      setSpots((prev) =>
        prev.map((s) =>
          s.id === editId
            ? { ...s, name: form.name, category: form.category, district: form.district, timing, status: form.status, featured: form.featured, lat: form.lat, lng: form.lng, entry: form.entry }
            : s
        )
      );
    } else {
      const newSpot = {
        id: Date.now(),
        name: form.name,
        category: form.category,
        district: form.district,
        timing,
        status: form.status,
        featured: form.featured,
        visits: "—",
        color: "#2A1A0A",
        lat: form.lat,
        lng: form.lng,
        entry: form.entry,
      };
      setSpots((prev) => [...prev, newSpot]);
    }
    closeForm();
  }

  function handleDelete(id) {
    setSpots((prev) => prev.filter((s) => s.id !== id));
  }

  function handleToggleFeatured(id) {
    setSpots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s))
    );
  }

  function handleToggleStatus(id) {
    setSpots((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
      )
    );
  }

  const inputStyle = {
    width: "100%", padding: "7px 10px",
    border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7,
    fontSize: 12, fontFamily: "inherit", color: "#1a0a00", background: "#fdf8f0",
    outline: "none",
  };
  const labelStyle = { fontSize: 11, color: "#888", display: "block", marginBottom: 4, fontWeight: 500 };

  return (
    <div>
      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef9c3" }}>
            <i className="ti ti-map-pin" style={{ color: "#b5860d" }} />
          </div>
          <div className="kpi-label">Total Spots</div>
          <div className="kpi-value">{totalSpots}</div>
          <div className="kpi-sub" style={{ color: "#999" }}>Pilgrimage locations</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-circle-check" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Active</div>
          <div className="kpi-value">{activeCount}</div>
          <div className="kpi-sub">Currently visible</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef9c3" }}>
            <i className="ti ti-star" style={{ color: "#b5860d" }} />
          </div>
          <div className="kpi-label">Featured</div>
          <div className="kpi-value">{featuredCount}</div>
          <div className="kpi-sub" style={{ color: "#999" }}>On home screen</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#999" }} />
          <div className="kpi-icon" style={{ background: "#f3f4f6" }}>
            <i className="ti ti-eye-off" style={{ color: "#666" }} />
          </div>
          <div className="kpi-label">Inactive</div>
          <div className="kpi-value">{inactiveCount}</div>
          <div className="kpi-sub" style={{ color: "#999" }}>Hidden from tourists</div>
        </div>
      </div>

      {/* ── Add / Edit Form Panel ── */}
      {showForm && (
        <div className="card" style={{ marginBottom: 14, border: "1px solid rgba(245,200,66,0.3)" }}>
          <div className="card-head">
            <div className="card-title">
              <i className="ti ti-map-pin" style={{ fontSize: 14, marginRight: 6, verticalAlign: -2, color: "#b5860d" }} />
              {editId !== null ? `Edit: ${form.name || "Tourist Spot"}` : "Add New Tourist Spot"}
            </div>
            <button className="btn-outline" style={{ fontSize: 11, padding: "4px 10px" }} onClick={closeForm}>
              <i className="ti ti-x" /> Close
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {/* Spot Name – full width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Spot / Location Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Ram Janmabhoomi Temple"
                style={inputStyle}
              />
            </div>

            {/* Category */}
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Status */}
            <div>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Featured toggle */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <label style={labelStyle}>Featured on Home Screen</label>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7, background: "#fdf8f0", cursor: "pointer" }}
                onClick={() => setForm({ ...form, featured: !form.featured })}>
                <div style={{
                  width: 34, height: 18, borderRadius: 9, transition: "background .2s",
                  background: form.featured ? "#f5c842" : "#ddd", position: "relative"
                }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: "50%", background: "#fff",
                    position: "absolute", top: 2, left: form.featured ? 18 : 2, transition: "left .2s"
                  }} />
                </div>
                <span style={{ fontSize: 12, color: form.featured ? "#b5860d" : "#999" }}>
                  {form.featured ? "Yes – Featured" : "No"}
                </span>
              </div>
            </div>

            {/* Opening Time */}
            <div>
              <label style={labelStyle}>Opening Time</label>
              <input
                value={form.openTime}
                onChange={(e) => setForm({ ...form, openTime: e.target.value })}
                placeholder="e.g. 6:00 AM  or  Open 24 hrs"
                style={inputStyle}
              />
            </div>

            {/* Closing Time */}
            <div>
              <label style={labelStyle}>Closing Time</label>
              <input
                value={form.closeTime}
                onChange={(e) => setForm({ ...form, closeTime: e.target.value })}
                placeholder="e.g. 10:00 PM  (leave blank if 24 hrs)"
                style={inputStyle}
                disabled={form.openTime === "Open 24 hrs"}
              />
            </div>

            {/* District */}
            <div>
              <label style={labelStyle}>District</label>
              <input
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                placeholder="Ayodhya"
                style={inputStyle}
              />
            </div>

            {/* GPS Latitude */}
            <div>
              <label style={labelStyle}>GPS Latitude</label>
              <input
                value={form.lat}
                onChange={(e) => setForm({ ...form, lat: e.target.value })}
                placeholder="26.7953"
                style={inputStyle}
              />
            </div>

            {/* GPS Longitude */}
            <div>
              <label style={labelStyle}>GPS Longitude</label>
              <input
                value={form.lng}
                onChange={(e) => setForm({ ...form, lng: e.target.value })}
                placeholder="82.1942"
                style={inputStyle}
              />
            </div>

            {/* Entry Fee */}
            <div>
              <label style={labelStyle}>Entry Fee</label>
              <input
                value={form.entry}
                onChange={(e) => setForm({ ...form, entry: e.target.value })}
                placeholder="Free  or  ₹ 50"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
            <button className="btn-outline" onClick={closeForm}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>
              <i className="ti ti-device-floppy" /> {editId !== null ? "Update Spot" : "Save Spot"}
            </button>
          </div>
        </div>
      )}

      {/* ── Table Card ── */}
      <div className="card">
        <div className="card-head">
          {/* Category Filter */}
          <div className="tab-bar" style={{ marginBottom: 0, flexWrap: "wrap" }}>
            {CATEGORIES.map((c, i) => (
              <button key={c} className={`tab-pill ${activeCat === i ? "active" : ""}`} onClick={() => setActiveCat(i)}>{c}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fdf8f0", border: "1px solid rgba(0,0,0,0.09)", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "#888" }}>
              <i className="ti ti-search" style={{ fontSize: 13 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search spots…"
                style={{ border: "none", background: "none", outline: "none", fontSize: 12, color: "#555", fontFamily: "inherit", width: 120 }}
              />
            </div>
            <button className="btn-primary" onClick={openAdd}>
              <i className="ti ti-plus" /> Add New Spot
            </button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Category</th>
              <th>Timings</th>
              <th>Daily Visits</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 34, height: 28, borderRadius: 6, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <i className="ti ti-map-pin" style={{ fontSize: 14, color: "#f5c842" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 12 }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: "#999" }}>{s.district}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 11, color: "#666" }}>{s.category}</td>
                <td style={{ fontSize: 11, color: "#666" }}>{s.timing}</td>
                <td style={{ fontSize: 12, fontWeight: 500 }}>{s.visits}</td>
                <td>
                  <span
                    className={s.status === "Active" ? "badge badge-green" : "badge badge-amber"}
                    style={{ cursor: "pointer" }}
                    title="Click to toggle status"
                    onClick={() => handleToggleStatus(s.id)}
                  >
                    {s.status}
                  </span>
                </td>
                <td>
                  {s.featured ? (
                    <span className="badge badge-gold" style={{ cursor: "pointer" }} onClick={() => handleToggleFeatured(s.id)} title="Click to unfeature">
                      <i className="ti ti-star" style={{ fontSize: 10 }} /> Featured
                    </span>
                  ) : (
                    <span style={{ fontSize: 11, color: "#bbb", cursor: "pointer" }} onClick={() => handleToggleFeatured(s.id)} title="Click to feature">—</span>
                  )}
                </td>
                <td>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button
                      onClick={() => openEdit(s)}
                      title="Edit"
                      style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid rgba(0,0,0,0.09)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
                      <i className="ti ti-edit" style={{ fontSize: 13 }} />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      title="Delete"
                      style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid rgba(255,80,60,0.2)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#d9534f" }}>
                      <i className="ti ti-trash" style={{ fontSize: 13 }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "28px 0", color: "#bbb", fontSize: 12 }}>
                  No tourist spots found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 11, color: "#999" }}>Showing {filtered.length} of {spots.length} spots</div>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3].map((p) => (
              <button key={p} style={{ width: 28, height: 28, borderRadius: 6, fontSize: 11, background: p === 1 ? "#f5c842" : "none", color: p === 1 ? "#1a0a00" : "#999", border: p === 1 ? "none" : "1px solid rgba(0,0,0,0.09)", cursor: "pointer", fontFamily: "inherit", fontWeight: p === 1 ? 600 : 400 }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
