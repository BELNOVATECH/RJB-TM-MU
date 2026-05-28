import React, { useState } from "react";
import "./styles/CustomerPages.css";

const WORKING_HOURS_PER_DAY = 16;
const PASSENGER_FILTERS = [
  { label: "Any", value: "" },
  { label: "1-2 people", value: "2" },
  { label: "3-4 people", value: "4" },
  { label: "5-7 people", value: "7" },
  { label: "8+ people", value: "12" }
];
const VEHICLE_CLASS_FILTERS = ["All", "Standard", "Luxury"];
const BOOKING_HOUR_OPTIONS = [2, 4, 6, 8, 10, 12, 16];

const vehicles = [

  {
    id: 1,
    name: "Toyota Innova Crysta",
    type: "SUV",
    vehicleClass: "Luxury",
    capacity: 7,
    driver: "Ramesh Kumar",
    experience: "15 yrs exp",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200",
    rating: 4.8,
    seats: "7 Seater",
    fuel: "Diesel",
    transmission: "Automatic",
    amenities: [
      "AC",
      "Music System",
      "GPS",
      "First Aid"
    ],
    pricePerDay: 3500,
    pricePerKm: 15,
    available: true
  },

  {
    id: 2,
    name: "Maruti Suzuki Dzire",
    type: "Sedan",
    vehicleClass: "Standard",
    capacity: 4,
    driver: "Suresh Das",
    experience: "8 yrs exp",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200",
    rating: 4.6,
    seats: "4 Seater",
    fuel: "Petrol",
    transmission: "Manual",
    amenities: [
      "AC",
      "Music System"
    ],
    pricePerDay: 2000,
    pricePerKm: 10,
    available: true
  },

  {
    id: 3,
    name: "Force Traveller",
    type: "Mini Bus",
    vehicleClass: "Standard",
    capacity: 15,
    driver: "Vikram Singh",
    experience: "12 yrs exp",
    image:
      "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1200",
    rating: 4.7,
    seats: "15 Seater",
    fuel: "Diesel",
    transmission: "Manual",
    amenities: [
      "AC",
      "Music System",
      "Pushback Seats",
      "First Aid"
    ],
    pricePerDay: 6000,
    pricePerKm: 22,
    available: false
  },
];

const PROFILE_KEY = "tourist_vehicle_profile";
const REGISTRY_KEY = "tourist_vehicle_registry";

function mapRegisteredVehicle(profile) {
  if (!profile) return null;

  return {
    id: `reg-${profile.vehicleNo || profile.reg || "vehicle"}`,
    name: profile.model?.split("·")[0]?.trim() || profile.vehicleNo || "Registered Vehicle",
    type: profile.type || "SUV",
    vehicleClass: profile.type === "Mini Bus" ? "Standard" : "Luxury",
    capacity: Number(profile.capacity) || 4,
    driver: profile.driverName || profile.role || "Vehicle Service",
    experience: `${profile.year || "2024"} registered`,
    image:
      profile.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200",
    rating: 4.8,
    seats: `${profile.capacity || "4"} Seater`,
    fuel: "Diesel",
    transmission: "Manual",
    amenities: ["Registered", "GPS", "First Aid"],
    pricePerDay: Math.max(1800, Number(profile.capacity || 4) * 450),
    pricePerKm: 14,
    available: (profile.status || "Available") !== "Maintenance",
  };
}

function loadRegisteredVehicles() {
  try {
    const registryRaw = localStorage.getItem(REGISTRY_KEY);
    if (registryRaw) {
      const registry = JSON.parse(registryRaw);
      if (Array.isArray(registry)) {
        return registry.map(mapRegisteredVehicle).filter(Boolean);
      }
    }

    const singleProfile = localStorage.getItem(PROFILE_KEY);
    if (singleProfile) {
      const mapped = mapRegisteredVehicle(JSON.parse(singleProfile));
      return mapped ? [mapped] : [];
    }
  } catch {
    return [];
  }

  return [];
}

