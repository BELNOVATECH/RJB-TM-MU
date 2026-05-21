import "./styles/AIFeatures.css";

const aiFeatures = [
  {
    title: "Recommendation Engine",
    icon: "ti ti-brain",
    color: "blue",
    features: [
      "Rooms Recommendation",
      "Vehicle Recommendation",
      "Tour Guide Recommendation",
      "Tourist Destination Recommendation",
    ],
  },
  {
    title: "Predictive Analytics",
    icon: "ti ti-chart-line",
    color: "green",
    features: [
      "Tourist Crowd Prediction",
      "Seasonal Demand Forecasting",
      "Vehicle Demand Prediction",
      "Revenue Forecasting",
    ],
  },
  {
    title: "AI Chatbot Assistant",
    icon: "ti ti-message-chatbot",
    color: "purple",
    features: [
      "Multi-language Support",
      "Voice Support",
      "FAQ Handling",
      "Booking Assistance",
      "Travel Guidance",
    ],
  },
  {
    title: "Smart Search Engine",
    icon: "ti ti-search",
    color: "orange",
    features: [
      "Search Tourist Spots",
      "Search Vehicles",
      "Search Rooms",
      "Search Guides",
      "Search Devotional Content",
    ],
  },
];

function AIFeatures() {
  return (
    <div className="ai-page">
      <div className="ai-top-section">
        <h1>AI/ML Features</h1>
        <p>
          Smart AI-powered tourism management features for modern travelers
        </p>
      </div>

      <div className="ai-features-grid">
        {aiFeatures.map((feature, index) => (
          <div className="ai-feature-card" key={index}>
            <div className={`ai-feature-icon ${feature.color}`}>
              <i className={feature.icon}></i>
            </div>

            <h2>{feature.title}</h2>

            <div className="ai-feature-list">
              {feature.features.map((item, i) => (
                <div className="ai-feature-item" key={i}>
                  <i className="ti ti-check"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button className="ai-feature-btn">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIFeatures;