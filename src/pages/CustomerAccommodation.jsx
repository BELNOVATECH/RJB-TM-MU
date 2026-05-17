import React, { useState } from "react";
import "./styles/CustomerPages.css";

const accommodations = [
  {
    id: 1,
    name: "Spiritual Guest House",
    type: "Guest House",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    rating: 4.8,
    reviews: 234,
    distance: "0.5 km",
    desc: "Peaceful accommodation with spiritual ambiance, perfect for pilgrims seeking comfort and tranquility.",
    amenities: ["Free WiFi", "AC Rooms", "Restaurant", "24/7 Water", "Prayer Room", "+1 more"],
    rooms: [
      { name: "Standard", price: 1200, left: 5 },
      { name: "Deluxe", price: 1800, left: 3 },
      { name: "Family Suite", price: 3000, left: 2 }
    ]
  },
  {
    id: 2,
    name: "Rama Darshan Hotel",
    type: "Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    rating: 4.5,
    reviews: 156,
    distance: "1.2 km",
    desc: "Modern hotel providing all basic amenities with a beautiful view of the temple.",
    amenities: ["Free WiFi", "AC Rooms", "Room Service", "Parking"],
    rooms: [
      { name: "Standard", price: 1500, left: 10 },
      { name: "Premium", price: 2500, left: 4 }
    ]
  },
  {
    id: 3,
    name: "Sita Ram Dharamshala",
    type: "Dharamshala",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200",
    rating: 4.2,
    reviews: 420,
    distance: "0.2 km",
    desc: "Traditional stay with free meals provided daily. Very close to the main temple complex.",
    amenities: ["Free Meals", "Locker", "Shared Bathroom", "24/7 Water"],
    rooms: [
      { name: "Dormitory", price: 200, left: 15 },
      { name: "Private Room", price: 500, left: 5 }
    ]
  }
];

export default function CustomerAccommodation({ onBack }) {
  const tabs = ["All", "Hotel", "Guest House", "Dharamshala", "Cottage"];
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const openBookingModal = (item) => setSelectedItem(item);
  const closeBookingModal = () => setSelectedItem(null);

  const filteredData = accommodations.filter(item => {
    const matchesTab = activeTab === "All" || item.type === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.distance.toLowerCase().includes(searchQuery.toLowerCase());
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
            <h1>Book Accommodation</h1>
            <p>Find your spiritual home away from home</p>
          </div>
        </div>

        <div className="cp-search">
          <i className="ti ti-search"></i>
          <input
            type="text"
            placeholder="Search by name or location"
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
          <span>{filteredData.length} properties available</span>
          <button className="cp-filter-btn">
            <i className="ti ti-filter"></i> Filters
          </button>
        </div>

        {filteredData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
            No accommodations found.
          </div>
        ) : (
          filteredData.map((item) => (
            <div className="cp-card" key={item.id}>
              <div className="cp-card-img">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="cp-card-tags">
                  <span className="cp-tag" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <i className="ti ti-star-filled" style={{ color: "#facc15" }}></i> {item.rating} <span style={{ color: "#9ca3af", fontWeight: 400 }}>({item.reviews})</span>
                  </span>
                  <span className="cp-tag">{item.type}</span>
                </div>
              </div>

              <div className="cp-card-body">
                <div className="cp-card-title">
                  {item.name}
                </div>

                <div className="cp-card-subtitle">
                  <i className="ti ti-map-pin"></i> {item.distance} from temple
                </div>

                <div className="cp-card-desc">
                  {item.desc}
                </div>

                <div className="cp-amenities">
                  {item.amenities.map(amenity => (
                    <span className="cp-amenity" key={amenity}>{amenity}</span>
                  ))}
                </div>

                <div className="cp-room-section">
                  <div className="cp-room-header">Room Types & Pricing</div>

                  {item.rooms.map(room => (
                    <div className="cp-room-item" key={room.name}>
                      <div className="cp-room-name">
                        <i className="ti ti-bed"></i> {room.name}
                      </div>
                      <div className="cp-room-price">
                        ₹{room.price}/night <span className="cp-room-left">{room.left} left</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", marginBottom: "16px" }}>
                  <span>Check-in: 12:00 PM</span>
                  <span>Check-out: 11:00 AM</span>
                </div>

                <div className="cp-actions">
                  <button className="cp-btn-outline">
                    <i className="ti ti-phone"></i> Contact
                  </button>
                  <button className="cp-btn-primary" onClick={() => openBookingModal(item)}>
                    Book Room
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
              <div className="cp-modal-title">Book Room at {selectedItem.name}</div>
              <button className="cp-modal-close" onClick={closeBookingModal}>
                <i className="ti ti-x"></i>
              </button>
            </div>
            <div className="cp-modal-body">
              <div className="cp-form-group">
                <label className="cp-form-label">Select Room</label>
                <select className="cp-form-input">
                  {selectedItem.rooms.map(room => (
                    <option key={room.name} value={room.name}>{room.name} - ₹{room.price}/night</option>
                  ))}
                </select>
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Check-in Date</label>
                <input type="date" className="cp-form-input" />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Check-out Date</label>
                <input type="date" className="cp-form-input" />
              </div>
              <div className="cp-form-group">
                <label className="cp-form-label">Guests</label>
                <input type="number" min="1" className="cp-form-input" placeholder="E.g. 2" />
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
