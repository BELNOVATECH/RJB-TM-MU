import { useState } from "react";

import "./styles/Accommodation.css";

const ACCOMMODATION_PAYMENTS_KEY = "accommodation_payment_details";

function loadAccommodationPayments() {
  try {
    const data = JSON.parse(localStorage.getItem(ACCOMMODATION_PAYMENTS_KEY)) || [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

const INITIAL_ROOMS = [
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
  {
    initials: "RS",
    name: "Rajesh Singh",
    meta: "Family · 3 nights · Check-in 14 May",
    room: "Room 101",
    status: "Checked In",
    statusCls: "badge-green",
  },
  {
    initials: "PD",
    name: "Pradeep Das",
    meta: "Solo · 2 nights · Check-in 14 May",
    room: "Room 104",
    status: "Checked In",
    statusCls: "badge-green",
  },
  {
    initials: "MJ",
    name: "Meena Joshi",
    meta: "Group · 5 nights · Check-in 13 May",
    room: "Room 106",
    status: "Staying",
    statusCls: "badge-blue",
  },
];

const PRICING = [
  {
    icon: "ti-home",
    label: "Standard Room",
    sub: "2 pax · AC · Attached bath",
    price: "₹800/night",
  },
  {
    icon: "ti-users",
    label: "Family Suite",
    sub: "6 pax · AC · Kitchenette",
    price: "₹1,800/night",
  },
  {
    icon: "ti-crown",
    label: "VIP Cottage",
    sub: "4 pax · Luxury · Garden view",
    price: "₹3,500/night",
  },
];

const TABS = ["Room Grid", "Bookings", "Pricing", "Export"];

const BOOKINGS = [
  {
    guest: "Rajesh Singh",
    room: "101",
    type: "Family",
    stay: "3 Nights",
    status: "Checked In",
  },
  {
    guest: "Pradeep Das",
    room: "104",
    type: "Solo",
    stay: "2 Nights",
    status: "Checked In",
  },
  {
    guest: "Meena Joshi",
    room: "106",
    type: "Group",
    stay: "5 Nights",
    status: "Staying",
  },
];

const EXPORT_OPTIONS = [
  "Export PDF Report",
  "Download Excel",
  "Print Occupancy",
];

const EMPTY_FORM = {
  roomNo: "",
  roomType: "Standard Room",
  status: "available",
  block: "Block A",
  capacity: "",
  price: "",
  acType: "AC",
  image: "",
  description: "",
};

export default function Accommodation() {
  const [activeTab, setActiveTab] = useState(0);
  const savedRooms =
  JSON.parse(localStorage.getItem("accommodation_rooms")) || [];

const dynamicRooms = savedRooms.map((room) => ({
  num: room.roomNumber || room.roomNo,
  status: (room.status || "available").toLowerCase(),
  roomType: room.roomType,
  block: room.block,
  capacity: room.capacity,
  price: room.price,
  acType: room.acType,
  image: room.image,
  description: room.description,
}));

const [rooms, setRooms] = useState([
  ...INITIAL_ROOMS,
  ...dynamicRooms,
]);
  const [showForm, setShowForm] = useState(false);
  const [showManualRooms, setShowManualRooms] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(loadAccommodationPayments);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingPrice, setEditingPrice] = useState(false);
  const [pricingData, setPricingData] = useState(PRICING);
  const totalRooms = rooms.length;

  const occupiedRooms = rooms.filter(
    (r) => r.status === "occupied"
  ).length;

  const availableRooms = rooms.filter(
    (r) => r.status === "available"
  ).length;

  const cleaningRooms = rooms.filter(
    (r) => r.status === "cleaning"
  ).length;

  function handleSave() {

  if (!form.roomNo.trim()) return;

  const newRoom = {

    id: Date.now(),

    roomNumber: form.roomNo,

    roomType: form.roomType,

    status: form.status,

    block: form.block,

    capacity: form.capacity,

    price: form.price,

    acType: form.acType,

    image:
      form.image ||
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",

    description:
      form.description ||
      "Comfortable spiritual stay near temple area.",
  };

  const existing =
    JSON.parse(localStorage.getItem("accommodation_rooms")) || [];

  const updated = [...existing, newRoom];

  localStorage.setItem(
    "accommodation_rooms",
    JSON.stringify(updated)
  );

  setRooms((prev) => [
    ...prev,
    {
      num: newRoom.roomNumber,
      status: newRoom.status,
      roomType: newRoom.roomType,
      block: newRoom.block,
      capacity: newRoom.capacity,
      price: newRoom.price,
      acType: newRoom.acType,
      image: newRoom.image,
      description: newRoom.description,
    },
  ]);

  setForm(EMPTY_FORM);

  setShowForm(false);
}

  return (
    <div className="accommodation-page">
      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div
            className="kpi-accent"
            style={{ background: "#f5c842" }}
          />

          <div
            className="kpi-icon"
            style={{ background: "#fef9c3" }}
          >
            <i
              className="ti ti-building"
              style={{ color: "#b5860d" }}
            />
          </div>

          <div className="kpi-label">Total Rooms</div>

          <div className="kpi-value">{totalRooms}</div>
        </div>

        <div className="kpi-card">
          <div
            className="kpi-accent"
            style={{ background: "#c0392b" }}
          />

          <div
            className="kpi-icon"
            style={{ background: "#fee2e2" }}
          >
            <i
              className="ti ti-home-filled"
              style={{ color: "#b91c1c" }}
            />
          </div>

          <div className="kpi-label">Occupied</div>

          <div className="kpi-value">{occupiedRooms}</div>

          <div
            className="kpi-sub"
            style={{ color: "#c0392b" }}
          >
            Active occupancy
          </div>
        </div>

        <div className="kpi-card">
          <div
            className="kpi-accent"
            style={{ background: "#16a34a" }}
          />

          <div
            className="kpi-icon"
            style={{ background: "#dcfce7" }}
          >
            <i
              className="ti ti-door"
              style={{ color: "#15803d" }}
            />
          </div>

          <div className="kpi-label">Available</div>

          <div className="kpi-value">{availableRooms}</div>

          <div
            className="kpi-sub"
            style={{ color: "#3b82f6" }}
          >
            {cleaningRooms} cleaning
          </div>
        </div>

        <div className="kpi-card">
          <div
            className="kpi-accent"
            style={{ background: "#3b82f6" }}
          />

          <div
            className="kpi-icon"
            style={{ background: "#dbeafe" }}
          >
            <i
              className="ti ti-calendar-check"
              style={{ color: "#1d4ed8" }}
            />
          </div>

          <div className="kpi-label">Check-ins Today</div>

          <div className="kpi-value">28</div>

          <div className="kpi-sub">
            14 check-outs
          </div>
        </div>
      </div>

      {/* Add Booking Form */}
      {showForm && (
        <div
          className="card"
          style={{
            marginBottom: 14,
            border: "1px solid rgba(245,200,66,0.3)",
          }}
        >
          <div className="card-head">
            <div className="card-title">
              <i
                className="ti ti-calendar-plus"
                style={{
                  fontSize: 14,
                  marginRight: 6,
                  verticalAlign: -2,
                  color: "#b5860d",
                }}
              />
              Add New Booking
            </div>

            <button
              className="btn-outline"
              style={{ fontSize: 11, padding: "4px 10px" }}
              onClick={() => setShowForm(false)}
            >
              <i className="ti ti-x" /> Close
            </button>
          </div>

          <div className="accommodation-form-grid">
            <div className="form-span-full">
              <label className="form-label">Room Number</label>
              <input
                value={form.roomNo}
                onChange={(e) => setForm({ ...form, roomNo: e.target.value })}
                placeholder="e.g. 116"
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Room Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="form-select"
              >
                <option value="occupied">Occupied</option>
                <option value="available">Available</option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="form-label">Room Type</label>
              <select
                value={form.roomType}
                onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                className="form-select"
              >
                <option>Standard Room</option>
                <option>Family Suite</option>
                <option>VIP Cottage</option>
              </select>
            </div>

            <div>
              <label className="form-label">Block</label>
              <select
                value={form.block}
                onChange={(e) => setForm({ ...form, block: e.target.value })}
                className="form-select"
              >
                <option>Block A</option>
                <option>Block B</option>
                <option>VIP Cottage</option>
                <option>Dharamshala</option>
              </select>
            </div>

            <div>
              <label className="form-label">Capacity</label>
              <input
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                placeholder="e.g. 4 pax"
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Price</label>
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="e.g. ₹1500"
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">AC Type</label>
              <select
                value={form.acType}
                onChange={(e) => setForm({ ...form, acType: e.target.value })}
                className="form-select"
              >
                <option>AC</option>
                <option>Non AC</option>
              </select>
            </div>

            <div className="form-span-full">

  <label className="form-label">
    Room Image URL
  </label>

  <input
    value={form.image || ""}
    onChange={(e) =>
      setForm({
        ...form,
        image: e.target.value,
      })
    }
    placeholder="Paste image URL"
    className="form-input"
  />

  <div className="form-span-full">

  <label className="form-label">
    Description
  </label>

  <textarea
    value={form.description || ""}
    onChange={(e) =>
      setForm({
        ...form,
        description: e.target.value,
      })
    }
    placeholder="Room description..."
    className="form-input"
    rows={4}
  />

</div>

          </div>

         </div> 

          <div className="form-actions">
            <button className="btn-outline" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSave}>
              <i className="ti ti-device-floppy" /> Save Booking
            </button>
          </div>
        </div>
      )}

      

      {/* Tabs + Actions */}
      <div
        className="tabs-actions"
      >
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

        <div className="page-actions">
          <button
  className="btn-outline"
  onClick={() =>
    setShowManualRooms(!showManualRooms)
  }
>
  Manual Room Entry
</button>
          <button
            className="btn-outline"
            onClick={() => {
              setPaymentDetails(loadAccommodationPayments());
              setShowPaymentDetails(!showPaymentDetails);
            }}
          >
            Payment Details
          </button>
          <button className="btn-outline">Export</button>

          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            <i className="ti ti-plus" /> New Booking
          </button>
        </div>
      </div>
      
      {showManualRooms && (

  <div
    className="card"
    style={{ marginBottom: 16 }}
  >

    <div className="card-head">

      <div className="card-title">
        Added Room Details
      </div>

    </div>

    <div className="manual-room-grid">

      {dynamicRooms.map((room, index) => (

        <div
          key={index}
          className="manual-room-card"
        >

          <img
            src={
              room.image ||
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
            }
            alt=""
            className="manual-room-image"
          />

          <div className="manual-room-content">

            <div className="manual-room-top">

              <h4>
                Room {room.num}
              </h4>

              <span className="room-status">
                {room.status}
              </span>

            </div>

            <p className="room-type">
              {room.roomType}
            </p>

            <p className="room-price">
              ₹{room.price}/night
            </p>

            <div className="room-meta">

              <span>
                {room.capacity}
              </span>

              <span>
                {room.acType}
              </span>

            </div>

            <p className="room-description">
              {room.description}
            </p>

          </div>

        </div>
      ))}

    </div>

  </div>
)}

      {showPaymentDetails && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-head">
            <div className="card-title">Accommodation Payment Details</div>
          </div>

          {paymentDetails.length === 0 ? (
            <div className="empty-payment-state">
              No accommodation payments found yet.
            </div>
          ) : (
            <div className="admin-payment-grid">
              {paymentDetails.map((payment) => (
                <div className="admin-payment-card" key={payment.id}>
                  <div className="admin-payment-top">
                    <div>
                      <h4>{payment.guestName}</h4>
                      <p>{payment.propertyName} · {payment.roomType}</p>
                    </div>
                    <span>{payment.status}</span>
                  </div>

                  <div className="admin-payment-metrics">
                    <div>
                      <small>Total</small>
                      <strong>₹{payment.totalAmount}</strong>
                    </div>
                    <div>
                      <small>Advance</small>
                      <strong>₹{payment.advanceAmount}</strong>
                    </div>
                    <div>
                      <small>Remaining</small>
                      <strong>₹{payment.remainingAmount}</strong>
                    </div>
                  </div>

                  <div className="admin-payment-meta">
                    {payment.checkIn || "-"} to {payment.checkOut || "-"} · {payment.guests} guest(s)
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="main-layout">

        {/* ROOM GRID TAB */}
        {activeTab === 0 && (
          <>
            <div className="left-column">

              <div className="card">
                <div className="card-head">
                  <div className="card-title">
                    Room occupancy map — Block A (Ground Floor)
                  </div>
                </div>

                {/* Legend */}
                <div
                  className="legend-row"
                >
                  {[
                    ["Occupied", "#f5c842", "#1a0a00"],
                    ["Available", "#dcfce7", "#15803d"],
                    ["Cleaning", "#dbeafe", "#1d4ed8"],
                  ].map(([l, bg, color]) => (
                    <div
                      key={l}
                      className="legend-item"
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 3,
                          background: bg,
                          border: `1px solid ${color}30`,
                        }}
                      />
                      {l}
                    </div>
                  ))}
                </div>

                <div className="room-grid">
                  {rooms.map((r) => (
                    <div
                      key={r.num}
                      className={`room-cell ${ROOM_STATUS_CLASS[r.status]}`}
                    >
                      {r.num}
                    </div>
                  ))}
                </div>

                <div
                  className="room-note"
                >
                  <span
                    className="room-note-box"
                  />
                  Maintenance &nbsp;&nbsp; Tap any room to view guest details
                </div>
              </div>

              {/* Recent Check-ins */}
              <div className="card">
                <div className="card-head">
                  <div className="card-title">
                    <i
                      className="ti ti-users"
                      style={{
                        fontSize: 14,
                        marginRight: 5,
                        verticalAlign: -2,
                        color: "#b5860d",
                      }}
                    />
                    Recent check-ins
                  </div>
                </div>

                <div
                  className="checkin-list"
                >
                  {RECENT_CHECKINS.map((g) => (
                    <div
                      key={g.name}
                      className="checkin-item"
                    >
                      <div className="avatar-circle">{g.initials}</div>

                      <div style={{ flex: 1 }}>
                        <div
                          className="checkin-name"
                        >
                          {g.room} · {g.name}
                        </div>

                        <div
                          className="checkin-meta"
                        >
                          {g.meta}
                        </div>
                      </div>

                      <span className={`badge ${g.statusCls}`}>

                        {g.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {/* Occupancy */}
              <div className="card">
                <div className="card-head">
                  <div className="card-title">
                    Occupancy by block
                  </div>
                </div>

                <div
                  className="occupancy-list"
                >
                  {OCCUPANCY_BY_BLOCK.map((b) => (
                    <div key={b.label} className="bar-row">
                      <div
                        className="bar-label"
                        style={{ width: 90 }}
                      >
                        {b.label}
                      </div>

                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: b.pct + "%",
                            background: b.color,
                          }}
                        />
                      </div>

                      <div className="bar-val">{b.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="card">
                <div className="card-head">
                  <div className="card-title">
                    Room type pricing
                  </div>

                  <button
                    className="card-action"
                    onClick={() => setEditingPrice(!editingPrice)}
                  >
                    {editingPrice ? "Close" : "Edit →"}
                  </button>
                </div>

                <div
                  className="pricing-list"
                >
                  {pricingData.map((p, index) => (
                    <div
                      key={p.label}
                      className="pricing-item"
                    >

                      <div
                        className="pricing-icon"
                      >
                        <i
                          className={`ti ${p.icon}`}
                          style={{
                            fontSize: 16,
                            color: "#b5860d",
                          }}
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          className="pricing-title"
                        >
                          {p.label}
                        </div>

                        <div
                          className="pricing-sub"
                        >
                          {p.sub}
                        </div>
                      </div>

                      {editingPrice ? (
                        <input
                          value={p.price}
                          onChange={(e) => {
                            const updated = [...pricingData];

                            updated[index].price = e.target.value;

                            setPricingData(updated);
                          }}
                          className="price-input"
                        />
                      ) : (
                        <div
                          className="pricing-value"
                        >
                          {p.price}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

      {/* BOOKINGS TAB */}
{activeTab === 1 && (
  <div className="card">

    <div className="card-head">
      <div className="card-title">
        Bookings
      </div>
    </div>

    {BOOKINGS.map((b) => (
      <div
        className="checkin-item"
        key={b.room}
      >

        <div>

          <div className="checkin-name">
            {b.guest}
          </div>

          <div className="checkin-meta">
            Room {b.room} · {b.type} · {b.stay}
          </div>

        </div>

        <span className="badge badge-green">
          {b.status}
        </span>

      </div>
    ))}

    {
      dynamicRooms.map((r, index) => (

        <div
          className="checkin-item"
          key={index}
        >

          <div>

            <div className="checkin-name">
              Room {r.num}
            </div>

            <div className="checkin-meta">
              {r.roomType} · {r.capacity} · {r.acType}
            </div>

          </div>

          <span className="badge badge-blue">
            {r.status}
          </span>

        </div>
      ))
    }

  </div>
)}

        {/* PRICING TAB */}
{activeTab === 2 && (
  <div className="card">

    <div className="card-head">
      <div className="card-title">
        Room Pricing
      </div>
    </div>

    <div className="pricing-list">

      {pricingData.map((p) => (

        <div
          className="pricing-item"
          key={p.label}
        >

          <div className="pricing-title">
            {p.label}
          </div>

          <div className="pricing-value">
            {p.price}
          </div>

        </div>
      ))}

    </div>

    

  </div>
)}


        {/* EXPORT TAB */}
        {activeTab === 3 && (
          <div className="card">

            <div className="card-head">
              <div className="card-title">
                Export Data
              </div>
            </div>

            <div className="pricing-list">
              {EXPORT_OPTIONS.map((item) => (
                <button
                  key={item}
                  className="btn-outline"
                  style={{ marginBottom: 10 }}
                >
                  {item}
                </button>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
