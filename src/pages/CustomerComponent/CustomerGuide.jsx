import { useEffect, useState } from "react";
import "../styles/BookGuide.css";
import { openRazorpay } from "../../services/razorpay";

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
    desc:
      "Expert in Ramayana and ancient temple architecture.",
    exp: "15 years",
    reviews: "234",
    rating: "4.9",
  },

  {
    id: 2,
    name: "Priya Sharma",
    role: "Family Tours & Rituals",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    languages: ["Hindi", "English", "Gujarati"],
    desc:
      "Specialized in family pilgrimages.",
    exp: "10 years",
    reviews: "189",
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
   PLACES
========================= */

const places = [
  {
    id: 1,
    category: "Temple",
    name: "Ram Mandir",
    location: "Ayodhya",
    price: 500,
  },

  {
    id: 2,
    category: "Temple",
    name: "Hanuman Garhi",
    location: "Ayodhya",
    price: 300,
  },

  {
    id: 3,
    category: "Temple",
    name: "Kanak Bhawan",
    location: "Ayodhya",
    price: 350,
  },

  {
    id: 4,
    category: "Ghat",
    name: "Ram Ki Paidi",
    location: "Saryu River",
    price: 200,
  },

  {
    id: 5,
    category: "Kund",
    name: "Surya Kund",
    location: "Ayodhya",
    price: 180,
  },

  {
    id: 6,
    category: "Aashram",
    name: "Bhakti Dham Aashram",
    location: "Ayodhya",
    price: 700,
  },
];

/* =========================
   COMPONENT
========================= */

export default function GuideBooking({
  onBack,
}) {
  /* =========================
     STATES
  ========================= */

  const [guides, setGuides] =
    useState(defaultGuides);
    

  const [selectedLang, setSelectedLang] =
    useState("All");
  const [priceFilter, setPriceFilter] =
  useState("all");

const [ratingFilter, setRatingFilter] =
  useState("all");
  const [showDropdown, setShowDropdown] =
  useState(false);

  const [selectedGuide, setSelectedGuide] =
    useState(null);

  const [showPayment, setShowPayment] =
    useState(false);

  const [selectedPlaces, setSelectedPlaces] =
    useState([]);

  const [tripMessage, setTripMessage] =
    useState("");

  const [totalPrice, setTotalPrice] =
    useState(0);

  const [advancePayment, setAdvancePayment] =
    useState(0);

  const [remainingPayment, setRemainingPayment] =
    useState(0);

  const [paymentMethod, setPaymentMethod] =
    useState("UPI");
  const [acceptPolicy, setAcceptPolicy] =
  useState(false);

  const [bookingData, setBookingData] =
    useState({
      name: "",
      phone: "",
      date: "",
      people: "",
    });
    
// const openRazorpay = () => {
//   const options = {
//     key: "rzp_test_T1nKHVi3crHSPg",

//     amount: Number(advancePayment) * 100,

//     currency: "INR",

//     name: "Rama Janma Bhoomi",

//     description: `Guide Booking - ${selectedGuide?.name}`,

//     image: "/assets/temple-logo.png",

//     prefill: {
//       name: bookingData?.name || "",
//       contact: bookingData?.phone || "",
//     },

//     notes: {
//       guide: selectedGuide?.name || "",
//       places: selectedPlaces
//         .map((p) => p.name)
//         .join(", "),
//     },

//     method: {
//       upi: true,
//       card: true,
//       netbanking: true,
//       wallet: true
//     },

//     handler: function (response) {
//       alert(
//         `Payment Successful!

// Payment ID: ${response.razorpay_payment_id}

// Amount Paid: ₹${advancePayment}`
//       );

//       handlePayment();
//     },

//     modal: {
//       ondismiss: function () {
//         console.log("Payment popup closed");
//       }
//     },

//     theme: {
//       color: "#ff7b00"
//     }
//   };

//   const razorpay = new window.Razorpay(options);

//   razorpay.open();
// };
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
     FILTER GUIDES
  ========================= */

const filteredGuides =
  guides.filter((guide) => {

    /* LANGUAGE */

    const languageMatch =
      selectedLang === "All"
        ? true
        : guide.languages.includes(
            selectedLang
          );

    /* RATING */

    const rating =
      Number(guide.rating);

    const ratingMatch =
      ratingFilter === "all"
        ? true
        : ratingFilter === "4"
        ? rating >= 4
        : rating >= 4.5;

    return (
      languageMatch &&
      ratingMatch
    );

  });

  /* =========================
     SELECT PLACE
  ========================= */

  const handlePlaceSelect = (e) => {
    const selectedId = Number(
      e.target.value
    );

    const selectedPlace =
      places.find(
        (place) =>
          place.id === selectedId
      );

    if (
      selectedPlace &&
      !selectedPlaces.some(
        (p) =>
          p.id === selectedPlace.id
      )
    ) {
      const updatedPlaces = [
        ...selectedPlaces,
        selectedPlace,
      ];

      setSelectedPlaces(
        updatedPlaces
      );

      /* TOTAL */

      const templeTotal =
        updatedPlaces.reduce(
          (sum, item) =>
            sum + item.price,
          0
        );

      const guideCharge = 500;

      const finalTotal =
        templeTotal + guideCharge;

      const advance =
        Math.round(
          finalTotal * 0.3
        );

      const remaining =
        finalTotal - advance;

      setTotalPrice(finalTotal);

      setAdvancePayment(
        advance
      );

      setRemainingPayment(
        remaining
      );

      if (
        updatedPlaces.length > 1
      ) {
        setTripMessage(
          "This pilgrimage trip may take more than 2 days."
        );
      }
    }
  };

  /* =========================
     REMOVE PLACE
  ========================= */

  const removePlace = (placeId) => {
    const updatedPlaces =
      selectedPlaces.filter(
        (item) =>
          item.id !== placeId
      );

    setSelectedPlaces(
      updatedPlaces
    );

    const templeTotal =
      updatedPlaces.reduce(
        (sum, item) =>
          sum + item.price,
        0
      );

    const guideCharge = 500;

    const finalTotal =
      templeTotal + guideCharge;

    const advance =
      Math.round(
        finalTotal * 0.3
      );

    const remaining =
      finalTotal - advance;

    setTotalPrice(finalTotal);

    setAdvancePayment(
      advance
    );

    setRemainingPayment(
      remaining
    );

    if (
      updatedPlaces.length <= 1
    ) {
      setTripMessage("");
    }
  };

  /* =========================
     CONTINUE TO PAYMENT
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

    if (
      selectedPlaces.length === 0
    ) {
      alert(
        "Please select temple / ghat / aashram"
      );

      return;
    }

    setShowPayment(true);
  };

  /* =========================
     PAYMENT SUCCESS
  ========================= */

  const handlePayment = () => {
    alert(

`Payment Successful

Guide:
${selectedGuide.name}

Advance Paid:
₹${advancePayment}

Remaining Payment:
₹${remainingPayment}

Payment Method:
${paymentMethod}`

    );

    setSelectedGuide(null);

    setShowPayment(false);

    setSelectedPlaces([]);

    setTripMessage("");

    setTotalPrice(0);

    setAdvancePayment(0);

    setRemainingPayment(0);

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
      {/* FILTERS */}

<div className="guide-filters">

  {/* PRICE */}

  <select
    className="guide-filter-select"
    value={priceFilter}
    onChange={(e) =>
      setPriceFilter(e.target.value)
    }
  >

    <option value="all">
      All Prices
    </option>

    <option value="low">
      Below ₹500
    </option>

    <option value="medium">
      ₹500 - ₹1000
    </option>

    <option value="high">
      Above ₹1000
    </option>

  </select>

  {/* RATING */}

  <select
    className="guide-filter-select"
    value={ratingFilter}
    onChange={(e) =>
      setRatingFilter(e.target.value)
    }
  >

    <option value="all">
      All Ratings
    </option>

    <option value="4">
      4+ Rating
    </option>

    <option value="4.5">
      4.5+ Rating
    </option>

  </select>

</div>

      {/* GUIDE LIST */}

      <div className="guide-body">

        <div className="guide-list">

          {filteredGuides.map(
            (guide) => (

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

                      <div className="guide-tag">

                        {guide.languages.join(
                          ", "
                        )}

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
                      Flexible
                    </h4>

                    <p>
                      Temple Pricing
                    </p>

                  </div>

                </div>

                {/* BUTTONS */}

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

            )
          )}

        </div>

      </div>

      {/* MODAL */}

      {selectedGuide && (

        <div className="booking-overlay">

          <div className="booking-modal">

            {/* CLOSE */}

            <button
              className="close-btn"
              onClick={() => {

                setSelectedGuide(null);

                setShowPayment(false);

              }}
            >
              ✕
            </button>

            {/* =========================
                FORM SCREEN
            ========================= */}

            {!showPayment ? (

              <>

                {/* TOP */}

                <div className="booking-top">

                  <img
                    src={
                      selectedGuide.image
                    }
                    alt=""
                    className="booking-image"
                  />

                  <div>

                    <h2>
                      {
                        selectedGuide.name
                      }
                    </h2>

                    <p>
                      {
                        selectedGuide.role
                      }
                    </p>

                  </div>

                </div>

                {/* FORM */}

                <div className="booking-form">

                  <input
                    type="text"
                    placeholder="Your Name"
                    value={
                      bookingData.name
                    }
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        name:
                          e.target
                            .value,
                      })
                    }
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={
                      bookingData.phone
                    }
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        phone:
                          e.target
                            .value,
                      })
                    }
                  />

                  <input
                    type="date"
                    value={
                      bookingData.date
                    }
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        date:
                          e.target
                            .value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="No of People"
                    value={
                      bookingData.people
                    }
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        people:
                          e.target
                            .value,
                      })
                    }
                  />

                  {/* PLACE */}

                  <div className="trip-selection">

                    <label>
                      Select Spiritual Places
                    </label>

                   <div className="custom-dropdown">

  {/* HEADER */}

  <div
    className="dropdown-header"
    onClick={() =>
      setShowDropdown(
        !showDropdown
      )
    }
  >

    <div className="dropdown-title">

      {selectedPlaces.length > 0
        ? `${selectedPlaces.length} Places Selected`
        : "Choose Temple / Ghat / Aashram"}

    </div>

    <i className="ti ti-chevron-down"></i>

  </div>

  {/* DROPDOWN */}

  {showDropdown && (

    <div className="dropdown-options">

      {places.map((place) => {

        const checked =
          selectedPlaces.some(
            (p) =>
              p.id === place.id
          );

        return (

          <label
            key={place.id}
            className="dropdown-item"
          >

            <input
              type="checkbox"
              checked={checked}
              onChange={() => {

                if (checked) {

                  removePlace(
                    place.id
                  );

                } else {

                  const updatedPlaces =
                    [
                      ...selectedPlaces,
                      place,
                    ];

                  setSelectedPlaces(
                    updatedPlaces
                  );

                  const templeTotal =
                    updatedPlaces.reduce(
                      (
                        sum,
                        item
                      ) =>
                        sum +
                        item.price,
                      0
                    );

                  const guideCharge =
                    500;

                  const finalTotal =
                    templeTotal +
                    guideCharge;

                  const advance =
                    Math.round(
                      finalTotal *
                        0.3
                    );

                  const remaining =
                    finalTotal -
                    advance;

                  setTotalPrice(
                    finalTotal
                  );

                  setAdvancePayment(
                    advance
                  );

                  setRemainingPayment(
                    remaining
                  );

                  if (
                    updatedPlaces.length >
                    1
                  ) {

                    setTripMessage(
                      "This pilgrimage trip may take more than 2 days."
                    );

                  }

                }

              }}
            />

            <div className="dropdown-place">

              <strong>
                [{place.category}]
              </strong>

              <span>
                {place.name}
              </span>

              <small>
                ₹{place.price}
              </small>

            </div>

          </label>

        );

      })}

    </div>

  )}

