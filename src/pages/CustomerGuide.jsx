import { useState } from "react";
import "./styles/BookGuide.css";

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
      "Specialized in family pilgrimages and traditional rituals.",
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

  {
    id: 4,
    name: "Ananya Iyer",
    role: "Spiritual Ritual Expert",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
    languages: ["Tamil", "English", "Hindi"],
    people: "1-8 people",
    desc:
      "Guides devotees through sacred poojas and temple rituals.",
    exp: "12 years",
    reviews: "210",
    price: "₹700/hr",
    rating: "4.9",
  },

  {
    id: 5,
    name: "Arjun Reddy",
    role: "Pilgrimage Tour Planner",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=400",
    languages: ["Telugu", "English"],
    people: "1-20 people",
    desc:
      "Specialist in organizing long pilgrimage trips across India.",
    exp: "11 years",
    reviews: "176",
    price: "₹550/hr",
    rating: "4.8",
  },

  {
    id: 6,
    name: "Meera Joshi",
    role: "Bhajan & Devotional Guide",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
    languages: ["Hindi", "Marathi", "English"],
    people: "1-25 people",
    desc:
      "Experienced in devotional singing tours and spiritual events.",
    exp: "9 years",
    reviews: "142",
    price: "₹400/hr",
    rating: "4.6",
  },

  {
    id: 7,
    name: "Vikram Singh",
    role: "North India Temple Guide",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=400",
    languages: ["Hindi", "Punjabi", "English"],
    people: "1-18 people",
    desc:
      "Expert in Varanasi, Ayodhya and Haridwar spiritual journeys.",
    exp: "14 years",
    reviews: "267",
    price: "₹750/hr",
    rating: "5.0",
  },

  {
    id: 8,
    name: "Lakshmi Devi",
    role: "Women Spiritual Tours",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400",
    languages: ["Tamil", "Hindi", "English"],
    people: "1-10 people",
    desc:
      "Focused on safe and peaceful spiritual tours for women devotees.",
    exp: "7 years",
    reviews: "118",
    price: "₹500/hr",
    rating: "4.7",
  },

  {
    id: 9,
    name: "Rahul Verma",
    role: "Temple Architecture Guide",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
    languages: ["Hindi", "English"],
    people: "1-14 people",
    desc:
      "Passionate about ancient Indian temple architecture and history.",
    exp: "13 years",
    reviews: "201",
    price: "₹650/hr",
    rating: "4.8",
  },

  {
    id: 10,
    name: "Kavya Nair",
    role: "Kerala Temple Specialist",
    image:
      "https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=400",
    languages: ["Malayalam", "English", "Tamil"],
    people: "1-9 people",
    desc:
      "Specialized in Kerala temple traditions and Ayurveda spiritual retreats.",
    exp: "6 years",
    reviews: "97",
    price: "₹480/hr",
    rating: "4.6",
  },

];

const languages = [
  "All",
  "Hindi",
  "English",
  "Sanskrit",
  "Gujarati",
  "Tamil",
  "Telugu",
];

const places = [

  /* TEMPLES */

  {
    id: 1,
    category: "Temple",
    name: "Ram Mandir",
    location: "Ayodhya",
    price: "₹500",
    time: "4 Hours",
  },

  {
    id: 2,
    category: "Temple",
    name: "Hanuman Garhi",
    location: "Ayodhya",
    price: "₹300",
    time: "2 Hours",
  },

  {
    id: 3,
    category: "Temple",
    name: "Kanak Bhawan",
    location: "Ayodhya",
    price: "₹350",
    time: "2 Hours",
  },

  {
    id: 4,
    category: "Temple",
    name: "Treta Ke Thakur",
    location: "Ayodhya",
    price: "₹250",
    time: "1 Hour",
  },

  /* GHATS */

  {
    id: 5,
    category: "Ghat",
    name: "Ram Ki Paidi",
    location: "Saryu River",
    price: "₹200",
    time: "2 Hours",
  },

  {
    id: 6,
    category: "Ghat",
    name: "Lakshman Ghat",
    location: "Ayodhya",
    price: "₹250",
    time: "1 Hour",
  },

  {
    id: 7,
    category: "Ghat",
    name: "Guptar Ghat",
    location: "Ayodhya",
    price: "₹350",
    time: "3 Hours",
  },

  /* KUNDS */

  {
    id: 8,
    category: "Kund",
    name: "Surya Kund",
    location: "Ayodhya",
    price: "₹180",
    time: "1 Hour",
  },

  {
    id: 9,
    category: "Kund",
    name: "Sita Kund",
    location: "Ayodhya",
    price: "₹220",
    time: "1 Hour",
  },

  /* CHARITY */

  {
    id: 10,
    category: "Charity",
    name: "Annadanam Seva",
    location: "Ram Mandir",
    price: "₹500",
    time: "45 Minutes",
  },

  {
    id: 11,
    category: "Charity",
    name: "Cow Donation",
    location: "Ayodhya",
    price: "₹1000",
    time: "30 Minutes",
  },

  /* BHAWAN */

  {
    id: 12,
    category: "Bhawan",
    name: "Kaikeyi Bhawan",
    location: "Ayodhya",
    price: "₹300",
    time: "1 Hour",
  },

  {
    id: 13,
    category: "Bhawan",
    name: "Sita Rasoi",
    location: "Ayodhya",
    price: "₹250",
    time: "1 Hour",
  },

  /* AASHRAM */

  {
    id: 14,
    category: "Aashram",
    name: "Bhakti Dham Aashram",
    location: "Ayodhya",
    price: "₹700",
    time: "Stay",
  },

  {
    id: 15,
    category: "Aashram",
    name: "Ramanand Aashram",
    location: "Saryu River",
    price: "₹850",
    time: "Stay",
  },

];

