// // src/pages/TouristSpots.jsx
import { useState } from "react";
import "./styles/TouriestSpots.css";

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

  return (
    <div>
      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent touristspots-kpi-accent gold" />
          <div className="kpi-icon touristspots-kpi-icon yellow">
            <i className="ti ti-map-pin" />
          </div>
          <div className="kpi-label">Total Spots</div>
          <div className="kpi-value">{totalSpots}</div>
          <div className="kpi-sub touristspots-kpi-sub-muted">Pilgrimage locations</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent touristspots-kpi-accent green" />
          <div className="kpi-icon touristspots-kpi-icon green">
            <i className="ti ti-circle-check" />
          </div>
          <div className="kpi-label">Active</div>
          <div className="kpi-value">{activeCount}</div>
          <div className="kpi-sub">Currently visible</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent touristspots-kpi-accent gold" />
          <div className="kpi-icon touristspots-kpi-icon yellow">
            <i className="ti ti-star" />
          </div>
          <div className="kpi-label">Featured</div>
          <div className="kpi-value">{featuredCount}</div>
          <div className="kpi-sub touristspots-kpi-sub-muted">On home screen</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent touristspots-kpi-accent gray" />
          <div className="kpi-icon touristspots-kpi-icon gray">
            <i className="ti ti-eye-off" />
          </div>
          <div className="kpi-label">Inactive</div>
          <div className="kpi-value">{inactiveCount}</div>
          <div className="kpi-sub touristspots-kpi-sub-muted">Hidden from tourists</div>
        </div>
      </div>

      {/* ── Add / Edit Form Panel ── */}
      {showForm && (
        <div className="card touristspots-form-panel">
          <div className="card-head">
            <div className="card-title">
              <i className="ti ti-map-pin touristspots-form-icon" />
              {editId !== null ? `Edit: ${form.name || "Tourist Spot"}` : "Add New Tourist Spot"}
            </div>
            <button className="btn-outline touristspots-close-btn" onClick={closeForm}>
              <i className="ti ti-x" /> Close
            </button>
          </div>

          <div className="touristspots-form-grid">
            {/* Spot Name – full width */}
            <div className="touristspots-grid-full">
              <label className="touristspots-form-label">Spot / Location Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Ram Janmabhoomi Temple"
                className="touristspots-form-input"
              />
            </div>

            {/* Category */}
            <div>
              <label className="touristspots-form-label">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="touristspots-form-input">
                {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="touristspots-form-label">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="touristspots-form-input">
                {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Featured toggle */}
            <div className="touristspots-form-column">
              <label className="touristspots-form-label">Featured on Home Screen</label>
              <div className="touristspots-featured-toggle" onClick={() => setForm({ ...form, featured: !form.featured })}>
                <div className="touristspots-toggle-switch" style={{ background: form.featured ? "#f5c842" : "#ddd" }}>
                  <div className="touristspots-toggle-thumb" style={{ left: form.featured ? 18 : 2 }} />
                </div>
                <span className="touristspots-toggle-label" style={{ color: form.featured ? "#b5860d" : "#999" }}>
                  {form.featured ? "Yes – Featured" : "No"}
                </span>
              </div>
            </div>

            {/* Opening Time */}
            <div>
              <label className="touristspots-form-label">Opening Time</label>
              <input
                value={form.openTime}
                onChange={(e) => setForm({ ...form, openTime: e.target.value })}
                placeholder="e.g. 6:00 AM  or  Open 24 hrs"
                className="touristspots-form-input"
              />
            </div>

            {/* Closing Time */}
            <div>
              <label className="touristspots-form-label">Closing Time</label>
              <input
                value={form.closeTime}
                onChange={(e) => setForm({ ...form, closeTime: e.target.value })}
                placeholder="e.g. 10:00 PM  (leave blank if 24 hrs)"
                className="touristspots-form-input"
                disabled={form.openTime === "Open 24 hrs"}
              />
            </div>

            {/* District */}
            <div>
              <label className="touristspots-form-label">District</label>
              <input
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                placeholder="Ayodhya"
                className="touristspots-form-input"
              />
            </div>

            {/* GPS Latitude */}
            <div>
              <label className="touristspots-form-label">GPS Latitude</label>
              <input
                value={form.lat}
                onChange={(e) => setForm({ ...form, lat: e.target.value })}
                placeholder="26.7953"
                className="touristspots-form-input"
              />
            </div>

            {/* GPS Longitude */}
            <div>
              <label className="touristspots-form-label">GPS Longitude</label>
              <input
                value={form.lng}
                onChange={(e) => setForm({ ...form, lng: e.target.value })}
                placeholder="82.1942"
                className="touristspots-form-input"
              />
            </div>

            {/* Entry Fee */}
            <div>
              <label className="touristspots-form-label">Entry Fee</label>
              <input
                value={form.entry}
                onChange={(e) => setForm({ ...form, entry: e.target.value })}
                placeholder="Free  or  ₹ 50"
                className="touristspots-form-input"
              />
            </div>
          </div>

          <div className="touristspots-form-actions">
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
          <div className="tab-bar touristspots-tab-bar">
            {CATEGORIES.map((c, i) => (
              <button key={c} className={`tab-pill ${activeCat === i ? "active" : ""}`} onClick={() => setActiveCat(i)}>{c}</button>
            ))}
          </div>
          <div className="touristspots-toolbar">
            <div className="touristspots-search-box">
              <i className="ti ti-search touristspots-search-icon" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search spots…"
                className="touristspots-search-input"
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
                  <div className="touristspots-location-row">
                    <div className="touristspots-location-icon" style={{ background: s.color }}>
                      <i className="ti ti-map-pin touristspots-icon-sm" />
                    </div>
                    <div>
                      <div className="touristspots-location-name">{s.name}</div>
                      <div className="touristspots-location-district">{s.district}</div>
                    </div>
                  </div>
                </td>
                <td className="touristspots-small-text">{s.category}</td>
                <td className="touristspots-small-text">{s.timing}</td>
                <td className="touristspots-visited">{s.visits}</td>
                <td>
                  <span
                    className={`${s.status === "Active" ? "badge badge-green" : "badge badge-amber"} touristspots-clickable`}
                    title="Click to toggle status"
                    onClick={() => handleToggleStatus(s.id)}
                  >
                    {s.status}
                  </span>
                </td>
                <td>
                  {s.featured ? (
                    <span className="badge badge-gold touristspots-clickable" onClick={() => handleToggleFeatured(s.id)} title="Click to unfeature">
                      <i className="ti ti-star touristspots-icon-sm" /> Featured
                    </span>
                  ) : (
                    <span className="touristspots-featured-tag" onClick={() => handleToggleFeatured(s.id)} title="Click to feature">—</span>
                  )}
                </td>
                <td>
                  <div className="touristspots-button-row">
                    <button
                      onClick={() => openEdit(s)}
                      title="Edit"
                      className="touristspots-icon-btn"
                    >
                      <i className="ti ti-edit touristspots-icon-sm" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      title="Delete"
                      className="touristspots-icon-btn touristspots-delete-btn"
                    >
                      <i className="ti ti-trash touristspots-icon-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="touristspots-empty-row">
                  No tourist spots found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="touristspots-table-footer">
          <div className="touristspots-footer-text">Showing {filtered.length} of {spots.length} spots</div>
          <div className="touristspots-pagination">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`touristspots-page-button ${p === 1 ? "active" : ""}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
