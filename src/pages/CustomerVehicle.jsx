import React, { useEffect, useState } from "react";
import "./styles/CustomerPages.css";

const WORKING_HOURS_PER_DAY = 16;
const ADVANCE_PERCENT = 50;
const PLATFORM_FEE_PERCENT = 15;
const KM_PER_HOUR = 10;
const DIESEL_RATE_PER_KM = 8;
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
const RIDES_KEY = "tourist_vehicle_rides";

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

function makeRideReference() {
  return `RIDE-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    Math.random() * 900 + 100
  )}`;
}

function makeOtp() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function calcRideSummary(item, hours) {
  const bookingHours = Math.max(1, Math.min(Number(hours) || 1, WORKING_HOURS_PER_DAY));
  const hourlyRate = Math.round(
    (Number(item.pricePerDay) || 0) / WORKING_HOURS_PER_DAY
  );
  const estimatedPrice = hourlyRate * bookingHours;
  const advanceAmount = Math.round(estimatedPrice * (ADVANCE_PERCENT / 100));
  const distanceKm = bookingHours * KM_PER_HOUR;
  const dieselCost = Math.round(distanceKm * DIESEL_RATE_PER_KM);
  const platformCharge = Math.round(estimatedPrice * (PLATFORM_FEE_PERCENT / 100));
  const driverPayout = estimatedPrice - platformCharge;

  return {
    bookingHours,
    estimatedPrice,
    advanceAmount,
    balanceDue: Math.max(estimatedPrice - advanceAmount, 0),
    distanceKm,
    dieselCost,
    platformCharge,
    driverPayout,
  };
}

function persistRide(ride) {
  try {
    const raw = localStorage.getItem(RIDES_KEY);
    const current = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(current) ? current : [];
    const next = [ride, ...list.filter((item) => item.rideId !== ride.rideId)];
    localStorage.setItem(RIDES_KEY, JSON.stringify(next));
  } catch {
    // Keep booking flow working even if storage is blocked.
  }
}

