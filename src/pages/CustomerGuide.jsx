import React, { useState } from "react";
import "./styles/CustomerPages.css";

const guides = [
  {
    id: 1,
    name: "Priya Sharma",
    specialization: "Family Tours & Rituals",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    rating: 4.8,
    reviews: 189,
    experience: "10 years",
    price: 600,
    languages: ["Hindi", "English", "Gujarati"],
    groupSize: "1-15 people",
    desc: "Specialized in family pilgrimages and traditional rituals with patient and friendly approach.",
    available: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    specialization: "Temple History & Mythology",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
    rating: 4.9,
    reviews: 234,
    experience: "15 years",
    price: 500,
    languages: ["Hindi", "English", "Sanskrit"],
    groupSize: "1-10 people",
    desc: "Expert in Ramayana and ancient temple architecture with deep knowledge of spiritual practices.",
    available: true
  },
  {
    id: 3,
    name: "Amit Verma",
    specialization: "Photography Tours",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    rating: 4.7,
    reviews: 112,
    experience: "5 years",
    price: 800,
    languages: ["Hindi", "English", "Telugu"],
    groupSize: "1-8 people",
    desc: "Provides an amazing photography tour covering all scenic and historic spots.",
    available: false
  }
];

export default function CustomerGuide({ onBack }) {
  const tabs = ["All", "Hindi", "English", "Sanskrit", "Gujarati", "Tamil", "Bengali", "Telugu"];
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const openBookingModal = (item) => setSelectedItem(item);
  const closeBookingModal = () => setSelectedItem(null);

  const filteredData = guides.filter(item => {
    const matchesTab = activeTab === "All" || item.languages.includes(activeTab);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="customer-page">
      <div className="cp-header">
        <div className="cp-top">
          <button className="cp-back-btn" onClick={onBack}>
            <i className="ti ti-arrow-left"></i>
          </button>
          <div className="cp-title">
            <h1>Book a Guide</h1>
            <p>Find your spiritual companion</p>
          </div>
        </div>

        <div className="cp-search">
          <i className="ti ti-search"></i>
          <input 
            type="text" 
            placeholder="Search by name or specialization" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="cp-tabs">
          {tabs.map((tab) => (
            <button 
              key={tab} 
              className={`cp-tab pill ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="cp-content">
        <div className="cp-list-header">
          <span>{filteredData.length} guides available</span>
          <button className="cp-filter-btn">
            <i className="ti ti-filter"></i> Filters
          </button>
        </div>

        {filteredData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
            No guides found.
          </div>
        ) : (
          filteredData.map((item) => (
            <div className="cp-card" key={item.id}>
              <div className="cp-card-body">
                <div className="cp-card-top">
                  <div style={{ display: "flex", gap: "16px" }}>
                    <div style={{ position: "relative" }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: "80px", height: "80px", borderRadius: "12px", objectFit: "cover" }} 
                      />
                      {item.available && (
                        <span className="cp-tag green" style={{ position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
                          Available Today
                        </span>
                      )}
                    </div>
                    <div style={{ paddingTop: "4px" }}>
                      <div className="cp-card-title">{item.name}</div>
                      <div className="cp-card-subtitle" style={{ marginBottom: "8px" }}>{item.specialization}</div>
                      <div className="cp-amenities" style={{ marginBottom: "0" }}>
                        <span className="cp-amenity"><i className="ti ti-language"></i> {item.languages.join(", ")}</span>
                        <span className="cp-amenity"><i className="ti ti-users"></i> {item.groupSize}</span>
                      </div>
                    </div>
                  </div>
                  <div className="cp-card-rating">
                    <i className="ti ti-star-filled"></i> {item.rating}
                  </div>
                </div>

                <div className="cp-card-desc" style={{ marginTop: "24px" }}>
                  {item.desc}
                </div>

                <div className="cp-divider"></div>

                <div className="cp-stats-row">
                  <div className="cp-stat">
                    <div className="cp-stat-val">{item.experience}</div>
                    <div className="cp-stat-label">Experience</div>
                  </div>
                  <div className="cp-stat">
                    <div className="cp-stat-val">{item.reviews}</div>
                    <div className="cp-stat-label">Reviews</div>
                  </div>
                  <div className="cp-stat">
                    <div className="cp-stat-val" style={{ color: "#f57c00" }}>₹{item.price}/hr</div>
                    <div className="cp-stat-label">Price</div>
                  </div>
                </div>

                <div className="cp-actions" style={{ marginTop: "20px" }}>
                  <button className="cp-btn-outline">
                    <i className="ti ti-phone"></i> Call
                  </button>
                  <button className="cp-btn-primary" onClick={() => openBookingModal(item)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Booking Modal */}
      {selectedItem && (
        <div className="cp-modal-overlay">
          <div className="cp-modal-content">
            <div className="cp-modal-header">
              <div className="cp-modal-title">Book {selectedItem.name}</div>
              <button className="cp-modal-close" onClick={closeBookingModal}>
                <i className="ti ti-x"></i>
              </button>
            </div>
            <div className="cp-modal-body">
              <div className="cp-form-group">
                <label className="cp-form-label">Date</label>
                <input type="date" className="cp-form-input" />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Time</label>
                <input type="time" className="cp-form-input" />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Number of People</label>
                <input type="number" min="1" className="cp-form-input" placeholder="E.g. 2" />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Special Requests</label>
                <textarea className="cp-form-input" rows="3" placeholder="Any specific requirements..."></textarea>
              </div>
            </div>
            <div className="cp-modal-footer">
              <button className="cp-btn-outline" onClick={closeBookingModal}>Cancel</button>
              <button className="cp-btn-primary" onClick={() => {
                alert('Booking Confirmed!');
                closeBookingModal();
              }}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
