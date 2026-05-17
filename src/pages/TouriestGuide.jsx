import { useEffect, useMemo, useState } from "react";
import "./styles/TouriestGuide.css";

const PROFILE_KEY = "tourist_guide_profile";
const BOOKING_KEY = "tourist_guide_bookings";

const DEFAULT_BOOKINGS = [
  {
    id: 1,
    tourist: "Ananya Sharma",
    date: "2026-05-18",
    time: "9:00 AM",
    people: "4 people",
    language: "Hindi, English",
    route: "Ram Janmabhoomi Temple -> Hanuman Garhi",
    note: "Family pilgrimage with temple history interest.",
    status: "Pending",
  },
  {
    id: 2,
    tourist: "Rahul Verma",
    date: "2026-05-19",
    time: "6:30 AM",
    people: "2 people",
    language: "English",
    route: "Saryu Ghat sunrise visit",
    note: "Morning riverfront aarti and devotional walk.",
    status: "Pending",
  },
  {
    id: 3,
    tourist: "Meera Patel",
    date: "2026-05-20",
    time: "2:00 PM",
    people: "6 people",
    language: "Hindi, Gujarati",
    route: "Kanak Bhawan + nearby attractions",
    note: "Looking for a calm tour with cultural guidance.",
    status: "Pending",
  },
];

const defaultProfile = {
  guideName: "Tour Guide",
  role: "Tour Guide",
  mobile: "",
  email: "",
  languages: "Hindi, English",
  specialization: "Temple Tours",
  experience: "5 years",
  availability: "Full Time",
  ratings: "4.8",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
};

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function TouriestGuide({ onBack }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [bookings, setBookings] = useState(DEFAULT_BOOKINGS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedProfile = loadJson(PROFILE_KEY, null);
    if (savedProfile) {
      setProfile({
        ...defaultProfile,
        ...savedProfile,
      });
    }

    const savedBookings = loadJson(BOOKING_KEY, null);
    if (savedBookings && Array.isArray(savedBookings) && savedBookings.length) {
      setBookings(savedBookings);
    } else {
      localStorage.setItem(BOOKING_KEY, JSON.stringify(DEFAULT_BOOKINGS));
    }
  }, []);

  const stats = useMemo(() => {
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const accepted = bookings.filter((b) => b.status === "Accepted").length;
    const rejected = bookings.filter((b) => b.status === "Rejected").length;
    return { pending, accepted, rejected, total: bookings.length };
  }, [bookings]);

  const updateBooking = (id, status) => {
    setBookings((prev) => {
      const next = prev.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      );
      localStorage.setItem(BOOKING_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="tourguide-dashboard">
      <div
        className={`tourguide-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`tourguide-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="tourguide-back" onClick={onBack}>
          <i className="ti ti-arrow-left" />
          Back
        </button>

        <div className="tourguide-profile-card">
          <img src={profile.image} alt={profile.guideName} className="tourguide-avatar" />
          <h2>{profile.guideName}</h2>
          <p>{profile.specialization}</p>
          <div className="tourguide-rating">
            <i className="ti ti-star-filled" />
            {profile.ratings}
          </div>
        </div>

        <div className="tourguide-info-list">
          <div>
            <span>Mobile</span>
            <strong>{profile.mobile || "Not shared"}</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{profile.email || "Not shared"}</strong>
          </div>
          <div>
            <span>Languages</span>
            <strong>{profile.languages || "Hindi, English"}</strong>
          </div>
          <div>
            <span>Experience</span>
            <strong>{profile.experience || "5 years"}</strong>
          </div>
          <div>
            <span>Availability</span>
            <strong>{profile.availability || "Full Time"}</strong>
          </div>
        </div>

        <div className="tourguide-mini-stats">
          <div><strong>{stats.total}</strong><span>Total</span></div>
          <div><strong>{stats.pending}</strong><span>Pending</span></div>
          <div><strong>{stats.accepted}</strong><span>Accepted</span></div>
          <div><strong>{stats.rejected}</strong><span>Rejected</span></div>
        </div>
      </aside>

      <main className="tourguide-main">
        <button
          className={`tourguide-menu-toggle ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen((value) => !value)}
          aria-label={sidebarOpen ? "Close guide sidebar" : "Open guide sidebar"}
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        <section className="tourguide-hero card">
          <div>
            <div className="tourguide-eyebrow">Tour Guide Portal</div>
            <h1>Welcome back, {profile.guideName}</h1>
            <p>
              Manage your bookings, review tourist requests, and accept or reject trips directly
              from your guide dashboard.
            </p>
          </div>

          <div className="tourguide-hero-grid">
            <div>
              <span>Total requests</span>
              <strong>{stats.total}</strong>
            </div>
            <div>
              <span>Pending</span>
              <strong>{stats.pending}</strong>
            </div>
            <div>
              <span>Accepted</span>
              <strong>{stats.accepted}</strong>
            </div>
            <div>
              <span>Rejected</span>
              <strong>{stats.rejected}</strong>
            </div>
          </div>
        </section>

        <section className="tourguide-section">
          <div className="tourguide-section-head">
            <div>
              <div className="tourguide-section-title">Incoming Bookings</div>
              <p>Tourists who want to book your guide service will appear here.</p>
            </div>
            <div className="tourguide-count">{stats.pending} pending requests</div>
          </div>

          <div className="tourguide-booking-list">
            {bookings.map((booking) => (
              <article className="tourguide-booking card" key={booking.id}>
                <div className="tourguide-booking-top">
                  <div>
                    <h3>{booking.tourist}</h3>
                    <p>{booking.route}</p>
                  </div>
                  <span className={`tourguide-status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="tourguide-booking-grid">
                  <div>
                    <span>Date</span>
                    <strong>{booking.date}</strong>
                  </div>
                  <div>
                    <span>Time</span>
                    <strong>{booking.time}</strong>
                  </div>
                  <div>
                    <span>Group</span>
                    <strong>{booking.people}</strong>
                  </div>
                  <div>
                    <span>Language</span>
                    <strong>{booking.language}</strong>
                  </div>
                </div>

                <p className="tourguide-note">{booking.note}</p>

                <div className="tourguide-actions">
                  <button
                    className="tourguide-btn outline"
                    onClick={() => updateBooking(booking.id, "Rejected")}
                    disabled={booking.status !== "Pending"}
                  >
                    Reject
                  </button>
                  <button
                    className="tourguide-btn primary"
                    onClick={() => updateBooking(booking.id, "Accepted")}
                    disabled={booking.status !== "Pending"}
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
