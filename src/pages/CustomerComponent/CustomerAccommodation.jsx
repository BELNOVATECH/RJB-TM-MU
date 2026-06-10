import React, { useState } from "react";
import "../styles/CustomerPages.css";

const ACCOMMODATION_PAYMENTS_KEY = "accommodation_payment_details";
const ADVANCE_PERCENT = 30;
const DEFAULT_ROOM_CAPACITY = 2;
const DEFAULT_EXTRA_GUEST_CHARGE = 250;

const ROOM_PRICE_RULES = {
  "Standard Room": { capacity: 2, extraGuestCharge: 200 },
  Standard: { capacity: 2, extraGuestCharge: 200 },
  "Deluxe Room": { capacity: 3, extraGuestCharge: 350 },
  Deluxe: { capacity: 3, extraGuestCharge: 350 },
  "Family Suite": { capacity: 6, extraGuestCharge: 500 },
  "VIP Cottage": { capacity: 4, extraGuestCharge: 600 },
  "Dormitory Bed": { capacity: 1, extraGuestCharge: 0 },
  Premium: { capacity: 4, extraGuestCharge: 600 },
  Medium: { capacity: 3, extraGuestCharge: 350 },
  Homestay: { capacity: 2, extraGuestCharge: 150 },
};

function parseAmount(value, fallback = 0) {
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getNightCount(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 1;

  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 1);
}

function getRoomRule(roomName) {
  return ROOM_PRICE_RULES[roomName] || {};
}

function normalizeRoom(room) {
  const rule = getRoomRule(room?.name);
  return {
    ...room,
    name: room?.name || "Standard Room",
    price: parseAmount(room?.price, 0),
    capacity: Math.max(
      parseAmount(room?.capacity, rule.capacity || DEFAULT_ROOM_CAPACITY),
      1
    ),
    extraGuestCharge: parseAmount(
      room?.extraGuestCharge,
      rule.extraGuestCharge ?? DEFAULT_EXTRA_GUEST_CHARGE
    ),
    left: parseAmount(room?.left, 1),
    image: isLegacyStayImage(room?.image) ? "" : room?.image || "",
  };
}

function getSelectedRoom(item, roomName) {
  return item?.rooms?.find((room) => room.name === roomName) || null;
}

function getPaymentSummary(item, booking) {
  const selectedRoom = getSelectedRoom(item, booking.room);
  const baseAmount = parseAmount(selectedRoom?.price, 5000);
  const guestCount = Math.max(parseAmount(booking.guests, 1), 1);
  const nights = getNightCount(booking.checkIn, booking.checkOut);
  const capacity = Math.max(
    parseAmount(
      selectedRoom?.capacity,
      getRoomRule(selectedRoom?.name).capacity || DEFAULT_ROOM_CAPACITY
    ),
    1
  );
  const extraGuestCharge = parseAmount(
    selectedRoom?.extraGuestCharge,
    getRoomRule(selectedRoom?.name).extraGuestCharge ?? DEFAULT_EXTRA_GUEST_CHARGE
  );
  const extraGuests = Math.max(guestCount - capacity, 0);
  const extraGuestAmount = extraGuests * extraGuestCharge * nights;
  const stayAmount = baseAmount * nights;
  const totalAmount = stayAmount + extraGuestAmount;
  const advanceAmount = Math.round(totalAmount * (ADVANCE_PERCENT / 100));

  return {
    selectedRoom,
    baseAmount,
    nights,
    capacity,
    guestCount,
    extraGuests,
    extraGuestCharge,
    extraGuestAmount,
    stayAmount,
    totalAmount,
    advanceAmount,
    remainingAmount: Math.max(totalAmount - advanceAmount, 0),
  };
}

function saveAccommodationPayment(payment) {
  const existing =
    JSON.parse(localStorage.getItem(ACCOMMODATION_PAYMENTS_KEY)) || [];
  const list = Array.isArray(existing) ? existing : [];
  localStorage.setItem(
    ACCOMMODATION_PAYMENTS_KEY,
    JSON.stringify([payment, ...list])
  );
}

