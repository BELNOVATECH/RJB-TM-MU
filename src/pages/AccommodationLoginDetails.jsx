import { useEffect, useState } from "react";
import "./styles/AccommodationLoginDetails.css";

const PROFILE_KEY = "tourist_accommodation_current";
const ACCOMMODATION_PAYMENTS_KEY = "accommodation_payment_details";

function loadAccommodationPayments() {
  try {
    const data = JSON.parse(localStorage.getItem(ACCOMMODATION_PAYMENTS_KEY)) || [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function AccommodationLoginDetails({ onBack }) {

  const [profile, setProfile] = useState(null);

  const [activeTab, setActiveTab] = useState("");

  const [rooms, setRooms] = useState(() => {
    return JSON.parse(
      localStorage.getItem("accommodation_rooms")
    ) || [];
  });
  const [paymentDetails, setPaymentDetails] = useState(loadAccommodationPayments);

  const [hotelDetails, setHotelDetails] = useState(() => {

  return JSON.parse(
    localStorage.getItem("accommodation_hotel_details")
  ) || {

    image: "",
    description: "",
    address: "",
    distance: "",
    amenities: "",
    checkIn: "",
    checkOut: "",

  };

});

  const [roomForm, setRoomForm] = useState({
    roomNumber: "",
    roomType: "",
    price: "",
    beds: "",
    floor: "",
    acType: "",
    status: "",
    image: "",
    description: "",
  });

  useEffect(() => {

    const raw = localStorage.getItem(PROFILE_KEY);

    if (raw) {
      setProfile(JSON.parse(raw));
    }

    setPaymentDetails(loadAccommodationPayments());

  }, []);

  const safeProfile = profile || {
    propertyName: "Ayodhya Residency",
    ownerName: "Accommodation Service",
    accommodationType: "Hotel",
    totalRooms: "40",
    availableRooms: "12",
    city: "Ayodhya",
  };

 const handleSaveHotelDetails = () => {

  localStorage.setItem(
    "accommodation_hotel_details",
    JSON.stringify(hotelDetails)
  );

  alert("Hotel Details Saved");

};

  const handleAddRoom = () => {

   

    if (
      !roomForm.roomNumber ||
      !roomForm.roomType
    ) {
      alert("Please fill required fields");
      return;
    }

    const newRoom = {
      id: Date.now(),
      ...roomForm,
      hotelName: safeProfile.propertyName,
      owner: safeProfile.ownerName,
    };

    const updatedRooms = [...rooms, newRoom];

    setRooms(updatedRooms);

    localStorage.setItem(
      "accommodation_rooms",
      JSON.stringify(updatedRooms)
    );

    setRoomForm({
      roomNumber: "",
      roomType: "",
      price: "",
      beds: "",
      floor: "",
      acType: "",
      status: "",
      image: "",
      description: "",
    });

    alert("Room Added Successfully");

    setActiveTab("");
  };

  return (

    <div className="accommodation-dashboard">

      {/* SIDEBAR */}
      <aside className="accommodation-sidebar">

        <button
          className="accommodation-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="accommodation-profile-card">

          <div className="accommodation-avatar">
            🏨
          </div>

          <div className="accommodation-name">
            {safeProfile.propertyName}
          </div>

          <div className="accommodation-role">
            {safeProfile.accommodationType}
          </div>

        </div>

        <div className="accommodation-info-card">

          <div className="label">
            Owner
          </div>

          <div className="value">
            {safeProfile.ownerName}
          </div>

        </div>

        <div className="accommodation-info-card">

          <div className="label">
            City
          </div>

          <div className="value">
            {safeProfile.city}
          </div>

        </div>

      </aside>

      {/* MAIN */}
      <main className="accommodation-main">

        {/* HERO */}
        <section className="accommodation-hero">

          <div>

            <h1>
              Welcome Back 👋
            </h1>

            <p>
              Manage rooms, bookings,
              tourists and hospitality services.
            </p>

          </div>

          <button className="hero-btn">
            View Reports
          </button>

        </section>

        {/* STATS */}
        <div className="accommodation-stats">

          <div className="stat-card yellow">

            <span>Total Rooms</span>

            <strong>
              {rooms.length || safeProfile.totalRooms}
            </strong>

            <small>
              Registered rooms
            </small>

          </div>

          <div className="stat-card green">

            <span>Available Rooms</span>

            <strong>
              {
                rooms.filter(
                  (r) => r.status === "Available"
                ).length
              }
            </strong>

            <small>
              Ready for booking
            </small>

          </div>

          <div className="stat-card red">

            <span>Booked Rooms</span>

            <strong>
              {
                rooms.filter(
                  (r) => r.status === "Booked"
                ).length
              }
            </strong>

            <small>
              Currently occupied
            </small>

          </div>

          <div className="stat-card blue">

            <span>Revenue</span>

            <strong>
              ₹45,000
            </strong>

            <small>
              This month
            </small>

          </div>

        </div>

        {/* QUICK ACTIONS */}
        <section className="dashboard-card">

          <div className="section-title">
            Quick Actions
          </div>

          <div className="quick-actions">

            <button
              className={`quick-btn ${
                activeTab === "manual"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab(
                  activeTab === "manual"
                    ? ""
                    : "manual"
                )
              }
            >
              🛏 Manual Entry
            </button>

            <button
              className={`quick-btn ${
                activeTab === "payments"
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setPaymentDetails(loadAccommodationPayments());
                setActiveTab(
                  activeTab === "payments"
                    ? ""
                    : "payments"
                );
              }}
            >
              💳 Payments
            </button>

            <button
              className={`quick-btn ${
                activeTab === "tourists"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab(
                  activeTab === "tourists"
                    ? ""
                    : "tourists"
                )
              }
            >
              👥 Tourists
            </button>

            <button
              className={`quick-btn ${
                activeTab === "history"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab(
                  activeTab === "history"
                    ? ""
                    : "history"
                )
              }
            >
              🕘 History
            </button>

          </div>

        </section>

        

        {/* MANUAL ENTRY */}
        {activeTab === "manual" && (

          <section className="dashboard-card popup-card">

            <div className="popup-title">
              Manual Room Entry
            </div>

            <div className="popup-grid">

                {/* HOTEL DETAILS */}

<div className="form-span-full">
  <div className="popup-subtitle">
    Hotel Details
  </div>
</div>

<input
  className="popup-input"
  placeholder="Hotel Image URL"
  value={hotelDetails.image}
  onChange={(e) =>
    setHotelDetails({
      ...hotelDetails,
      image: e.target.value,
    })
  }
/>

<input
  className="popup-input"
  placeholder="Distance From Temple"
  value={hotelDetails.distance}
  onChange={(e) =>
    setHotelDetails({
      ...hotelDetails,
      distance: e.target.value,
    })
  }
/>

<input
  className="popup-input"
  placeholder="Hotel Address"
  value={hotelDetails.address}
  onChange={(e) =>
    setHotelDetails({
      ...hotelDetails,
      address: e.target.value,
    })
  }
/>

<input
  className="popup-input"
  placeholder="Amenities"
  value={hotelDetails.amenities}
  onChange={(e) =>
    setHotelDetails({
      ...hotelDetails,
      amenities: e.target.value,
    })
  }
/>

<input
  className="popup-input"
  placeholder="Check In Time"
  value={hotelDetails.checkIn}
  onChange={(e) =>
    setHotelDetails({
      ...hotelDetails,
      checkIn: e.target.value,
    })
  }
/>

<input
  className="popup-input"
  placeholder="Check Out Time"
  value={hotelDetails.checkOut}
  onChange={(e) =>
    setHotelDetails({
      ...hotelDetails,
      checkOut: e.target.value,
    })
  }
/>

<textarea
  className="popup-input popup-textarea"
  placeholder="Hotel Description"
  value={hotelDetails.description}
  onChange={(e) =>
    setHotelDetails({
      ...hotelDetails,
      description: e.target.value,
    })
  }
/>

<div className="form-span-full">
  <div className="popup-subtitle">
    Room Details
  </div>
</div>

              <input
                className="popup-input"
                placeholder="Room Number"
                value={roomForm.roomNumber}
                onChange={(e) =>
                  setRoomForm({
                    ...roomForm,
                    roomNumber: e.target.value,
                  })
                }
              />

              <select
                className="popup-input"
                value={roomForm.roomType}
                onChange={(e) =>
                  setRoomForm({
                    ...roomForm,
                    roomType: e.target.value,
                  })
                }
              >
                <option value="">
                  Room Type
                </option>

                <option>
                  Standard
                </option>

                <option>
                  Deluxe
                </option>

                <option>
                  Premium
                </option>

                <option>
                  VIP Suite
                </option>

              </select>

              <input
                className="popup-input"
                placeholder="Price"
                value={roomForm.price}
                onChange={(e) =>
                  setRoomForm({
                    ...roomForm,
                    price: e.target.value,
                  })
                }
              />

              <input
                className="popup-input"
                placeholder="Beds"
                value={roomForm.beds}
                onChange={(e) =>
                  setRoomForm({
                    ...roomForm,
                    beds: e.target.value,
                  })
                }
              />

              <input
                className="popup-input"
                placeholder="Floor"
                value={roomForm.floor}
                onChange={(e) =>
                  setRoomForm({
                    ...roomForm,
                    floor: e.target.value,
                  })
                }
              />

              <select
                className="popup-input"
                value={roomForm.acType}
                onChange={(e) =>
                  setRoomForm({
                    ...roomForm,
                    acType: e.target.value,
                  })
                }
              >
                <option value="">
                  AC Type
                </option>

                <option>
                  AC
                </option>

                <option>
                  Non AC
                </option>

              </select>

              <select
                className="popup-input"
                value={roomForm.status}
                onChange={(e) =>
                  setRoomForm({
                    ...roomForm,
                    status: e.target.value,
                  })
                }
              >
                <option value="">
                  Room Status
                </option>

                <option>
                  Available
                </option>

                <option>
                  Booked
                </option>

                <option>
                  Maintenance
                </option>

              </select>

              <input
                className="popup-input"
                placeholder="Image URL"
                value={roomForm.image}
                onChange={(e) =>
                  setRoomForm({
                    ...roomForm,
                    image: e.target.value,
                  })
                }
              />

              <textarea
                className="popup-input popup-textarea"
                placeholder="Room Description"
                value={roomForm.description}
                onChange={(e) =>
                  setRoomForm({
                    ...roomForm,
                    description: e.target.value,
                  })
                }
              />

            </div>

            <div className="popup-actions">

              <button
                className="dashboard-btn secondary"
                onClick={() =>
                  setActiveTab("")
                }
              >
                Cancel
              </button>

              <button
  className="dashboard-btn"
  onClick={() => {

    handleSaveHotelDetails();

    handleAddRoom();

  }}
>
  Save Hotel & Room
</button>

            </div>

          </section>

        )}

        {/* PAYMENTS */}
        {activeTab === "payments" && (

          <section className="dashboard-card popup-card">

            <div className="popup-title">
              Payment Details
            </div>

            {paymentDetails.length === 0 ? (
              <div className="payment-empty">
                No tourist accommodation payments yet.
              </div>
            ) : (
              <div className="owner-payment-list">
                {paymentDetails.map((payment) => (
                  <div className="owner-payment-card" key={payment.id}>
                    <div className="owner-payment-head">
                      <div>
                        <strong>{payment.guestName}</strong>
                        <p>
                          {payment.roomType} · {payment.checkIn || "-"} to {payment.checkOut || "-"}
                        </p>
                      </div>
                      <span>{payment.status}</span>
                    </div>

                    <div className="payment-stats">
                      <div className="payment-box">
                        <span>Total</span>
                        <strong>₹{payment.totalAmount}</strong>
                      </div>
                      <div className="payment-box">
                        <span>Advance</span>
                        <strong>₹{payment.advanceAmount}</strong>
                      </div>
                      <div className="payment-box">
                        <span>Remaining</span>
                        <strong>₹{payment.remainingAmount}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        )}

        {/* TOURISTS */}
        {activeTab === "tourists" && (

          <section className="dashboard-card popup-card">

            <div className="popup-title">
              Tourist Details
            </div>

            <div className="tourist-row">
              Ram Family • Room 102
            </div>

            <div className="tourist-row">
              Suresh Kumar • Room 205
            </div>

          </section>

        )}

        {/* HISTORY */}
        {activeTab === "history" && (

          <section className="dashboard-card popup-card">

            <div className="popup-title">
              Booking History
            </div>

            <div className="tourist-row">
              Room 101 booked on 12 May
            </div>

            <div className="tourist-row">
              Room 205 booked on 14 May
            </div>

          </section>

        )}

        {/* ADDED ROOMS */}
        <section className="dashboard-card">

          <div className="section-title">
            Added Rooms
          </div>

          <div className="added-room-list">

            {rooms.map((room) => (

              <div
                className="added-room-card"
                key={room.id}
              >

                <img
                  src={
                    room.image ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  }
                  alt=""
                />

                <div className="added-room-content">

                  <h4>
                    Room {room.roomNumber}
                  </h4>

                  <p>
                    {room.roomType} • ₹{room.price}
                  </p>

                  <span>
                    {room.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

