// // src/pages/Dashboard.jsx

// const CHART_BARS = [
//   { day: "Mon", pct: 45, type: "normal" },
//   { day: "Tue", pct: 60, type: "normal" },
//   { day: "Wed", pct: 72, type: "high" },
//   { day: "Thu", pct: 55, type: "normal" },
//   { day: "Fri", pct: 88, type: "high" },
//   { day: "Sat", pct: 100, type: "peak" },
//   { day: "Sun", pct: 94, type: "peak" },
// ];

// const BAR_COLOR = { normal: "#f5e6c0", high: "#f5c842", peak: "#b5860d" };

// const RECENT_BOOKINGS = [
//   { initials: "RM", name: "Ramesh Mishra", meta: "Pooja · Varanasi", status: "Confirmed", cls: "badge-green" },
//   { initials: "PK", name: "Priya Kumari", meta: "Vehicle · Mumbai", status: "Pending", cls: "badge-amber" },
//   { initials: "AS", name: "Anil Sharma", meta: "Cottage · Delhi", status: "Checked In", cls: "badge-blue" },
//   { initials: "SV", name: "Sita Verma", meta: "Guide · Lucknow", status: "Confirmed", cls: "badge-green" },
// ];

// const VEHICLES = [
//   { icon: "ti-car", label: "Cars / Sedans", sub: "14 active · 3 available", badge: "3 Free", cls: "badge-amber" },
//   { icon: "ti-car-suv", label: "SUVs / Innova", sub: "10 active · 4 available", badge: "4 Free", cls: "badge-green" },
//   { icon: "ti-bus", label: "Mini Buses", sub: "5 active · 1 on break", badge: "1 Free", cls: "badge-red" },
//   { icon: "ti-bolt", label: "EV Vehicles", sub: "8 active · 5 available", badge: "5 Free", cls: "badge-blue" },
// ];

// const ALERTS = [
//   { color: "#c0392b", text: "UP-32 IJ 7890 — Permit expires 17 May. Action required.", time: "2 hours ago" },
//   { color: "#f5c842", text: "Room Block B occupancy at 87% — Only 5 rooms free.", time: "4 hours ago" },
//   { color: "#3b82f6", text: "Guide Rahul Tiwari — Rating dropped below 4.0. Review needed.", time: "Yesterday" },
//   { color: "#16a34a", text: "Devotional content: 1,420 plays today (+34%).", time: "Today" },
// ];

// export default function Dashboard() {
//   return (
//     <div>
//       <div className="page-greeting">Jai Shri Ram, Yash 🙏</div>
//       <div className="page-greeting-sub">Here's what's happening at Rama Janma Bhumi today.</div>

//       {/* KPI Row */}
//       <div className="kpi-row">
//         <div className="kpi-card">
//           <div className="kpi-accent" style={{ background: "#f5c842" }} />
//           <div className="kpi-icon" style={{ background: "#fef9c3" }}>
//             <i className="ti ti-ticket" style={{ color: "#b5860d" }} />
//           </div>
//           <div className="kpi-label">Pooja Bookings</div>
//           <div className="kpi-value">1,248</div>
//           <div className="kpi-sub"><i className="ti ti-trending-up" style={{ fontSize: 11 }} /> +12% this week</div>
//         </div>
//         <div className="kpi-card">
//           <div className="kpi-accent" style={{ background: "#16a34a" }} />
//           <div className="kpi-icon" style={{ background: "#dcfce7" }}>
//             <i className="ti ti-heart-handshake" style={{ color: "#15803d" }} />
//           </div>
//           <div className="kpi-label">Total Donations</div>
//           <div className="kpi-value">₹4.2L</div>
//           <div className="kpi-sub"><i className="ti ti-trending-up" style={{ fontSize: 11 }} /> +8% this month</div>
//         </div>
//         <div className="kpi-card">
//           <div className="kpi-accent" style={{ background: "#3b82f6" }} />
//           <div className="kpi-icon" style={{ background: "#dbeafe" }}>
//             <i className="ti ti-users" style={{ color: "#1d4ed8" }} />
//           </div>
//           <div className="kpi-label">Active Pilgrims</div>
//           <div className="kpi-value">3,870</div>
//           <div className="kpi-sub" style={{ color: "#3b82f6" }}><i className="ti ti-radio" style={{ fontSize: 11 }} /> Live today</div>
//         </div>
//         <div className="kpi-card">
//           <div className="kpi-accent" style={{ background: "#c0392b" }} />
//           <div className="kpi-icon" style={{ background: "#fee2e2" }}>
//             <i className="ti ti-calendar-event" style={{ color: "#b91c1c" }} />
//           </div>
//           <div className="kpi-label">Events This Month</div>
//           <div className="kpi-value">7</div>
//           <div className="kpi-sub" style={{ color: "#b91c1c" }}>2 upcoming this week</div>
//         </div>
//       </div>

