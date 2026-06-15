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
 
const VENDORS_DATA = [
  {
    initials: "RP",
    name: "Raj Patel",
    phone: "+91 9876543200",
    city: "Ayodhya, UP",
    status: "Active",
    statusCls: "badge-green",
    drivers: [
      { name: "Ram Prasad", phone: "+91 9876543210" },
      { name: "Suresh Yadav", phone: "+91 9876543211" },
      { name: "Ganesh Tiwari", phone: "+91 9876543212" },
      { name: "Mohan Singh", phone: "+91 9876543213" },
      { name: "Vikram Patel", phone: "+91 9876543214" },
    ],
    vehicleList: [
      { number: "UP-32 RP 1001", type: "SUV", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 RP 1002", type: "Sedan", category: "Working", condition: "Good", accidents: "Minor dent repaired in 2025" },
      { number: "UP-32 RP 1003", type: "Mini Bus", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 RP 1004", type: "SUV", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 RP 1005", type: "EV", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 RP 1006", type: "Sedan", category: "Working", condition: "Good", accidents: "Scratch on rear bumper in 2024" },
      { number: "UP-32 RP 1007", type: "Luxury", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 RP 1008", type: "SUV", category: "Not Working", condition: "Not working", accidents: "Engine issue, no major accident" },
      { number: "UP-32 RP 1009", type: "Mini Bus", category: "Not Working", condition: "Not working", accidents: "Tyre burst incident, 2023" },
      { number: "UP-32 RP 1010", type: "Sedan", category: "Repair", condition: "Under repair", accidents: "Front side accident, 2025" },
    ],
  },
  {
    initials: "SK",
    name: "Suresh Kumar",
    phone: "+91 9876543201",
    city: "Lucknow, UP",
    status: "Active",
    statusCls: "badge-green",
    drivers: [
      { name: "Rajesh Sharma", phone: "+91 9876543215" },
      { name: "Ashok Kumar", phone: "+91 9876543216" },
      { name: "Pradeep Singh", phone: "+91 9876543217" },
      { name: "Deepak Verma", phone: "+91 9876543218" },
    ],
    vehicleList: [
      { number: "UP-32 SK 2001", type: "SUV", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 SK 2002", type: "Sedan", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 SK 2003", type: "Mini Bus", category: "Working", condition: "Good", accidents: "Minor scratch, 2024" },
      { number: "UP-32 SK 2004", type: "EV", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 SK 2005", type: "SUV", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 SK 2006", type: "Sedan", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 SK 2007", type: "SUV", category: "Not Working", condition: "Not working", accidents: "Gearbox issue, 2024" },
      { number: "UP-32 SK 2008", type: "Mini Bus", category: "Repair", condition: "Under repair", accidents: "Rear collision, 2025" },
    ],
  },
  {
    initials: "MB",
    name: "Maya Bhatt",
    phone: "+91 9876543202",
    city: "Varanasi, UP",
    status: "Inactive",
    statusCls: "badge-red",
    drivers: [
      { name: "Ravi Kumar", phone: "+91 9876543219" },
      { name: "Anirudh Nair", phone: "+91 9876543220" },
      { name: "Sameer Patel", phone: "+91 9876543221" },
    ],
    vehicleList: [
      { number: "UP-32 MB 3001", type: "SUV", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 MB 3002", type: "Sedan", category: "Working", condition: "Good", accidents: "Front bumper fixed in 2025" },
      { number: "UP-32 MB 3003", type: "Mini Bus", category: "Working", condition: "Good", accidents: "None" },
      { number: "UP-32 MB 3004", type: "EV", category: "Not Working", condition: "Not working", accidents: "Battery fault, 2025" },
      { number: "UP-32 MB 3005", type: "SUV", category: "Not Working", condition: "Not working", accidents: "None" },
      { number: "UP-32 MB 3006", type: "Mini Bus", category: "Repair", condition: "Under repair", accidents: "Side impact, 2024" },
    ],
  },
];

const ALERTS = [
  { dot: "#c0392b", text: "UP-32 IJ 7890 — permit expires 17 May", sub: "3 days left" },
  { dot: "#f5c842", text: "UP-32 KL 1122 — insurance due 28 May", sub: "14 days left" },
  { dot: "#f5c842", text: "UP-32 MN 3344 — PUC due 31 May", sub: "17 days left" },
];
 
const TABS = ["All Vehicles", "Drivers Details", "Bookings", "Tracking", "Payment Details", "Vendors"];
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
const DEFAULT_RIDE_REQUESTS = [
  {
    rideId: "RIDE-001",
    rideNo: "RIDE-001",
    driverName: "Ram Prasad",
    vehicleName: "UP-32 AB 1234",
    touristName: "Vinay Singh",
    customerName: "Vinay Singh",
    route: "Ayodhya -> Ram Janmabhoomi",
    pickupLocation: "Ayodhya",
    dropLocation: "Ram Janmabhoomi",
    date: "15 Jun 2026",
    time: "09:30 AM",
    passengers: 4,
    paymentMode: "advance",
    advanceAmount: 1200,
    balanceDue: 1200,
    totalFare: 2400,
    distanceKm: 24,
    dieselCost: 192,
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    rideId: "RIDE-002",
    rideNo: "RIDE-002",
    driverName: "Suresh Yadav",
    vehicleName: "UP-32 CD 5678",
    touristName: "Meera Patel",
    customerName: "Meera Patel",
    route: "Lucknow -> Ayodhya",
    pickupLocation: "Lucknow",
    dropLocation: "Ayodhya",
    date: "15 Jun 2026",
    time: "11:15 AM",
    passengers: 2,
    paymentMode: "full",
    advanceAmount: 1800,
    balanceDue: 0,
    totalFare: 1800,
    distanceKm: 18,
    dieselCost: 144,
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    rideId: "RIDE-003",
    rideNo: "RIDE-003",
    driverName: "Ganesh Tiwari",
    vehicleName: "UP-32 EF 9012",
    touristName: "Rahul Verma",
    customerName: "Rahul Verma",
    route: "Varanasi -> Ayodhya",
    pickupLocation: "Varanasi",
    dropLocation: "Ayodhya",
    date: "16 Jun 2026",
    time: "07:45 AM",
    passengers: 6,
    paymentMode: "advance",
    advanceAmount: 1500,
    balanceDue: 1500,
    totalFare: 3000,
    distanceKm: 30,
    dieselCost: 240,
    status: "Pending",
    paymentStatus: "Pending",
  },
];

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
    if (!Array.isArray(list) || list.length === 0) {
      return DEFAULT_RIDE_REQUESTS.map((ride, index) => {
        const hours = 6 + index * 2;
        const totalFare = Number(ride.totalFare) || Math.max(1800, hours * 350);
        const advanceAmount =
          Number(ride.advanceAmount) || Math.round(totalFare * 0.5);
        const balanceDue = Number(ride.balanceDue) || Math.max(totalFare - advanceAmount, 0);

        return {
          id: ride.rideId,
          rideId: ride.rideId,
          driverName: ride.driverName,
          vehicle: ride.vehicleName,
          tourist: ride.touristName,
          route: ride.route,
          date: ride.date,
          time: ride.time,
          status: ride.status,
          paymentStatus: ride.paymentStatus,
          paymentMode: ride.paymentMode,
          advancePercent: 50,
          advanceAmount,
          balanceDue,
          distanceKm: ride.distanceKm || hours * KM_PER_HOUR,
          totalFare,
          platformCharge: Math.round(totalFare * (PLATFORM_FEE_PERCENT / 100)),
          driverEarning: Math.max(totalFare - Math.round(totalFare * (PLATFORM_FEE_PERCENT / 100)), 0),
          dieselCost: ride.dieselCost || Math.round((ride.distanceKm || hours * KM_PER_HOUR) * DIESEL_RATE_PER_KM),
          otp: ride.otp || "----",
          passengers: ride.passengers || 4,
        };
      });
    }

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
        passengers: ride.passengers || ride.persons || ride.person || 4,
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

function updateRideStatus(rideId, nextStatus) {
  try {
    const raw = localStorage.getItem(RIDE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list)) return [];

    const next = list.map((ride, index) => {
      const currentId = ride.id || ride.rideId || `ride-${index + 1}`;
      if (String(currentId) !== String(rideId)) return ride;

      const totalFare =
        Number(ride.totalFare || ride.estimatedPrice || ride.fare) ||
        Math.max(1800, (Number(ride.hours) || 8) * 400);
      const paymentMode = ride.paymentMode || "advance";
      const advancePercent = Number(ride.advancePercent) || 50;
      const advanceAmount =
        Number(ride.advanceAmount) ||
        (paymentMode === "full" ? totalFare : Math.round(totalFare * (advancePercent / 100)));
      const balanceDue = Number(ride.balanceDue) || Math.max(totalFare - advanceAmount, 0);

      return {
        ...ride,
        status: nextStatus,
        paymentStatus:
          nextStatus === "Accepted"
            ? paymentMode === "full"
              ? "Payment Due"
              : "Advance Due"
            : nextStatus === "Rejected"
              ? "Rejected"
              : ride.paymentStatus || (ride.status === "Completed" ? "Settled" : "Pending"),
        advanceAmount,
        balanceDue,
        totalFare,
      };
    });

    localStorage.setItem(RIDE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}

function getVendorVehicleGroups(vendor) {
  const vehicles = Array.isArray(vendor.vehicleList) ? vendor.vehicleList : [];
  return {
    total: vehicles,
    working: vehicles.filter((vehicle) => vehicle.category === "Working"),
    inactive: vehicles.filter((vehicle) => vehicle.category === "Not Working"),
    repair: vehicles.filter((vehicle) => vehicle.category === "Repair"),
  };
}

function buildVendorVehicleList(vendor) {
  if (Array.isArray(vendor.vehicleList) && vendor.vehicleList.length > 0) {
    return vendor.vehicleList;
  }

  const totalVehicles = Math.max(Number(vendor.totalVehicles) || 0, 0);
  const workingVehicles = Math.max(Number(vendor.workingVehicles) || 0, 0);
  const notWorkingVehicles = Math.max(Number(vendor.notWorkingVehicles) || 0, 0);
  const repairVehicles = Math.max(Number(vendor.repairVehicles) || 0, 0);
  const vehicleTypes = String(vendor.vehicleTypes || "")
    .split(",")
    .map((type) => type.trim())
    .filter(Boolean);
  const fallbackTypes = vehicleTypes.length > 0 ? vehicleTypes : ["SUV", "Sedan", "Mini Bus"];

  const generated = [];
  const pushVehicles = (count, category, condition) => {
    for (let i = 0; i < count; i += 1) {
      const type = fallbackTypes[(generated.length + i) % fallbackTypes.length];
      generated.push({
        number: `${vendor.phone || "VENDOR"}-${String(generated.length + 1).padStart(3, "0")}`,
        type,
        category,
        condition,
        accidents: condition === "Good" ? "None" : condition === "Not working" ? "Vehicle not operational" : "Under maintenance",
      });
    }
  };

  pushVehicles(workingVehicles, "Working", "Good");
  pushVehicles(notWorkingVehicles, "Not Working", "Not working");
  pushVehicles(repairVehicles, "Repair", "Under repair");

  while (generated.length < totalVehicles) {
    const type = fallbackTypes[generated.length % fallbackTypes.length];
    generated.push({
      number: `${vendor.phone || "VENDOR"}-${String(generated.length + 1).padStart(3, "0")}`,
      type,
      category: "Working",
      condition: "Good",
      accidents: "None",
    });
  }

  return generated;
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
  mode = "edit",
}) {
  const isEdit = mode === "edit";
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
  mode = "edit",
  onSave,
  onUpdate,
}) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    name: editData?.name || "",
    phone: editData?.phone || "",
    vehicle: editData?.vehicle || "",
    status: editData?.status || "Available",
  });

  const handleUpdate = () => {
    const payload = {
      ...editData,
      name: form.name.trim(),
      phone: form.phone.trim(),
      vehicle: form.vehicle.trim(),
      status: form.status.trim() || editData?.status || "Available",
    };

    if (editData) {
      onUpdate(payload);
    } else {
      onSave(payload);
    }
  };

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
            <h2>{isEdit ? "Edit Driver" : "Add Driver"}</h2>
            <p>{isEdit ? "Update driver details" : "Fill in driver details"}</p>
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
            onClick={handleUpdate}
          >
            {isEdit ? "Update Driver" : "Save Driver"}
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
  mode = "edit",
  onSave,
  onUpdate,
}) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    bookingId: editData?.bookingId || "",
    customer: editData?.customer || "",
    vehicle: editData?.vehicle || "",
    date: editData?.date || "",
    status: editData?.status || "Pending",
  });

  const handleUpdate = () => {
    const payload = {
      ...editData,
      bookingId: form.bookingId.trim(),
      customer: form.customer.trim(),
      vehicle: form.vehicle.trim(),
      date: form.date.trim(),
      status: form.status.trim() || editData?.status || "Pending",
    };

    if (editData) {
      onUpdate(payload);
    } else {
      onSave(payload);
    }
  };

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
            <h2>{isEdit ? "Edit Booking" : "Add Booking"}</h2>
            <p>{isEdit ? "Update booking details" : "Fill in booking details"}</p>
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
            <input
              value={form.bookingId}
              onChange={(e) =>
                setForm({
                  ...form,
                  bookingId: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Customer</label>
            <input
              value={form.customer}
              onChange={(e) =>
                setForm({
                  ...form,
                  customer: e.target.value,
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
            <label>Date</label>
            <input
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
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
            onClick={handleUpdate}
          >
            {isEdit ? "Update Booking" : "Save Booking"}
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
  onUpdate,
}) {

  const [form, setForm] = useState({
    vehicle: editData?.vehicle || "",
    location: editData?.location || "",
    speed: editData?.speed || "",
    status: editData?.status || "",
  });

  const handleUpdate = () => {
    onUpdate({
      ...editData,
      vehicle: form.vehicle.trim(),
      location: form.location.trim(),
      speed: form.speed.trim(),
      status: form.status.trim() || editData?.status || "Stopped",
    });
  };

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
            <label>Location</label>
            <input
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Speed</label>
            <input
              value={form.speed}
              onChange={(e) =>
                setForm({
                  ...form,
                  speed: e.target.value,
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
            onClick={handleUpdate}
          >
            Update Tracking
          </button>

        </div>

      </div>

    </div>,

    document.body
  );
}

function VendorEditModal({
  onClose,
  editData,
  mode = "edit",
  onSave,
  onUpdate,
}) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState({
    initials: editData?.initials || "",
    name: editData?.name || "",
    phone: editData?.phone || "",
    city: editData?.city || "",
    status: editData?.status || "Active",
    vehicleTypes: editData?.vehicleTypes || (Array.isArray(editData?.vehicleList)
      ? [...new Set(editData.vehicleList.map((item) => item.type).filter(Boolean))].join(", ")
      : ""),
    totalVehicles: editData?.totalVehicles || (Array.isArray(editData?.vehicleList) ? editData.vehicleList.length : ""),
    workingVehicles: editData?.workingVehicles || (Array.isArray(editData?.vehicleList) ? editData.vehicleList.filter((item) => item.category === "Working").length : ""),
    notWorkingVehicles: editData?.notWorkingVehicles || (Array.isArray(editData?.vehicleList) ? editData.vehicleList.filter((item) => item.category === "Not Working").length : ""),
    repairVehicles: editData?.repairVehicles || (Array.isArray(editData?.vehicleList) ? editData.vehicleList.filter((item) => item.category === "Repair").length : ""),
  });

  const handleUpdate = () => {
    const vehicleList = buildVendorVehicleList({
      ...editData,
      ...form,
    });
    const payload = {
      ...editData,
      initials:
        form.initials.trim() ||
        form.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      status: form.status.trim() || editData?.status || "Active",
      statusCls: STATUS_CLS_MAP[form.status.trim() || editData?.status || "Active"] || "badge-green",
      vehicleTypes: form.vehicleTypes.trim(),
      totalVehicles: Number(form.totalVehicles) || vehicleList.length,
      workingVehicles: Number(form.workingVehicles) || vehicleList.filter((item) => item.category === "Working").length,
      notWorkingVehicles: Number(form.notWorkingVehicles) || vehicleList.filter((item) => item.category === "Not Working").length,
      repairVehicles: Number(form.repairVehicles) || vehicleList.filter((item) => item.category === "Repair").length,
      drivers: editData?.drivers || [],
      vehicleList,
    };

    if (editData) {
      onUpdate(payload);
    } else {
      onSave(payload);
    }
  };

  return createPortal(
    <div className="common-modal-overlay" onMouseDown={onClose}>
      <div className="common-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="common-modal-header">
          <div>
            <h2>{isEdit ? "Edit Vendor" : "Add Vendor"}</h2>
            <p>{isEdit ? "Update vendor details" : "Fill in vendor details"}</p>
          </div>

          <button className="common-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="common-divider" />

        <div className="common-grid">
          <div>
            <label>Initials</label>
            <input
              value={form.initials}
              onChange={(e) =>
                setForm({
                  ...form,
                  initials: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Vendor Name</label>
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
            <label>Phone</label>
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
            <label>City</label>
            <input
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label>Vehicle Types</label>
            <input
              value={form.vehicleTypes}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicleTypes: e.target.value,
                })
              }
              placeholder="SUV, Sedan, Mini Bus"
            />
          </div>

          <div>
            <label>Total Vehicles</label>
            <input
              type="number"
              min="0"
              value={form.totalVehicles}
              onChange={(e) =>
                setForm({
                  ...form,
                  totalVehicles: e.target.value,
                })
              }
              placeholder="e.g. 12"
            />
          </div>

          <div>
            <label>Working Vehicles</label>
            <input
              type="number"
              min="0"
              value={form.workingVehicles}
              onChange={(e) =>
                setForm({
                  ...form,
                  workingVehicles: e.target.value,
                })
              }
              placeholder="e.g. 8"
            />
          </div>

          <div>
            <label>Not Working</label>
            <input
              type="number"
              min="0"
              value={form.notWorkingVehicles}
              onChange={(e) =>
                setForm({
                  ...form,
                  notWorkingVehicles: e.target.value,
                })
              }
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label>Under Repair</label>
            <input
              type="number"
              min="0"
              value={form.repairVehicles}
              onChange={(e) =>
                setForm({
                  ...form,
                  repairVehicles: e.target.value,
                })
              }
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
            >
              {["Active", "Inactive"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="common-divider common-divider-footer" />

        <div className="common-footer">
          <button className="common-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="common-save-btn" onClick={handleUpdate}>
            {isEdit ? "Update Vendor" : "Save Vendor"}
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
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showRequestsPanel, setShowRequestsPanel] = useState(false);
  const [ridePayments, setRidePayments] = useState(() => loadRidePayments());
  const [vendors, setVendors] = useState(VENDORS_DATA);
  const [editVendor, setEditVendor] = useState(null);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedVendorDrivers, setSelectedVendorDrivers] = useState(null);
  const [showDriversModal, setShowDriversModal] = useState(false);
  const [selectedVendorVehicles, setSelectedVendorVehicles] = useState(null);
  const [showVehiclesModal, setShowVehiclesModal] = useState(false);

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

  useEffect(() => {
    setShowFilterMenu(false);
    setShowRequestsPanel(false);
  }, [activeTab]);

  useEffect(() => {
    setFilterValue("All");
    setShowFilterMenu(false);
  }, [activeTab]);
 
  const handleSave = (vehicleData) => {
    if (editVehicle !== null) {
      setFleet((prev) =>
        prev.map((vehicle) =>
          vehicle.reg === editVehicle.reg ? vehicleData : vehicle
        )
      );
    } else {
      setFleet((prev) => [vehicleData, ...prev]);
    }

    setEditVehicle(null);
    setEditType("");
    setModalMode("add");
    setShowModal(false);
  };

  const handleSaveDriver = (driverData) => {
    setDriversData((prev) => [driverData, ...prev]);
    setEditVehicle(null);
    setEditType("");
    setModalMode("add");
    setShowModal(false);
  };

  const handleSaveBooking = (bookingData) => {
    setBookingsData((prev) => [bookingData, ...prev]);
    setEditVehicle(null);
    setEditType("");
    setModalMode("add");
    setShowModal(false);
  };

  const handleSaveVendor = (vendorData) => {
    const name = vendorData.name?.trim() || "Vendor";
    const initials =
      vendorData.initials?.trim() ||
      name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    const status = vendorData.status || "Active";
    const vehicleList = buildVendorVehicleList({
      ...vendorData,
      initials,
      name,
      status,
    });

    setVendors((prev) => [
      {
        ...vendorData,
        initials,
        name,
        phone: vendorData.phone?.trim() || "",
        city: vendorData.city?.trim() || "",
        status,
        statusCls: STATUS_CLS_MAP[status] || "badge-green",
        drivers: vendorData.drivers || [],
        vehicleTypes: vendorData.vehicleTypes || "",
        totalVehicles: Number(vendorData.totalVehicles) || vehicleList.length,
        workingVehicles: Number(vendorData.workingVehicles) || vehicleList.filter((item) => item.category === "Working").length,
        notWorkingVehicles: Number(vendorData.notWorkingVehicles) || vehicleList.filter((item) => item.category === "Not Working").length,
        repairVehicles: Number(vendorData.repairVehicles) || vehicleList.filter((item) => item.category === "Repair").length,
        vehicleList,
      },
      ...prev,
    ]);
    setEditVendor(null);
    setShowVendorModal(false);
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

  const handleUpdateDriver = (updatedDriver) => {
    setDriversData((prev) =>
      prev.map((driver) =>
        driver.phone === editVehicle.phone ? updatedDriver : driver
      )
    );
    setEditVehicle(null);
    setEditType("");
    setModalMode("add");
    setShowModal(false);
  };

  const handleUpdateBooking = (updatedBooking) => {
    setBookingsData((prev) =>
      prev.map((booking) =>
        booking.bookingId === editVehicle.bookingId ? updatedBooking : booking
      )
    );
    setEditVehicle(null);
    setEditType("");
    setModalMode("add");
    setShowModal(false);
  };

  const handleUpdateTracking = (updatedTracking) => {
    setTrackingData((prev) =>
      prev.map((tracking) =>
        tracking.vehicle === editVehicle.vehicle ? updatedTracking : tracking
      )
    );
    setEditVehicle(null);
    setEditType("");
    setModalMode("add");
    setShowModal(false);
  };

  const handleVendorEdit = (vendor) => {
    setEditVendor(vendor);
    setModalMode("edit");
    setShowVendorModal(true);
  };

  const handleUpdateVendor = (updatedVendor) => {
    setVendors((prev) => {
      const next = prev.map((vendor) =>
        editVendor?.phone && vendor.phone === editVendor.phone
          ? {
              ...vendor,
              ...updatedVendor,
              drivers: vendor.drivers,
              vehicleTypes: updatedVendor.vehicleTypes || vendor.vehicleTypes || "",
              totalVehicles: Number(updatedVendor.totalVehicles) || vendor.totalVehicles || vendor.vehicleList?.length || 0,
              workingVehicles: Number(updatedVendor.workingVehicles) || vendor.workingVehicles || getVendorVehicleGroups(vendor).working.length,
              notWorkingVehicles: Number(updatedVendor.notWorkingVehicles) || vendor.notWorkingVehicles || getVendorVehicleGroups(vendor).inactive.length,
              repairVehicles: Number(updatedVendor.repairVehicles) || vendor.repairVehicles || getVendorVehicleGroups(vendor).repair.length,
              vehicleList: buildVendorVehicleList({
                ...vendor,
                ...updatedVendor,
              }),
            }
          : vendor
      );

      if (!editVendor?.phone || !prev.some((vendor) => vendor.phone === editVendor.phone)) {
        next.unshift({
          ...updatedVendor,
          drivers: updatedVendor.drivers || [],
          vehicleList: buildVendorVehicleList(updatedVendor),
        });
      }

      return next;
    });
    setEditVendor(null);
    setModalMode("add");
    setShowVendorModal(false);
  };

  const handleDeleteVendor = (phone) => {
    setVendors((prev) => prev.filter((vendor) => vendor.phone !== phone));
  };

const handleEdit = (data, type) => {
  setEditVehicle(data);
  setEditType(type);
  setModalMode("edit");
  setShowModal(true);
};
const filterOptionsByTab = {
  0: ["All", "Available", "On Trip", "Maintenance", "Permit Due"],
  1: ["All", "On Duty", "Available", "On Trip", "On Break"],
  2: ["All", "Confirmed", "Pending"],
  3: ["All", "Moving", "Stopped"],
  4: ["All", "Settled", "Pending"],
  5: ["All", "Active", "Inactive"],
};

const matchesCurrentFilter = (status) =>
  filterValue === "All" || status === filterValue;

 const filteredFleet = fleet.filter((v) =>
  (v.reg.toLowerCase().includes(searchTerm.toLowerCase()) ||
  v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
  v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
  v.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
  matchesCurrentFilter(v.status)
);

const filteredDrivers = driversData.filter((d) =>
  (d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  d.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
  d.vehicle.toLowerCase().includes(searchTerm.toLowerCase())) &&
  matchesCurrentFilter(d.status)
);

const filteredBookings = bookingsData.filter((b) =>
  (b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
  b.vehicle.toLowerCase().includes(searchTerm.toLowerCase())) &&
  matchesCurrentFilter(b.status)
);

const filteredTracking = trackingData.filter((t) =>
  (t.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
  t.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
  t.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
  matchesCurrentFilter(t.status)
);

const filteredVendors = vendors.filter((v) =>
  (searchTerm === ""
    ? true
    : v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.city.toLowerCase().includes(searchTerm.toLowerCase())) &&
  matchesCurrentFilter(v.status)
);

const pendingRideRequests = ridePayments.filter((ride) => ride.status === "Pending");

const handleRideRequestDecision = (ride, nextStatus) => {
  const next = updateRideStatus(ride.id || ride.rideId, nextStatus);
  setRidePayments(loadRidePayments());
  return next;
};

const openVendorVehicles = (vendor, categoryName, vehicleList) => {
  setSelectedVendorVehicles({
    vendorName: vendor.name,
    categoryName,
    vehicles: vehicleList || [],
  });
  setShowVehiclesModal(true);
};
 
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

  {/* Search + Filter + Dynamic Add Button */}
  {activeTab !== 3 && activeTab !== 4 && (
    <div className="search-upload-wrap vehicle-action-row">
      <div className="vehicle-request-wrap">
        <button
          className="vehicle-toolbar-btn vehicle-request-btn"
          type="button"
          onClick={() => setShowRequestsPanel((prev) => !prev)}
        >
          <i className="ti ti-bell" />
          New Requests
          {pendingRideRequests.length > 0 && (
            <span className="vehicle-filter-pill">
              {pendingRideRequests.length}
            </span>
          )}
        </button>

      </div>

      <div className={`search-box vehicle-search-wrap ${activeTab === 5 ? "vehicle-search-wrap-compact" : ""}`}>
        <i className="ti ti-search" style={{ fontSize: 13, color: "#888" }} />
        <input
          type="text"
          placeholder={
            activeTab === 0
              ? "Search vehicle..."
              : activeTab === 1
              ? "Search driver..."
              : activeTab === 2
              ? "Search booking..."
              : "Search vendor..."
          }
          className={activeTab === 5 ? "vehicle-search-input vehicle-search-input-compact" : "vehicle-search-input"}
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

      <div className="vehicle-filter-wrap">
        <button
          className={`vehicle-toolbar-btn vehicle-filter-btn ${activeTab === 5 ? "vehicle-toolbar-btn-compact" : ""}`}
          type="button"
          onClick={() => setShowFilterMenu((prev) => !prev)}
        >
          <i className="ti ti-filter" />
          Filter
          {filterValue !== "All" && <span className="vehicle-filter-pill">{filterValue}</span>}
        </button>

        {showFilterMenu && (
          <div className="vehicle-filter-menu">
            {(filterOptionsByTab[activeTab] || ["All"]).map((option) => (
              <button
                key={option}
                type="button"
                className={`vehicle-filter-item ${filterValue === option ? "active" : ""}`}
                onClick={() => {
                  setFilterValue(option);
                  setShowFilterMenu(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Add Button */}
      <button
        className={`btn-primary vehicle-add-btn ${activeTab === 5 ? "vehicle-add-btn-compact" : ""}`}
        type="button"
        onClick={() => {
          setEditVehicle(null);
          if (activeTab === 5) {
            setEditVendor(null);
            setModalMode("add");
            setShowVendorModal(true);
            return;
          }

          setModalMode("add");
          setEditType(
            activeTab === 0
              ? "vehicle"
              : activeTab === 1
              ? "driver"
              : "booking"
          );
          setShowModal(true);
        }}
      >
        <i className="ti ti-plus" />
        {activeTab === 0
          ? "Add Vehicle"
          : activeTab === 1
          ? "Add Driver"
          : activeTab === 2
          ? "Add Booking"
          : "Add Vendor"}
      </button>
    </div>
  )}
</div>

      {showRequestsPanel && (
        <div
          className="card"
          style={{
            margin: "0 0 14px",
            border: "1px solid rgba(245, 200, 66, 0.3)",
            background: "#fffdf4",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a" }}>
                New Vehicle Requests
              </div>
              <div style={{ fontSize: 12, color: "#8a6c4a", marginTop: 2 }}>
                Review and approve or reject tourist vehicle bookings.
              </div>
            </div>
            <button
              className="btn-outline"
              type="button"
              onClick={() => setShowRequestsPanel(false)}
            >
              Close
            </button>
          </div>

          {pendingRideRequests.length === 0 ? (
            <div style={{ padding: "14px 0", fontSize: 13, color: "#8a6c4a" }}>
              No new requests right now.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {pendingRideRequests.map((ride) => (
                <div
                  key={ride.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 14,
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "#fff",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      className="avatar-circle"
                      style={{
                        width: 38,
                        height: 38,
                        background: "#f5c842",
                        color: "#1a1a1a",
                        fontSize: 12,
                      }}
                    >
                      {String(ride.tourist || ride.customerName || "R")
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>
                        {ride.tourist || ride.customerName || "Tourist Booking"}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                        {ride.rideId} · {ride.route}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span className="badge badge-amber">Pending</span>
                    <button
                      className="btn-outline"
                      type="button"
                      onClick={() => handleRideRequestDecision(ride, "Rejected")}
                    >
                      Reject
                    </button>
                    <button
                      className="btn-primary"
                      type="button"
                      onClick={() => handleRideRequestDecision(ride, "Accepted")}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
 
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
      {activeTab === 5 && "Vendors Management"}

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
                  onClick={() => handleEdit(v, "vehicle")}
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
      onClick={() => handleEdit(d, "driver")}
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
     onClick={() => handleEdit(b, "booking")}
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
      onClick={() => handleEdit(t, "tracking")}
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

  {activeTab === 5 && (
    <table className="data-table">
      <thead>
        <tr>
          <th>Vendor Name</th>
          <th>Phone</th>
          <th>City</th>
          <th>Drivers</th>
          <th>Vehicles</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredVendors.map((v, idx) => (
          <tr key={idx}>
            {/* Vendor Name */}
            <td>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div
                  className="avatar-circle"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#f5c842",
                    color: "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {v.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 12 }}>
                    {v.name}
                  </div>
                </div>
              </div>
            </td>
            
            {/* Phone */}
            <td style={{ fontSize: 12 }}>{v.phone}</td>
            
            {/* City */}
            <td style={{ fontSize: 12 }}>{v.city}</td>
            
            {/* Drivers Count - Clickable */}
            <td>
              <button
                onClick={() => {
                  setSelectedVendorDrivers({
                    vendorName: v.name,
                    drivers: v.drivers || [],
                  });
                  setShowDriversModal(true);
                }}
                style={{
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  border: "1px solid #93c5fd",
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#93c5fd";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#dbeafe";
                  e.target.style.transform = "scale(1)";
                }}
              >
                👥 {v.drivers?.length || 0} Drivers
              </button>
            </td>
            
            {/* Vehicle Count Breakdown - Clickable */}
            <td>
              {(() => {
                const vehicleGroups = getVendorVehicleGroups(v);
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button
                      onClick={() =>
                        openVendorVehicles(v, "Total Vehicles", vehicleGroups.total)
                      }
                      style={{
                        background: "#f0f9ff",
                        color: "#0369a1",
                        border: "1px solid #bae6fd",
                        padding: "6px 12px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#bae6fd";
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#f0f9ff";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      Total: {vehicleGroups.total.length}
                    </button>

                    <div style={{ display: "flex", gap: 6, fontSize: 11 }}>
                      <button
                        onClick={() =>
                          openVendorVehicles(v, "Working", vehicleGroups.working)
                        }
                        style={{
                          padding: "4px 8px",
                          background: "#dcfce7",
                          color: "#15803d",
                          border: "1px solid #86efac",
                          borderRadius: 4,
                          fontWeight: 500,
                          cursor: "pointer",
                          flex: 1,
                          transition: "all 0.2s ease",
                          fontSize: 11,
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#86efac";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#dcfce7";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        🟢 {vehicleGroups.working.length}
                      </button>
                      <button
                        onClick={() =>
                          openVendorVehicles(v, "Not Working", vehicleGroups.inactive)
                        }
                        style={{
                          padding: "4px 8px",
                          background: "#fee2e2",
                          color: "#b91c1c",
                          border: "1px solid #fca5a5",
                          borderRadius: 4,
                          fontWeight: 500,
                          cursor: "pointer",
                          flex: 1,
                          transition: "all 0.2s ease",
                          fontSize: 11,
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#fca5a5";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#fee2e2";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        🔴 {vehicleGroups.inactive.length}
                      </button>
                      <button
                        onClick={() =>
                          openVendorVehicles(v, "Under Repair", vehicleGroups.repair)
                        }
                        style={{
                          padding: "4px 8px",
                          background: "#fef9c3",
                          color: "#b5860d",
                          border: "1px solid #fde047",
                          borderRadius: 4,
                          fontWeight: 500,
                          cursor: "pointer",
                          flex: 1,
                          transition: "all 0.2s ease",
                          fontSize: 11,
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#fde047";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#fef9c3";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        🟡 {vehicleGroups.repair.length}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </td>
            
            {/* Status */}
            <td>
              <span className={`badge ${v.statusCls}`}>{v.status}</span>
            </td>
            
            {/* Actions */}
            <td>
              <div className="table-action-btns">
                <button
                  className="table-icon-btn"
                  onClick={() => handleVendorEdit(v)}
                >
                  <i className="ti ti-edit" />
                </button>
                <button
                  className="table-icon-btn delete"
                  onClick={() => handleDeleteVendor(v.phone)}
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
      {/* DRIVERS MODAL */}
{showDriversModal && selectedVendorDrivers && createPortal(
  <div
    className="common-modal-overlay"
    onMouseDown={() => setShowDriversModal(false)}
  >
    <div
      className="common-modal"
      onMouseDown={(e) => e.stopPropagation()}
      style={{ width: "600px" }}
    >
      <div className="common-modal-header">
        <div>
          <h2>Drivers of {selectedVendorDrivers.vendorName}</h2>
          <p>Manage and view driver details</p>
        </div>

        <button
          className="common-close-btn"
          onClick={() => setShowDriversModal(false)}
        >
          ×
        </button>
      </div>

      <div className="common-divider" />

      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {selectedVendorDrivers.drivers && selectedVendorDrivers.drivers.length > 0 ? (
          <table className="data-table" style={{ marginBottom: 0 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Experience</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedVendorDrivers.drivers.map((driver, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: 12 }}>
                      {driver.name}
                    </div>
                  </td>
                  <td style={{ fontSize: 12 }}>{driver.phone}</td>
                  <td style={{ fontSize: 12 }}>
                    {driver.experience || "3 Years"}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span>⭐</span>
                      <span style={{ fontWeight: 500 }}>
                        {driver.rating || "4.5"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="badge badge-green"
                      style={{ fontSize: 11 }}
                    >
                      {driver.status || "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
            No drivers available
          </div>
        )}
      </div>

      <div className="common-divider common-divider-footer" />

      <div className="common-footer">
        <button
          className="common-cancel-btn"
          onClick={() => setShowDriversModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>,
  document.body,
)}

      {/* VENDORS VEHICLES MODAL */}
{showVehiclesModal && selectedVendorVehicles && createPortal(
  <div
    className="common-modal-overlay"
    onMouseDown={() => setShowVehiclesModal(false)}
  >
    <div
      className="common-modal"
      onMouseDown={(e) => e.stopPropagation()}
      style={{ width: "700px" }}
    >
      <div className="common-modal-header">
        <div>
          <h2>Vehicles ({selectedVendorVehicles.categoryName})</h2>
          <p>{selectedVendorVehicles.vendorName}'s vehicle details</p>
        </div>

        <button
          className="common-close-btn"
          onClick={() => setShowVehiclesModal(false)}
        >
          ×
        </button>
      </div>

      <div className="common-divider" />

      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {selectedVendorVehicles.vehicles && selectedVendorVehicles.vehicles.length > 0 ? (
          <table className="data-table" style={{ marginBottom: 0 }}>
            <thead>
              <tr>
                <th>Vehicle Number</th>
                <th>Vehicle Type</th>
                <th>Seats</th>
                <th>Condition</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {selectedVendorVehicles.vehicles.map((vehicle, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 12, color: "#1a1a1a" }}>
                      {vehicle.number || "N/A"}
                    </div>
                  </td>
                  <td style={{ fontSize: 12 }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        background: "#e0e7ff",
                        color: "#4f46e5",
                        borderRadius: 4,
                        fontWeight: 500,
                        fontSize: 11,
                      }}
                    >
                      {vehicle.type || "N/A"}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, fontWeight: 500 }}>
                    {vehicle.category === "Working" ? (
                      vehicle.type === "Mini Bus" ? "14" : vehicle.type === "Luxury" ? "5" : "7"
                    ) : "N/A"}
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        background:
                          vehicle.condition === "Good"
                            ? "#dcfce7"
                            : vehicle.condition === "Not working"
                              ? "#fee2e2"
                              : "#fef9c3",
                        color:
                          vehicle.condition === "Good"
                            ? "#15803d"
                            : vehicle.condition === "Not working"
                              ? "#b91c1c"
                              : "#b5860d",
                        borderRadius: 4,
                        fontWeight: 500,
                        fontSize: 11,
                      }}
                    >
                      {vehicle.condition === "Good"
                        ? "✓ Good"
                        : vehicle.condition === "Not working"
                          ? "✗ Not Working"
                          : "⚙ Under Repair"}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: "#666" }}>
                    <div style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {vehicle.accidents || "No accidents"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "#999" }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>No vehicles available</div>
            <div style={{ fontSize: 12 }}>There are no vehicles in this category for {selectedVendorVehicles.vendorName}</div>
          </div>
        )}
      </div>

      <div className="common-divider common-divider-footer" />

      <div className="common-footer">
        <button
          className="common-cancel-btn"
          onClick={() => setShowVehiclesModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>,
  document.body,
)}

      {/* VEHICLE MODAL */}
{showModal && editType === "vehicle" && (
  <AddVehicleModal
    key={`vehicle-${modalMode}-${editVehicle?.reg || "new"}`}
    onClose={() => setShowModal(false)}
    onSave={handleSave}
    editData={editVehicle}
    mode={modalMode}
  />
)}

{/* DRIVER MODAL */}
{showModal && editType === "driver" && (
  <DriverEditModal
    key={`driver-${modalMode}-${editVehicle?.phone || "new"}`}
    onClose={() => setShowModal(false)}
    editData={editVehicle}
    mode={modalMode}
    onSave={handleSaveDriver}
    onUpdate={handleUpdateDriver}
  />
)}

{/* BOOKING MODAL */}
{showModal && editType === "booking" && (
  <BookingEditModal
    key={`booking-${modalMode}-${editVehicle?.bookingId || "new"}`}
    onClose={() => setShowModal(false)}
    editData={editVehicle}
    mode={modalMode}
    onSave={handleSaveBooking}
    onUpdate={handleUpdateBooking}
  />
)}

{/* TRACKING MODAL */}
{showModal && editType === "tracking" && (
  <TrackingEditModal
    key={`tracking-${modalMode}-${editVehicle?.vehicle || "new"}`}
    onClose={() => setShowModal(false)}
    editData={editVehicle}
    onUpdate={handleUpdateTracking}
  />
)}

      {/* VENDOR MODAL */}
      {showVendorModal && (
        <VendorEditModal
          key={`vendor-${modalMode}-${editVendor?.phone || "new"}`}
          onClose={() => {
            setShowVendorModal(false);
            setEditVendor(null);
          }}
          editData={editVendor}
          mode={modalMode}
          onSave={handleSaveVendor}
          onUpdate={handleUpdateVendor}
        />
      )}

    </div>
  );
}
