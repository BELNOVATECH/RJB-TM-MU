import { useEffect, useMemo, useState } from "react";
import "./styles/VahicleLoginDetails.css";

const PROFILE_KEY = "tourist_vehicle_profile";
const CURRENT_KEY = "tourist_vehicle_current";
const REQUESTS_KEY = "tourist_vehicle_requests";
const REGISTRY_KEY = "tourist_vehicle_registry";

const DEFAULT_REQUESTS = [
  {
    id: 1,
    tourist: "Ananya Sharma",
    route: "Ram Janmabhoomi Temple -> Hanuman Garhi",
    time: "9:00 AM",
    date: "2026-05-18",
    passengers: "4 people",
    note: "Family pilgrimage with temple visit support.",
    status: "Pending",
  },
  {
    id: 2,
    tourist: "Rohit Verma",
    route: "Ayodhya Station -> Saryu Ghat",
    time: "11:30 AM",
    date: "2026-05-18",
    passengers: "6 people",
    note: "Airport transfer with luggage assistance.",
    status: "Pending",
  },
  {
    id: 3,
    tourist: "Meera Joshi",
    route: "Kanak Bhawan -> Nearby Heritage Trail",
    time: "4:15 PM",
    date: "2026-05-18",
    passengers: "2 people",
    note: "Short sightseeing trip with a return drop.",
    status: "Accepted",
  },
];

function loadProfile() {
  try {
    const current = localStorage.getItem(CURRENT_KEY);
    if (current) return JSON.parse(current);
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    return null;
  }
  return null;
}