function loadRides() {
  try {
    const raw = localStorage.getItem(RIDES_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function updateRideStore(rideId, updater) {
  const raw = localStorage.getItem(RIDES_KEY);
  const current = raw ? JSON.parse(raw) : [];
  const list = Array.isArray(current) ? current : [];
  const next = list.map((item) => (item.rideId === rideId ? updater(item) : item));
  localStorage.setItem(RIDES_KEY, JSON.stringify(next));
  return next;
}

function getBookingStatusMeta(ride) {
  const status = ride?.status || "Pending";
  const paymentStatus = ride?.paymentStatus || "Pending";
  const isAdvanceMode = ride?.paymentMode !== "full";
  const paymentIsDue = paymentStatus === "Pending" || paymentStatus.includes("Due");

  if (status === "Accepted" && paymentIsDue) {
    return {
      label: "Driver Confirmed",
      note: "The driver has accepted your ride. Please complete payment to continue.",
      tone: "accepted",
    };
  }

  if (status === "Accepted") {
    return {
      label: "Driver Confirmed",
      note:
        paymentStatus === "Paid" || paymentStatus === "Advance Paid"
          ? "Payment received. Keep the OTP ready for pickup."
          : "The driver has accepted your ride. Keep the OTP ready for pickup.",
      tone: "accepted",
    };
  }

  if (status === "In Progress") {
    return {
      label: "Ride Started",
      note: "Your ride is in progress after OTP verification.",
      tone: "progress",
    };
  }

  if (status === "Completed" && isAdvanceMode && paymentStatus !== "Settled") {
    return {
      label: "Ride Completed",
      note: "Your ride is complete. Please pay the remaining balance to settle the booking.",
      tone: "completed",
    };
  }

  if (status === "Completed") {
    return {
      label: "Completed",
      note: "The ride has been completed and payment has been settled.",
      tone: "completed",
    };
  }

  if (status === "Rejected") {
    return {
      label: "Rejected",
      note: "The driver could not take this ride. Please book another vehicle.",
      tone: "rejected",
    };
  }

  return {
    label: "Pending",
    note: "Waiting for the driver to confirm this booking.",
    tone: "pending",
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
  const [bookingReceipt, setBookingReceipt] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    touristName: "",
    pickupLocation: "",
    dropLocation: "",
    travelDate: "",
    pickupTime: "",
    persons: "2",
    vehicleClass: "Standard",
    hours: "8",
    luggage: "0",
    paymentMode: "advance",
    notes: ""
  });
  const registeredVehicles = loadRegisteredVehicles();
  const allVehicles = [...registeredVehicles, ...vehicles].filter(
    (item, index, list) => index === list.findIndex((other) => other.id === item.id)
  );

  useEffect(() => {
    const syncBookings = () => setMyBookings(loadRides());
    syncBookings();

    const handleStorage = (event) => {
      if (event.key === RIDES_KEY) {
        syncBookings();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncBookings);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncBookings);
    };
  }, []);

  const openBookingModal = (item) => {
    setSelectedItem(item);
    setBookingReceipt(null);
    setBookingForm({
      touristName: "",
      pickupLocation: "",
      dropLocation: "",
      travelDate: "",
      pickupTime: "",
      persons: String(Math.min(item.capacity || 4, 4)),
      vehicleClass: item.vehicleClass || "Standard",
      hours: filters.hours || "8",
      luggage: "0",
      paymentMode: "advance",
      notes: ""
    });
  };

  const closeBookingModal = () => {
    setSelectedItem(null);
    setBookingReceipt(null);
  };

  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const updateBookingForm = (field, value) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowMyBookings(false);
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

  const sortedBookings = [...myBookings].sort((a, b) => {
    const right = new Date(b.createdAt || 0).getTime();
    const left = new Date(a.createdAt || 0).getTime();
    return right - left;
  });

  const handleCustomerPayment = (ride) => {
    const isFullPayment = ride.paymentMode === "full";
    const updatedStatus =
      ride.status === "Completed"
        ? "Settled"
        : isFullPayment
          ? "Paid"
          : "Advance Paid";

    const next = updateRideStore(ride.rideId, (item) => ({
      ...item,
      paymentStatus: updatedStatus,
      balanceDue: isFullPayment ? 0 : item.balanceDue,
    }));

    setMyBookings(next);
    setBookingReceipt((prev) =>
      prev && prev.rideId === ride.rideId
        ? { ...prev, paymentStatus: updatedStatus, balanceDue: isFullPayment ? 0 : prev.balanceDue }
        : prev
    );
  };

  const canConfirm =
    !!selectedItem &&
    bookingForm.touristName.trim() &&
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
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="cp-content">
        <div className="cp-list-header">
          <span>{filteredData.length} vehicles available</span>
          <button
            className={`cp-bookings-toggle ${showMyBookings ? "active" : ""}`}
            onClick={() => setShowMyBookings((value) => !value)}
            type="button"
          >
            My Bookings
          </button>
        </div>

        {!showMyBookings && (
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
        )}

        {showMyBookings && (
        <section className="cp-bookings-section">
          <div className="cp-bookings-head">
            <div>
              <h2>Your Bookings</h2>
              <p>
                Track driver confirmation, ride progress, and payment updates from one place.
              </p>
            </div>
            <div className="cp-bookings-badge">{sortedBookings.length} rides</div>
          </div>

          {sortedBookings.length === 0 ? (
            <div className="cp-bookings-empty">
              Your confirmed and pending rides will appear here after booking a vehicle.
            </div>
          ) : (
            <div className="cp-bookings-list">
              {sortedBookings.map((ride) => {
                const statusMeta = getBookingStatusMeta(ride);
                const isPaymentDue =
                  ride.paymentStatus === "Pending" ||
                  String(ride.paymentStatus || "").includes("Due");
                const paymentLabel =
                  ride.status === "Completed" &&
                  ride.paymentMode !== "full" &&
                  ride.paymentStatus !== "Settled"
                    ? `Remaining due ₹${ride.balanceDue}`
                    : isPaymentDue
                      ? ride.paymentMode === "full"
                        ? `Full amount due ₹${ride.advanceAmount}`
                        : `Advance due ₹${ride.advanceAmount}`
                      : ride.paymentMode === "full"
                        ? "Full amount paid"
                        : "Advance paid";
                const showPayAdvance =
                  ride.status === "Accepted" &&
                  !["Paid", "Advance Paid", "Settled"].includes(ride.paymentStatus || "");
                const showPayRemaining =
                  ride.status === "Completed" &&
                  ride.paymentMode !== "full" &&
                  ride.paymentStatus !== "Settled";

                return (
                  <article key={ride.rideId} className="cp-booking-card">
                    <div className="cp-booking-top">
                      <div>
                        <div className="cp-booking-title">{ride.vehicleName}</div>
                        <div className="cp-booking-route">
                          {ride.pickupLocation} → {ride.dropLocation}
                        </div>
                      </div>
                      <span className={`cp-booking-status ${statusMeta.tone}`}>
                        {statusMeta.label}
                      </span>
                    </div>

                    <div className="cp-booking-note">{statusMeta.note}</div>

                    <div className="cp-booking-grid cp-booking-grid-primary">
                      <div className="cp-booking-cell">
                        <span>Tourist</span>
                        <strong>{ride.touristName || ride.customerName || "-"}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Travel Date</span>
                        <strong>{ride.travelDate || "-"}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Pickup Time</span>
                        <strong>{ride.pickupTime || "-"}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Payment Mode</span>
                        <strong>{ride.paymentMode === "full" ? "Full Amount" : "Advance 50%"}</strong>
                      </div>
                    </div>

                    <div className="cp-booking-grid cp-booking-grid-secondary">
                      <div className="cp-booking-cell">
                        <span>Ride Ref</span>
                        <strong>{ride.rideId}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Pay Now</span>
                        <strong>₹{ride.advanceAmount}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Remaining</span>
                        <strong>₹{ride.balanceDue}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Distance</span>
                        <strong>{ride.distanceKm} km</strong>
                      </div>
                    </div>

                    <div className="cp-booking-footer">
                      <span className="cp-booking-chip">{paymentLabel}</span>
                      <span className="cp-booking-chip">Driver: {ride.driverName || "-"}</span>
                      {showPayAdvance && (
                        <button
                          type="button"
                          className="cp-booking-pay-btn"
                          onClick={() => handleCustomerPayment(ride)}
                        >
                          Pay {ride.paymentMode === "full" ? "Now" : "Advance"}
                        </button>
                      )}
                      {showPayRemaining && (
                        <button
                          type="button"
                          className="cp-booking-pay-btn"
                          onClick={() => handleCustomerPayment(ride)}
                        >
                          Pay Remaining
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        )}

        {!showMyBookings && (
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
        )}

        {false && (
        <section className="cp-bookings-section">
          <div className="cp-bookings-head">
            <div>
              <h2>Your Bookings</h2>
              <p>
                Track driver confirmation, ride progress, and payment updates from one place.
              </p>
            </div>
            <div className="cp-bookings-badge">{sortedBookings.length} rides</div>
          </div>

          {sortedBookings.length === 0 ? (
            <div className="cp-bookings-empty">
              Your confirmed and pending rides will appear here after booking a vehicle.
            </div>
          ) : (
            <div className="cp-bookings-list">
              {sortedBookings.map((ride) => {
                const statusMeta = getBookingStatusMeta(ride);
                const isPaymentDue =
                  ride.paymentStatus === "Pending" ||
                  String(ride.paymentStatus || "").includes("Due");
                const paymentLabel =
                  ride.status === "Completed" &&
                  ride.paymentMode !== "full" &&
                  ride.paymentStatus !== "Settled"
                    ? `Remaining due ₹${ride.balanceDue}`
                    : isPaymentDue
                      ? ride.paymentMode === "full"
                        ? `Full amount due ₹${ride.advanceAmount}`
                        : `Advance due ₹${ride.advanceAmount}`
                      : ride.paymentMode === "full"
                        ? "Full amount paid"
                        : "Advance paid";
                const showPayAdvance =
                  ride.status === "Accepted" &&
                  !["Paid", "Advance Paid", "Settled"].includes(ride.paymentStatus || "");
                const showPayRemaining =
                  ride.status === "Completed" &&
                  ride.paymentMode !== "full" &&
                  ride.paymentStatus !== "Settled";

                return (
                  <article key={ride.rideId} className="cp-booking-card">
                    <div className="cp-booking-top">
                      <div>
                        <div className="cp-booking-title">{ride.vehicleName}</div>
                        <div className="cp-booking-route">
                          {ride.pickupLocation} → {ride.dropLocation}
                        </div>
                      </div>
                      <span className={`cp-booking-status ${statusMeta.tone}`}>
                        {statusMeta.label}
                      </span>
                    </div>

                    <div className="cp-booking-note">{statusMeta.note}</div>

                    <div className="cp-booking-grid">
                      <div className="cp-booking-cell">
                        <span>Tourist</span>
                        <strong>{ride.touristName || ride.customerName || "-"}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Travel Date</span>
                        <strong>{ride.travelDate || "-"}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Pickup Time</span>
                        <strong>{ride.pickupTime || "-"}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Payment Mode</span>
                        <strong>{ride.paymentMode === "full" ? "Full Amount" : "Advance 50%"}</strong>
                      </div>
                    </div>

                    <div className="cp-booking-grid cp-booking-grid-secondary">
                      <div className="cp-booking-cell">
                        <span>Ride Ref</span>
                        <strong>{ride.rideId}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Pay Now</span>
                        <strong>₹{ride.advanceAmount}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Remaining</span>
                        <strong>₹{ride.balanceDue}</strong>
                      </div>
                      <div className="cp-booking-cell">
                        <span>Distance</span>
                        <strong>{ride.distanceKm} km</strong>
                      </div>
                    </div>

                    <div className="cp-booking-footer">
                      <span className="cp-booking-chip">{paymentLabel}</span>
                      <span className="cp-booking-chip">Driver: {ride.driverName || "-"}</span>
                      {showPayAdvance && (
                        <button
                          type="button"
                          className="cp-booking-pay-btn"
                          onClick={() => handleCustomerPayment(ride)}
                        >
                          Pay {ride.paymentMode === "full" ? "Now" : "Advance"}
                        </button>
                      )}
                      {showPayRemaining && (
                        <button
                          type="button"
                          className="cp-booking-pay-btn"
                          onClick={() => handleCustomerPayment(ride)}
                        >
                          Pay Remaining
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        )}
      </div>

      {selectedItem && !bookingReceipt && (
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
                  <span>Pay Now</span>
                  <strong>
                    ₹
                    {bookingForm.paymentMode === "full"
                      ? getEstimatedPrice(selectedItem, bookingForm.hours)
                      : Math.round(getEstimatedPrice(selectedItem, bookingForm.hours) * (ADVANCE_PERCENT / 100))}
                  </strong>
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
                <label className="cp-form-label">Tourist Name</label>
                <input
                  type="text"
                  className="cp-form-input"
                  placeholder="Enter tourist name"
                  value={bookingForm.touristName}
                  onChange={(e) => updateBookingForm("touristName", e.target.value)}
                />
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

              <div className="cp-modal-grid">
                <div className="cp-form-group">
                  <label className="cp-form-label">Payment Mode</label>
                  <select
                    className="cp-form-input"
                    value={bookingForm.paymentMode}
                    onChange={(e) => updateBookingForm("paymentMode", e.target.value)}
                  >
                    <option value="advance">Advance 50%</option>
                    <option value="full">Full Amount</option>
                  </select>
                </div>

                <div className="cp-form-group">
                  <label className="cp-form-label">Amount To Pay Now</label>
                  <input
                    type="text"
                    className="cp-form-input"
                    readOnly
                    value={`₹${
                      bookingForm.paymentMode === "full"
                        ? getEstimatedPrice(selectedItem, bookingForm.hours)
                        : Math.round(getEstimatedPrice(selectedItem, bookingForm.hours) * (ADVANCE_PERCENT / 100))
                    }`}
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
                  const summary = calcRideSummary(selectedItem, bookingForm.hours);
                  const ride = {
                    rideId: makeRideReference(),
                    vehicleId: selectedItem.id,
                    vehicleName: selectedItem.name,
                    vehicleType: selectedItem.type,
                    driverName: selectedItem.driver,
                    customerName: bookingForm.touristName.trim(),
                    touristName: bookingForm.touristName.trim(),
                    pickupLocation: bookingForm.pickupLocation.trim(),
                    dropLocation: bookingForm.dropLocation.trim(),
                    travelDate: bookingForm.travelDate,
                    pickupTime: bookingForm.pickupTime,
                    persons: bookingForm.persons,
                    vehicleClass: bookingForm.vehicleClass,
                    hours: bookingForm.hours,
                    luggage: bookingForm.luggage,
                    notes: bookingForm.notes.trim(),
                    paymentMode: bookingForm.paymentMode,
                    advancePercent: ADVANCE_PERCENT,
                    advanceAmount:
                      bookingForm.paymentMode === "full"
                        ? summary.estimatedPrice
                        : summary.advanceAmount,
                    balanceDue:
                      bookingForm.paymentMode === "full"
                        ? 0
                        : summary.balanceDue,
                    otp: makeOtp(),
                    status: "Pending",
                    paymentStatus: "Pending",
                    totalFare: summary.estimatedPrice,
                    distanceKm: summary.distanceKm,
                    dieselCost: summary.dieselCost,
                    // platformCharge: summary.platformCharge,
                    driverEarning: summary.driverPayout,
                    createdAt: new Date().toISOString(),
                  };

                  persistRide(ride);
                  setMyBookings((prev) => [
                    ride,
                    ...prev.filter((item) => item.rideId !== ride.rideId),
                  ]);
                  setBookingReceipt(ride);
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingReceipt && selectedItem && (
        <div className="cp-modal-overlay">
          <div className="cp-modal-content">
            <div className="cp-modal-header">
              <div className="cp-modal-title">Ride Confirmed</div>
              <button className="cp-modal-close" onClick={closeBookingModal}>
                <i className="ti ti-x"></i>
              </button>
            </div>

            <div className="cp-modal-body">
              <div
                style={{
                  border: "1px solid #fed7aa",
                  background: "#fffaf1",
                  borderRadius: "14px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#9a3412", marginBottom: "6px" }}>
                  Share this OTP with the driver to begin the ride
                </div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#1f1f1f" }}>
                  OTP: {bookingReceipt.otp}
                </div>
                <div style={{ color: "#7c2d12", marginTop: "4px", fontSize: "13px" }}>
                  Booking reference: {bookingReceipt.rideId}
                </div>
              </div>

              <div className="cp-price-summary">
                <div>
                  <span>Total Fare</span>
                  <strong>₹{bookingReceipt.totalFare}</strong>
                </div>
                <div>
                  <span>Pay Now</span>
                  <strong>₹{bookingReceipt.advanceAmount}</strong>
                </div>
                <div>
                  <span>Remaining Balance</span>
                  <strong>₹{bookingReceipt.balanceDue}</strong>
                </div>
                <div>
                  <span>Payment Mode</span>
                  <strong>{bookingReceipt.paymentMode === "full" ? "Full Amount" : "Advance 50%"}</strong>
                </div>
              </div>

              <div className="cp-price-notes">
                <div className="cp-price-note">
                  Distance covered: <strong>{bookingReceipt.distanceKm} km</strong>
                </div>
                <div className="cp-price-note cp-price-note-soft">
                  Diesel cost estimate: <strong>₹{bookingReceipt.dieselCost}</strong>
                </div>
              </div>

              <div
                style={{
                  marginTop: "14px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  color: "#334155",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                Ride status is now <strong>Pending</strong>. The driver will accept the request,
                then you will complete the selected payment amount, share the OTP, start the ride,
                and finally settle the remaining balance after drop-off if required.
              </div>
            </div>

            <div className="cp-modal-footer">
              <button className="cp-btn-primary" onClick={closeBookingModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


