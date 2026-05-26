import "./styles/Customer_dashboard.css";
import GuideBooking from "./BookGuide";
import VehicleBooking from "./VehicleBooking";
import DevotionalPrograms from "./DevotionalPrograms";
import { useState } from "react";
import CustomerTouriestSpots from "./CustomerTouriestSpots";
import AIAssistant from "./AIassistant";
import CustomerAccommodation from "./CustomerAccommodation";
import CustomerGuide from "./CustomerGuide";
import CustomerVehicle from "./CustomerVehicle";
import PaymentIntegration from "./PaymentGateway";
export default function PilgrimHome() {
  const [activePage, setActivePage] = useState("home");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      type: "guide",
      title: "Tour Guide Booking",
      subtitle: "Rajesh Kumar - Tomorrow, 9:00 AM",
      details: "4.9★ guide, fluent in Hindi and English",
      status: "Confirmed",
      hint: "Temple rituals, darshan support, and local history.",
      person: {
        role: "Guide",
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        rating: "4.9",
        notes: "Expert guide with 10+ years of experience.",
      },
    },
    {
      id: 2,
      type: "vehicle",
      title: "Vehicle Reservation",
      subtitle: "Tempo traveler for 6 people - 20 May, 11:00 AM",
      details: "Pickup: Main Bus Stand, drop-off at temple gate.",
      status: "Pending",
      hint: "Driver will arrive 10 minutes before pickup.",
      person: {
        role: "Driver",
        name: "Sunil Mehta",
        phone: "+91 91234 56789",
        rating: "4.8",
        vehicle: "Tempo Traveler",
        notes: "Includes bottled water and seatbelts for all passengers.",
      },
    },
    {
      id: 3,
      type: "accommodation",
      title: "Accommodation",
      subtitle: "Deluxe room booked for 21-22 May",
      details: "Hotel Shanti Bhavan, 1 km from Rama Janma Bhoomi.",
      status: "Confirmed",
      hint: "Includes breakfast and early check-in.",
      person: {
        role: "Hotel",
        name: "Shanti Bhavan Reception",
        phone: "+91 99876 54321",
        rating: "4.7",
        notes: "Room includes Wi-Fi and hot water supply.",
      },
    },
    {
      id: 4,
      type: "pooja",
      title: "Pooja Slot",
      subtitle: "Morning Aarti slot - 21 May, 6:00 AM",
      details: "Special darshan pass included.",
      status: "Confirmed",
      hint: "Arrive 15 minutes early for the queue.",
      person: {
        role: "Pooja Coordinator",
        name: "Vikram Singh",
        phone: "+91 94567 81234",
        rating: "4.8",
        notes: "Coordinates seating and prasad distribution.",
      },
    },
    {
      id: 5,
      type: "devotional",
      title: "Devotional Program",
      subtitle: "Bhajan evening - 22 May, 7:30 PM",
      details: "Reserved front-row seating.",
      status: "Pending",
      hint: "Program will include live bhajans and arti.",
      person: {
        role: "Event Host",
        name: "Neelam Devi",
        phone: "+91 93456 78901",
        rating: "4.6",
        notes: "Welcome and guide you to the seating area.",
      },
    },
  ]);

  const openBookingDetails = (booking) => setSelectedBooking(booking);
  const closeBookingDetails = () => setSelectedBooking(null);
  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status: "Refund Processing",
