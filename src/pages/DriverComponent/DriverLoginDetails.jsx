import { useEffect, useMemo, useState } from "react";
import "../styles/DriverLoginDetails.css";

const PROFILE_KEY = "tourist_driver_profile";
const CURRENT_KEY = "tourist_driver_current";
const REQUESTS_KEY = "tourist_driver_requests";

const DEFAULT_REQUESTS = [
  {
    id: 1,
    tourist: "Ananya Sharma",
    pickup: "Ram Janmabhoomi Temple",
    drop: "Hanuman Garhi",
    time: "9:00 AM",
    date: "2026-05-18",
    people: "4 people",
    note: "Family pilgrimage with short route guidance.",
    status: "Pending",
  },
  {
    id: 2,
    tourist: "Rohit Verma",
    pickup: "Ayodhya Station",
    drop: "Saryu Ghat",
    time: "11:45 AM",
    date: "2026-05-18",
    people: "6 people",
    note: "Airport pickup and luggage assistance.",
    status: "Accepted",
  },
  {
    id: 3,
    tourist: "Meera Joshi",
    pickup: "Kanak Bhawan",
    drop: "Nageshwarnath Temple",
    time: "4:20 PM",
    date: "2026-05-18",
    people: "2 people",
    note: "Short devotional route and return trip.",
    status: "Pending",
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

export default function DriverLoginDetails({ onBack }) {
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState(DEFAULT_REQUESTS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setRequests(loadRequests());
  }, []);

  useEffect(() => {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  }, [requests]);

  const stats = useMemo(() => {
    const pending = requests.filter((item) => item.status === "Pending").length;
    const accepted = requests.filter((item) => item.status === "Accepted").length;
    const rejected = requests.filter((item) => item.status === "Rejected").length;

    return [
      { label: "Ride Requests", value: requests.length },
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
    name: "Driver Name",
    mobile: "9876543210",
    address: "Ayodhya, Uttar Pradesh",
    aadhaar: "XXXX-XXXX-1234",
    license: "DL-2026-AYO-001",
    expiry: "2027-12-31",
    vehicle: "UP 32 AB 9090",
    experience: "5 Years",
    languages: "Hindi, English",
    ratings: "4.8 / 5",
    role: "Driver",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
  };

  return (
    <div className="driver-details-page">
      <div
        className={`driver-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`driver-details-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="driver-back-btn" onClick={onBack}>
          <span>←</span> Back
        </button>

        <div className="driver-profile-card">
          <div
            className="driver-avatar"
            style={{
              backgroundImage: safeProfile.image ? `url(${safeProfile.image})` : "none",
            }}
          />
          <div className="driver-name">{safeProfile.name}</div>
          <div className="driver-role">{safeProfile.role}</div>

          <div className="driver-mini-grid">
            <div className="driver-mini">
              <span>Experience</span>
              <strong>{safeProfile.experience || "-"}</strong>
            </div>
            <div className="driver-mini">
              <span>Ratings</span>
              <strong>{safeProfile.ratings || "-"}</strong>
            </div>
            <div className="driver-mini">
              <span>Languages</span>
              <strong>{safeProfile.languages || "-"}</strong>
            </div>
            <div className="driver-mini">
              <span>Vehicle</span>
              <strong>{safeProfile.vehicle || "-"}</strong>
            </div>
          </div>
        </div>

        <div className="driver-info-card">
          <div className="driver-info-label">Mobile</div>
          <div className="driver-info-value">{safeProfile.mobile || "-"}</div>
        </div>
        <div className="driver-info-card">
          <div className="driver-info-label">License</div>
          <div className="driver-info-value">{safeProfile.license || "-"}</div>
        </div>
        <div className="driver-info-card">
          <div className="driver-info-label">Expiry</div>
          <div className="driver-info-value">{safeProfile.expiry || "-"}</div>
        </div>
        <div className="driver-info-card">
          <div className="driver-info-label">Address</div>
          <div className="driver-info-value">{safeProfile.address || "-"}</div>
        </div>
      </aside>

      <main className="driver-details-main">
                <button
          className={`driver-menu-toggle ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen((value) => !value)}
          aria-label={sidebarOpen ? "Close driver sidebar" : "Open driver sidebar"}
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        <section className="driver-hero">
          <div>
            <div className="driver-hero-eyebrow">Tourism Driver Portal</div>
            <h1>Welcome back, driver</h1>
            <p>
              Manage your registered driver profile and respond to tourist ride requests with a clean, focused dashboard.
            </p>
          </div>

          <div className="driver-stat-grid">
            {stats.map((item) => (
              <div key={item.label} className="driver-stat">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="driver-section">
          <div className="driver-section-head">
            <div>
              <h2>Incoming Ride Requests</h2>
              <p>Review the route, timing, and passenger details before accepting a trip.</p>
            </div>
          </div>

          <div className="driver-request-list">
            {requests.map((item) => (
              <article key={item.id} className="driver-request-card">
                <div className="driver-request-top">
                  <div>
                    <h3>{item.tourist}</h3>
                    <div className="driver-request-route">
                      {item.pickup} - {item.drop}
                    </div>
                  </div>
                  <span className={`driver-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>

                <div className="driver-request-grid">
                  <div className="driver-request-pill">
                    <span>Date</span>
                    <strong>{item.date}</strong>
                  </div>
                  <div className="driver-request-pill">
                    <span>Time</span>
                    <strong>{item.time}</strong>
                  </div>
                  <div className="driver-request-pill">
                    <span>Passengers</span>
                    <strong>{item.people}</strong>
                  </div>
                  <div className="driver-request-pill">
                    <span>Note</span>
                    <strong>{item.note}</strong>
                  </div>
                </div>

                <div className="driver-request-actions">
                  <button
                    className="driver-action secondary"
                    onClick={() => handleStatus(item.id, "Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="driver-action primary"
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