//       {/* Row 2 */}
//       <div className="grid-2">
//         {/* Traffic Chart */}
//         <div className="card">
//           <div className="card-head">
//             <div className="card-title">
//               <i className="ti ti-chart-line" style={{ fontSize: 14, verticalAlign: -2, marginRight: 6, color: "#b5860d" }} />
//               Pilgrim Traffic — This Week
//             </div>
//             <button className="card-action">View full report →</button>
//           </div>
//           <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 90, marginBottom: 8 }}>
//             {CHART_BARS.map((b) => (
//               <div key={b.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
//                 <div style={{ width: "100%", height: b.pct + "%", background: BAR_COLOR[b.type], borderRadius: "3px 3px 0 0", transition: "height 0.3s" }} />
//                 <div style={{ fontSize: 9, color: "#999" }}>{b.day}</div>
//               </div>
//             ))}
//           </div>
//           <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
//             {[["Peak day", "#b5860d"], ["High traffic", "#f5c842"], ["Normal", "#f5e6c0"]].map(([l, c]) => (
//               <div key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#999" }}>
//                 <div style={{ width: 8, height: 8, background: c, borderRadius: 2 }} />
//                 {l}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Resource Status */}
//         <div className="card">
//           <div className="card-head"><div className="card-title">Resource Status</div></div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {[
//               ["Vehicles", 78, "#f5c842"],
//               ["Rooms", 91, "#c0392b"],
//               ["Guides", 56, "#16a34a"],
//               ["Pooja Slots", 84, "#3b82f6"],
//             ].map(([label, pct, color]) => (
//               <div key={label} className="bar-row">
//                 <div className="bar-label">{label}</div>
//                 <div className="bar-track"><div className="bar-fill" style={{ width: pct + "%", background: color }} /></div>
//                 <div className="bar-val">{pct}%</div>
//               </div>
//             ))}
//           </div>
//           <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.07)", fontSize: 10, color: "#999" }}>
//             Occupancy / allocation rates today
//           </div>
//         </div>
//       </div>

