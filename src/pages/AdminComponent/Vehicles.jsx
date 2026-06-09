import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/Vehicles.css";
 
const INITIAL_FLEET = [
  { reg: "UP-32 AB 1234", model: "Toyota Innova · 2022", type: "SUV", typeCls: "badge-blue", driver: "Ram Prasad", capacity: "7 pax", status: "On Trip", statusCls: "badge-green" },
  { reg: "UP-32 CD 5678", model: "Maruti Dzire · 2023", type: "Sedan", typeCls: "badge-gold", driver: "Suresh Yadav", capacity: "4 pax", status: "Available", statusCls: "badge-green" },
  { reg: "UP-32 EF 9012", model: "Force Traveller · 2021", type: "Mini Bus", typeCls: "badge-purple", driver: "Ganesh Tiwari", capacity: "14 pax", status: "On Trip", statusCls: "badge-green" },
];
 const DRIVERS_DATA = [
  {
    name: "Ram Prasad",
    phone: "+91 9876543210",
    vehicle: "UP-32 AB 1234",
    status: "On Duty",
  },
  {
    name: "Suresh Yadav",
    phone: "+91 9876543211",
    vehicle: "UP-32 CD 5678",
    status: "Available",
  },
  {
    name: "Ganesh Tiwari",
    phone: "+91 9876543212",
    vehicle: "UP-32 EF 9012",
    status: "On Trip",
  },
];

const BOOKINGS_DATA = [
  {
    bookingId: "BK101",
    customer: "Ramesh Sharma",
    vehicle: "Toyota Innova",
    date: "14 May 2026",
    status: "Confirmed",
  },
  {
    bookingId: "BK102",
    customer: "Priya Singh",
    vehicle: "Mini Bus",
    date: "15 May 2026",
    status: "Pending",
  },
];

const TRACKING_DATA = [
  {
    vehicle: "UP-32 AB 1234",
    location: "Ayodhya",
    speed: "65 km/h",
    status: "Moving",
  },
  {
    vehicle: "UP-32 EF 9012",
    location: "Lucknow",
    speed: "0 km/h",
    status: "Stopped",
  },
];
const FLEET_BY_TYPE = [
  { label: "Cars/Sedans", count: 18, color: "#f5c842", pct: 82 },
  { label: "SUV/Innova", count: 14, color: "#b5860d", pct: 64 },
  { label: "Auto / EV", count: 22, color: "#3b82f6", pct: 100 },
  { label: "Mini Bus", count: 6, color: "#c0392b", pct: 27 },
  { label: "Luxury", count: 4, color: "#6d28d9", pct: 18 },
];
 
const ALERTS = [
  { dot: "#c0392b", text: "UP-32 IJ 7890 — permit expires 17 May", sub: "3 days left" },
  { dot: "#f5c842", text: "UP-32 KL 1122 — insurance due 28 May", sub: "14 days left" },
  { dot: "#f5c842", text: "UP-32 MN 3344 — PUC due 31 May", sub: "17 days left" },
];
 
const TABS = ["All Vehicles", "Drivers", "Bookings", "Tracking", "Payment Details"];
const TYPE_OPTIONS = ["SUV", "Sedan", "Mini Bus", "Auto", "EV", "Luxury"];
const STATUS_OPTIONS = ["Available", "On Trip", "Maintenance", "Permit Due"];
 
const TYPE_CLS_MAP = {
  SUV: "badge-blue",
  Sedan: "badge-gold",
  "Mini Bus": "badge-purple",
  Auto: "badge-amber",
  EV: "badge-green",
  Luxury: "badge-purple",
};
 
const STATUS_CLS_MAP = {
  Available: "badge-green",
  "On Trip": "badge-green",
  Maintenance: "badge-red",
  "Permit Due": "badge-red",
};

const PROFILE_KEY = "tourist_vehicle_profile";
const REGISTRY_KEY = "tourist_vehicle_registry";
const RIDE_KEY = "tourist_vehicle_rides";
const PLATFORM_FEE_PERCENT = 15;
const DIESEL_RATE_PER_KM = 8;
const KM_PER_HOUR = 10;

