// src/pages/AdminComponent/TourGuides.jsx
// Component for managing tour guides with KPI cards and guide details
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/Tourists.css";

const INITIAL_GUIDES = [
  {
    initials: "AD",
    name: "Arjun Das",
    phone: "+91 9000011111",
    languages: "Hindi, English",
    experience: "5 Years",
    rating: 4.8,
    status: "Active",
    statusCls: "badge-green",
  },
  {
    initials: "KJ",
    name: "Kiran Joshi",
    phone: "+91 9000033333",
    languages: "Hindi, Telugu",
    experience: "4 Years",
    rating: 4.5,
    status: "Active",
    statusCls: "badge-green",
  },
  {
    initials: "MR",
    name: "Mahesh Rao",
    phone: "+91 9000044444",
    languages: "English, Kannada",
    experience: "6 Years",
    rating: 4.9,
    status: "Active",
    statusCls: "badge-green",
  },
  {
    initials: "SI",
    name: "Sneha Iyer",
    phone: "+91 9000055555",
    languages: "Tamil, Hindi",
    experience: "2 Years",
    rating: 4.3,
    status: "Pending",
    statusCls: "badge-amber",
  },
  {
    initials: "RK",
    name: "Ravi Kumar",
    phone: "+91 9000022222",
    languages: "Tamil, English",
    experience: "3 Years",
    rating: 4.6,
    status: "Active",
    statusCls: "badge-green",
  },
];

const STATUS_OPTIONS = ["Active", "Pending", "Inactive"];
const STATUS_CLS_MAP = {
  Active: "badge-green",
  Pending: "badge-amber",
  Inactive: "badge-red",
};

const EMPTY_FORM = {
  name: "",
  phone: "",
  languages: "",
  experience: "",
  rating: 4.0,
  status: "Active",
};

