import { useState } from "react";
import "./styles/VehicleBooking.css";

const vehicles = [

  // ================= SEDAN =================

  {
    id: 1,
    name: "Honda City",
    driver: "Ravi Kumar (12 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
    type: "Sedan",
    seats: "5 Seater",
    fuel: "Petrol",
    transmission: "Automatic",
    rating: "4.7",
    driverRating: "4.8",
    priceDay: "₹2200",
    priceKm: "₹11",
    features: ["AC", "Music System", "GPS"],
  },

  {
    id: 2,
    name: "Hyundai Verna",
    driver: "Ajay Sharma (10 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200",
    type: "Sedan",
    seats: "5 Seater",
    fuel: "Diesel",
    transmission: "Manual",
    rating: "4.6",
    driverRating: "4.7",
    priceDay: "₹2400",
    priceKm: "₹12",
    features: ["AC", "Bluetooth", "Comfort Seats"],
  },

  // ================= SUV =================

  {
    id: 3,
    name: "Toyota Innova Crysta",
    driver: "Ramesh Kumar (15 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
    type: "SUV",
    seats: "7 Seater",
    fuel: "Diesel",
    transmission: "Automatic",
    rating: "4.8",
    driverRating: "4.9",
    priceDay: "₹3500",
    priceKm: "₹15",
    features: ["AC", "Music System", "GPS", "First Aid"],
  },

  {
    id: 4,
    name: "Mahindra Scorpio",
    driver: "Sandeep Yadav (14 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200",
    type: "SUV",
    seats: "7 Seater",
    fuel: "Diesel",
    transmission: "Manual",
    rating: "4.7",
    driverRating: "4.8",
    priceDay: "₹3200",
    priceKm: "₹14",
    features: ["AC", "GPS", "Power Windows"],
  },

  // ================= MUV =================

  {
    id: 5,
    name: "Maruti Ertiga",
    driver: "Suresh Singh (10 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200",
    type: "MUV",
    seats: "7 Seater",
    fuel: "Petrol",
    transmission: "Manual",
    rating: "4.6",
    driverRating: "4.7",
    priceDay: "₹2500",
    priceKm: "₹12",
    features: ["AC", "Music System", "Comfort Seats"],
  },

  {
    id: 6,
    name: "Kia Carens",
    driver: "Vikram Rao (9 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200",
    type: "MUV",
    seats: "6 Seater",
    fuel: "Diesel",
    transmission: "Automatic",
    rating: "4.7",
    driverRating: "4.8",
    priceDay: "₹2800",
    priceKm: "₹13",
    features: ["AC", "Touch Screen", "GPS"],
  },

  // ================= MINI BUS =================

  {
    id: 7,
    name: "Force Traveller",
    driver: "Naresh Patel (16 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200",
    type: "Mini Bus",
    seats: "17 Seater",
    fuel: "Diesel",
    transmission: "Manual",
    rating: "4.8",
    driverRating: "4.9",
    priceDay: "₹5500",
    priceKm: "₹22",
    features: ["AC", "Pushback Seats", "Music System"],
  },

  {
    id: 8,
    name: "Tempo Traveller",
    driver: "Rajesh Verma (18 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200",
    type: "Mini Bus",
    seats: "20 Seater",
    fuel: "Diesel",
    transmission: "Manual",
    rating: "4.9",
    driverRating: "5.0",
    priceDay: "₹6200",
    priceKm: "₹24",
    features: ["AC", "Charging Ports", "First Aid"],
  },

  // ================= LUXURY VAN =================

  {
    id: 9,
    name: "Toyota Vellfire",
    driver: "Arjun Mehta (12 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1200",
    type: "Luxury Van",
    seats: "7 Seater",
    fuel: "Hybrid",
    transmission: "Automatic",
    rating: "4.9",
    driverRating: "5.0",
    priceDay: "₹9000",
    priceKm: "₹35",
    features: ["Luxury Seats", "WiFi", "Mini Fridge"],
  },

  {
    id: 10,
    name: "Mercedes V-Class",
    driver: "Karan Malhotra (15 yrs exp)",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200",
    type: "Luxury Van",
    seats: "6 Seater",
    fuel: "Diesel",
    transmission: "Automatic",
    rating: "5.0",
    driverRating: "5.0",
    priceDay: "₹12000",
    priceKm: "₹40",
    features: ["Luxury Cabin", "WiFi", "Entertainment System"],
  },

];

const categories = [
  "All",
  "Sedan",
  "SUV",
  "MUV",
  "Mini Bus",
  "Luxury Van",
];

