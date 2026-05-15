import { useState } from "react";

import "./styles/Accommodation.css";

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
};

export default function Accommodation() {
  const [activeTab, setActiveTab] = useState(0);
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [showForm, setShowForm] = useState(false);
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
  num: form.roomNo,
  status: form.status,
  roomType: form.roomType,
  block: form.block,
  capacity: form.capacity,
  price: form.price,
  acType: form.acType,
  };

    setRooms((prev) => [...prev, newRoom]);

    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  return (
    <div>
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

          <div className="kpi-sub" 
          // style={{ color: "#999" }}
          >
            14 check-outs
          </div>
        </div>
      </div>

      {/* Add Room Form */}
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
                className="ti ti-building"
                style={{
                  fontSize: 14,
                  marginRight: 6,
                  verticalAlign: -2,
                  color: "#b5860d",
                }}
              />
              Add New Room
            </div>

            <button
              className="btn-outline"
              style={{ fontSize: 11, padding: "4px 10px" }}
              onClick={() => setShowForm(false)}
            >
              <i className="ti ti-x" /> Close
            </button>
          </div>

          {/* OLD INLINE CSS
style={{
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 12,
}}
*/}
<div className="accommodation-form-grid">

             <div>
              {/* <label
                style={{
                  fontSize: 11,
                  color: "#888",
                  display: "block",
                  marginBottom: 4,
                  fontWeight: 500,
                }}
              > */ }
              <label className="form-label">
                Room Number
              </label>

              <input
                value={form.roomNo}
                onChange={(e) =>
                  setForm({ ...form, roomNo: e.target.value })
                }
                placeholder="e.g. 116"
                // style={{
                //   width: "100%",
                //   padding: "7px 10px",
                //   border: "1px solid rgba(0,0,0,0.12)",
                //   borderRadius: 7,
                //   fontSize: 12,
                //   background: "#fdf8f0",
                //   outline: "none",
                // }}
                className="form-input"
              />
            </div>

            
            
          <div>
            <label
             className="form-label"
            >
              Room Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              // style={{
              //   width: "100%",
              //   padding: "7px 10px",
              //   border: "1px solid rgba(0,0,0,0.12)",
              //   borderRadius: 7,
              //   fontSize: 12,
              //   background: "#fdf8f0",
              //   outline: "none",
              // }}
              className="form-select"
            >
              <option value="occupied">Occupied</option>
              <option value="available">Available</option>
              <option value="cleaning">Cleaning</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label
              className="form-label"
            >
              Room Type
            </label>

            <select
              value={form.roomType}
              onChange={(e) =>
                setForm({ ...form, roomType: e.target.value })
              }
              // style={{
              //   width: "100%",
              //   padding: "7px 10px",
              //   border: "1px solid rgba(0,0,0,0.12)",
              //   borderRadius: 7,
              //   fontSize: 12,
              //   background: "#fdf8f0",
              //   outline: "none",
              // }}
              className="form-select"
            >
              <option>Standard Room</option>
              <option>Family Suite</option>
              <option>VIP Cottage</option>
            </select>
          </div>

          <div>
            <label
             className="form-label"
            >
              Block
            </label>

            <select
              value={form.block}
              onChange={(e) =>
                setForm({ ...form, block: e.target.value })
              }
              // style={{
              //   width: "100%",
              //   padding: "7px 10px",
              //   border: "1px solid rgba(0,0,0,0.12)",
              //   borderRadius: 7,
              //   fontSize: 12,
              //   background: "#fdf8f0",
              //   outline: "none",
              // }}
              className="form-select"
            >
              <option>Block A</option>
              <option>Block B</option>
              <option>VIP Cottage</option>
              <option>Dharamshala</option>
            </select>
          </div>

          <div>
            <label
              className="form-label"
            >
              Capacity
            </label>

            <input
  value={form.capacity}
  onChange={(e) =>
    setForm({ ...form, capacity: e.target.value })
  }
  placeholder="e.g. 4 pax"
  className="form-input"
/>
          </div>

          <div>
            <label
              className="form-label"
            >
              Price
            </label>

            <input
  value={form.price}
  onChange={(e) =>
    setForm({ ...form, price: e.target.value })
  }
  placeholder="e.g. ₹1500"
  className="form-input"
/>
          </div>

          <div>
            <label
              className="form-label"
            >
              AC Type
            </label>

            <select
  value={form.acType}
  onChange={(e) =>
    setForm({ ...form, acType: e.target.value })
  }
  className="form-select"
>
            
              <option>AC</option>
              <option>Non AC</option>
            </select>
          </div>
          </div>

          <div
            // style={{
            //   display: "flex",
            //   gap: 8,
            //   marginTop: 14,
            //   justifyContent: "flex-end",
            // }}
             className="form-actions">
          
            <button
              className="btn-outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button
              className="btn-primary"
              onClick={handleSave}
            >
              <i className="ti ti-device-floppy" /> Save Room
            </button>
          </div>
        </div>
      )}

      {/* Tabs + Actions */}
      <div
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "space-between",
        //   marginBottom: 14,
        // }}
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
          <button className="btn-outline">Export</button>

          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            <i className="ti ti-plus" /> New Booking
          </button>
        </div>
      </div>

      <div
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "3fr 2fr",
        //   gap: 14,
        // }}
        className="main-layout">
      
        {/* Left */}
        
        <div
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   gap: 14,
          // }}
          className="left-column"
        >
          {/* Room Grid */}
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
              // style={{
              //   fontSize: 10,
              //   color: "#bbb",
              //   marginTop: 10,
              // }}
              className="room-note"
            >
              <span
                // style={{
                //   display: "inline-block",
                //   width: 12,
                //   height: 12,
                //   background: "#fee2e2",
                //   borderRadius: 3,
                //   marginRight: 4,
                //   verticalAlign: -2,
                // }}
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
              // style={{
              //   display: "flex",
              //   flexDirection: "column",
              //   gap: 8,
              // }}
              className="checkin-list"
            >
              {RECENT_CHECKINS.map((g) => (
                <div
                  key={g.name}
                  // style={{
                  //   display: "flex",
                  //   alignItems: "center",
                  //   gap: 10,
                  //   padding: "8px 10px",
                  //   background: "#fdf8f0",
                  //   borderRadius: 8,
                  // }}
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
              // style={{
              //   display: "flex",
              //   flexDirection: "column",
              //   gap: 10,
              // }}
              className="pricing-list"
            >
              {pricingData.map((p, index) => (
                <div
                 key={p.label}
                 className="pricing-item"
                  >
                  
                  <div
                    // style={{
                    //   width: 32,
                    //   height: 32,
                    //   background: "#fef9c3",
                    //   borderRadius: 8,
                    //   display: "flex",
                    //   alignItems: "center",
                    //   justifyContent: "center",
                    //   flexShrink: 0,
                    // }}
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
                      // style={{ fontSize: 12, fontWeight: 500 }}
                      className="pricing-title"
                    >
                      {p.label}
                    </div>

                    <div
                      // style={{ fontSize: 10, color: "#999" }}
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
                      // style={{
                      //   width: 110,
                      //   padding: "6px 8px",
                      //   border: "1px solid rgba(0,0,0,0.12)",
                      //   borderRadius: 6,
                      //   fontSize: 12,
                      //   background: "#fff",
                      //   outline: "none",
                      // }}
                      className="price-input"
                    />
                  ) : (
                    <div
                      // style={{
                      //   fontSize: 12,
                      //   fontWeight: 600,
                      //   color: "#1a0a00",
                      // }}
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
      </div>
    
    </div>
  );
}