function AddGuideModal({ onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = "Guide name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.languages.trim()) errs.languages = "Languages are required";
    if (!form.experience.trim()) errs.experience = "Experience is required";

    return errs;
  };

  const handleSave = () => {
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const initials = form.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    onSave({
      initials,
      name: form.name,
      phone: form.phone,
      languages: form.languages,
      experience: form.experience,
      rating: parseFloat(form.rating) || 4.0,
      status: form.status,
      statusCls: STATUS_CLS_MAP[form.status],
    });
  };

  const modal = (
    <div className="tourist-modal-overlay" onMouseDown={onClose}>
      <div className="tourist-modal" onMouseDown={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="tourist-modal-header">
          <div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              👤 Add New Guide
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#94a3b8",
                marginTop: 4,
              }}
            >
              Fill in all details to register the guide
            </div>
          </div>

          <button className="tourist-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Divider */}
        <div className="tourist-divider" />

        {/* Form */}
        <div className="tourist-form-grid">
          {/* Guide Name */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="tourist-label">Guide Name *</label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Arjun Das"
              className="tourist-input"
            />
            {errors.name && (
              <div style={{ color: "#c0392b", fontSize: 11, marginTop: 4 }}>
                {errors.name}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="tourist-label">Phone *</label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. +91 9000011111"
              className="tourist-input"
            />
            {errors.phone && (
              <div style={{ color: "#c0392b", fontSize: 11, marginTop: 4 }}>
                {errors.phone}
              </div>
            )}
          </div>

          {/* Languages */}
          <div>
            <label className="tourist-label">Languages *</label>

            <input
              name="languages"
              value={form.languages}
              onChange={handleChange}
              placeholder="e.g. Hindi, English"
              className="tourist-input"
            />
            {errors.languages && (
              <div style={{ color: "#c0392b", fontSize: 11, marginTop: 4 }}>
                {errors.languages}
              </div>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="tourist-label">Experience *</label>

            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="e.g. 5 Years"
              className="tourist-input"
            />
            {errors.experience && (
              <div style={{ color: "#c0392b", fontSize: 11, marginTop: 4 }}>
                {errors.experience}
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="tourist-label">Rating</label>

            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={handleChange}
              placeholder="e.g. 4.5"
              className="tourist-input"
            />
          </div>

          {/* Status */}
          <div>
            <label className="tourist-label">Status *</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="tourist-input"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "#f1f5f9",
            margin: "24px 0 18px",
          }}
        />

        {/* Footer */}
        <div className="tourist-modal-footer">
          <button
            onClick={onClose}
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              border: "1.5px solid #e2e8f0",
              background: "#fff",
              fontSize: 13,
              color: "#475569",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: "#f5c842",
              fontSize: 13,
              color: "#1a1a1a",
              cursor: "pointer",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 2px 8px rgba(245,200,66,0.4)",
            }}
          >
            💾 Save Guide
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

function GuideEditModal({ onClose, editData, onUpdate }) {
  const [form, setForm] = useState({
    name: editData?.name || "",
    phone: editData?.phone || "",
    languages: editData?.languages || "",
    experience: editData?.experience || "",
    rating: editData?.rating || 4.0,
    status: editData?.status || "Active",
  });

  const handleUpdate = () => {
    const initials = form.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    onUpdate({
      initials,
      name: form.name,
      phone: form.phone,
      languages: form.languages,
      experience: form.experience,
      rating: parseFloat(form.rating) || 4.0,
      status: form.status,
      statusCls: STATUS_CLS_MAP[form.status],
    });
  };

  return createPortal(
    <div className="common-modal-overlay" onMouseDown={onClose}>
      <div className="common-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="common-modal-header">
          <div>
            <h2>Edit Guide</h2>
            <p>Update guide details</p>
          </div>

          <button className="common-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="common-divider" />

        <div className="common-grid">
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Name</label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Languages</label>

            <input
              value={form.languages}
              onChange={(e) =>
                setForm({
                  ...form,
                  languages: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Experience</label>

            <input
              value={form.experience}
              onChange={(e) =>
                setForm({
                  ...form,
                  experience: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Rating</label>

            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={(e) =>
                setForm({
                  ...form,
                  rating: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label>Status</label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="common-divider common-divider-footer" />

        <div className="common-footer">
          <button className="common-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="common-save-btn" onClick={handleUpdate}>
            Update Guide
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function TourGuides() {
  useEffect(() => {
    const registeredGuides =
      JSON.parse(localStorage.getItem("tourGuideRegistrations")) || [];

    const finalGuides = [
      ...INITIAL_GUIDES,
      ...registeredGuides.map((guide) => ({
        initials:
          guide.fullName
            ?.split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase() || "G",
        name: guide.fullName || guide.name || "Guide",
        phone: guide.phone || "+91",
        languages: guide.languages || "Hindi",
        experience: guide.experience || "1 Year",
        rating: guide.rating || 4.0,
        status: "Pending",
        statusCls: "badge-amber",
      })),
    ];

    setGuides(finalGuides);
  }, []);

  const [guides, setGuides] = useState(INITIAL_GUIDES);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  const handleSave = (newGuide) => {
    setGuides((prev) => [newGuide, ...prev]);
    setShowModal(false);
  };

  const handleDelete = (phone) => {
    setGuides((prev) => prev.filter((g) => g.phone !== phone));
  };

  const handleEdit = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  const handleUpdate = (updatedGuide) => {
    setGuides((prev) =>
      prev.map((g) =>
        g.phone === editData.phone
          ? {
              ...updatedGuide,
              phone: g.phone, // Keep original phone
            }
          : g
      )
    );
    setShowModal(false);
    setEditData(null);
  };

  const filteredGuides = guides.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.languages.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = !filterActive || g.status === "Active";

    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    const data = JSON.stringify(guides, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "guides-data.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleFilter = () => {
    setFilterActive((prev) => !prev);
  };

  const activeGuidesCount = guides.filter(
    (g) => g.status === "Active"
  ).length;
  const pendingGuidesCount = guides.filter(
    (g) => g.status === "Pending"
  ).length;
  const currentlyActiveCount = guides.filter(
    (g) => g.status === "Active" || g.status === "Busy"
  ).length;

  return (
    <div className="tourist-page">
      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef9c3" }}>
            <i
              className="ti ti-users"
              style={{ color: "#b5860d" }}
            />
          </div>
          <div className="kpi-label">Total Registered</div>
          <div className="kpi-value">{guides.length}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i
              className="ti ti-map-pin"
              style={{ color: "#1d4ed8" }}
            />
          </div>
          <div className="kpi-label">Currently Active</div>
          <div className="kpi-value">{currentlyActiveCount}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i
              className="ti ti-license"
              style={{ color: "#15803d" }}
            />
          </div>
          <div className="kpi-label">Active Guides</div>
          <div className="kpi-value">{activeGuidesCount}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i
              className="ti ti-clock"
              style={{ color: "#b91c1c" }}
            />
          </div>
          <div className="kpi-label">Pending Approvals</div>
          <div className="kpi-value">{pendingGuidesCount}</div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-head">
          <div className="tourist-action-row">
            {/* Search */}
            <div
              className="tourist-search-wrap"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.09)",
                borderRadius: 8,
                padding: "6px 12px",
                minWidth: 0,
              }}
            >
              <i
                className="ti ti-search"
                style={{ fontSize: 13, color: "#888" }}
              />

              <input
                type="text"
                placeholder="Search guide..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 12,
                  background: "transparent",
                  minWidth: 100,
                  flex: 1,
                }}
              />
            </div>

            <button className="btn-outline" onClick={handleExport}>
              Export
            </button>

            <button className="btn-outline" onClick={handleFilter}>
              Filter
            </button>

            <button
              className="btn-primary"
              onClick={() => {
                setEditData(null);
                setShowModal(true);
              }}
            >
              <i className="ti ti-plus" /> Add Guide
            </button>
          </div>
        </div>

        {/* GUIDE DETAILS TABLE */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Guide</th>
              <th>Phone</th>
              <th>Languages</th>
              <th>Experience</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredGuides.map((g) => (
              <tr key={g.phone}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                    }}
                  >
                    <div className="avatar-circle">{g.initials}</div>

                    <div>
                      <div style={{ fontWeight: 500, fontSize: 12 }}>
                        {g.name}
                      </div>

                      <div style={{ fontSize: 10, color: "#999" }}>
                        ID: {g.phone}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{g.phone}</td>
                <td>{g.languages}</td>
                <td>{g.experience}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span>⭐</span>
                    <span style={{ fontWeight: 500 }}>{g.rating}</span>
                  </div>
                </td>

                <td>
                  <span className={`badge ${g.statusCls}`}>
                    {g.status}
                  </span>
                </td>

                <td>
                  <div className="table-action-btns">
                    <button
                      className="table-icon-btn"
                      onClick={() => handleEdit(g)}
                    >
                      <i className="ti ti-edit" />
                    </button>

                    <button
                      className="table-icon-btn delete"
                      onClick={() => handleDelete(g.phone)}
                    >
                      <i className="ti ti-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16,
            paddingTop: 14,
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: 11, color: "#999" }}>
            Showing {filteredGuides.length} of {guides.length} guides
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  fontSize: 11,
                  background: p === 1 ? "#f5c842" : "none",
                  color: p === 1 ? "#1a0a00" : "#999",
                  border:
                    p === 1
                      ? "none"
                      : "1px solid rgba(0,0,0,0.09)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: p === 1 ? 600 : 400,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ADD GUIDE MODAL */}
      {showModal && !editData && (
        <AddGuideModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {/* GUIDE EDIT MODAL */}
      {showModal && editData && (
        <GuideEditModal
          onClose={() => {
            setShowModal(false);
            setEditData(null);
          }}
          editData={editData}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