const STAY_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1400",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1400",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1400",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1400",
];

function isLegacyStayImage(image) {
  const value = String(image || "").toLowerCase();
  return (
    value.includes("/assets/") ||
    value.includes("temple") ||
    value.includes("rjb") ||
    value.includes("ashram") ||
    value.includes("bhawan") ||
    value.includes("ghat") ||
    value.includes("kund") ||
    value.includes("banner")
  );
}

function resolveStayImage(type, index = 0) {
  const name = String(type || "").toLowerCase();
  const baseIndex = name.includes("resort")
    ? 3
    : name.includes("lodge")
      ? 7
      : name.includes("dharamshala")
        ? 2
        : name.includes("guest")
          ? 1
          : name.includes("homestay")
            ? 6
            : 4;
  return STAY_IMAGE_POOL[(baseIndex + index) % STAY_IMAGE_POOL.length];
}

const hotelDetails =
  JSON.parse(localStorage.getItem("accommodation_hotel_details")) || {};

const savedRooms =
  JSON.parse(localStorage.getItem("accommodation_rooms")) || [];

const currentHotel =
  JSON.parse(localStorage.getItem("tourist_accommodation_current")) || {};

const fallbackDynamicRooms = [
  { name: "Premium", price: 1233, left: 2, capacity: 2, extraGuestCharge: 250 },
  { name: "Standard Room", price: 800, left: 4, capacity: 2, extraGuestCharge: 200 },
  { name: "Deluxe Room", price: 1500, left: 3, capacity: 3, extraGuestCharge: 350 },
  { name: "Homestay", price: 600, left: 6, capacity: 2, extraGuestCharge: 150 },
];

const dynamicAccommodation = {
  id: 999,
  name: currentHotel.propertyName || "Spiritual Stay",
  type: currentHotel.accommodationType || "Hotel",
  image:
    !isLegacyStayImage(hotelDetails.image)
      ? hotelDetails.image
      : resolveStayImage(currentHotel.accommodationType || currentHotel.propertyName, 0),
  rating: 4.8,
  reviews: 124,
  distance: hotelDetails.distance || "0.5 km",
  desc:
    hotelDetails.description ||
    "Comfortable spiritual stay near temple area.",
  amenities: hotelDetails.amenities
    ? hotelDetails.amenities.split(",")
    : ["Free WiFi", "AC Rooms"],
  rooms:
    savedRooms.length > 0
      ? savedRooms.map((room) =>
          normalizeRoom({
            name: room.roomType,
            price: room.price,
            capacity: room.beds,
            left: room.beds || 1,
            image: room.image,
          })
        )
      : fallbackDynamicRooms,
};