function mapRegisteredVehicle(profile) {
  if (!profile) return null;

  return {
    reg: profile.vehicleNo || profile.reg || "REG-NEW",
    model: `${profile.model || "Registered Vehicle"} Â· ${profile.year || "2024"}`,
    type: profile.type || "SUV",
    typeCls: TYPE_CLS_MAP[profile.type] || "badge-blue",
    driver: profile.driverName || profile.role || "Vehicle Service",
    capacity: `${profile.capacity || "4"} pax`,
    status: profile.status || "Available",
    statusCls: STATUS_CLS_MAP[profile.status] || "badge-green",
  };
}

function loadFleetData() {
  try {
    const rawRegistry = localStorage.getItem(REGISTRY_KEY);
    const registry = rawRegistry ? JSON.parse(rawRegistry) : null;
    const registeredItems = Array.isArray(registry)
      ? registry.map(mapRegisteredVehicle).filter(Boolean)
      : [];

    if (registeredItems.length > 0) {
      return [
        ...registeredItems,
        ...INITIAL_FLEET.filter(
          (vehicle) => !registeredItems.some((item) => item.reg === vehicle.reg)
        ),
      ];
    }

    const rawProfile = localStorage.getItem(PROFILE_KEY);
    if (rawProfile) {
      const mapped = mapRegisteredVehicle(JSON.parse(rawProfile));
      if (mapped) {
        return [
          mapped,
          ...INITIAL_FLEET.filter((vehicle) => vehicle.reg !== mapped.reg),
        ];
      }
    }
  } catch {
    return INITIAL_FLEET;
  }

  return INITIAL_FLEET;
}

function loadRegisteredRows() {
  try {
    const rawRegistry = localStorage.getItem(REGISTRY_KEY);
    const registry = rawRegistry ? JSON.parse(rawRegistry) : null;
    const source = Array.isArray(registry)
      ? registry
      : localStorage.getItem(PROFILE_KEY)
        ? [JSON.parse(localStorage.getItem(PROFILE_KEY))]
        : [];

    const mapped = source
      .filter(Boolean)
      .map((profile, index) => {
        const reg = profile.vehicleNo || profile.reg;
        const model = profile.model || "Registered Vehicle";
        const type = profile.type || "SUV";
        const status = profile.status || "Available";
        const baseVehicle = {
          reg: reg || `REG-${index + 1}`,
          model: `${model} · ${profile.year || "2024"}`,
          type,
          typeCls: TYPE_CLS_MAP[type] || "badge-blue",
          driver: profile.driverName || profile.role || "Vehicle Service",
          capacity: `${profile.capacity || "4"} pax`,
          status,
          statusCls: STATUS_CLS_MAP[status] || "badge-green",
        };

        return {
          driverRow: {
            name: profile.driverName || profile.role || "Vehicle Service",
            phone: profile.phone || `+91 ${String(index + 1).padStart(10, "0")}`,
            vehicle: reg || "Registered Vehicle",
            status: status === "Maintenance" ? "On Break" : "Available",
          },
          bookingRow: {
            bookingId: `RB-${String(index + 1).padStart(3, "0")}`,
            customer: "Registered Vehicle",
            vehicle: model,
            date: profile.year || "2024",
            status: status === "Maintenance" ? "Pending" : "Confirmed",
          },
          trackingRow: {
            vehicle: reg || "Registered Vehicle",
            location: profile.type || "Ayodhya",
            speed: status === "On Trip" ? "Moving" : "0 km/h",
            status: status === "On Trip" ? "Moving" : "Stopped",
          },
          fleetRow: baseVehicle,
        };
      });

    return {
      fleetRows: mapped.map((item) => item.fleetRow),
      driverRows: mapped.map((item) => item.driverRow),
      bookingRows: mapped.map((item) => item.bookingRow),
      trackingRows: mapped.map((item) => item.trackingRow),
    };
  } catch {
    return {
      fleetRows: [],
      driverRows: [],
      bookingRows: [],
      trackingRows: [],
    };
  }
}

