// src/pages/Tourists.jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import "./styles/Tourists.css";

const INITIAL_TOURISTS = [
  {
    initials: "RM", name: "Ramesh Mishra", phone: "+91 98765 43210",
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
  {
  initials: "SK",
  name: "Suresh Kumar",
  phone: "+91 91234 56789",
  from: "Hyderabad, TS",
  checkin: "16 May 2026",
  group: "Family · 5",
  services: ["Vehicle", "Guide"],
  status: "Active",
  statusCls: "badge-green",
},

{
  initials: "MP",
  name: "Meena Patel",
  phone: "+91 92345 67890",
  from: "Ahmedabad, GJ",
  checkin: "17 May 2026",
  group: "Couple · 2",
  services: ["Cottage"],
  status: "Checked In",
  statusCls: "badge-blue",
},

{
  initials: "VK",
  name: "Vikas Reddy",
  phone: "+91 93456 78901",
  from: "Bangalore, KA",
  checkin: "18 May 2026",
  group: "Group · 8",
  services: ["Bus", "Guide"],
  status: "Upcoming",
  statusCls: "badge-amber",
},
];
const TOUR_GUIDES_DATA = [
  {
    name: "Arjun Das",
    phone: "+91 9000011111",
    language: "Hindi, English",
    experience: "5 Years",
    status: "Active",
  },
  {
  name: "Kiran Joshi",
  phone: "+91 9000033333",
  language: "Hindi, Telugu",
  experience: "4 Years",
  status: "Active",
},

{
  name: "Mahesh Rao",
  phone: "+91 9000044444",
  language: "English, Kannada",
  experience: "6 Years",
  status: "Busy",
},

{
  name: "Sneha Iyer",
  phone: "+91 9000055555",
  language: "Tamil, Hindi",
  experience: "2 Years",
  status: "Available",
},
  {
    name: "Ravi Kumar",
    phone: "+91 9000022222",
    language: "Tamil, English",
    experience: "3 Years",
    status: "Busy",
  },
];

const GROUP_BOOKINGS_DATA = [
  {
    group: "Family Group",
    members: 12,
    vehicle: "Mini Bus",
    guide: "Arjun Das",
    status: "Confirmed",
  },
  {
  group: "Corporate Tour",
  members: 15,
  vehicle: "Traveller",
  guide: "Kiran Joshi",
  status: "Confirmed",
},

{
  group: "Devotional Trip",
  members: 25,
  vehicle: "Luxury Bus",
  guide: "Mahesh Rao",
  status: "Pending",
},

{
  group: "Family Vacation",
  members: 10,
  vehicle: "SUV",
  guide: "Sneha Iyer",
  status: "Confirmed",
},
  {
    group: "Temple Tour",
    members: 20,
    vehicle: "Luxury Bus",
    guide: "Ravi Kumar",
    status: "Pending",
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
const STATUS_OPTIONS = ["Active", "Checked In", "Upcoming"];

const STATUS_CLS_MAP = {
  Active: "badge-green",
  "Checked In": "badge-blue",
  Upcoming: "badge-amber",
};

const EMPTY_FORM = {
  name: "",
  phone: "",
  from: "",
  checkin: "",
  group: "",
  services: "",
  status: "Active",
};
function AddTouristModal({ onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [, setErrors] = useState({});


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

    if (!form.name.trim()) errs.name = "Tourist name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.from.trim()) errs.from = "Location is required";
    if (!form.checkin.trim()) errs.checkin = "Check-in date is required";
    if (!form.group.trim()) errs.group = "Group details required";

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
      from: form.from,
      checkin: form.checkin,
      group: form.group,
      services: form.services
        ? form.services.split(",").map((s) => s.trim())
        : [],
      status: form.status,
      statusCls: STATUS_CLS_MAP[form.status],
    });
  };

  // const inputStyle = {};
//   width: "100%",
//   border: "1.5px solid #e2e8f0",
//   borderRadius: 8,
//   padding: "11px 12px",
//   fontSize: 13,
//   color: "#1a1a1a",
//   outline: "none",
//   boxSizing: "border-box",
//   background: "#f8fafc",
//   fontFamily: "inherit",
// };

// const labelStyle = {};

const modal = (
  <div className="tourist-modal-overlay"
    onMouseDown={onClose}
  >
    <div className="tourist-modal"
      onMouseDown={(e) => e.stopPropagation()}
    >
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
            👤 Add New Tourist
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#94a3b8",
              marginTop: 4,
            }}
          >
            Fill in all details to register the tourist
          </div>
        </div>

        <button
  onClick={onClose}
  className="tourist-close-btn"
>
          ×
        </button>
      </div>

      {/* Divider */}
     <div className="tourist-divider" />

      {/* Form */}
      <div className="tourist-form-grid">
        {/* Tourist Name */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="tourist-label">Tourist Name *</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Ramesh Mishra"
            className="tourist-input"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="tourist-label">Phone *</label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="tourist-input"
          />
        </div>

        {/* From */}
        <div>
          <label className="tourist-label">From *</label>

          <input
            name="from"
            value={form.from}
            onChange={handleChange}
            placeholder="e.g. Varanasi, UP"
           className="tourist-input"
          />
        </div>

        {/* Checkin */}
        <div>
          <label className="tourist-label">Check-in *</label>

          <input
            name="checkin"
            value={form.checkin}
            onChange={handleChange}
            placeholder="e.g. 14 May 2026"
           className="tourist-input"
          />
        </div>

        {/* Group */}
        <div>
          <label className="tourist-label">Group *</label>

          <input
            name="group"
            value={form.group}
            onChange={handleChange}
            placeholder="e.g. Family · 4"
           className="tourist-input"
          />
        </div>

        {/* Services */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="tourist-label">Services</label>

          <input
            name="services"
            value={form.services}
            onChange={handleChange}
            placeholder="e.g. Pooja, Vehicle, Cottage"
            className="tourist-input"
          />
        </div>

        {/* Status */}
        <div style={{ gridColumn: "1 / -1" }}>
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
          💾 Save Tourist
        </button>
      </div>
    </div>
  </div>
);


  return createPortal(modal, document.body);
}
function TouristEditModal({
  onClose,
  editData,
}) {

const [form, setForm] = useState({
    name: editData?.name || "",
    phone: editData?.phone || "",
    from: editData?.from || "",
    checkin: editData?.checkin || "",
    group: editData?.group || "",
    status: editData?.status || "",
  });

  return createPortal(

    <div
      className="common-modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="common-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >

        <div className="common-modal-header">

          <div>
            <h2>Edit Tourist</h2>
            <p>Update tourist details</p>
          </div>

          <button
            className="common-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="common-divider" />

        <div className="common-grid">

          <div>
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
            <label>From</label>

            <input
              value={form.from}
              onChange={(e) =>
                setForm({
                  ...form,
                  from: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Check-in</label>

            <input
              value={form.checkin}
              onChange={(e) =>
                setForm({
                  ...form,
                  checkin: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Group</label>

            <input
              value={form.group}
              onChange={(e) =>
                setForm({
                  ...form,
                  group: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Status</label>

            <input
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="common-divider common-divider-footer" />

        <div className="common-footer">

          <button
            className="common-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="common-save-btn">
            Update Tourist
          </button>

        </div>

      </div>

    </div>,

    document.body
  );
}
function GuideEditModal({
  onClose,
  editData,
}) {

  const [form] = useState({
    name: editData?.name || "",
    phone: editData?.phone || "",
    language: editData?.language || "",
    experience: editData?.experience || "",
    status: editData?.status || "",
  });

  return createPortal(

    <div
      className="common-modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="common-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >

        <div className="common-modal-header">

          <div>
            <h2>Edit Guide</h2>
            <p>Update guide details</p>
          </div>

          <button
            className="common-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="common-divider" />

        <div className="common-grid">

          <div>
            <label>Name</label>
            <input value={form.name} />
          </div>

          <div>
            <label>Phone</label>
            <input value={form.phone} />
          </div>

          <div>
            <label>Languages</label>
            <input value={form.language} />
          </div>

          <div>
            <label>Experience</label>
            <input value={form.experience} />
          </div>

          <div>
            <label>Status</label>
            <input value={form.status} />
          </div>

        </div>

        <div className="common-divider common-divider-footer" />

        <div className="common-footer">

          <button
            className="common-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="common-save-btn">
            Update Guide
          </button>

        </div>

      </div>

    </div>,

    document.body
  );
}
function GroupBookingEditModal({
  onClose,
  editData,
}) {

  const [form] = useState({
    group: editData?.group || "",
    members: editData?.members || "",
    vehicle: editData?.vehicle || "",
    guide: editData?.guide || "",
    status: editData?.status || "",
  });

  return createPortal(

    <div
      className="common-modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="common-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >

        <div className="common-modal-header">

          <div>
            <h2>Edit Booking</h2>
            <p>Update booking details</p>
          </div>

          <button
            className="common-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="common-divider" />

        <div className="common-grid">

          <div>
            <label>Group</label>
            <input value={form.group} />
          </div>

          <div>
            <label>Members</label>
            <input value={form.members} />
          </div>

          <div>
            <label>Vehicle</label>
            <input value={form.vehicle} />
          </div>

          <div>
            <label>Guide</label>
            <input value={form.guide} />
          </div>

          <div>
            <label>Status</label>
            <input value={form.status} />
          </div>

        </div>

        <div className="common-divider common-divider-footer" />

        <div className="common-footer">

          <button
            className="common-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="common-save-btn">
            Update Booking
          </button>

        </div>

      </div>

    </div>,

    document.body
  );
}
export default function Tourists() {
  const [activeTab, setActiveTab] = useState(0);
  const [tourists, setTourists] = useState(INITIAL_TOURISTS);
  const [tourGuides, setTourGuides] = useState(TOUR_GUIDES_DATA);
  const [editData, setEditData] = useState(null);

const [editType, setEditType] = useState("");

const [groupBookings, setGroupBookings] =
  useState(GROUP_BOOKINGS_DATA);
  
const [showModal, setShowModal] = useState(false);

const [searchTerm, setSearchTerm] = useState("");
const [filterActive, setFilterActive] = useState(false);

const handleSave = (newTourist) => {
  setTourists((prev) => [newTourist, ...prev]);

  setShowModal(false);
};
const handleDelete = (phone) => {
  setTourists((prev) =>
    prev.filter((t) => t.phone !== phone)
  );
};
const handleDeleteGuide = (phone) => {
  setTourGuides((prev) =>
    prev.filter((g) => g.phone !== phone)
  );
};

const handleDeleteBooking = (group) => {
  setGroupBookings((prev) =>
    prev.filter((g) => g.group !== group)
  );
};

const handleEdit = (data, type) => {
  setEditData(data);
  setEditType(type);
  setShowModal(true);
};

const filteredTourists = tourists.filter((t) => {
  const matchesSearch =
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.from.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesFilter =
    !filterActive || t.status === "Active";

  return matchesSearch && matchesFilter;
});

const filteredGuides = tourGuides.filter((g) => {
  const matchesSearch =
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.language.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesFilter =
    !filterActive || g.status === "Active";

  return matchesSearch && matchesFilter;
});

const filteredBookings = groupBookings.filter((g) => {
  const matchesSearch =
    g.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.guide.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesFilter =
    !filterActive || g.status === "Confirmed";

  return matchesSearch && matchesFilter;
});

const handleExport = () => {
  const data = JSON.stringify(tourists, null, 2);

  const blob = new Blob([data], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tourists-data.json";
  a.click();

  URL.revokeObjectURL(url);
};

const handleFilter = () => {
  setFilterActive((prev) => !prev);
};
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
          <div className="kpi-value">{tourists.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-map-pin" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Currently Visiting</div>
          <div className="kpi-value">
  {
    tourists.filter(
      (t) =>
        t.status === "Active" ||
        t.status === "Checked In"
    ).length
  }
</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-license" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Active Guides</div>
          <div className="kpi-value">
  {
    tourists.filter(
      (t) =>
        t.services.includes("Guide")
    ).length
  }
</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-clock" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Pending Approvals</div>
          <div className="kpi-value">
  {
    tourists.filter(
      (t) => t.status === "Upcoming"
    ).length
  }
</div>
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

  {/* Search */}
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
    <i
      className="ti ti-search"
      style={{ fontSize: 13, color: "#888" }}
    />

    <input
      type="text"
      placeholder="Search tourist..."
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

  <button
    className="btn-outline"
    onClick={handleExport}
  >
    Export
  </button>

  <button
    className="btn-outline"
    onClick={handleFilter}
  >
    Filter
  </button>
            <button
  className="btn-primary"
  onClick={() => {
  setEditType("");
  setShowModal(true);
}}
>
  <i className="ti ti-plus" /> Add Tourist
</button>
          </div>
        </div>

        {/* ALL TOURISTS */}
{activeTab === 0 && (
  <table className="data-table">
    <thead>
      <tr>
        <th>Tourist</th>
        <th>From</th>
        <th>Check-in</th>
        <th>Group</th>
        <th>Services</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredTourists.map((t) => (
        <tr key={t.phone}>
          <td>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div className="avatar-circle">{t.initials}</div>

              <div>
                <div style={{ fontWeight: 500, fontSize: 12 }}>
                  {t.name}
                </div>

                <div style={{ fontSize: 10, color: "#999" }}>
                  {t.phone}
                </div>
              </div>
            </div>
          </td>

          <td>{t.from}</td>
          <td>{t.checkin}</td>
          <td>{t.group}</td>

          <td>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {t.services.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 10,
                    padding: "2px 7px",
                    borderRadius: 20,
                    background:
                      SERVICE_COLORS[s]?.bg || "#f3f4f6",
                    color:
                      SERVICE_COLORS[s]?.color || "#555",
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </td>

          <td>
            <span className={`badge ${t.statusCls}`}>
              {t.status}
            </span>
          </td>

          <td>
            <div className="table-action-btns">
              <button
                className="table-icon-btn"
               onClick={() => handleEdit(t, "tourist")}
              >
                <i className="ti ti-edit" />
              </button>

              <button
                className="table-icon-btn delete"
                onClick={() => handleDelete(t.phone)}
              >
                <i className="ti ti-trash" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

{/* TOUR GUIDES */}
{activeTab === 1 && (
  <table className="data-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Languages</th>
        <th>Experience</th>
        <th>Status</th>
<th>Actions</th>
      </tr>
    </thead>

    <tbody>
     {filteredGuides.map((g, i) => (
        <tr key={i}>
          <td>{g.name}</td>
          <td>{g.phone}</td>
          <td>{g.language}</td>
          <td>{g.experience}</td>
          <td>
  <span className="badge badge-green">
    {g.status}
  </span>
</td>

<td>
  <div className="table-action-btns">
    <button
  className="table-icon-btn"
  onClick={() => handleEdit(g, "guide")}
>
  <i className="ti ti-edit" />
</button>

    <button
      className="table-icon-btn delete"
      onClick={() => handleDeleteGuide(g.phone)}
    >
      <i className="ti ti-trash" />
    </button>

  </div>
</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

{/* GROUP BOOKINGS */}
{activeTab === 2 && (
  <table className="data-table">
    <thead>
      <tr>
        <th>Group</th>
        <th>Members</th>
        <th>Vehicle</th>
        <th>Guide</th>
        <th>Status</th>
<th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredBookings.map((g, i) => (
        <tr key={i}>
          <td>{g.group}</td>
          <td>{g.members}</td>
          <td>{g.vehicle}</td>
          <td>{g.guide}</td>
          <td>
            <span className="badge badge-blue">
              {g.status}
            </span>
          </td>
          <td>
            <div className="table-action-btns">

              <button
  className="table-icon-btn"
  onClick={() => handleEdit(g, "booking")}
>
  <i className="ti ti-edit" />
</button>
              <button
                className="table-icon-btn delete"
                onClick={() => handleDeleteBooking(g.group)}
              >
                <i className="ti ti-trash" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

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

   {/* ADD TOURIST */}
{showModal && !editType && (
  <AddTouristModal
    onClose={() => setShowModal(false)}
    onSave={handleSave}
  />
)}

{/* TOURIST EDIT */}
{showModal && editType === "tourist" && (
  <TouristEditModal
    onClose={() => setShowModal(false)}
    editData={editData}
  />
)}

{/* GUIDE EDIT */}
{showModal && editType === "guide" && (
  <GuideEditModal
    onClose={() => setShowModal(false)}
    editData={editData}
  />
)}

{/* GROUP BOOKING EDIT */}
{showModal && editType === "booking" && (
  <GroupBookingEditModal
    onClose={() => setShowModal(false)}
    editData={editData}
  />
)}
    </div>
  );
}
