import { useState } from "react";
import "./styles/AIassistant.css";

export default function AIAssistant({
  setActivePage,
}) {

  const [openModal, setOpenModal] =
    useState(false);

  const [modalType, setModalType] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  return (

    <div className="ai-page">

      {/* ================= HERO ================= */}

      <div className="ai-hero">

        <div className="ai-hero-left">

          {/* BACK */}

        <button
    className="ai-back-btn"
    onClick={() =>
      setActivePage("home")
    }
  >
    <i className="ti ti-arrow-left"></i>
  </button>

          <h1>
            AI Travel Assistant
          </h1>

          <p>
            Smart AI-powered recommendations
            for travel planning, vehicle
            allocation, room suggestions,
            and spiritual pilgrimage journeys.
          </p>

        </div>

        {/* BADGE */}

        <div className="ai-badge">

          <i className="ti ti-sparkles"></i>

          AI Powered

        </div>

      </div>

      {/* ================= TOP BUTTONS ================= */}

      <div className="ai-booking-grid">

        {/* TRAVEL */}

        <button
          className="ai-booking-btn"
          onClick={() => {
            setOpenModal(true);
            setModalType("travel");
          }}
        >

          <i className="ti ti-route"></i>

          AI Travel Plan

        </button>

        {/* VEHICLE */}

        <button
          className="
            ai-booking-btn
            blue-btn
          "
          onClick={() => {
            setOpenModal(true);
            setModalType("vehicle");
          }}
        >

          <i className="ti ti-car"></i>

          AI Vehicle Allocation

        </button>

        {/* ROOM */}

        <button
          className="
            ai-booking-btn
            green-btn
          "
          onClick={() => {
            setOpenModal(true);
            setModalType("room");
          }}
        >

          <i className="ti ti-building"></i>

          AI Room Recommendation

        </button>

      </div>

      {/* ================= GRID ================= */}

      <div className="ai-grid">

        {/* ================= CARD 1 ================= */}

        <div className="ai-card">

          <div className="ai-icon orange">

            <i className="ti ti-route"></i>

          </div>

          <h2>
            AI-Based Travel Assistant
          </h2>

          <p className="ai-desc">

            The AI engine provides
            smart pilgrimage planning
            and personalized travel
            assistance for tourists.

          </p>

          <div className="ai-features">

            <div>
              <i className="ti ti-check"></i>
              Personalized itinerary planning
            </div>

            <div>
              <i className="ti ti-check"></i>
              Smart guide allocation
            </div>

            <div>
              <i className="ti ti-check"></i>
              Room recommendations
            </div>

            <div>
              <i className="ti ti-check"></i>
              Vehicle recommendations
            </div>

            <div>
              <i className="ti ti-check"></i>
              Crowd prediction analysis
            </div>

            <div>
              <i className="ti ti-check"></i>
              Budget optimization suggestions
            </div>

          </div>

        </div>

        {/* ================= CARD 2 ================= */}

        <div className="ai-card">

          <div className="ai-icon blue">

            <i className="ti ti-car"></i>

          </div>

          <h2>
            AI-Based Vehicle Allocation
          </h2>

          <p className="ai-desc">

            AI automatically allocates
            suitable vehicles based on
            tourists, budget, and
            travel distance.

          </p>

          <div className="ai-sub-title">
            Allocation Parameters
          </div>

          <div className="ai-features">

            <div>
              <i className="ti ti-users"></i>
              Number of tourists
            </div>

            <div>
              <i className="ti ti-calendar"></i>
              Number of travel days
            </div>

            <div>
              <i className="ti ti-currency-rupee"></i>
              Budget constraints
            </div>

            <div>
              <i className="ti ti-map-pin"></i>
              Distance & destination
            </div>

            <div>
              <i className="ti ti-heart"></i>
              Senior citizen support
            </div>

            <div>
              <i className="ti ti-crown"></i>
              Luxury preferences
            </div>

          </div>

          {/* EXAMPLES */}

          <div className="ai-example-box">

            <h4>
              AI Allocation Examples
            </h4>

            <div className="example-item">

              <span>
                2–3 Members
              </span>

              <p>
                Auto / Small Car
              </p>

            </div>

            <div className="example-item">

              <span>
                4–6 Members
              </span>

              <p>
                SUV
              </p>

            </div>

            <div className="example-item">

              <span>
                10–15 Members
              </span>

              <p>
                Mini Bus
              </p>

            </div>

          </div>

        </div>

        {/* ================= CARD 3 ================= */}

        <div className="ai-card">

          <div className="ai-icon green">

            <i className="ti ti-building"></i>

          </div>

          <h2>
            AI-Based Room Recommendation
          </h2>

          <p className="ai-desc">

            AI recommends rooms based
            on comfort, budget, family
            size, and temple distance.

          </p>

          <div className="ai-features">

            <div>
              <i className="ti ti-currency-rupee"></i>
              Tourist budget
            </div>

            <div>
              <i className="ti ti-users"></i>
              Family size
            </div>

            <div>
              <i className="ti ti-map-pin"></i>
              Distance from temple
            </div>

            <div>
              <i className="ti ti-star"></i>
              Luxury preferences
            </div>

            <div>
              <i className="ti ti-calendar-time"></i>
              Stay duration
            </div>

          </div>

          {/* ROOMS */}

          <div className="room-box">

            <div className="room-card">

              <h5>
                Budget Room
              </h5>

              <p>
                Affordable stay for pilgrims
              </p>

            </div>

            <div className="room-card">

              <h5>
                Family Room
              </h5>

              <p>
                Comfortable stay for families
              </p>

            </div>

            <div className="room-card">

              <h5>
                Luxury Suite
              </h5>

              <p>
                Premium spiritual experience
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= MODAL ================= */}

      {openModal && (

        <div className="ai-overlay">

          <div className="ai-modal">

            {/* CLOSE */}

            <button
              className="ai-close"
              onClick={() => {
                setOpenModal(false);
                setSubmitted(false);
              }}
            >
              ✕
            </button>

            {/* ================= TRAVEL ================= */}

            {!submitted &&
              modalType === "travel" && (

              <>

                <h2>
                  AI Travel Planning
                </h2>

                <p>
                  Enter travel details
                  for smart pilgrimage
                  planning.
                </p>

                <div className="ai-form">

                  <input
                    type="text"
                    placeholder="Your Name"
                  />

                  <input
                    type="number"
                    placeholder="No of Members"
                  />

                  <input
                    type="number"
                    placeholder="Budget"
                  />

                  <input
                    type="number"
                    placeholder="Travel Days"
                  />

                  <input
                    type="text"
                    placeholder="Destination Temple"
                  />

                  <button
                    className="ai-submit-btn"
                    onClick={() =>
                      setSubmitted(true)
                    }
                  >
                    Generate Travel Plan
                  </button>

                </div>

              </>

            )}

            {/* ================= VEHICLE ================= */}

            {!submitted &&
              modalType === "vehicle" && (

              <>

                <h2>
                  AI Vehicle Allocation
                </h2>

                <p>
                  AI allocates suitable
                  vehicles based on
                  your requirements.
                </p>

                <div className="ai-form">

                  <input
                    type="text"
                    placeholder="Your Name"
                  />

                  <input
                    type="number"
                    placeholder="No of Tourists"
                  />

                  <input
                    type="number"
                    placeholder="Travel Days"
                  />

                  <input
                    type="number"
                    placeholder="Budget"
                  />

                  <select>

                    <option>
                      Vehicle Preference
                    </option>

                    <option>
                      Economy
                    </option>

                    <option>
                      Luxury
                    </option>

                  </select>

                  <select>

                    <option>
                      Senior Citizens?
                    </option>

                    <option>
                      Yes
                    </option>

                    <option>
                      No
                    </option>

                  </select>

                  <button
                    className="ai-submit-btn"
                    onClick={() =>
                      setSubmitted(true)
                    }
                  >
                    Allocate Vehicle
                  </button>

                </div>

              </>

            )}

            {/* ================= ROOM ================= */}

            {!submitted &&
              modalType === "room" && (

              <>

                <h2>
                  AI Room Recommendation
                </h2>

                <p>
                  Get AI-powered room
                  recommendations based
                  on comfort & budget.
                </p>

                <div className="ai-form">

                  <input
                    type="text"
                    placeholder="Your Name"
                  />

                  <input
                    type="number"
                    placeholder="Family Members"
                  />

                  <input
                    type="number"
                    placeholder="Budget"
                  />

                  <input
                    type="number"
                    placeholder="Stay Duration"
                  />

                  <select>

                    <option>
                      Select Room Type
                    </option>

                    <option>
                      Budget Room
                    </option>

                    <option>
                      Family Room
                    </option>

                    <option>
                      Luxury Suite
                    </option>

                  </select>

                  <select>

                    <option>
                      Distance from Temple
                    </option>

                    <option>
                      Near Temple
                    </option>

                    <option>
                      Medium Distance
                    </option>

                    <option>
                      Long Distance
                    </option>

                  </select>

                  <button
                    className="ai-submit-btn"
                    onClick={() =>
                      setSubmitted(true)
                    }
                  >
                    Recommend Room
                  </button>

                </div>

              </>

            )}

            {/* ================= SUCCESS ================= */}

            {submitted && (

              <div className="ai-success">

                <div className="success-icon">

                  <i className="ti ti-sparkles"></i>

                </div>

                <h2>
                  AI Recommendation Successful
                </h2>

                <p>
                  AI generated smart
                  recommendations for
                  your spiritual journey.
                </p>

                {/* TRAVEL */}

                {modalType === "travel" && (

                  <div className="recommend-box">

                    <div>

                      <span>
                        Recommended Visit Time
                      </span>

                      <h4>
                        6 AM - 9 AM
                      </h4>

                    </div>

                    <div>

                      <span>
                        Suggested Duration
                      </span>

                      <h4>
                        3 Days Pilgrimage
                      </h4>

                    </div>

                    <div>

                      <span>
                        Best Crowd-Free Day
                      </span>

                      <h4>
                        Tuesday
                      </h4>

                    </div>

                  </div>

                )}

                {/* VEHICLE */}

                {modalType === "vehicle" && (

                  <div className="recommend-box">

                    <div>

                      <span>
                        Recommended Vehicle
                      </span>

                      <h4>
                        SUV
                      </h4>

                    </div>

                    <div>

                      <span>
                        Vehicle Category
                      </span>

                      <h4>
                        Luxury Travel
                      </h4>

                    </div>

                    <div>

                      <span>
                        Estimated Cost
                      </span>

                      <h4>
                        ₹12,000
                      </h4>

                    </div>

                  </div>

                )}

                {/* ROOM */}

                {modalType === "room" && (

                  <div className="recommend-box">

                    <div>

                      <span>
                        Recommended Room
                      </span>

                      <h4>
                        Luxury Suite
                      </h4>

                    </div>

                    <div>

                      <span>
                        Distance from Temple
                      </span>

                      <h4>
                        500 Meters
                      </h4>

                    </div>

                    <div>

                      <span>
                        Estimated Stay Cost
                      </span>

                      <h4>
                        ₹8,500
                      </h4>

                    </div>

                  </div>

                )}

                <button
                  className="done-btn"
                  onClick={() => {
                    setOpenModal(false);
                    setSubmitted(false);
                  }}
                >
                  Done
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );
}