export default function VehicleBooking({ onBack }) {

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedVehicle, setSelectedVehicle] =
    useState(null);

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    date: "",
    pickup: "",
  });

  const filteredVehicles =
    selectedCategory === "All"
      ? vehicles
      : vehicles.filter(
          (vehicle) =>
            vehicle.type === selectedCategory
        );

  const handleBooking = () => {

    if (
      !bookingData.name ||
      !bookingData.phone ||
      !bookingData.date ||
      !bookingData.pickup
    ) {
      alert("Please fill all details");
      return;
    }

    alert(
      `${selectedVehicle.name} booked successfully`
    );

    setSelectedVehicle(null);

    setBookingData({
      name: "",
      phone: "",
      date: "",
      pickup: "",
    });
  };

  return (
    <div className="vehicle-page">

      {/* HEADER */}

      <div className="vehicle-header">

        <div className="vehicle-top">

          <button
            className="vehicle-back"
            onClick={onBack}
          >
            <i className="ti ti-arrow-left"></i>
          </button>

          <div>

            <h2>Book a Vehicle</h2>

            <p>
              Comfortable rides for your journey
            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="vehicle-search">

          <i className="ti ti-search"></i>

          <input
            type="text"
            placeholder="Search by vehicle name or type"
          />

        </div>

        {/* TABS */}

        <div className="vehicle-tabs">

          {categories.map((item) => (

            <button
              key={item}
              className={`vehicle-tab ${
                selectedCategory === item
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* BODY */}

      <div className="vehicle-body">

        <div className="vehicle-row">

          <div className="vehicle-count">
            {filteredVehicles.length} vehicles
            available
          </div>

          <button className="vehicle-filter-btn">

            <i className="ti ti-filter"></i>

            Filters

          </button>

        </div>

        {/* LIST */}

        <div className="vehicle-list">

          {filteredVehicles.map((vehicle) => (

            <div
              className="vehicle-card"
              key={vehicle.id}
            >

              {/* IMAGE */}

              <div className="vehicle-image-wrap">

                <img
                  src={vehicle.image}
                  alt=""
                  className="vehicle-image"
                />

                <div className="vehicle-badge">
                  Available
                </div>

                <div className="vehicle-type">
                  {vehicle.type}
                </div>

              </div>

              {/* DETAILS */}

              <div className="vehicle-content">

                <div className="vehicle-main-row">

                  <div>

                    <h3>{vehicle.name}</h3>

                    <p>{vehicle.driver}</p>

                  </div>

                  <div className="vehicle-rating">

                    <i className="ti ti-star-filled"></i>

                    {vehicle.rating}

                  </div>

                </div>

                {/* INFO */}

                <div className="vehicle-info-grid">

                  <div>
                    <i className="ti ti-users"></i>
                    {vehicle.seats}
                  </div>

                  <div>
                    <i className="ti ti-fuel-station"></i>
                    {vehicle.fuel}
                  </div>

                  <div>
                    <i className="ti ti-settings"></i>
                    {vehicle.transmission}
                  </div>

                </div>

                {/* FEATURES */}

                <div className="vehicle-features">

                  {vehicle.features.map((feature) => (

                    <span key={feature}>
                      {feature}
                    </span>

                  ))}

                </div>

                {/* PRICE */}

                <div className="vehicle-price-box">

                  <div>

                    <p>Per Day</p>

                    <h4>{vehicle.priceDay}</h4>

                  </div>

                  <div>

                    <p>Per Kilometer</p>

                    <h4>{vehicle.priceKm}</h4>

                  </div>

                </div>

                {/* DRIVER */}

                <div className="driver-rating">

                  <i className="ti ti-shield-check"></i>

                  Driver Rating:
                  <span>
                    ⭐ {vehicle.driverRating}
                  </span>

                </div>

                {/* ACTIONS */}

                <div className="vehicle-actions">

                  <button className="call-driver-btn">

                    <i className="ti ti-phone"></i>

                    Call Driver

                  </button>

                  <button
                    className="book-vehicle-btn"
                    onClick={() =>
                      setSelectedVehicle(vehicle)
                    }
                  >
                    Book Now
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* BOOKING POPUP */}

      {selectedVehicle && (

        <div className="booking-overlay">

          <div className="vehicle-modal">

            <button
              className="close-btn"
              onClick={() =>
                setSelectedVehicle(null)
              }
            >
              ✕
            </button>

            <img
              src={selectedVehicle.image}
              alt=""
              className="vehicle-popup-image"
            />

            <h2>{selectedVehicle.name}</h2>

            <p>{selectedVehicle.driver}</p>

            <div className="vehicle-price-row">

              <div>

                <span>Per Day</span>

                <h3>
                  {selectedVehicle.priceDay}
                </h3>

              </div>

              <div>

                <span>Per KM</span>

                <h3>
                  {selectedVehicle.priceKm}
                </h3>

              </div>

            </div>

            {/* FORM */}

            <div className="booking-form">

              <input
                type="text"
                placeholder="Your Name"
                value={bookingData.name}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={bookingData.phone}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    phone: e.target.value,
                  })
                }
              />

              <input
                type="date"
                value={bookingData.date}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    date: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Pickup Location"
                value={bookingData.pickup}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    pickup: e.target.value,
                  })
                }
              />
               <input
                type="text"
                placeholder="Dropoff Location"
                value={bookingData.dropoff}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    dropoff: e.target.value,
                  })
                }
              />

              <button
                className="confirm-booking-btn"
                onClick={handleBooking}
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