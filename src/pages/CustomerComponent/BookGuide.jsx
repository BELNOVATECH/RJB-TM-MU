import { useState } from "react";
import "../styles/BookGuide.css";

const guides = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Temple History & Mythology",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    languages: ["Hindi", "English", "Sanskrit"],
    people: "1-10 people",
    desc:
      "Expert in Ramayana and ancient temple architecture with deep knowledge of spiritual practices.",
    exp: "15 years",
    reviews: "234",
    price: "₹500/hr",
    rating: "4.9",
  },

  {
    id: 2,
    name: "Priya Sharma",
    role: "Family Tours & Rituals",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    languages: ["Hindi", "English", "Gujarati"],
    people: "1-15 people",
    desc:
      "Specialized in family pilgrimages and traditional rituals with patient and friendly approach.",
    exp: "10 years",
    reviews: "189",
    price: "₹600/hr",
    rating: "4.8",
  },

  {
    id: 3,
    name: "Sai Teja",
    role: "South Temple Specialist",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
    languages: ["Telugu", "Tamil", "English"],
    people: "1-12 people",
    desc:
      "Experienced in Tirupati and South Indian temple traditions.",
    exp: "8 years",
    reviews: "120",
    price: "₹450/hr",
    rating: "4.7",
  },
];

const languages = [
  "All",
  "Hindi",
  "English",
  "Sanskrit",
  "Gujarati",
  "Tamil",
  "Bengali",
  "Telugu",
];

export default function GuideBooking({ onBack }) {

  const [selectedLang, setSelectedLang] = useState("All");

  const [selectedGuide, setSelectedGuide] = useState(null);

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    date: "",
    people: "",
  });

  const filteredGuides =
    selectedLang === "All"
      ? guides
      : guides.filter((guide) =>
          guide.languages.includes(selectedLang)
        );
const handleBooking = async () => {
  if (
    !bookingData.name ||
    !bookingData.phone ||
    !bookingData.date ||
    !bookingData.people
  ) {
    alert("Please fill all details");
    return;
  }

  const options = {
    key: "rzp_test_SzZpFgmKbp4uK3", // Test Key

    amount: 50000, // ₹500 = 500 * 100

    currency: "INR",

    name: "Ram Janmabhoomi Temple",

    description: `Guide Booking - ${selectedGuide.name}`,

    handler: function (response) {

      alert(
        "Payment Successful\nPayment ID: " +
          response.razorpay_payment_id
      );

      setSelectedGuide(null);
    },

    prefill: {
      name: bookingData.name,
      contact: bookingData.phone,
    },

    theme: {
      color: "#ff9933",
    },
  };

  const paymentObject = new window.Razorpay(options);

  paymentObject.open();
};
  return (
    <div className="guide-page">

      {/* HEADER */}
      <div className="guide-header">

        <div className="guide-top">

          <button
            className="guide-back"
            onClick={onBack}
          >
            <i className="ti ti-arrow-left"></i>
          </button>

          <div>
            <h2>Book a Guide</h2>
            <p>Find your spiritual companion</p>
          </div>

        </div>

        {/* SEARCH */}
        <div className="guide-search">

          <i className="ti ti-search"></i>

          <input
            type="text"
            placeholder="Search by name or specialization"
          />

        </div>

        {/* LANGUAGE TABS */}
        <div className="guide-tabs">

          {languages.map((lang) => (
            <button
              key={lang}
              className={`guide-tab ${
                selectedLang === lang ? "active" : ""
              }`}
              onClick={() => setSelectedLang(lang)}
            >
              {lang}
            </button>
          ))}

        </div>

      </div>

      {/* BODY */}
      <div className="guide-body">

        <div className="guide-top-row">

          <div className="guide-count">
            {filteredGuides.length} guides available
          </div>

          <button className="filter-btn">
            <i className="ti ti-adjustments-horizontal"></i>
            Filters
          </button>

        </div>

        {/* GUIDE LIST */}
        <div className="guide-list">

          {filteredGuides.map((guide) => (

            <div className="guide-card" key={guide.id}>

              {/* MAIN */}
              <div className="guide-main">

                {/* LEFT */}
                <div className="guide-left">

                  <div className="guide-image-wrap">

                    <img
                      src={guide.image}
                      alt=""
                      className="guide-image"
                    />

                    <div className="available-badge">
                      Available Today
                    </div>

                  </div>

                  <div className="guide-info">

                    <h3>{guide.name}</h3>

                    <div className="guide-role">
                      {guide.role}
                    </div>

                    {/* TAGS */}
                    <div className="guide-tags">

                      <div className="guide-tag">
                        <i className="ti ti-language"></i>
                        {guide.languages.join(", ")}
                      </div>

                      <div className="guide-tag">
                        <i className="ti ti-users"></i>
                        {guide.people}
                      </div>

                    </div>

                    <div className="guide-desc">
                      {guide.desc}
                    </div>

                  </div>

                </div>

                {/* RATING */}
                <div className="guide-rating">

                  <i className="ti ti-star-filled"></i>

                  {guide.rating}

                </div>

              </div>

              {/* STATS */}
              <div className="guide-stats">

                <div className="guide-stat">

                  <h4>{guide.exp}</h4>

                  <p>Experience</p>

                </div>

                <div className="guide-stat">

                  <h4>{guide.reviews}</h4>

                  <p>Reviews</p>

                </div>

                <div className="guide-stat">

                  <h4 className="price">
                    {guide.price}
                  </h4>

                  <p>Price</p>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="guide-actions">

                <button className="call-btn">

                  <i className="ti ti-phone"></i>

                  Call

                </button>

                <button
                  className="book-btn"
                  onClick={() => setSelectedGuide(guide)}
                >
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* BOOKING MODAL */}

      {selectedGuide && (

        <div className="booking-overlay">

          <div className="booking-modal">

            <button
              className="close-btn"
              onClick={() => setSelectedGuide(null)}
            >
              ✕
            </button>

            <div className="booking-top">

              <img
                src={selectedGuide.image}
                alt=""
                className="booking-image"
              />

              <div>

                <h2>{selectedGuide.name}</h2>

                <p>{selectedGuide.role}</p>

                <div className="booking-price">
                  {selectedGuide.price}
                </div>

              </div>

            </div>

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
                type="number"
                placeholder="No of People"
                value={bookingData.people}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    people: e.target.value,
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