//       {/* Row 3 */}
//       <div className="grid-3">
//         {/* Recent Bookings */}
//         <div className="card">
//           <div className="card-head">
//             <div className="card-title">Recent Bookings</div>
//             <button className="card-action">All →</button>
//           </div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
//             {RECENT_BOOKINGS.map((b) => (
//               <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 9px", background: "#fdf8f0", borderRadius: 8 }}>
//                 <div className="avatar-circle">{b.initials}</div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontSize: 12, fontWeight: 500 }}>{b.name}</div>
//                   <div style={{ fontSize: 10, color: "#999" }}>{b.meta}</div>
//                 </div>
//                 <span className={`badge ${b.cls}`}>{b.status}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Vehicle Status */}
//         <div className="card">
//           <div className="card-head">
//             <div className="card-title">Vehicle Status</div>
//             <button className="card-action">Manage →</button>
//           </div>
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             {VEHICLES.map((v, i) => (
//               <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: i < VEHICLES.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
//                 <div style={{ width: 28, height: 28, background: "#f5e6c0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <i className={`ti ${v.icon}`} style={{ fontSize: 14, color: "#b5860d" }} />
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontSize: 11, fontWeight: 500 }}>{v.label}</div>
//                   <div style={{ fontSize: 10, color: "#999" }}>{v.sub}</div>
//                 </div>
//                 <span className={`badge ${v.cls}`}>{v.badge}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* System Alerts */}
//         <div className="card">
//           <div className="card-head">
//             <div className="card-title">System Alerts</div>
//             <button className="card-action">All →</button>
//           </div>
//           <div>
//             {ALERTS.map((a, i) => (
//               <div key={i} className="alert-item">
//                 <div className="alert-dot" style={{ background: a.color }} />
//                 <div>
//                   <div className="alert-text">{a.text}</div>
//                   <div style={{ fontSize: 10, color: "#bbb", marginTop: 2 }}>{a.time}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Row 4 — Quick Stats */}
//       <div className="card">
//         <div className="card-head"><div className="card-title">Today at a Glance</div></div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0 }}>
//           {[
//             ["🕌", "Temple Visits", "2,840"],
//             ["🚗", "Trips Completed", "96"],
//             ["🏠", "Check-ins", "28"],
//             ["🎵", "Content Plays", "1,420"],
//             ["💰", "Revenue", "₹1.8L"],
//             ["⭐", "Avg Rating", "4.6"],
//           ].map(([icon, label, val], i) => (
//             <div key={label} style={{ textAlign: "center", padding: "12px 8px", borderRight: i < 5 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
//               <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
//               <div style={{ fontSize: 16, fontWeight: 500, color: "#1a0a00" }}>{val}</div>
//               <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>{label}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




import "./Dashboard.css";

const CHART_BARS = [
  
  { day: "Mon", pct: 45, type: "normal" },
  { day: "Tue", pct: 60, type: "normal" },
  { day: "Wed", pct: 72, type: "high" },
  { day: "Thu", pct: 55, type: "normal" },
  { day: "Fri", pct: 88, type: "high" },
  { day: "Sat", pct: 100, type: "peak" },
  { day: "Sun", pct: 94, type: "peak" },
];

const RECENT_BOOKINGS = [
  { initials: "RM", name: "Ramesh Mishra", meta: "Pooja · Varanasi", status: "Confirmed", cls: "badge-green" },
  { initials: "PK", name: "Priya Kumari", meta: "Vehicle · Mumbai", status: "Pending", cls: "badge-amber" },
  { initials: "AS", name: "Anil Sharma", meta: "Cottage · Delhi", status: "Checked In", cls: "badge-blue" },
  { initials: "SV", name: "Sita Verma", meta: "Guide · Lucknow", status: "Confirmed", cls: "badge-green" },
];

const VEHICLES = [
  { icon: "ti-car", label: "Cars / Sedans", sub: "14 active · 3 available", badge: "3 Free", cls: "badge-amber" },
  { icon: "ti-car-suv", label: "SUVs / Innova", sub: "10 active · 4 available", badge: "4 Free", cls: "badge-green" },
  { icon: "ti-bus", label: "Mini Buses", sub: "5 active · 1 on break", badge: "1 Free", cls: "badge-red" },
  { icon: "ti-bolt", label: "EV Vehicles", sub: "8 active · 5 available", badge: "5 Free", cls: "badge-blue" },
];

const ALERTS = [
  { type: "red", text: "UP-32 IJ 7890 — Permit expires 17 May. Action required.", time: "2 hours ago" },
  { type: "yellow", text: "Room Block B occupancy at 87% — Only 5 rooms free.", time: "4 hours ago" },
  { type: "blue", text: "Guide Rahul Tiwari — Rating dropped below 4.0. Review needed.", time: "Yesterday" },
  { type: "green", text: "Devotional content: 1,420 plays today (+34%).", time: "Today" },
];

export default function Dashboard() {
  return (
    <div className="dashboard">

      <div className="page-greeting">Jai Shri Ram, Yash 🙏</div>
      <div className="page-greeting-sub">Here's what's happening at Rama Janma Bhumi today.</div>

      {/* KPI */}
      <div className="kpi-row">
        <div className="kpi-card yellow">
          <div className="kpi-accent"></div>
          <div className="kpi-icon"><i className="ti ti-ticket"></i></div>
          <div className="kpi-label">Pooja Bookings</div>
          <div className="kpi-value">1,248</div>
          <div className="kpi-sub">+12% this week</div>
        </div>

        <div className="kpi-card green">
          <div className="kpi-accent"></div>
          <div className="kpi-icon"><i className="ti ti-heart-handshake"></i></div>
          <div className="kpi-label">Total Donations</div>
          <div className="kpi-value">₹4.2L</div>
          <div className="kpi-sub">+8% this month</div>
        </div>

        <div className="kpi-card blue">
          <div className="kpi-accent"></div>
          <div className="kpi-icon"><i className="ti ti-users"></i></div>
          <div className="kpi-label">Active Pilgrims</div>
          <div className="kpi-value">3,870</div>
          <div className="kpi-sub blue-text">Live today</div>
        </div>

        <div className="kpi-card red">
          <div className="kpi-accent"></div>
          <div className="kpi-icon"><i className="ti ti-calendar-event"></i></div>
          <div className="kpi-label">Events This Month</div>
          <div className="kpi-value">7</div>
          <div className="kpi-sub red-text">2 upcoming this week</div>
        </div>
      </div>

      {/* Chart + Resource */}
      <div className="grid-2">

        <div className="card">
          <div className="card-head">
            <div className="card-title">Pilgrim Traffic — This Week</div>
          </div>

          <div className="chart-container">
            {CHART_BARS.map((b) => (
              <div key={b.day} className="chart-bar">
                <div className={`bar ${b.type} h-${b.pct}`}></div>
                <div className="bar-day">{b.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Resource Status</div>

          {[
            ["Vehicles", "vehicles", 78],
            ["Rooms", "rooms", 91],
            ["Guides", "guides", 56],
            ["Pooja Slots", "pooja", 84],
          ].map(([label, cls, pct]) => (
            <div key={label} className="bar-row">
              <div className="bar-label">{label}</div>
              <div className="bar-track">
                <div className={`bar-fill ${cls} w-${pct}`}></div>
              </div>
              <div className="bar-val">{pct}%</div>
            </div>
          ))}
        </div>

      </div>

      {/* BOOKINGS */}
      <div className="grid-3">

        <div className="card">
          <div className="card-title">Recent Bookings</div>

          {RECENT_BOOKINGS.map((b) => (
            <div key={b.name} className="booking-item">
              <div className="avatar-circle">{b.initials}</div>
              <div className="booking-info">
                <div className="booking-name">{b.name}</div>
                <div className="booking-meta">{b.meta}</div>
              </div>
              <span className={`badge ${b.cls}`}>{b.status}</span>
            </div>
          ))}
        </div>

        {/* VEHICLES */}
        <div className="card">
          <div className="card-title">Vehicle Status</div>

          {VEHICLES.map((v) => (
            <div key={v.label} className="vehicle-item">
              <i className={`ti ${v.icon}`}></i>
              <div>
                <div>{v.label}</div>
                <div className="vehicle-sub">{v.sub}</div>
              </div>
              <span className={`badge ${v.cls}`}>{v.badge}</span>
            </div>
          ))}
        </div>

        {/* ALERTS */}
        <div className="card">
          <div className="card-title">System Alerts</div>

          {ALERTS.map((a, i) => (
            <div key={i} className="alert-item">
              <div className={`alert-dot ${a.type}`}></div>
              <div>
                <div className="alert-text">{a.text}</div>
                <div className="alert-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* STATS */}
      <div className="card">
        <div className="card-title">Today at a Glance</div>

        <div className="stats-grid">
          {[
            ["🕌", "Temple Visits", "2,840"],
            ["🚗", "Trips Completed", "96"],
            ["🏠", "Check-ins", "28"],
            ["🎵", "Content Plays", "1,420"],
            ["💰", "Revenue", "₹1.8L"],
            ["⭐", "Avg Rating", "4.6"],
          ].map(([icon, label, val], i) => (
            <div key={label} className="stat-item">
              <div className="stat-icon">{icon}</div>
              <div className="stat-value">{val}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