export default function GuideBooking({ onBack }) {

  const [selectedLang, setSelectedLang] =
    useState("All");
  const [priceFilter, setPriceFilter] =
  useState("All");

  const [ratingFilter, setRatingFilter] =
    useState("All");

  const [selectedGuide, setSelectedGuide] =
    useState(null);

  const [selectedPlaces, setSelectedPlaces] =
    useState([]);

  const [tripMessage, setTripMessage] =
    useState("");

  const [bookingData, setBookingData] =
    useState({
      name: "",
      phone: "",
      date: "",
      people: "",
    });

const filteredGuides =
  guides.filter((guide) => {

    /* LANGUAGE */

    const langMatch =
      selectedLang === "All"
        ? true
        : guide.languages.includes(
            selectedLang
          );

    /* PRICE */

    const guidePrice =
      parseInt(
        guide.price
          .replace("₹","")
          .replace("/hr","")
      );

    const priceMatch =
      priceFilter === "All"
        ? true
        : priceFilter === "Low"
        ? guidePrice <= 500
        : guidePrice > 500;

    /* RATING */

    const ratingMatch =
      ratingFilter === "All"
        ? true
        : parseFloat(guide.rating)
            >= parseFloat(ratingFilter);

    return (
      langMatch &&
      priceMatch &&
      ratingMatch
    );

  });

  const handlePlaceSelect = (e) => {

    const value = e.target.value;

    if (
      value &&
      !selectedPlaces.includes(value)
    ) {

      const updated = [
        ...selectedPlaces,
        value,
      ];

      setSelectedPlaces(updated);

      if (updated.length > 1) {

        setTripMessage(
          "This pilgrimage trip may take more than 2 days."
        );

      }

    }

  };

  const removePlace = (placeName) => {

    const updatedPlaces =
      selectedPlaces.filter(
        (item) => item !== placeName
      );

    setSelectedPlaces(updatedPlaces);

    if (updatedPlaces.length <= 1) {
      setTripMessage("");
    }

  };

  const handleBooking = () => {

    if (
      !bookingData.name ||
      !bookingData.phone ||
      !bookingData.date ||
      !bookingData.people
    ) {
      alert("Please fill all details");
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

    setSelectedPlaces([]);
    setTripMessage("");
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
              className={`guide-tab ${selectedLang === lang
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
        {/* FILTERS */}


      </div>
      <div className="guide-filters">

  {/* PRICE */}

  <select
    value={priceFilter}
    onChange={(e) =>
      setPriceFilter(
        e.target.value
      )
    }
  >

    <option value="All">
      All Prices
    </option>

    <option value="Low">
      Below ₹500
    </option>

    <option value="High">
      Above ₹500
    </option>

  </select>

  {/* RATING */}

  <select
    value={ratingFilter}
    onChange={(e) =>
      setRatingFilter(
        e.target.value
      )
    }
  >

    <option value="All">
      All Ratings
    </option>

    <option value="4.5">
      4.5+
    </option>

    <option value="4.8">
      4.8+
    </option>

  </select>

</div>

      {/* BODY */}

      <div className="guide-body">

        <div className="guide-list">

          {filteredGuides.map((guide) => (

            <div
              className="guide-card"
              key={guide.id}
            >

              <div className="guide-main">

                <div className="guide-left">

                  <img
                    src={guide.image}
                    alt=""
                    className="guide-image"
                  />

                  <div className="guide-info">

                    <h3>{guide.name}</h3>

                    <div className="guide-role">
                      {guide.role}
                    </div>

                    <div className="guide-tags">

                      <div className="guide-tag">
                        {guide.languages.join(", ")}
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
                  <h4>{guide.price}</h4>
                  <p>Price</p>
                </div>

              </div>

              <div className="guide-actions">

                <button className="call-btn">
                  Call
                </button>

                <button
                  className="book-btn"
                  onClick={() =>
                    setSelectedGuide(guide)
                  }
                >
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* MODAL */}

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

              {/* PLACE SELECTION */}

              <div className="trip-selection">

                <label>
                  Select Spiritual Places
                </label>

                <select
                  onChange={handlePlaceSelect}
                >

                  <option value="">
                    Choose Temple / Ghat /
                    Aashram
                  </option>

                  {places.map((place) => (

                    <option
                      key={place.id}
                      value={place.name}
                    >
                      [{place.category}]{" "}
                      {place.name} •{" "}
                      {place.location} •{" "}
                      {place.price}
                    </option>

                  ))}

                </select>

                {/* CHIPS */}

                <div className="selected-place-list">

                  {selectedPlaces.map(
                    (place, index) => (

                      <div
                        className="selected-place-chip"
                        key={index}
                      >

                        {place}

                        <button
                          onClick={() =>
                            removePlace(place)
                          }
                        >
                          ✕
                        </button>

                      </div>

                    )
                  )}

                </div>

                {/* WARNING */}

                {tripMessage && (

                  <div className="trip-warning-box">

                    <i className="ti ti-alert-circle"></i>

                    {tripMessage}

                  </div>

                )}

              </div>

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