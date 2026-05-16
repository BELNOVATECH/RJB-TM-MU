import React from "react";
import "./styles/AboutUs.css";

const AboutUs = ({ onBack }) => {
  return (
    <div className="about-page">

      {/* HERO */}
      <div className="about-hero">

        <img
          src="/assets/ram-janmbhoomi.jpg"
          alt="About Ayodhya"
          className="about-hero-img"
        />

        <div className="about-overlay">

          <h1>ABOUT US</h1>

          <p>About Us Details and Concept</p>

        </div>
      </div>

      {/* CONTENT */}
      <div className="about-container">

        <div className="about-subtitle">
          WELCOME TO AYODHYA DHAM
        </div>

        <h2 className="about-title">
          OVERVIEW AND CONCEPT
        </h2>

        <p className="about-text">

          Ayodhya, the sacred birthplace of Lord Rama,
          stands as one of India's most divine pilgrimage
          destinations. Situated on the banks of the holy
          Saryu River, this ancient city carries immense
          spiritual, historical, and cultural importance.

          Millions of devotees visit Ayodhya every year
          to experience its temples, ghats, devotional
          atmosphere, and spiritual heritage.

        </p>

        {/* STATS */}
        <div className="about-stats">

          <div className="about-card">
            <h3>62</h3>
            <p>GHAT</p>
          </div>

          <div className="about-card">
            <h3>120K</h3>
            <p>GROWING</p>
          </div>

          <div className="about-card">
            <h3>150+</h3>
            <p>TEMPLES</p>
          </div>

        </div>

        {/* BACK BUTTON */}
        <button
          className="about-btn"
          onClick={onBack}
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
};

export default AboutUs;