const baseAccommodations = [
  {
    id: 1,
    name: "Spiritual Guest House",
    type: "Guest House",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    rating: 4.8,
    reviews: 234,
    distance: "0.5 km",
    desc:
      "Peaceful accommodation with spiritual ambiance, perfect for pilgrims seeking comfort and tranquility.",
    amenities: [
      "Free WiFi",
      "AC Rooms",
      "Restaurant",
      "24/7 Water",
      "Prayer Room",
      "+1 more",
    ],
    rooms: [
      { name: "Premium", price: 8000, left: 2 },
      { name: "Medium", price: 4000, left: 4 },
      { name: "Standard", price: 2000, left: 6 },
      { name: "Homestay", price: 1500, left: 8 },
    ],
  },
  {
    id: 2,
    name: "Rama Darshan Hotel",
    type: "Hotel",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200",
    rating: 4.5,
    reviews: 156,
    distance: "1.2 km",
    desc:
      "Modern hotel providing all basic amenities with a beautiful view of the temple.",
    amenities: ["Free WiFi", "AC Rooms", "Room Service", "Parking"],
    rooms: [
      { name: "Premium", price: 8500, left: 3 },
      { name: "Medium", price: 4500, left: 5 },
      { name: "Standard", price: 2200, left: 7 },
      { name: "Homestay", price: 1600, left: 9 },
    ],
  },
  {
    id: 3,
    name: "Sita Ram Dharamshala",
    type: "Dharamshala",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200",
    rating: 4.2,
    reviews: 420,
    distance: "0.2 km",
    desc:
      "Traditional stay with free meals provided daily. Very close to the main temple complex.",
    amenities: ["Free Meals", "Locker", "Shared Bathroom", "24/7 Water"],
    rooms: [
      { name: "Premium", price: 7000, left: 2 },
      { name: "Medium", price: 3500, left: 4 },
      { name: "Standard", price: 1800, left: 8 },
      { name: "Homestay", price: 1200, left: 10 },
    ],
  },
  {
    id: 4,
    name: "Ayodhya Residency",
    type: "Hotel",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
    rating: 4.7,
    reviews: 310,
    distance: "0.8 km",
    desc: "Luxury stay with spacious rooms and peaceful surroundings.",
    amenities: ["Swimming Pool", "Restaurant", "Gym", "Free Parking"],
    rooms: [
      { name: "Premium", price: 9000, left: 3 },
      { name: "Medium", price: 5000, left: 5 },
      { name: "Standard", price: 2500, left: 6 },
      { name: "Homestay", price: 1700, left: 7 },
    ],
  },
  {
    id: 5,
    name: "Bhakti Inn",
    type: "Guest House",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
    rating: 4.4,
    reviews: 198,
    distance: "1 km",
    desc: "Affordable and comfortable rooms ideal for families and pilgrims.",
    amenities: ["WiFi", "AC", "Temple View", "Hot Water"],
    rooms: [
      { name: "Premium", price: 7500, left: 2 },
      { name: "Medium", price: 3800, left: 4 },
      { name: "Standard", price: 1900, left: 5 },
      { name: "Homestay", price: 1400, left: 8 },
    ],
  },
  {
    id: 6,
    name: "Temple View Stay",
    type: "Hotel",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200",
    rating: 4.6,
    reviews: 275,
    distance: "0.4 km",
    desc: "Beautiful rooms with direct temple-facing balconies.",
    amenities: ["Temple View", "Breakfast", "Free WiFi", "Parking"],
    rooms: [
      { name: "Premium", price: 9500, left: 1 },
      { name: "Medium", price: 4800, left: 4 },
      { name: "Standard", price: 2400, left: 5 },
      { name: "Homestay", price: 1800, left: 6 },
    ],
  },
  {
    id: 7,
    name: "Divine Comfort Lodge",
    type: "Lodge",
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1200",
    rating: 4.1,
    reviews: 145,
    distance: "1.5 km",
    desc: "Simple and budget-friendly lodge for short spiritual trips.",
    amenities: ["Free Water", "Fan Rooms", "Parking", "24/7 Check-in"],
    rooms: [
      { name: "Premium", price: 6000, left: 2 },
      { name: "Medium", price: 3200, left: 5 },
      { name: "Standard", price: 1500, left: 7 },
      { name: "Homestay", price: 1000, left: 10 },
    ],
  },
  {
    id: 8,
    name: "Shree Ram Palace",
    type: "Resort",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    rating: 4.9,
    reviews: 540,
    distance: "2 km",
    desc: "Premium resort with luxury amenities and devotional atmosphere.",
    amenities: ["Spa", "Pool", "Luxury Dining", "Free WiFi"],
    rooms: [
      { name: "Premium", price: 12000, left: 2 },
      { name: "Medium", price: 6500, left: 4 },
      { name: "Standard", price: 3200, left: 5 },
      { name: "Homestay", price: 2500, left: 6 },
    ],
  },
  {
    id: 9,
    name: "Pilgrim Rest House",
    type: "Guest House",
    image:
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1200",
    rating: 4.0,
    reviews: 112,
    distance: "0.7 km",
    desc: "Clean and economical accommodation for temple visitors.",
    amenities: ["Shared Kitchen", "Free WiFi", "Laundry", "Hot Water"],
    rooms: [
      { name: "Premium", price: 6800, left: 2 },
      { name: "Medium", price: 3400, left: 5 },
      { name: "Standard", price: 1700, left: 7 },
      { name: "Homestay", price: 1200, left: 9 },
    ],
  },
  {
    id: 10,
    name: "Sacred Stay Homes",
    type: "Homestay",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
    rating: 4.3,
    reviews: 187,
    distance: "1.8 km",
    desc:
      "Warm family-style homestay with homemade food and peaceful rooms.",
    amenities: ["Homely Food", "WiFi", "Garden", "Family Rooms"],
    rooms: [
      { name: "Premium", price: 7200, left: 2 },
      { name: "Medium", price: 3600, left: 4 },
      { name: "Standard", price: 1800, left: 6 },
      { name: "Homestay", price: 1300, left: 8 },
    ],
  },
];