export default function CustomerVehicle({ onBack }) {
  const tabs = ["All", "Sedan", "SUV", "MUV", "Mini Bus", "Luxury Van"];
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    persons: "",
    vehicleClass: "All",
    hours: "8"
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    pickupLocation: "",
    dropLocation: "",
    travelDate: "",
    pickupTime: "",
    persons: "2",
    vehicleClass: "Standard",
    hours: "8",
    luggage: "0",
    notes: ""
  });
  const registeredVehicles = loadRegisteredVehicles();
  const allVehicles = [...registeredVehicles, ...vehicles].filter(
    (item, index, list) => index === list.findIndex((other) => other.id === item.id)
  );

  const openBookingModal = (item) => {
    setSelectedItem(item);
    setBookingForm({
      pickupLocation: "",
      dropLocation: "",
      travelDate: "",
      pickupTime: "",
      persons: String(Math.min(item.capacity || 4, 4)),
      vehicleClass: item.vehicleClass || "Standard",
      hours: filters.hours || "8",
      luggage: "0",
      notes: ""
    });
  };

  const closeBookingModal = () => setSelectedItem(null);

  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const updateBookingForm = (field, value) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
  };

  const getHourlyRate = (item) => {
    const baseRate = item.pricePerDay / WORKING_HOURS_PER_DAY;
    return item.vehicleClass === "Luxury"
      ? Math.round(baseRate * 1.25)
      : Math.round(baseRate);
  };

  const getEstimatedPrice = (item, hours) => {
    const bookingHours = Math.max(1, Math.min(Number(hours) || 1, WORKING_HOURS_PER_DAY));
    return getHourlyRate(item) * bookingHours;
  };

  const getComplimentaryKm = (hours) => {
    const bookingHours = Math.max(1, Math.min(Number(hours) || 1, WORKING_HOURS_PER_DAY));
    return bookingHours * 10;
  };

  const filteredData = allVehicles.filter((item) => {
    const matchesTab = activeTab === "All" || item.type === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPersons = !filters.persons || item.capacity >= Number(filters.persons);
    const matchesClass = filters.vehicleClass === "All" || item.vehicleClass === filters.vehicleClass;
    return matchesTab && matchesSearch && matchesPersons && matchesClass;
  });

  const canConfirm =
    !!selectedItem &&
    bookingForm.pickupLocation.trim() &&
    bookingForm.dropLocation.trim() &&
    bookingForm.travelDate &&
    bookingForm.pickupTime;

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
        </div>

        <div className="cp-booking-filters">
          <div className="cp-filter-item">
            <label className="cp-filter-label">Persons</label>
            <select
              className="cp-filter-select"
              value={filters.persons}
              onChange={(e) => updateFilter("persons", e.target.value)}
            >
              {PASSENGER_FILTERS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="cp-filter-item">
            <label className="cp-filter-label">Vehicle Class</label>
            <select
              className="cp-filter-select"
              value={filters.vehicleClass}
              onChange={(e) => updateFilter("vehicleClass", e.target.value)}
            >
              {VEHICLE_CLASS_FILTERS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="cp-filter-item">
            <label className="cp-filter-label">Booking Hours</label>
            <select
              className="cp-filter-select"
              value={filters.hours}
              onChange={(e) => updateFilter("hours", e.target.value)}
            >
              {BOOKING_HOUR_OPTIONS.map((hours) => (
                <option key={hours} value={hours}>
                  {hours} hrs
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="cp-vehicle-grid">
          {filteredData.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#6b7280", gridColumn: "1 / -1" }}>
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
                    <div className="cp-card-subtitle">
                      {item.driver} ({item.experience})
                    </div>
                  </div>
                  <div className="cp-card-rating">
                    <i className="ti ti-star-filled"></i> {item.rating}
                  </div>
                </div>

                <div
                  className="cp-amenities"
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    paddingBottom: "16px",
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
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
                  {item.amenities.map((amenity) => (
                    <span className="cp-amenity" key={amenity}>
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="cp-stats-row" style={{ textAlign: "left", marginTop: "20px" }}>
                  <div className="cp-stat" style={{ flex: 1 }}>
                    <div className="cp-stat-label">Per Hour</div>
                    <div className="cp-stat-val" style={{ color: "#f57c00", fontSize: "18px" }}>
                      ₹{getHourlyRate(item)}
                    </div>
                  </div>
                  <div className="cp-stat" style={{ flex: 1 }}>
                    <div className="cp-stat-label">16 Hour Day</div>
                    <div className="cp-stat-val" style={{ color: "#f57c00", fontSize: "18px" }}>
                      ₹{item.pricePerDay}
                    </div>
                  </div>
                </div>

                <div className="cp-price-notes">
                  <div className="cp-price-note">
                    Estimated for {filters.hours} hrs: <strong>₹{getEstimatedPrice(item, filters.hours)}</strong>
                  </div>

                  <div className="cp-price-note cp-price-note-soft">
                    Complimentary distance: <strong>{getComplimentaryKm(filters.hours)} km</strong> free
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
      </div>

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
              <div className="cp-price-summary">
                <div>
                  <span>Estimated Price</span>
                  <strong>₹{getEstimatedPrice(selectedItem, bookingForm.hours)}</strong>
                </div>
                <div>
                  <span>Operating Window</span>
                  <strong>{WORKING_HOURS_PER_DAY} hrs/day</strong>
                </div>
                <div>
                  <span>Complimentary Km</span>
                  <strong>{getComplimentaryKm(bookingForm.hours)} km</strong>
                </div>
              </div>

              <div className="cp-form-group">
                <label className="cp-form-label">Pickup Location</label>
                <input
                  type="text"
                  className="cp-form-input"
                  placeholder="Enter pickup address"
                  value={bookingForm.pickupLocation}
                  onChange={(e) => updateBookingForm("pickupLocation", e.target.value)}
                />
              </div>

              <div className="cp-form-group">
                <label className="cp-form-label">Drop Location</label>
                <input
                  type="text"
                  className="cp-form-input"
                  placeholder="Enter drop address"
                  value={bookingForm.dropLocation}
                  onChange={(e) => updateBookingForm("dropLocation", e.target.value)}
                />
              </div>

              <div className="cp-modal-grid">
                <div className="cp-form-group">
                  <label className="cp-form-label">Pickup Date</label>
                  <input
                    type="date"
                    className="cp-form-input"
                    value={bookingForm.travelDate}
                    onChange={(e) => updateBookingForm("travelDate", e.target.value)}
                  />
                </div>

                <div className="cp-form-group">
                  <label className="cp-form-label">Pickup Time</label>
                  <input
                    type="time"
                    className="cp-form-input"
                    value={bookingForm.pickupTime}
                    onChange={(e) => updateBookingForm("pickupTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="cp-modal-grid">
                <div className="cp-form-group">
                  <label className="cp-form-label">Persons Traveling</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedItem.capacity}
                    className="cp-form-input"
                    value={bookingForm.persons}
                    onChange={(e) => updateBookingForm("persons", e.target.value)}
                  />
                </div>

                <div className="cp-form-group">
                  <label className="cp-form-label">Vehicle Class</label>
                  <select
                    className="cp-form-input"
                    value={bookingForm.vehicleClass}
                    onChange={(e) => updateBookingForm("vehicleClass", e.target.value)}
                  >
                    {VEHICLE_CLASS_FILTERS.filter((option) => option !== "All").map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="cp-modal-grid">
                <div className="cp-form-group">
                  <label className="cp-form-label">Trip Duration</label>
                  <select
                    className="cp-form-input"
                    value={bookingForm.hours}
                    onChange={(e) => updateBookingForm("hours", e.target.value)}
                  >
                    {BOOKING_HOUR_OPTIONS.map((hours) => (
                      <option key={hours} value={hours}>
                        {hours} hrs
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cp-form-group">
                  <label className="cp-form-label">Luggage Bags</label>
                  <input
                    type="number"
                    min="0"
                    className="cp-form-input"
                    placeholder="E.g. 2"
                    value={bookingForm.luggage}
                    onChange={(e) => updateBookingForm("luggage", e.target.value)}
                  />
                </div>
              </div>

              <div className="cp-form-group">
                <label className="cp-form-label">Special Notes</label>
                <textarea
                  className="cp-form-input cp-form-textarea"
                  rows="3"
                  placeholder="Child seat, extra luggage, stopovers, etc."
                  value={bookingForm.notes}
                  onChange={(e) => updateBookingForm("notes", e.target.value)}
                />
              </div>
            </div>

            <div className="cp-modal-footer">
              <button className="cp-btn-outline" onClick={closeBookingModal}>
                Cancel
              </button>
              <button
                className="cp-btn-primary"
                disabled={!canConfirm}
                onClick={() => {
                  alert(`Booking confirmed! Estimated fare: ₹${getEstimatedPrice(selectedItem, bookingForm.hours)}`);
                  closeBookingModal();
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
