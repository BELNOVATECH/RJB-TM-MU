import {
  useEffect,
  useState
} from "react";

import "./styles/BookGuide.css";

/* =========================
   DEFAULT GUIDES
========================= */

const defaultGuides = [

  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Temple History & Mythology",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    languages: ["Hindi", "English", "Sanskrit"],
    people: "1-10 people",
    desc:
      "Expert in Ramayana and ancient temple architecture.",
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
      "Specialized in family pilgrimages.",
    exp: "10 years",
    reviews: "189",
    price: "₹600/hr",
    rating: "4.8",
  },

];

/* =========================
   LANGUAGES
========================= */

const languages = [
  "All",
  "Hindi",
  "English",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Sanskrit",
];

/* =========================
   COMPONENT
========================= */

export default function GuideBooking({
  onBack
}) {

  /* =========================
     STATES
  ========================= */

  const [guides, setGuides] =
    useState(defaultGuides);

  const [selectedLang, setSelectedLang] =
    useState("All");

  const [selectedGuide, setSelectedGuide] =
    useState(null);

  const [bookingData, setBookingData] =
    useState({
      name: "",
      phone: "",
      date: "",
      people: "",
    });

  /* =========================
     LOAD REGISTERED GUIDES
  ========================= */

  useEffect(() => {

    const savedGuides =
      JSON.parse(
        localStorage.getItem(
          "tour_guides"
        )
      ) || [];

    setGuides([
      ...defaultGuides,
      ...savedGuides,
    ]);

  }, []);

  /* =========================
     FILTER
  ========================= */

  const filteredGuides =
    guides.filter((guide) => {

      if (selectedLang === "All")
        return true;

      return guide.languages.includes(
        selectedLang
      );

    });

  /* =========================
     BOOKING
  ========================= */

  const handleBooking = () => {

    if (
      !bookingData.name ||
      !bookingData.phone ||
      !bookingData.date ||
      !bookingData.people
    ) {

      alert(
        "Please fill all details"
      );

      return;
    }

    alert(
      `${selectedGuide.name} booked successfully`
    );

    setSelectedGuide(null);

    setBookingData({
      name: "",
      phone: "",
      date: "",
      people: "",
    });

  };

  /* =========================
     JSX
  ========================= */

  return (

    <div className="guide-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="guide-header">

        <div className="guide-top">

          <button
            className="guide-back"
            onClick={onBack}
          >
            <i className="ti ti-arrow-left"></i>
          </button>

          <div>

            <h2>
              Book a Guide
            </h2>

            <p>
              Find your spiritual companion
            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="guide-search">

          <i className="ti ti-search"></i>

          <input
            type="text"
            placeholder="Search guide"
          />

        </div>

        {/* TABS */}

        <div className="guide-tabs">

          {languages.map((lang) => (

            <button
              key={lang}
              className={`guide-tab ${
                selectedLang === lang
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedLang(lang)
              }
            >
              {lang}
            </button>

          ))}

        </div>

      </div>

      {/* =========================
          BODY
      ========================= */}

      <div className="guide-body">

        <div className="guide-list">

          {filteredGuides.map((guide) => (

            <div
              className="guide-card"
              key={guide.id}
            >

              {/* TOP */}

              <div className="guide-main">

                <div className="guide-left">

                  <img
                    src={guide.image}
                    alt=""
                    className="guide-image"
                  />

                  <div className="guide-info">

                    <h3>
                      {guide.name}
                    </h3>

                    <div className="guide-role">
                      {guide.role}
                    </div>

                    <div className="guide-tags">

                      <div className="guide-tag">

                        {Array.isArray(
                          guide.languages
                        )
                          ? guide.languages.join(", ")
                          : guide.languages}

                      </div>

                    </div>

                    <div className="guide-desc">
                      {guide.desc}
                    </div>

                  </div>

                </div>

                <div className="guide-rating">
                  ⭐ {guide.rating}
                </div>

              </div>

              {/* STATS */}

              <div className="guide-stats">

                <div className="guide-stat">

                  <h4>
                    {guide.exp}
                  </h4>

                  <p>
                    Experience
                  </p>

                </div>

                <div className="guide-stat">

                  <h4>
                    {guide.reviews}
                  </h4>

                  <p>
                    Reviews
                  </p>

                </div>

                <div className="guide-stat">

                  <h4>
                    {guide.price}
                  </h4>

                  <p>
                    Price
                  </p>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="guide-actions">

                <button className="call-btn">
                  Call
                </button>

                <button
                  className="book-btn"
                  onClick={() =>
                    setSelectedGuide(
                      guide
                    )
                  }
                >
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =========================
          MODAL
      ========================= */}

      {selectedGuide && (

        <div className="booking-overlay">

          <div className="booking-modal">

            <button
              className="close-btn"
              onClick={() =>
                setSelectedGuide(null)
              }
            >
              ✕
            </button>

            {/* TOP */}

            <div className="booking-top">

              <img
                src={selectedGuide.image}
                alt=""
                className="booking-image"
              />

              <div>

                <h2>
                  {selectedGuide.name}
                </h2>

                <p>
                  {selectedGuide.role}
                </p>

                <div className="booking-price">
                  {selectedGuide.price}
                </div>

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