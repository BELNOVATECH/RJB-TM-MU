import { useEffect, useMemo, useState } from "react";
import "./styles/VahicleLoginDetails.css";

const PROFILE_KEY = "tourist_vehicle_profile";
const CURRENT_KEY = "tourist_vehicle_current";
const REQUESTS_KEY = "tourist_vehicle_rides";
const REGISTRY_KEY = "tourist_vehicle_registry";
const PLATFORM_FEE_PERCENT = 15;
const KM_PER_HOUR = 10;
const DIESEL_RATE_PER_KM = 8;

const DEFAULT_REQUESTS = [
  {
    id: 1,
    tourist: "Ananya Sharma",
    route: "Ram Janmabhoomi Temple -> Hanuman Garhi",
    time: "9:00 AM",
    date: "2026-05-18",
    passengers: "4 people",
    note: "Family pilgrimage with temple visit support.",
    hours: 8,
    distanceKm: 80,
    totalFare: 3200,
    paymentMode: "advance",
    advancePercent: 50,
    advanceAmount: 1600,
    balanceDue: 1600,
    platformCharge: 480,
    driverEarning: 2720,
    dieselCost: 640,
    otp: "4821",
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: 2,
    tourist: "Rohit Verma",
    route: "Ayodhya Station -> Saryu Ghat",
    time: "11:30 AM",
    date: "2026-05-18",
    passengers: "6 people",
    note: "Airport transfer with luggage assistance.",
    hours: 6,
    distanceKm: 60,
    totalFare: 2400,
    paymentMode: "advance",
    advancePercent: 50,
    advanceAmount: 1200,
    balanceDue: 1200,
    platformCharge: 360,
    driverEarning: 2040,
    dieselCost: 480,
    otp: "5734",
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    id: 3,
    tourist: "Meera Joshi",
    route: "Kanak Bhawan -> Nearby Heritage Trail",
    time: "4:15 PM",
    date: "2026-05-18",
    passengers: "2 people",
    note: "Short sightseeing trip with a return drop.",
    hours: 4,
    distanceKm: 40,
    totalFare: 1600,
    paymentMode: "full",
    advancePercent: 50,
    advanceAmount: 1600,
    balanceDue: 0,
    platformCharge: 240,
    driverEarning: 1360,
    dieselCost: 320,
    otp: "8942",
    status: "Accepted",
    paymentStatus: "Pending",
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
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item, index) => normalizeRide(item, index));
      }
    }
  } catch {
    return DEFAULT_REQUESTS.map((item, index) => normalizeRide(item, index));
  }
  return DEFAULT_REQUESTS.map((item, index) => normalizeRide(item, index));
}