const accommodations = [dynamicAccommodation, ...baseAccommodations].map((item) => ({
  ...item,
  image:
    item.id === 999
      ? item.image
      : resolveStayImage(item.type, item.id),
  rooms: (item.rooms || []).map(normalizeRoom),
}));

const initialBooking = (item = null) => ({
  room: item?.rooms?.[0]?.name || "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  guestName: "",
  mobile: "",
});

export default function CustomerAccommodation({ onBack }) {
  const tabs = ["All", "Hotel", "Guest House", "Dharamshala", "Cottage"];
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [bookingData, setBookingData] = useState(initialBooking(dynamicAccommodation));
  const [selectedItem, setSelectedItem] = useState(null);

  const paymentSummary = getPaymentSummary(selectedItem, bookingData);

  const openBookingModal = (item) => {
    setSelectedItem(item);
    setShowPayment(false);
    setAcceptPolicy(false);
    setPaymentMethod("UPI");
    setBookingData(initialBooking(item));
  };

  const closeBookingModal = () => {
    setSelectedItem(null);
    setShowPayment(false);
    setAcceptPolicy(false);
    setPaymentMethod("UPI");
    setBookingData(initialBooking(dynamicAccommodation));
  };

  const filteredData = accommodations.filter((item) => {
    const matchesTab = activeTab === "All" || item.type === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          <div className="cp-vehicle-grid">
            {filteredData.map((item) => (
              <div className="cp-card" key={item.id}>
                <div className="cp-card-img">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div className="cp-card-tags">
                    <span
                      className="cp-tag"
                      style={{ display: "flex", gap: "4px", alignItems: "center" }}
                    >
                      <i className="ti ti-star-filled" style={{ color: "#facc15" }}></i>{" "}
                      {item.rating}{" "}
                      <span style={{ color: "#9ca3af", fontWeight: 400 }}>
                        ({item.reviews})
                      </span>
                    </span>
                    <span className="cp-tag">{item.type}</span>
                  </div>
                </div>

                <div className="cp-card-body">
                  <div className="cp-card-title">{item.name}</div>

                  <div className="cp-card-subtitle">
                    <i className="ti ti-map-pin"></i> {item.distance} from temple
                  </div>

                  <div className="cp-card-desc">{item.desc}</div>

                  <div className="cp-amenities">
                    {item.amenities.map((amenity) => (
                      <span className="cp-amenity" key={amenity}>
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="cp-room-section">
                    <div className="cp-room-header">Room Types & Pricing</div>

                    {item.rooms.map((room) => (
                      <div className="cp-room-item" key={room.name}>
                        <div className="cp-room-name">
                          <i className="ti ti-bed"></i> {room.name}
                        </div>
                        <div className="cp-room-price">
                          ₹{room.price}/night{" "}
                          <span className="cp-room-left">{room.left} left</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "16px",
                    }}
                  >
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
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="cp-modal-overlay">
          <div className="cp-modal-content accommodation-booking-modal">
            <button
              className="cp-modal-close accommodation-modal-close"
              onClick={closeBookingModal}
            >
              <i className="ti ti-x"></i>
            </button>

            {!showPayment ? (
              <>
                <div className="accommodation-booking-top">
                  <div>
                    <div className="accommodation-booking-eyebrow">
                      Accommodation booking
                    </div>
                    <h2>Book Room at {selectedItem.name}</h2>
                    <p>
                      Choose a room, add guests, and review the price before confirming payment.
                    </p>
                  </div>
                </div>

                <div className="accommodation-hotel-summary">
                  <div>
                    <span>Hotel</span>
                    <strong>{selectedItem.name}</strong>
                  </div>
                  <div>
                    <span>Type</span>
                    <strong>{selectedItem.type}</strong>
                  </div>
                  <div>
                    <span>Distance</span>
                    <strong>{selectedItem.distance} from temple</strong>
                  </div>
                </div>

                <div className="cp-modal-body accommodation-booking-body">
                  <div className="accommodation-price-strip">
                    <div>
                      <span>Room Price</span>
                      <strong>₹{paymentSummary.baseAmount}</strong>
                    </div>
                    <div>
                      <span>Stay Nights</span>
                      <strong>{paymentSummary.nights}</strong>
                    </div>
                    <div>
                      <span>Stay Amount</span>
                      <strong>₹{paymentSummary.stayAmount}</strong>
                    </div>
                    <div>
                      <span>Included Guests</span>
                      <strong>{paymentSummary.capacity}</strong>
                    </div>
                    <div>
                      <span>Extra Guest Charge</span>
                      <strong>₹{paymentSummary.extraGuestCharge}</strong>
                    </div>
                    <div>
                      <span>Extra Guests</span>
                      <strong>{paymentSummary.extraGuests}</strong>
                    </div>
                  </div>

                  <div className="cp-form-group">
                    <label className="cp-form-label">Select Room</label>
                    <select
                      className="cp-form-input"
                      value={bookingData.room}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          room: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Room</option>
                      {selectedItem.rooms.map((room) => (
                        <option key={room.name} value={room.name}>
                          {room.name} - ₹{room.price}/night
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="cp-modal-grid">
                    <div className="cp-form-group">
                      <label className="cp-form-label">Check-in Date</label>
                      <input
                        type="date"
                        className="cp-form-input"
                        value={bookingData.checkIn}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            checkIn: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="cp-form-group">
                      <label className="cp-form-label">Check-out Date</label>
                      <input
                        type="date"
                        className="cp-form-input"
                        value={bookingData.checkOut}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            checkOut: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="cp-modal-grid">
                    <div className="cp-form-group">
                      <label className="cp-form-label">Guest Name</label>
                      <input
                        type="text"
                        className="cp-form-input"
                        placeholder="Enter full name"
                        value={bookingData.guestName}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            guestName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="cp-form-group">
                      <label className="cp-form-label">Mobile Number</label>
                      <input
                        type="text"
                        className="cp-form-input"
                        placeholder="Enter mobile number"
                        value={bookingData.mobile}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            mobile: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="cp-modal-grid">
                    <div className="cp-form-group">
                      <label className="cp-form-label">Guests</label>
                      <input
                        type="number"
                        min="1"
                        className="cp-form-input"
                        placeholder="E.g. 2"
                        value={bookingData.guests}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            guests: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="cp-form-group">
                      <label className="cp-form-label">Total Amount</label>
                      <input
                        type="text"
                        className="cp-form-input"
                        readOnly
                        value={`₹${paymentSummary.totalAmount} (${paymentSummary.nights} night${paymentSummary.nights > 1 ? "s" : ""})`}
                      />
                    </div>
                  </div>

                  <div className="accommodation-note-box">
                    Total = room price × stay nights + extra guest charges × stay nights. Extra guest charges are added automatically when the selected room capacity is exceeded.
                  </div>

                  <div className="accommodation-policy-box">
                    <h4>Booking Policy</h4>
                    <div className="accommodation-policy-list">
                      <p>• Advance payment is required to confirm booking.</p>
                      <p>• Advance payment is non-refundable.</p>
                      <p>• Remaining payment should be paid at check-in.</p>
                      <p>• Date changes depend on availability.</p>
                    </div>

                    <label className="accommodation-policy-check">
                      <input
                        type="checkbox"
                        checked={acceptPolicy}
                        onChange={(e) => setAcceptPolicy(e.target.checked)}
                      />
                      <span>I agree to booking policy & cancellation terms</span>
                    </label>
                  </div>
                </div>

                <div className="cp-modal-footer accommodation-modal-footer">
                  <button className="cp-btn-outline" onClick={closeBookingModal}>
                    Cancel
                  </button>
                  <button
                    className="cp-btn-primary"
                    onClick={() => {
                      if (!bookingData.room || !bookingData.guestName || !bookingData.mobile) {
                        alert("Please fill all details");
                        return;
                      }

                      if (!acceptPolicy) {
                        alert("Please accept booking policy");
                        return;
                      }

                      setShowPayment(true);
                    }}
                  >
                    Continue Payment
                  </button>
                </div>
              </>
            ) : (
              <div className="accommodation-payment-screen">
                <div className="accommodation-payment-header">
                  <h2>Advance Payment</h2>
                  <p>Secure your accommodation booking</p>
                </div>

                <div className="accommodation-payment-summary-card">
                  <div className="accommodation-payment-row">
                    <span>Total Amount</span>
                    <strong>₹{paymentSummary.totalAmount}</strong>
                  </div>
                  <div className="accommodation-payment-row">
                    <span>Room × Nights</span>
                    <strong>₹{paymentSummary.stayAmount}</strong>
                  </div>
                  <div className="accommodation-payment-row">
                    <span>Extra Guest Charges</span>
                    <strong>₹{paymentSummary.extraGuestAmount}</strong>
                  </div>
                  <div className="accommodation-payment-row advance">
                    <span>Advance Payment ({ADVANCE_PERCENT}%)</span>
                    <strong>₹{paymentSummary.advanceAmount}</strong>
                  </div>
                  <div className="accommodation-payment-row remain">
                    <span>Remaining Amount</span>
                    <strong>₹{paymentSummary.remainingAmount}</strong>
                  </div>
                </div>

                <div className="accommodation-payment-policy">
                  <h3>Booking Policy</h3>
                  <ul>
                    <li>Advance payment required to confirm booking.</li>
                    <li>Advance payment is non-refundable.</li>
                    <li>Remaining payment at hotel check-in.</li>
                    <li>Date changes depend on availability.</li>
                  </ul>
                  <label className="accommodation-payment-checkbox">
                    <input
                      type="checkbox"
                      checked={acceptPolicy}
                      onChange={(e) => setAcceptPolicy(e.target.checked)}
                    />
                    <span>I agree to booking policy & cancellation terms</span>
                  </label>
                </div>

                <div className="accommodation-payment-method-title">Select Payment Method</div>
                <div className="accommodation-payment-methods">
                  {["UPI", "Card", "Net Banking"].map((method) => (
                    <button
                      key={method}
                      className={paymentMethod === method ? "active" : ""}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <button
                  className="accommodation-payment-btn"
                  onClick={() => {
                    if (!acceptPolicy) {
                      alert("Please accept booking policy");
                      return;
                    }

                    saveAccommodationPayment({
                      id: `ACCPAY-${Date.now()}`,
                      propertyName: selectedItem.name,
                      guestName: bookingData.guestName,
                      mobile: bookingData.mobile,
                      roomType: bookingData.room,
                      checkIn: bookingData.checkIn,
                      checkOut: bookingData.checkOut,
                      guests: bookingData.guests,
                      totalAmount: paymentSummary.totalAmount,
                      advanceAmount: paymentSummary.advanceAmount,
                      remainingAmount: paymentSummary.remainingAmount,
                      paymentMode: paymentMethod,
                      status: "Advance Paid",
                      createdAt: new Date().toISOString(),
                    });

                    alert("Payment Successful");
                    closeBookingModal();
                  }}
                >
                  Pay Advance ₹{paymentSummary.advanceAmount}
                </button>

                <button
                  className="accommodation-payment-back-btn"
                  onClick={() => setShowPayment(false)}
                  type="button"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
