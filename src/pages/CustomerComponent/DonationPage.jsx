import React, { useState } from "react";

export default function DonationPage({ onBack }) {
  const [showDonateSuccess, setShowDonateSuccess] = useState(false);

  const donations = [
    {
      icon: "🍛",
      title: "Annadanam",
      amount: "₹501",
      beneficiaries: "Feeds 10 Devotees",
      description:
        "Support free meals for pilgrims and devotees visiting Ayodhya Dham.",
    },
    {
      icon: "🪔",
      title: "Temple Seva",
      amount: "₹1001",
      beneficiaries: "Temple Maintenance",
      description:
        "Help maintain temple rituals, cleanliness and daily pooja activities.",
    },
    {
      icon: "📚",
      title: "Education Fund",
      amount: "₹2001",
      beneficiaries: "Children Education",
      description:
        "Support books, learning materials and educational programs.",
    },
    {
      icon: "🏥",
      title: "Health Seva",
      amount: "₹5001",
      beneficiaries: "Medical Camps",
      description:
        "Help organize healthcare camps and emergency medical support.",
    },
    {
      icon: "🚰",
      title: "Water Seva",
      amount: "₹1501",
      beneficiaries: "Pilgrims",
      description:
        "Provide clean drinking water facilities for devotees and visitors.",
    },
    {
      icon: "🌳",
      title: "Tree Plantation",
      amount: "₹751",
      beneficiaries: "Environment",
      description:
        "Support plantation drives around Ayodhya and temple surroundings.",
    },
  ];

  const handleDonate = () => {
    setShowDonateSuccess(true);

    setTimeout(() => {
      setShowDonateSuccess(false);
    }, 2500);
  };

  return (
    <div className="pilgrim-page">
      <div className="hero-section">
        <button
          className="view-all-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <h1>🙏 Donation Services</h1>

        <p>
          Support Ayodhya Dham development and help thousands of
          devotees through your valuable contribution.
        </p>
      </div>

      <div className="donation-grid">
        {donations.map((item, index) => (
          <div className="donation-card" key={index}>
            <div className="donation-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <div className="donation-info">
              <p>
                <strong>Donation:</strong> {item.amount}
              </p>

              <p>
                <strong>Supports:</strong>{" "}
                {item.beneficiaries}
              </p>
            </div>

            <button
              className="donate-btn"
              onClick={handleDonate}
            >
              Donate Now
            </button>
          </div>
        ))}
      </div>

      {showDonateSuccess && (
        <div className="donation-success-overlay">
          <div className="donation-success-box">
            <div className="success-icon">🙏</div>

            <h2>Donation Successful</h2>

            <p>
              Thank you for your valuable contribution.
              <br />
              May Lord Shri Ram bless you 🌸
            </p>
          </div>
        </div>
      )}
    </div>
  );
}