function normalizeRide(ride, index = 0) {
  if (!ride) return null;

  const hours = Number(ride.hours) || 8;
  const distanceKm = Number(ride.distanceKm) || hours * KM_PER_HOUR;
  const totalFare =
    Number(ride.totalFare || ride.estimatedPrice || ride.fare) ||
    Math.max(1800, hours * 400);
  const advancePercent = Number(ride.advancePercent) || 50;
  const paymentMode = ride.paymentMode || "advance";
  const advanceAmount =
    Number(ride.advanceAmount) ||
    (paymentMode === "full" ? totalFare : Math.round(totalFare * (advancePercent / 100)));
  const balanceDue = Number(ride.balanceDue) || Math.max(totalFare - advanceAmount, 0);
  const platformCharge =
    Number(ride.platformCharge) || Math.round(totalFare * (PLATFORM_FEE_PERCENT / 100));
  const driverEarning =
    Number(ride.driverEarning) || Math.max(totalFare - platformCharge, 0);
  const dieselCost = Number(ride.dieselCost) || Math.round(distanceKm * DIESEL_RATE_PER_KM);

  return {
    id: ride.id || ride.rideId || index + 1,
    tourist: ride.tourist || ride.customerName || "Tourist Booking",
    route:
      ride.route ||
      `${ride.pickupLocation || "Pickup"} -> ${ride.dropLocation || "Drop"}`,
    time: ride.time || ride.pickupTime || "8:00 AM",
    date: ride.date || ride.travelDate || new Date().toISOString().slice(0, 10),
    passengers: ride.passengers || `${ride.persons || 2} people`,
    note: ride.note || ride.notes || "Tourist ride booking",
    hours,
    distanceKm,
    totalFare,
    platformCharge,
    driverEarning,
    dieselCost,
    paymentMode,
    advancePercent,
    advanceAmount,
    balanceDue,
    otp: ride.otp || String(4821 + index).slice(-4),
    status: ride.status || "Pending",
    paymentStatus:
      ride.paymentStatus || (ride.status === "Completed" ? "Settled" : "Pending"),
    driverName: ride.driverName || ride.driver || "Vehicle Service",
    vehicleName:
      ride.vehicleName || ride.vehicle || ride.vehicleNo || "Registered Vehicle",
  };
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
  const [otpInputs, setOtpInputs] = useState({});
  const [selectedPaymentRide, setSelectedPaymentRide] = useState(null);

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

  useEffect(() => {
    const syncRequests = () => setRequests(loadRequests());
    const handleStorage = (event) => {
      if (event.key === REQUESTS_KEY) {
        syncRequests();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncRequests);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncRequests);
    };
  }, []);

  const stats = useMemo(() => {
    const pending = requests.filter((item) => item.status === "Pending").length;
    const completed = requests.filter((item) => item.status === "Completed").length;
    const awaitingOtp = requests.filter((item) => item.status === "Accepted").length;

    return [
      { label: "Total Rides", value: requests.length },
      { label: "Pending", value: pending },
      { label: "Awaiting OTP", value: awaitingOtp },
      { label: "Completed", value: completed },
    ];
  }, [requests]);

  const latestRequest = requests[0] || null;

  const handleStatus = (id, status) => {
    setRequests((items) =>
      items.map((item) => {
        if (item.id !== id) return item;

        const next = { ...item, status };
        if (status === "Accepted") {
          next.paymentStatus =
            item.paymentMode === "full" ? "Payment Due" : "Advance Due";
        }
        if (status === "Rejected") {
          next.paymentStatus = "Rejected";
        }
        if (status === "Completed") {
          next.paymentStatus =
            item.paymentMode === "full" ? "Settled" : "Balance Due";
        }

        return next;
      })
    );
  };

  const handleOtpChange = (id, value) => {
    setOtpInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleStartRide = (item) => {
    const typedOtp = String(otpInputs[item.id] || "").trim();
    if (!typedOtp) {
      window.alert("Please enter the OTP shared by the customer.");
      return;
    }

    if (typedOtp !== String(item.otp)) {
      window.alert("OTP does not match. Please re-check with the customer.");
      return;
    }

    if (
      !["Paid", "Advance Paid", "Settled"].includes(item.paymentStatus || "")
    ) {
      window.alert("Please wait for the customer payment before starting the ride.");
      return;
    }

    setRequests((items) =>
      items.map((entry) =>
        entry.id === item.id
          ? { ...entry, status: "In Progress", paymentStatus: entry.paymentMode === "full" ? "Paid" : "Advance Paid" }
          : entry
      )
    );
  };

  const handleCompleteRide = (id) => {
    setRequests((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Completed",
              paymentStatus: item.paymentMode === "full" ? "Settled" : "Balance Due",
            }
          : item
      )
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

        <section className="vehicle-recent-card">
          <div className="vehicle-recent-head">
            <div>
              <div className="vehicle-recent-eyebrow">Recent booking</div>
              <h3>
                {latestRequest ? latestRequest.tourist : "No recent booking yet"}
              </h3>
              <p>
                {latestRequest
                  ? `${latestRequest.route} · ${latestRequest.date} · ${latestRequest.time}`
                  : "New vehicle bookings will appear here as soon as customers request a ride."}
              </p>
            </div>
            {latestRequest && (
              <span className={`vehicle-status ${latestRequest.status.toLowerCase()}`}>
                {latestRequest.status}
              </span>
            )}
          </div>

          {latestRequest && (
            <div className="vehicle-recent-grid">
              <div className="vehicle-recent-pill">
                <span>Tourist</span>
                <strong>{latestRequest.tourist}</strong>
              </div>
              <div className="vehicle-recent-pill">
                <span>Payment</span>
                <strong>
                  {latestRequest.paymentMode === "full" ? "Full Amount" : "Advance 50%"}
                </strong>
              </div>
              <div className="vehicle-recent-pill">
                <span>Advance / Balance</span>
                <strong>₹{latestRequest.advanceAmount} / ₹{latestRequest.balanceDue}</strong>
              </div>
              <div className="vehicle-recent-pill">
                <span>OTP</span>
                <strong>{latestRequest.otp}</strong>
              </div>
            </div>
          )}
        </section>

        <section className="vehicle-section">
          <div className="vehicle-section-head">
            <div>
              <h2>Incoming Rides</h2>
              <p>
                Customer bookings appear here. Accept a ride, verify the OTP, start the trip,
                and complete payment settlement after drop-off.
              </p>
            </div>
            <div className="vehicle-section-chip">Platform fee 15%</div>
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
                    <span>Tourist</span>
                    <strong>{item.tourist}</strong>
                  </div>
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
                    <span>Distance</span>
                    <strong>{item.distanceKm} km</strong>
                  </div>
                  <div className="vehicle-request-pill">
                    <span>Advance / Balance</span>
                    <strong>
                      ₹{item.advanceAmount} / ₹{item.balanceDue}
                    </strong>
                  </div>
                </div>

                <div className="vehicle-payment-grid">
                  <div className="vehicle-request-pill">
                    <span>Total Fare</span>
                    <strong>₹{item.totalFare}</strong>
                  </div>
                  <div className="vehicle-request-pill">
                    <span>Payment Mode</span>
                    <strong>
                      {item.paymentMode === "full" ? "Full Amount" : "Advance 50%"}
                    </strong>
                  </div>
                  <div className="vehicle-request-pill">
                    <span>Platform Charge</span>
                    <strong>₹{item.platformCharge}</strong>
                  </div>
                  <div className="vehicle-request-pill">
                    <span>Driver Earns</span>
                    <strong>₹{item.driverEarning}</strong>
                  </div>
                  <div className="vehicle-request-pill">
                    <span>Diesel Cost</span>
                    <strong>₹{item.dieselCost}</strong>
                  </div>
                </div>

                <div className="vehicle-otp-row">
                  <div className="vehicle-otp-label">
                    OTP verification <span>Customer shares this code with the driver</span>
                  </div>
                  <div className="vehicle-otp-shell">
                    <input
                      className="vehicle-otp-input"
                      value={otpInputs[item.id] || ""}
                      onChange={(e) => handleOtpChange(item.id, e.target.value)}
                      placeholder="Enter OTP"
                    />
                    <button
                      className="vehicle-action secondary"
                      onClick={() => setSelectedPaymentRide(item)}
                      type="button"
                    >
                      Payment Details
                    </button>
                  </div>
                </div>

                <div className="vehicle-request-actions">
                  {item.status === "Pending" && (
                    <>
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
                    </>
                  )}

                  {item.status === "Accepted" && (
                    <button
                      className="vehicle-action primary"
                      onClick={() => handleStartRide(item)}
                    >
                      Verify OTP & Start Ride
                    </button>
                  )}

                  {item.status === "In Progress" && (
                    <button
                      className="vehicle-action primary"
                      onClick={() => handleCompleteRide(item.id)}
                    >
                      Complete Ride
                    </button>
                  )}

                  {item.status === "Completed" && (
                    <div className="vehicle-payment-settled">Payment settled</div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {selectedPaymentRide && (
          <div className="vehicle-payment-overlay" onClick={() => setSelectedPaymentRide(null)}>
            <div className="vehicle-payment-modal" onClick={(e) => e.stopPropagation()}>
              <div className="vehicle-payment-modal-head">
                <div>
                  <div className="vehicle-payment-modal-eyebrow">Ride payment breakdown</div>
                  <h3>{selectedPaymentRide.tourist}</h3>
                  <p>{selectedPaymentRide.route}</p>
                </div>
                <button
                  className="vehicle-payment-close"
                  onClick={() => setSelectedPaymentRide(null)}
                  type="button"
                >
                  ×
                </button>
              </div>

              <div className="vehicle-payment-summary">
                <div>
                  <span>Total Fare</span>
                  <strong>₹{selectedPaymentRide.totalFare}</strong>
                </div>
                <div>
                  <span>Platform Charges 15%</span>
                  <strong>₹{selectedPaymentRide.platformCharge}</strong>
                </div>
                <div>
                  <span>Driver Receives</span>
                  <strong>₹{selectedPaymentRide.driverEarning}</strong>
                </div>
              </div>

              <div className="vehicle-payment-badges">
                <div>
                  <span>Distance Covered</span>
                  <strong>{selectedPaymentRide.distanceKm} km</strong>
                </div>
                <div>
                  <span>Diesel Cost</span>
                  <strong>₹{selectedPaymentRide.dieselCost}</strong>
                </div>
                <div>
                  <span>OTP</span>
                  <strong>{selectedPaymentRide.otp}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{selectedPaymentRide.paymentStatus}</strong>
                </div>
              </div>

              <div className="vehicle-payment-note">
                Once the ride is completed, the platform keeps 15% and the remaining 85% is
                allocated to the driver.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
