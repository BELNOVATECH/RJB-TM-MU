import "./styles/Customer_dashboard.css";
import GuideBooking from "./BookGuide";
import { useState } from "react";
export default function PilgrimHome() {

  const [page, setPage] = useState("home");

  if (page === "guide") {
    return (
      <GuideBooking
        onBack={() => setPage("home")}
      />
    );
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

          <div
  className="service-card"
  onClick={() => setPage("guide")}
>
             <div className="service-icon blue">
    <i className="ti ti-user"></i>
  </div>

  <span>Book Guide</span>
</div>

          <div className="service-card">
            <div className="service-icon green">
              <i className="ti ti-car"></i>
            </div>

            <span>Book Vehicle</span>
          </div>

          <div className="service-card">
            <div className="service-icon purple">
              <i className="ti ti-building"></i>
            </div>

            <span>Accommodation</span>
          </div>

          <div className="service-card">
            <div className="service-icon red">
              <i className="ti ti-map"></i>
            </div>

            <span>Tourist Spots</span>
          </div>

          <div className="service-card">
            <div className="service-icon orange">
              <i className="ti ti-music"></i>
            </div>

            <span>Devotional</span>
          </div>

          <div className="service-card">
            <div className="service-icon violet">
              <i className="ti ti-robot"></i>
            </div>

            <span>AI Assistant</span>
          </div>

          <div className="service-card">
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
      <div className="bottom-navbar">

        <button className="bottom-nav-item active">
          <i className="ti ti-home"></i>
          <span>Home</span>
        </button>

        <button className="bottom-nav-item">
          <i className="ti ti-calendar"></i>
          <span>Bookings</span>
        </button>

        <button className="bottom-nav-item">
          <i className="ti ti-robot"></i>
          <span>AI Assistant</span>
        </button>

        <button className="bottom-nav-item">
          <i className="ti ti-map-pin"></i>
          <span>Explore</span>
        </button>

        <button className="bottom-nav-item">
          <i className="ti ti-user"></i>
          <span>Profile</span>
        </button>

      </div>

    </div>
  );
}