function loadRidePayments() {
  try {
    const raw = localStorage.getItem(RIDE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list)) return [];

    return list.map((ride, index) => {
      const hours = Number(ride.hours) || 8;
      const distanceKm = Number(ride.distanceKm) || hours * KM_PER_HOUR;
      const totalFare =
        Number(ride.totalFare || ride.estimatedPrice || ride.fare) ||
        Math.max(1800, hours * 400);
      const platformCharge =
        Number(ride.platformCharge) ||
        Math.round(totalFare * (PLATFORM_FEE_PERCENT / 100));
      const driverEarning =
        Number(ride.driverEarning) || Math.max(totalFare - platformCharge, 0);
      const dieselCost = Number(ride.dieselCost) || Math.round(distanceKm * DIESEL_RATE_PER_KM);

      return {
        id: ride.id || ride.rideId || `ride-${index + 1}`,
        rideId: ride.rideId || ride.id || `ride-${index + 1}`,
        driverName: ride.driverName || ride.driver || "Vehicle Service",
        vehicle: ride.vehicleNo || ride.vehicleName || ride.vehicle || "Registered Vehicle",
        tourist: ride.tourist || ride.customerName || "Tourist Booking",
        route:
          ride.route ||
          `${ride.pickupLocation || "Pickup"} -> ${ride.dropLocation || "Drop"}`,
        date: ride.date || ride.travelDate || "-",
        time: ride.time || ride.pickupTime || "-",
        status: ride.status || "Pending",
        paymentStatus:
          ride.paymentStatus || (ride.status === "Completed" ? "Settled" : "Pending"),
        paymentMode: ride.paymentMode || "advance",
        advancePercent: Number(ride.advancePercent) || 50,
        advanceAmount:
          Number(ride.advanceAmount) ||
          Math.round(totalFare * 0.5),
        balanceDue:
          Number(ride.balanceDue) ||
          Math.max(totalFare - Math.round(totalFare * 0.5), 0),
        distanceKm,
        totalFare,
        platformCharge,
        driverEarning,
        dieselCost,
        otp: ride.otp || "----",
      };
    });
  } catch {
    return [];
  }
}
 
const EMPTY_FORM = {
  reg: "",
  vehicleName: "",
  year: "",
  type: "SUV",
  driver: "",
  capacity: "",
  status: "Available",
};
 