refund: "50% Refund Initiated",
refundAmount: "₹4000",
refundTime: "5-7 Working Days",
              details: booking.details,
              person: booking.person
                ? { ...booking.person, status: "Cancelled" }
                : booking.person,
            }
          : booking
      )
    );
    setSelectedBooking((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
         status: "Refund Processing",
refund: "50% Refund Initiated",
refundAmount: "₹4000",
refundTime: "5-7 Working Days",
            person: prev.person
              ? { ...prev.person, status: "Cancelled" }
              : prev.person,
          }
        : prev
    );
  };

  
  const getBookingTypeLabel = (type) => {
    const labels = {
      guide: "Tour Guide",
      vehicle: "Vehicle",
      accommodation: "Accommodation",
      pooja: "Pooja Slot",
      devotional: "Devotional Program",
    };

    return labels[type] || "Booking";
  };

  const getBookingIcon = (type) => {
    const icons = {
      guide: "ti-user",
      vehicle: "ti-car",
      accommodation: "ti-building",
      pooja: "ti-calendar-event",
      devotional: "ti-ticket",
    };

    return icons[type] || "ti-ticket";
  };

  const getBookingActionLabel = (type) => {
    const labels = {
      guide: "guide booking",
      vehicle: "vehicle booking",
      accommodation: "accommodation booking",
      pooja: "pooja slot",
      devotional: "devotional program",
    };

    return labels[type] || "booking";
  };

  const renderBottomNav = () => (
    <div className="bottom-navbar">
      <button
        className={`bottom-nav-item${activePage === "home" ? " active" : ""}`}
        onClick={() => setActivePage("home")}
      >
        <i className="ti ti-home"></i>
        <span>Home</span>
      </button>

      <button
        className={`bottom-nav-item${activePage === "bookings" ? " active" : ""}`}
        onClick={() => setActivePage("bookings")}
      >
        <i className="ti ti-calendar"></i>
        <span>Bookings</span>
      </button>

      <button
        className={`bottom-nav-item${activePage === "ai" ? " active" : ""}`}
        onClick={() => setActivePage("ai")}
      >
        <i className="ti ti-robot"></i>
        <span>AI Assistant</span>
      </button>

      <button
        className={`bottom-nav-item${activePage === "spots" ? " active" : ""}`}
        onClick={() => setActivePage("spots")}
      >
        <i className="ti ti-map-pin"></i>
        <span>Explore</span>
      </button>

      <button
        className={`bottom-nav-item${activePage === "profile" ? " active" : ""}`}
        onClick={() => setActivePage("profile")}
      >
        <i className="ti ti-user"></i>
        <span>Profile</span>
      </button>
    </div>
  );

  if (activePage === "accommodation") {
    return <CustomerAccommodation onBack={() => setActivePage("home")} />;
  }
  if (activePage === "guide") {
    return <CustomerGuide onBack={() => setActivePage("home")} />;
  }
  if (activePage === "vehicle") {
    return <CustomerVehicle onBack={() => setActivePage("home")} />;
  }

  if (activePage === "guide") {
    return (
      <GuideBooking
        onBack={() => setActivePage("home")}
      />
    );
  }

  if (activePage === "vehicle") {
    return (
      <VehicleBooking
        onBack={() => setActivePage("home")}
      />
    );
  }

  if (activePage === "devotional") {
    return (
      <DevotionalPrograms
        onBack={() => setActivePage("home")}
      />
    );
  }
  if (activePage === "spots") {
  return (
    <CustomerTouriestSpots
      onBack={() => setActivePage("home")}
    />
  );
}

  if (activePage === "ai") {
    return <AIAssistant setPage={setActivePage} />;
  }

  if (activePage === "bookings") {
    return (
      <div className="pilgrim-page">
        <div className="hero-section">
          <div className="hero-top">
            <div>
              <h1>My Bookings</h1>
              <p>Review your upcoming temple bookings and reservations.</p>
            </div>
          </div>
        </div>

        <div className="pilgrim-content">
          <div className="section-title">Upcoming Bookings</div>

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className={`booking-card clickable${booking.status === "Cancelled" ? " cancelled" : ""}`}
              onClick={() => openBookingDetails(booking)}
            >
              <div className="booking-left">
                <div className="booking-icon">
                  <i className={`ti ${getBookingIcon(booking.type)}`}></i>
                </div>
                <div>
                  <h4>{booking.title}</h4>
                  <p>{booking.subtitle}</p>
                  <p className="text-muted">{booking.details}</p>
                </div>
              </div>
            <span
  className={`status-badge ${
    booking.status === "Pending"
      ? "pending"
      : booking.status === "Confirmed"
      ? "confirmed"
      : booking.status === "Refund Processing"
      ? "refund"
      : "cancelled"
  }`}
>
  {booking.status}
</span>
            </div>
          ))}

          {selectedBooking && (
            <div className="modal-overlay" onClick={closeBookingDetails}>
              <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeBookingDetails}>&times;</button>
                <div className="modal-header">
                  <div>
                    <p className="booking-type-tag">{getBookingTypeLabel(selectedBooking.type)}</p>
                    <h3>{selectedBooking.title}</h3>
                    <p className="text-muted">{selectedBooking.subtitle}</p>
                  </div>
                </div>
                <div className="modal-detail-row">
                  <div className="booking-summary-box">
                    <p className="text-muted">Status</p>
                    <strong>{selectedBooking.status}</strong>
                  </div>
                  <div className="booking-summary-box">
                    <p className="text-muted">Details</p>
                    <strong>{selectedBooking.details}</strong>
                  </div>
                </div>
                <p className="booking-note">{selectedBooking.hint}</p>
                {selectedBooking.status === "Refund Processing" && (
  <div className="refund-details-box">
    <p><strong>Refund Status:</strong> Processing</p>
    <p><strong>Refund Amount:</strong> {selectedBooking.refundAmount}</p>
    <p><strong>Expected Refund:</strong> {selectedBooking.refundTime}</p>
  </div>
)}
                {selectedBooking.person && (
                  <div className="profile-card">
                    <h4>{selectedBooking.person.role} Details</h4>
                    <div className="person-detail-list">
                      <p><strong>Name:</strong> {selectedBooking.person.name}</p>
                      <p><strong>Phone:</strong> {selectedBooking.person.phone}</p>
                      <p><strong>Rating:</strong> {selectedBooking.person.rating}</p>
                    </div>
                    {selectedBooking.person.vehicle && <p><strong>Vehicle:</strong> {selectedBooking.person.vehicle}</p>}
                    <p className="text-muted">{selectedBooking.person.notes}</p>
                  </div>
                )}
                <div className="modal-actions">
                  <div className="booking-refund-note">
  <i className="ti ti-info-circle"></i>
  50% refund applicable on cancellation before check-in time.
</div>
                 {selectedBooking.status !== "Refund Processing" ? (
                    <button className="view-all-btn cancel" onClick={() => cancelBooking(selectedBooking.id)}>
                      Cancel {getBookingActionLabel(selectedBooking.type)}
                    </button>
                  ) : (
                   <button className="view-all-btn refund-processing" disabled>
  Refund Processing
</button>
                  )}
                  <button className="view-all-btn" onClick={closeBookingDetails}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {renderBottomNav()}
      </div>
    );
  }

  if (activePage === "spots") {
    return (
      <div className="pilgrim-page">
        <div className="hero-section">
          <div className="hero-top">
            <div>
              <h1>Explore Nearby Spots</h1>
              <p>Discover must-see temples and pilgrimage destinations.</p>
            </div>
          </div>
        </div>

        <div className="pilgrim-content">
          <div className="section-title">Top Tourist Spots</div>

          <div className="place-card">
            <img src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80" alt="Rama Janma Bhoomi" />
            <div className="place-info">
              <div>
                <h3>Rama Janma Bhoomi</h3>
                <p>1.8 km away</p>
              </div>
              <div className="rating">
                <i className="ti ti-star-filled"></i>
                4.9
              </div>
            </div>
          </div>

          <div className="place-card">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" alt="Sita Kund" />
            <div className="place-info">
              <div>
                <h3>Sita Kund</h3>
                <p>3.2 km away</p>
              </div>
              <div className="rating">
                <i className="ti ti-star-filled"></i>
                4.7
              </div>
            </div>
          </div>

          <div className="place-card">
            <img src="https://images.unsplash.com/photo-1523413605292-4120ef2a5a1f?auto=format&fit=crop&w=1200&q=80" alt="Ganesh Ghat" />
            <div className="place-info">
              <div>
                <h3>Ganesh Ghat</h3>
                <p>4.5 km away</p>
              </div>
              <div className="rating">
                <i className="ti ti-star-filled"></i>
                4.8
              </div>
            </div>
          </div>

          <div className="place-card">
            <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80" alt="Shiva Cave" />
            <div className="place-info">
              <div>
                <h3>Shiva Cave</h3>
                <p>5.1 km away</p>
              </div>
              <div className="rating">
                <i className="ti ti-star-filled"></i>
                4.6
              </div>
            </div>
          </div>

          <div className="place-card">
            <img src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1200&q=80" alt="Lakshmi Temple" />
            <div className="place-info">
              <div>
                <h3>Lakshmi Temple</h3>
                <p>6.0 km away</p>
              </div>
              <div className="rating">
                <i className="ti ti-star-filled"></i>
                4.8
              </div>
            </div>
          </div>
        </div>

        {renderBottomNav()}
      </div>
    );
  }

  if (activePage === "profile") {
    return (
      <div className="pilgrim-page">
        <div className="hero-section">
          <div className="hero-top">
            <div>
              <h1>My Profile</h1>
              <p>Everything about your pilgrim membership and travel history.</p>
            </div>
          </div>
        </div>

        <div className="pilgrim-content">
          <div className="profile-header">
            <div className="profile-avatar-large">R</div>
            <div>
              <h2>Rajesh Sharma</h2>
              <p className="text-muted">Premium Pilgrim • Member since 2024</p>
            </div>
            <div className="status-pill">Gold</div>
          </div>

          <div className="profile-grid">
            <div className="profile-stat">
              <span>5</span>
              <p>Bookings</p>
            </div>
            <div className="profile-stat">
              <span>12</span>
              <p>Visits</p>
            </div>
            <div className="profile-stat">
              <span>4</span>
              <p>Saved spots</p>
            </div>
          </div>

          <div className="profile-card">
            <h3>Contact Information</h3>
            <div className="profile-row">
              <div>
                <p className="text-muted">Email</p>
                <p>rajesh.sharma@example.com</p>
              </div>
              <div>
                <p className="text-muted">Phone</p>
                <p>+91 98765 43210</p>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3>Recent activity</h3>
            <div className="activity-item">
              <p><strong>Guide booked</strong> for 20 May pilgrimage</p>
              <span>Today</span>
            </div>
            <div className="activity-item">
              <p><strong>Accommodation reserved</strong> at stay near temple</p>
              <span>2 days ago</span>
            </div>
            <div className="activity-item">
              <p><strong>Temple visit planned</strong> for Rama Janma Bhoomi</p>
              <span>Last week</span>
            </div>
          </div>
        </div>

        {renderBottomNav()}
      </div>
    );
  }

  if (activePage === "payment") {
    return <PaymentIntegration setPage={setActivePage} />;
  }

  return (
    <div className="pilgrim-page">

      {/* HEADER */}
      <div className="hero-section">

        <div className="hero-top">

          <div>
            <h1>Namaste, Pilgrim! 🙏</h1>
            <p>Smart Spiritual Journey Companion</p>
          </div>

          <div className="hero-actions">
            <button className="hero-icon-btn">
              <i className="ti ti-bell"></i>
            </button>

            <div className="profile-avatar">
              P
            </div>
          </div>

        </div>

        {/* SEARCH */}
        <div className="hero-search">
          <i className="ti ti-search"></i>

          <input
            type="text"
            placeholder="Search temple, rooms, guides, transport"
          />
        </div>

      </div>

      {/* CONTENT */}
      <div className="pilgrim-content">

        {/* QUICK SERVICES */}
        <div className="section-title">
          Quick Services
        </div>

        <div className="services-grid">

          <div className="service-card" onClick={() => setActivePage("guide")}>
            <div className="service-icon blue">
              <i className="ti ti-user"></i>
            </div>
            <span>Book Guide</span>
          </div>

          <div className="service-card" onClick={() => setActivePage("vehicle")}>
            <div className="service-icon green">
              <i className="ti ti-car"></i>
            </div>
            <span>Book Vehicle</span>
          </div>

          <div className="service-card" onClick={() => setActivePage("accommodation")}>
            <div className="service-icon purple">
              <i className="ti ti-building"></i>
            </div>
            <span>Accommodation</span>
          </div>

     <div
  className="service-card"
  onClick={() => setActivePage("spots")}
>
  <div className="service-icon red">
    <i className="ti ti-map"></i>
  </div>

  <span>Tourist Spots</span>
</div>

          <div
  className="service-card"
  onClick={() => setActivePage("devotional")}
>
            <div className="service-icon orange">
              <i className="ti ti-music"></i>
            </div>
            <span>Devotional</span>
          </div>

          <div className="service-card" onClick={() => setActivePage("ai")}>
            <div className="service-icon violet">
              <i className="ti ti-robot"></i>
            </div>
            <span>AI Assistant</span>
          </div>

          <div className="service-card" onClick={() => setActivePage("payment")}>
            <div className="service-icon gold">
              <i className="ti ti-wallet"></i>
            </div>
            <span>Payments</span>
          </div>

          <div className="service-card">
            <div className="service-icon gray">
              <i className="ti ti-history"></i>
            </div>
            <span>History</span>
          </div>

        </div>

        {/* TEMPLE STATUS */}
        <div className="temple-card">

          <div className="temple-left">

            <div className="temple-title">
              <i className="ti ti-building-temple"></i>
              Rama Janma Bhoomi Temple
            </div>

            <div className="temple-info">
              <i className="ti ti-clock"></i>
              Open: 5:00 AM - 10:00 PM
            </div>

            <div className="temple-info">
              <i className="ti ti-users"></i>
              Crowd Status
            </div>

            <div className="temple-info">
              <i className="ti ti-cloud"></i>
              25°C, Clear Sky
            </div>

          </div>

          <div className="temple-right">

            <div className="status-badge open">
              Open Now
            </div>

            <div className="status-badge moderate">
              Moderate
            </div>

          </div>

        </div>

        {/* BOOKINGS */}
        <div className="section-row">

          <div className="section-title">
            Upcoming Bookings
          </div>

          <button className="view-all-btn">
            View All
          </button>

        </div>

        <div className="booking-card">

          <div className="booking-left">

            <div className="booking-icon">
              <i className="ti ti-user"></i>
            </div>

            <div>
              <h4>Tour Guide Booking</h4>

              <p>
                Rajesh Kumar - Tomorrow, 9:00 AM
              </p>
            </div>

          </div>

          <i className="ti ti-chevron-right"></i>

        </div>

        {/* RECOMMENDED */}
        <div className="section-title">
          Recommended Places
        </div>

        <div className="place-card">

          <img
            src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200"
            alt=""
          />

          <div className="place-info">

            <div>
              <h3>Rama Janma Bhoomi</h3>
              <p>2 km away</p>
            </div>

            <div className="rating">
              <i className="ti ti-star-filled"></i>
              4.9
            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM NAVBAR */}
      {renderBottomNav()}

    </div>
  );
}
