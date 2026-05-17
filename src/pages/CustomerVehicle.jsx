import React, { useState } from "react";
import "./styles/CustomerPages.css";

const vehicles = [
  {
    id: 1,
    name: "Toyota Innova Crysta",
    type: "SUV",
    driver: "Ramesh Kumar",
    experience: "15 yrs exp",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200",
    rating: 4.8,
    seats: "7 Seater",
    fuel: "Diesel",
    transmission: "Automatic",
    amenities: ["AC", "Music System", "GPS", "First Aid"],
    pricePerDay: 3500,
    pricePerKm: 15,
    available: true
  },
  {
    id: 2,
    name: "Maruti Suzuki Dzire",
    type: "Sedan",
    driver: "Suresh Das",
    experience: "8 yrs exp",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200",
    rating: 4.6,
    seats: "4 Seater",
    fuel: "Petrol",
    transmission: "Manual",
    amenities: ["AC", "Music System"],
    pricePerDay: 2000,
    pricePerKm: 10,
    available: true
  },
  {
    id: 3,
    name: "Force Traveller",
    type: "Mini Bus",
    driver: "Vikram Singh",
    experience: "12 yrs exp",
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1200",
    rating: 4.7,
    seats: "15 Seater",
    fuel: "Diesel",
    transmission: "Manual",
    amenities: ["AC", "Music System", "Pushback Seats", "First Aid"],
    pricePerDay: 6000,
    pricePerKm: 22,
    available: false
  }
];

export default function CustomerVehicle({ onBack }) {
  const tabs = ["All", "Sedan", "SUV", "MUV", "Mini Bus", "Luxury Van"];
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const openBookingModal = (item) => setSelectedItem(item);
  const closeBookingModal = () => setSelectedItem(null);

  const filteredData = vehicles.filter(item => {
    const matchesTab = activeTab === "All" || item.type === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.type.toLowerCase().includes(searchQuery.toLowerCase());
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
            <h1>Book a Vehicle</h1>
            <p>Comfortable rides for your journey</p>
          </div>
        </div>

        <div className="cp-search">
          <i className="ti ti-search"></i>
          <input 
            type="text" 
            placeholder="Search by vehicle name or type" 
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
          <span>{filteredData.length} vehicles available</span>
          <button className="cp-filter-btn">
            <i className="ti ti-filter"></i> Filters
          </button>
        </div>

        {filteredData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
            No vehicles found.
          </div>
        ) : (
          filteredData.map((item) => (
            <div className="cp-card" key={item.id}>
              <div className="cp-card-img" style={{ height: "220px" }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
                <div className="cp-card-tags">
                  {item.available && <span className="cp-tag green">Available</span>}
                  <span className="cp-tag">{item.type}</span>
                </div>
              </div>

              <div className="cp-card-body">
                <div className="cp-card-top">
                  <div>
                    <div className="cp-card-title">{item.name}</div>
                    <div className="cp-card-subtitle">{item.driver} ({item.experience})</div>
                  </div>
                  <div className="cp-card-rating">
                    <i className="ti ti-star-filled"></i> {item.rating}
                  </div>
                </div>

                <div className="cp-amenities" style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "16px", marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", fontSize: "14px", color: "#6b7280" }}>
                    <i className="ti ti-users"></i> {item.seats}
                  </div>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", fontSize: "14px", color: "#6b7280" }}>
                    <i className="ti ti-gas-station"></i> {item.fuel}
                  </div>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", fontSize: "14px", color: "#6b7280" }}>
                    <i className="ti ti-settings"></i> {item.transmission}
                  </div>
                </div>

                <div className="cp-amenities">
                  {item.amenities.map(amenity => (
                    <span className="cp-amenity" key={amenity}>{amenity}</span>
                  ))}
                </div>

                <div className="cp-stats-row" style={{ textAlign: "left", marginTop: "20px" }}>
                  <div className="cp-stat" style={{ flex: 1 }}>
                    <div className="cp-stat-label">Per Day</div>
                    <div className="cp-stat-val" style={{ color: "#f57c00", fontSize: "18px" }}>₹{item.pricePerDay}</div>
                  </div>
                  <div className="cp-stat" style={{ flex: 1 }}>
                    <div className="cp-stat-label">Per Kilometer</div>
                    <div className="cp-stat-val" style={{ color: "#f57c00", fontSize: "18px" }}>₹{item.pricePerKm}</div>
                  </div>
                </div>

                <div className="cp-actions" style={{ marginTop: "20px" }}>
                  <button className="cp-btn-primary" onClick={() => openBookingModal(item)}>
                    Book Vehicle
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
                <label className="cp-form-label">Pickup Location</label>
                <input type="text" className="cp-form-input" placeholder="Enter pickup address" />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Pickup Date</label>
                <input type="date" className="cp-form-input" />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Pickup Time</label>
                <input type="time" className="cp-form-input" />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Number of Days</label>
                <input type="number" min="1" className="cp-form-input" placeholder="E.g. 1" />
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