// ── ADD VEHICLE MODAL (rendered via Portal into document.body) ──
function AddVehicleModal({
  onClose,
  onSave,
  editData,
  isEdit,
}) {
  const [form, setForm] = useState(
  editData
    ? {
        reg: editData.reg || "",
        vehicleName:
          editData.model?.split("·")[0]?.trim() || "",
        year:
          editData.model?.split("·")[1]?.trim() || "",
        type: editData.type || "SUV",
        driver: editData.driver || "",
        capacity:
          editData.capacity?.replace(" pax", "") || "",
        status: editData.status || "Available",
      }
    : EMPTY_FORM
);
  const [errors, setErrors] = useState({});
 
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };
 
  const validate = () => {
    const errs = {};
    if (!form.reg.trim()) errs.reg = "Registration number is required";
    if (!form.vehicleName.trim()) errs.vehicleName = "Vehicle name is required";
    if (!form.year.trim()) errs.year = "Year is required";
    else if (!/^\d{4}$/.test(form.year.trim())) errs.year = "Enter a valid 4-digit year";
    if (!form.driver.trim()) errs.driver = "Driver name is required";
    if (!form.capacity.trim()) errs.capacity = "Capacity is required";
    return errs;
  };
 
  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSave({
      reg: form.reg.trim().toUpperCase(),
      model: `${form.vehicleName.trim()} · ${form.year.trim()}`,
      type: form.type,
      typeCls: TYPE_CLS_MAP[form.type] || "badge-blue",
      driver: form.driver.trim(),
      capacity: `${form.capacity.trim()} pax`,
      status: form.status,
      statusCls: STATUS_CLS_MAP[form.status] || "badge-green",
    });
  };
 
 


 
  const modal = (
   <div className="vehicle-modal-overlay"
      onMouseDown={onClose}
    >
      <div className="vehicle-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="vehicle-modal-header">
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>
              {isEdit ? "✏️ Edit Vehicle" : "🚗 Add New Vehicle"}
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>
              {isEdit
  ? "Update vehicle details"
  : "Fill in all details to register the vehicle"}
            </div>
          </div>
          <button
  onClick={onClose}
  className="vehicle-close-btn"
>
            ×
          </button>
        </div>
 
        {/* Divider */}
        <div className="vehicle-divider" />
 
        {/* Form Fields */}
        <div className="vehicle-form-grid">
 
          {/* Registration Number — full width */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="vehicle-label">Registration Number *</label>
            <input
              name="reg"
              value={form.reg}
              onChange={handleChange}
              placeholder="e.g. UP-32 AB 1234"
              autoComplete="off"
              className={`vehicle-input ${errors.reg ? "vehicle-input-error" : ""}`}
            />
            {errors.reg && <div className="vehicle-error">{errors.reg}</div>}
          </div>
 
          {/* Vehicle Name */}
          <div>
            <label className="vehicle-label">Vehicle Name *</label>
            <input
              name="vehicleName"
              value={form.vehicleName}
              onChange={handleChange}
              placeholder="e.g. Toyota Innova"
              autoComplete="off"
             className={`vehicle-input ${errors.vehicleName ? "vehicle-input-error" : ""}`}
            />
            {errors.vehicleName && <div className="vehicle-error">{errors.vehicleName}</div>}
          </div>
 
          {/* Year */}
          <div>
            <label className="vehicle-label">Year *</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="e.g. 2024"
              maxLength={4}
              autoComplete="off"
              className={`vehicle-input ${errors.year ? "vehicle-input-error" : ""}`}
            />
            {errors.year && <div className="vehicle-error">{errors.year}</div>}
          </div>
 
          {/* Type */}
          <div>
            <label className="vehicle-label">Vehicle Type *</label>
            <select className="vehicle-input" name="type" value={form.type} onChange={handleChange}>
              {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
 
          {/* Status */}
          <div>
            <label className="vehicle-label">Status *</label>
            <select className="vehicle-input" name="status" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
 
          {/* Driver Name */}
          <div>
            <label className="vehicle-label">Driver Name *</label>
            <input
              name="driver"
              value={form.driver}
              onChange={handleChange}
              placeholder="e.g. Ramesh Kumar"
              autoComplete="off"
              className={`vehicle-input ${errors.driver ? "vehicle-input-error" : ""}`}
            />
            {errors.driver && <div className="vehicle-error">{errors.driver}</div>}
          </div>
 
          {/* Capacity */}
          <div>
            <label className="vehicle-label">Capacity (passengers) *</label>
            <input
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="e.g. 7"
              type="number"
              min={1}
              className={`vehicle-input ${errors.capacity ? "vehicle-input-error" : ""}`}
            />
            {errors.capacity && <div className="vehicle-error">{errors.capacity}</div>}
          </div>
 
        </div>
 
        {/* Divider */}
       <div className="vehicle-divider vehicle-divider-footer" />
 
        {/* Footer Buttons */}
        <div className="vehicle-modal-footer">
          <button
  onClick={onClose}
  className="vehicle-cancel-btn"
>
            Cancel
          </button>
          <button
  onClick={handleSave}
  className="vehicle-save-btn"
>
            {isEdit ? "💾 Update Vehicle" : "💾 Save Vehicle"}
          </button>
        </div>
      </div>
    </div>
  );
 
  // ✅ Portal: renders directly into document.body
  // This escapes any parent overflow:hidden / transform / z-index stacking traps
  return createPortal(modal, document.body);
}
 function DriverEditModal({
  onClose,
  editData,
}) {

  const [form, setForm] = useState({
    name: editData?.name || "",
    phone: editData?.phone || "",
    vehicle: editData?.vehicle || "",
    status: editData?.status || "",
  });

  return createPortal(

    <div
      className="common-modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="common-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >

        <div className="common-modal-header">

          <div>
            <h2>Edit Driver</h2>
            <p>Update driver details</p>
          </div>

          <button
            className="common-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="common-divider" />

        <div className="common-grid">

          <div>
            <label>Driver Name</label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Phone Number</label>

            <input
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Vehicle</label>

            <input
              value={form.vehicle}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Status</label>

            <input
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="common-divider common-divider-footer" />

        <div className="common-footer">

          <button
            className="common-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="common-save-btn"
          >
            Update Driver
          </button>

        </div>

      </div>

    </div>,

    document.body
  );
}
function BookingEditModal({
  onClose,
  editData,
}) {

  const [form] = useState({
    bookingId: editData?.bookingId || "",
    customer: editData?.customer || "",
    vehicle: editData?.vehicle || "",
    date: editData?.date || "",
    status: editData?.status || "",
  });

  return createPortal(

    <div
      className="common-modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="common-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >

        <div className="common-modal-header">

          <div>
            <h2>Edit Booking</h2>
            <p>Update booking details</p>
          </div>

          <button
            className="common-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="common-divider" />

        <div className="common-grid">

          <div>
            <label>Booking ID</label>
            <input value={form.bookingId} />
          </div>

          <div>
            <label>Customer</label>
            <input value={form.customer} />
          </div>

          <div>
            <label>Vehicle</label>
            <input value={form.vehicle} />
          </div>

          <div>
            <label>Date</label>
            <input value={form.date} />
          </div>

          <div>
            <label>Status</label>
            <input value={form.status} />
          </div>

        </div>

        <div className="common-divider common-divider-footer" />

        <div className="common-footer">

          <button
            className="common-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="common-save-btn">
            Update Booking
          </button>

        </div>

      </div>

    </div>,

    document.body
  );
}
function TrackingEditModal({
  onClose,
  editData,
}) {

  const [form] = useState({
    vehicle: editData?.vehicle || "",
    location: editData?.location || "",
    speed: editData?.speed || "",
    status: editData?.status || "",
  });

  return createPortal(

    <div
      className="common-modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="common-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >

        <div className="common-modal-header">

          <div>
            <h2>Edit Tracking</h2>
            <p>Update tracking details</p>
          </div>

          <button
            className="common-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="common-divider" />

        <div className="common-grid">

          <div>
            <label>Vehicle</label>
            <input value={form.vehicle} />
          </div>

          <div>
            <label>Location</label>
            <input value={form.location} />
          </div>

          <div>
            <label>Speed</label>
            <input value={form.speed} />
          </div>

          <div>
            <label>Status</label>
            <input value={form.status} />
          </div>

        </div>

        <div className="common-divider common-divider-footer" />

        <div className="common-footer">

          <button
            className="common-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="common-save-btn">
            Update Tracking
          </button>

        </div>

      </div>

    </div>,

    document.body
  );
}
// ── MAIN PAGE ──
export default function Vehicles() {
  const [activeTab, setActiveTab] = useState(0);
  const [editType, setEditType] = useState("");
  const [fleet, setFleet] = useState(() => loadFleetData());
  const registeredRows = loadRegisteredRows();
  const [driversData, setDriversData] = useState([
    ...registeredRows.driverRows,
    ...DRIVERS_DATA,
  ]);

  const [bookingsData, setBookingsData] = useState([
    ...registeredRows.bookingRows,
    ...BOOKINGS_DATA,
  ]);

  const [trackingData, setTrackingData] = useState([
    ...registeredRows.trackingRows,
    ...TRACKING_DATA,
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ridePayments, setRidePayments] = useState(() => loadRidePayments());

  useEffect(() => {
    const syncPayments = () => setRidePayments(loadRidePayments());
    syncPayments();

    const handleStorage = (event) => {
      if (event.key === RIDE_KEY) {
        syncPayments();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncPayments);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncPayments);
    };
  }, []);
 
const handleSave = (vehicleData) => {

  if (editVehicle !== null) {

    const updatedFleet = [...fleet];

    updatedFleet[editIndex] = vehicleData;

    setFleet(updatedFleet);

  } else {

    setFleet((prev) => [vehicleData, ...prev]);

  }

  setEditVehicle(null);
  setEditIndex(null);
  setShowModal(false);
};
  const handleDelete = (reg) => {
  setFleet((prev) =>
    prev.filter((v) => v.reg !== reg)
  );
};
const handleDeleteDriver = (phone) => {
  setDriversData((prev) =>
    prev.filter((d) => d.phone !== phone)
  );
};

const handleDeleteBooking = (bookingId) => {
  setBookingsData((prev) =>
    prev.filter((b) => b.bookingId !== bookingId)
  );
};

const handleDeleteTracking = (vehicle) => {
  setTrackingData((prev) =>
    prev.filter((t) => t.vehicle !== vehicle)
  );
};

const handleEdit = (data, index, type) => {
  setEditVehicle(data);
  setEditIndex(index);
  setEditType(type);
  setShowModal(true);
};
 const filteredFleet = fleet.filter((v) =>
  v.reg.toLowerCase().includes(searchTerm.toLowerCase()) ||
  v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
  v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
  v.model.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredDrivers = driversData.filter((d) =>
  d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  d.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
  d.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredBookings = bookingsData.filter((b) =>
  b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
  b.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredTracking = trackingData.filter((t) =>
  t.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
  t.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
  t.status.toLowerCase().includes(searchTerm.toLowerCase())
);
 
  return (
    <div className="vehicle-page">
      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef9c3" }}>
            <i className="ti ti-car" style={{ color: "#b5860d" }} />
          </div>
          <div className="kpi-label">Total Fleet</div>
          <div className="kpi-value">{fleet.length}</div>
          <div className="kpi-sub" style={{ color: "#16a34a" }}>
            <i className="ti ti-check" style={{ fontSize: 10 }} /> 48 active today
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-user-check" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Drivers on Duty</div>
          <div className="kpi-value">
  {
    fleet.filter(
      (v) =>
        v.status === "Available" ||
        v.status === "On Trip"
    ).length
  }
</div>
          <div className="kpi-sub" style={{ color: "#f5c842" }}>7 on break</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-calendar-check" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Bookings Today</div>
          <div className="kpi-value">128</div>
          <div className="kpi-sub">
            <i className="ti ti-trending-up" style={{ fontSize: 10 }} /> +18% vs yesterday
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-alert-triangle" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Permit Expiring</div>
          <div className="kpi-value">
  {
    fleet.filter(
      (v) => v.status === "Permit Due"
    ).length
  }
</div>
          <div className="kpi-sub" style={{ color: "#b91c1c" }}>Action required</div>
        </div>
      </div>
 
     {/* Tab bar */}
<div className="top-nav vehicle-top-nav">

  <div className="tab-bar" style={{ marginBottom: 0 }}>
    {TABS.map((t, i) => (
      <button
        key={t}
        className={`tab-pill ${activeTab === i ? "active" : ""}`}
        onClick={() => setActiveTab(i)}
      >
        {t}
      </button>
    ))}
  </div>


{/* Search + Add BELOW tabs */}
<div className="search-upload-wrap vehicle-action-row">
         <div className="search-box vehicle-search-wrap">
  <i className="ti ti-search" style={{ fontSize: 13, color: "#888" }} />

  <input
    type="text"
    placeholder="Search vehicle / driver..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      border: "none",
      outline: "none",
      fontSize: 12,
      background: "transparent",
      width: "100%",
      minWidth: 0,
      flex: 1,
    }}
  />
</div>
 
          {/* ✅ Add Vehicle button */}
          <button
            className="btn-primary"
            type="button"
      onClick={() => {
  setEditVehicle(null);
  setEditIndex(null);
  setEditType("vehicle");
  setShowModal(true);
}}
          >
            <i className="ti ti-plus" /> Add Vehicle
          </button>
        </div>
      </div>
 
      {/* Main content grid */}
      <div style={{ marginBottom: 14 }}>
        {/* Dynamic Tab Content */}
<div className="card">

  <div className="card-head">
    <div className="card-title">

      {activeTab === 0 && "Vehicle Fleet"}
      {activeTab === 1 && "Drivers List"}
      {activeTab === 2 && "Bookings List"}
      {activeTab === 3 && "Vehicle Tracking"}
      {activeTab === 4 && "Payment Details"}

    </div>

    <button className="card-action">
      View all →
    </button>
  </div>

  {/* ALL VEHICLES */}
  {activeTab === 0 && (
    <table className="data-table">
      <thead>
        <tr>
          <th>Vehicle</th>
          <th>Type</th>
          <th>Driver</th>
          <th>Capacity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredFleet.map((v, idx) => (
          <tr key={v.reg + idx}>
            <td>
              <div style={{ fontWeight: 500, fontSize: 12 }}>
                {v.reg}
              </div>

              <div style={{ fontSize: 10, color: "#999" }}>
                {v.model}
              </div>
            </td>

            <td>
              <span className={`badge ${v.typeCls}`}>
                {v.type}
              </span>
            </td>

            <td style={{ fontSize: 12 }}>
              {v.driver}
            </td>

            <td style={{ fontSize: 12 }}>
              {v.capacity}
            </td>

            <td>
              <span className={`badge ${v.statusCls}`}>
                {v.status}
              </span>
            </td>

            <td>
              <div className="table-action-btns">
                <button
                  className="table-icon-btn"
                  onClick={() => handleEdit(v, idx, "vehicle")}
                >
                  <i className="ti ti-edit" />
                </button>

                <button
                  className="table-icon-btn delete"
                  onClick={() => handleDelete(v.reg)}
                >
                  <i className="ti ti-trash" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  {/* DRIVERS */}
  {activeTab === 1 && (
    <table className="data-table">
      <thead>
        <tr>
          <th>Driver Name</th>
          <th>Phone</th>
          <th>Vehicle</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredDrivers.map((d, i) => (
          <tr key={i}>
            <td>{d.name}</td>
            <td>{d.phone}</td>
            <td>{d.vehicle}</td>
            <td>
              <span className="badge badge-green">
                {d.status}
              </span>
            </td>
            <td>
  <div className="table-action-btns">

    <button
      className="table-icon-btn"
      onClick={() => handleEdit(d, i, "driver")}
    >
      <i className="ti ti-edit" />
    </button>

    <button
      className="table-icon-btn delete"
      onClick={() => handleDeleteDriver(d.phone)}
    >
      <i className="ti ti-trash" />
    </button>

  </div>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  {/* BOOKINGS */}
  {activeTab === 2 && (
    <table className="data-table">
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Customer</th>
          <th>Vehicle</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredBookings.map((b, i) => (
          <tr key={i}>
            <td>{b.bookingId}</td>
            <td>{b.customer}</td>
            <td>{b.vehicle}</td>
            <td>{b.date}</td>
           <td>
  <span className="badge badge-blue">
    {b.status}
  </span>
</td>

<td>
  <div className="table-action-btns">

    <button
      className="table-icon-btn"
     onClick={() => handleEdit(b, i, "booking")}
    >
      <i className="ti ti-edit" />
    </button>

    <button
      className="table-icon-btn delete"
      onClick={() => handleDeleteBooking(b.bookingId)}
    >
      <i className="ti ti-trash" />
    </button>

  </div>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  {/* TRACKING */}
  {activeTab === 3 && (
    <table className="data-table">
      <thead>
        <tr>
          <th>Vehicle</th>
          <th>Location</th>
          <th>Speed</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredTracking.map((t, i) => (
          <tr key={i}>
            <td>{t.vehicle}</td>
            <td>{t.location}</td>
            <td>{t.speed}</td>
           <td>
  <span className="badge badge-green">
    {t.status}
  </span>
</td>

<td>
  <div className="table-action-btns">

    <button
      className="table-icon-btn"
      onClick={() => handleEdit(t, i, "tracking")}
    >
      <i className="ti ti-edit" />
    </button>

    <button
      className="table-icon-btn delete"
      onClick={() => handleDeleteTracking(t.vehicle)}
    >
      <i className="ti ti-trash" />
    </button>

  </div>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  {/* PAYMENT DETAILS */}
  {activeTab === 4 && (
    <div className="vehicle-payment-table-wrap">
    <table className="data-table">
      <thead>
        <tr>
          <th>Ride ID</th>
          <th>Driver</th>
          <th>Tourist</th>
          <th>Route</th>
          <th>Mode</th>
          <th>Advance</th>
          <th>Balance</th>
          <th>Total Fare</th>
          <th>Platform 15%</th>
          <th>Driver Share</th>
          <th>Distance</th>
          <th>Diesel</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {ridePayments.length === 0 ? (
          <tr>
            <td colSpan="13" style={{ textAlign: "center", padding: 18, color: "#8a6c4a" }}>
              No payment records available yet.
            </td>
          </tr>
        ) : (
          ridePayments.map((ride) => (
            <tr key={ride.rideId}>
              <td>{ride.rideId}</td>
              <td>{ride.driverName}</td>
              <td>{ride.tourist}</td>
              <td>{ride.route}</td>
              <td>{ride.paymentMode === "full" ? "Full" : "Advance"}</td>
              <td>₹{ride.advanceAmount}</td>
              <td>₹{ride.balanceDue}</td>
              <td>₹{ride.totalFare}</td>
              <td>₹{ride.platformCharge}</td>
              <td>₹{ride.driverEarning}</td>
              <td>{ride.distanceKm} km</td>
              <td>₹{ride.dieselCost}</td>
              <td>
                <span className="badge badge-green">
                  {ride.paymentStatus}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    </div>
  )}

</div>
 {/* Bottom Cards */}
<div className="vehicle-bottom-cards">

  {/* Fleet by type */}
  <div className="card fleet-card">
    <div className="card-head">
      <div className="card-title">Fleet by type</div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {FLEET_BY_TYPE.map((f) => (
        <div key={f.label} className="bar-row">
          <div className="bar-label" style={{ width: 90 }}>
            {f.label}
          </div>

          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: f.pct + "%",
                background: f.color,
              }}
            />
          </div>

          <div className="bar-val">{f.count}</div>
        </div>
      ))}
    </div>
  </div>

  {/* Expiry alerts */}
  <div className="card expiry-card">

    <div className="card-head">
      <div className="card-title">
        <i
          className="ti ti-alert-circle"
          style={{
            fontSize: 14,
            marginRight: 5,
            verticalAlign: -2,
            color: "#c0392b",
          }}
        />
        Expiry alerts
      </div>
    </div>

    <div>
      {ALERTS.map((a, i) => (
        <div key={i} className="alert-item">

          <div
            className="alert-dot"
            style={{ background: a.dot }}
          />

          <div>
            <div className="alert-text">{a.text}</div>

            <div
              style={{
                fontSize: 10,
                color: "#bbb",
                marginTop: 1,
              }}
            >
              {a.sub}
            </div>
          </div>

        </div>
      ))}
    </div>

  </div>

</div>
  </div>
 
    {/* ✅ Modal via Portal — bypasses all parent z-index/overflow traps */}
      {/* VEHICLE MODAL */}
{showModal && editType === "vehicle" && (
  <AddVehicleModal
    onClose={() => setShowModal(false)}
    onSave={handleSave}
    editData={editVehicle}
    isEdit={true}
  />
)}

{/* DRIVER MODAL */}
{showModal && editType === "driver" && (
  <DriverEditModal
    onClose={() => setShowModal(false)}
    editData={editVehicle}
  />
)}

{/* BOOKING MODAL */}
{showModal && editType === "booking" && (
  <BookingEditModal
    onClose={() => setShowModal(false)}
    editData={editVehicle}
  />
)}

{/* TRACKING MODAL */}
{showModal && editType === "tracking" && (
  <TrackingEditModal
    onClose={() => setShowModal(false)}
    editData={editVehicle}
  />
)}

    </div>
  );
}