</div>
                    {/* CHIPS */}

                    <div className="selected-place-list">

                      {selectedPlaces.map(
                        (place) => (

                          <div
                            className="selected-place-chip"
                            key={
                              place.id
                            }
                          >

                            {
                              place.name
                            }

                            <span>
                              ₹
                              {
                                place.price
                              }
                            </span>

                            <button
                              onClick={() =>
                                removePlace(
                                  place.id
                                )
                              }
                            >
                              ✕
                            </button>

                          </div>

                        )
                      )}

                    </div>

                    {/* TOTAL */}

                    <div className="trip-total-box">

                      <div className="total-item">

                        <span>
                          Total Amount
                        </span>

                        <h3>
                          ₹
                          {
                            totalPrice
                          }
                        </h3>

                      </div>

                    </div>

                    {/* WARNING */}

                    {tripMessage && (

                      <div className="trip-warning-box">

                        {
                          tripMessage
                        }

                      </div>

                    )}

                  </div>

                  {/* CONTINUE */}

                  <button
                    className="confirm-booking-btn"
                    onClick={
                      handleBooking
                    }
                  >
                    Continue To Payment
                  </button>

                </div>

              </>

            ) : (

              /* =========================
                  PAYMENT SCREEN
              ========================= */

              <div className="payment-screen">

                <div className="payment-header">

                  <h2>
                    Advance Payment
                  </h2>

                  <p>
                    Secure your booking
                  </p>

                </div>

                {/* SUMMARY */}

                <div className="payment-summary-card">

                  <div className="payment-row">

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹{totalPrice}
                    </strong>

                  </div>

                  <div className="payment-row advance">

                    <span>
                      Advance Payment (30%)
                    </span>

                    <strong>
                      ₹{
                        advancePayment
                      }
                    </strong>

                  </div>

                  <div className="payment-row remain">

                    <span>
                      Remaining Amount
                    </span>

                    <strong>
                      ₹{
                        remainingPayment
                      }
                    </strong>

                  </div>

                </div>

                {/* METHODS */}

                {/* =========================
    BOOKING POLICY
========================= */}

<div className="booking-policy">

  <h4>
    Booking Policy
  </h4>

  <div className="policy-list">

    <p>
      • Advance payment is required
      to confirm booking.
    </p>

    <p>
      • Advance payment is non-refundable.
    </p>

    <p>
      • Remaining payment should be
      paid to guide directly.
    </p>

    <p>
      • Date changes depend on
      guide availability.
    </p>

  </div>

  <label className="policy-check">

    <input
      type="checkbox"
      checked={acceptPolicy}
      onChange={(e) =>
        setAcceptPolicy(
          e.target.checked
        )
      }
    />

    <span>
      I agree to booking policy &
      cancellation terms
    </span>

  </label>

</div>

                <div className="payment-method-box">

                  <h4>
                    Select Payment Method
                  </h4>

                  <div className="payment-methods">

                    <button
                      className={
                        paymentMethod ===
                        "UPI"
                          ? "active-payment"
                          : ""
                      }
                      onClick={() =>
                        setPaymentMethod(
                          "UPI"
                        )
                      }
                    >
                      UPI
                    </button>

                    <button
                      className={
                        paymentMethod ===
                        "Card"
                          ? "active-payment"
                          : ""
                      }
                      onClick={() =>
                        setPaymentMethod(
                          "Card"
                        )
                      }
                    >
                      Card
                    </button>

                    <button
                      className={
                        paymentMethod ===
                        "Net Banking"
                          ? "active-payment"
                          : ""
                      }
                      onClick={() =>
                        setPaymentMethod(
                          "Net Banking"
                        )
                      }
                    >
                      Net Banking
                    </button>

                  </div>

                </div>

                {/* PAY */}

<button
  className="pay-now-btn"
  onClick={() => {

    if (!acceptPolicy) {

      alert(
        "Please accept booking policy"
      );

      return;
    }

    console.log(
      "Pay Button Clicked"
    );

    console.log(
      "Advance Amount:",
      advancePayment
    );

    openRazorpay({

      amount: advancePayment,

      bookingData,

      selectedGuide,

      selectedPlaces,

      onSuccess: (response) => {

        alert(
          `Payment Successful!

Payment ID:
${response.razorpay_payment_id}

Amount Paid:
₹${advancePayment}`
        );

        handlePayment();

      },

    });

  }}
>
  Pay Advance ₹{advancePayment}
</button>

{/* BACK */}

<button
  className="back-payment-btn"
  onClick={() =>
    setShowPayment(false)
  }
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