function loadRequests() {
  try {
    const raw = localStorage.getItem(REQUESTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    return DEFAULT_REQUESTS;
  }
  return DEFAULT_REQUESTS;
}

function mapProfileToRegistry(profile) {
  if (!profile) return null;

  return {
    id: profile.vehicleNo || profile.reg || "registered-vehicle",
    vehicleNo: profile.vehicleNo || profile.reg || "-",
    chassis: profile.chassis || "",
    type: profile.type || "SUV",
    driverName: profile.driverName || profile.role || "Vehicle Service",
    model: profile.model || "",
    capacity: profile.capacity || "",
    year: profile.year || "",
    insurance: profile.insurance || "",
    permit: profile.permit || "",
    pollution: profile.pollution || "",
    status: profile.status || "Available",
    role: profile.role || "Vehicle Service",
    image: profile.image || "",
  };
}

function upsertRegistry(profile) {
  try {
    const mapped = mapProfileToRegistry(profile);
    if (!mapped) return;

    const raw = localStorage.getItem(REGISTRY_KEY);
    const current = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(current) ? current : [];
    const next = [
      mapped,
      ...list.filter((item) => item.vehicleNo !== mapped.vehicleNo),
    ];

    localStorage.setItem(REGISTRY_KEY, JSON.stringify(next));
  } catch {
    // Ignore registry sync failures and keep the dashboard functional.
  }
}

export default function VahicleLoginDetails({ onBack }) {
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState(DEFAULT_REQUESTS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setRequests(loadRequests());
  }, []);

  useEffect(() => {
    if (profile) {
      upsertRegistry(profile);
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  }, [requests]);

  const stats = useMemo(() => {
    const pending = requests.filter((item) => item.status === "Pending").length;
    const accepted = requests.filter((item) => item.status === "Accepted").length;
    const rejected = requests.filter((item) => item.status === "Rejected").length;

    return [
      { label: "Assigned Trips", value: requests.length },
      { label: "Pending", value: pending },
      { label: "Accepted", value: accepted },
      { label: "Rejected", value: rejected },
    ];
  }, [requests]);

  const handleStatus = (id, status) => {
    setRequests((items) =>
      items.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const safeProfile = profile || {
    vehicleNo: "AP09AB1234",
    type: "Tour Vehicle",
    model: "Toyota Traveller",
    driverName: "Vehicle Service",
    capacity: "24 Seats",
    status: "Available",
    year: "2024",
    insurance: "Valid",
    permit: "Valid",
    pollution: "Valid",
    role: "Vehicle Service",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=900",
  };

  return (
    <div className="vehicle-details-page">
      <div
        className={`vehicle-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`vehicle-details-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="vehicle-back-btn" onClick={onBack}>
          <span>←</span> Back
        </button>

        <div className="vehicle-profile-card">
          <div
            className="vehicle-avatar"
            style={{
              backgroundImage: safeProfile.image ? `url(${safeProfile.image})` : "none",
            }}
          />
          <div className="vehicle-name">{safeProfile.vehicleNo}</div>
          <div className="vehicle-role">
            {safeProfile.driverName || safeProfile.role}
          </div>

          <div className="vehicle-mini-grid">
            <div className="vehicle-mini">
              <span>Type</span>
              <strong>{safeProfile.type || "Tour Vehicle"}</strong>
            </div>
            <div className="vehicle-mini">
              <span>Status</span>
              <strong>{safeProfile.status || "Available"}</strong>
            </div>
            <div className="vehicle-mini">
              <span>Capacity</span>
              <strong>{safeProfile.capacity || "24 Seats"}</strong>
            </div>
            <div className="vehicle-mini">
              <span>Model</span>
              <strong>{safeProfile.model || "Traveller"}</strong>
            </div>
          </div>
        </div>

        <div className="vehicle-info-card">
          <div className="vehicle-info-label">Vehicle No</div>
          <div className="vehicle-info-value">{safeProfile.vehicleNo || "-"}</div>
        </div>
        <div className="vehicle-info-card">
          <div className="vehicle-info-label">Year</div>
          <div className="vehicle-info-value">{safeProfile.year || "-"}</div>
        </div>
        <div className="vehicle-info-card">
          <div className="vehicle-info-label">Insurance</div>
          <div className="vehicle-info-value">{safeProfile.insurance || "-"}</div>
        </div>
        <div className="vehicle-info-card">
          <div className="vehicle-info-label">Permit</div>
          <div className="vehicle-info-value">{safeProfile.permit || "-"}</div>
        </div>
      </aside>

      <main className="vehicle-details-main">
                <button
          className={`vehicle-menu-toggle ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen((value) => !value)}
          aria-label={sidebarOpen ? "Close vehicle sidebar" : "Open vehicle sidebar"}
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        <section className="vehicle-hero">
          <div>
            <div className="vehicle-hero-eyebrow">Tourism Transport Portal</div>
            <h1>Welcome back, vehicle partner</h1>
            <p>
              View your registered vehicle details and manage incoming tourist transport requests from one dashboard.
            </p>
          </div>

          <div className="vehicle-stat-grid">
            {stats.map((item) => (
              <div key={item.label} className="vehicle-stat">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="vehicle-section">
          <div className="vehicle-section-head">
            <div>
              <h2>Incoming Requests</h2>
              <p>Accept or reject tourist vehicle bookings based on your availability.</p>
            </div>
          </div>

          <div className="vehicle-request-list">
            {requests.map((item) => (
              <article key={item.id} className="vehicle-request-card">
                <div className="vehicle-request-top">
                  <div>
                    <h3>{item.tourist}</h3>
                    <div className="vehicle-request-route">{item.route}</div>
                  </div>
                  <span className={`vehicle-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>

                <div className="vehicle-request-grid">
                  <div className="vehicle-request-pill">
                    <span>Date</span>
                    <strong>{item.date}</strong>
                  </div>
                  <div className="vehicle-request-pill">
                    <span>Time</span>
                    <strong>{item.time}</strong>
                  </div>
                  <div className="vehicle-request-pill">
                    <span>Passengers</span>
                    <strong>{item.passengers}</strong>
                  </div>
                  <div className="vehicle-request-pill">
                    <span>Note</span>
                    <strong>{item.note}</strong>
                  </div>
                </div>

                <div className="vehicle-request-actions">
                  <button
                    className="vehicle-action secondary"
                    onClick={() => handleStatus(item.id, "Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="vehicle-action primary"
                    onClick={() => handleStatus(item.id, "Accepted")}
                  >
                    Accept
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
