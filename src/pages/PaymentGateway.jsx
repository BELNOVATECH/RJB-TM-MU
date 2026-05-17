import "./styles/PaymentIntegration.css";

export default function PaymentIntegration({ setPage }) {

const paymentModes = [

  {
    icon: "ti ti-brand-google",
    title: "Google Pay",
    desc: "Fast and secure UPI payments",
    link:
      "tez://upi/pay?pa=8247582810-5@ybl&pn=Temple Booking&cu=INR"
  },

  {
    icon: "ti ti-device-mobile",
    title: "PhonePe",
    desc: "Instant mobile transactions",
    link:
      "phonepe://pay?pa=8247582810-5@ybl&pn=Temple Booking"
  },

  {
    icon: "ti ti-credit-card",
    title: "Credit / Debit Cards",
    desc: "Visa, MasterCard & RuPay supported",
    link:
      "upi://pay?pa=8247582810-5@ybl&pn=Temple Booking&cu=INR"
  },

  {
    icon: "ti ti-building-bank",
    title: "Net Banking",
    desc: "Direct bank account payments",
    link:
      "upi://pay?pa=8247582810-5@ybl&pn=Temple Booking&cu=INR"
  },

  {
    icon: "ti ti-wallet",
    title: "Wallet Integration",
    desc: "Paytm, Amazon Pay and more",
    link:
      "paytmmp://pay?pa=8247582810-5@ybl&pn=Temple Booking"
  },

  {
    icon: "ti ti-currency-rupee",
    title: "UPI Payments",
    desc: "Quick QR and UPI transactions",
    link:
      "upi://pay?pa=8247582810-5@ybl&pn=Temple Booking&cu=INR"
  }

];
  const features = [
    "Secure payment gateway",
    "Auto invoice generation",
    "Booking receipts",
    "Refund processing",
    "Payment history tracking"
  ];

  return (

    <div className="payment-page">

      {/* HERO */}

      <div className="payment-hero">

        <div className="payment-hero-left">

          <div
            className="payment-back-btn"
            onClick={() => setPage("home")}
          >

            <i className="ti ti-arrow-left"></i>

          </div>

          <div>

            <h1>Online Payment Integration</h1>

            <p>
              Secure and seamless payment system
              for travel, vehicle, room and guide bookings.
            </p>

          </div>

        </div>

        <div className="payment-badge">

          <i className="ti ti-shield-check"></i>

          Secure Payments

        </div>

      </div>

      {/* PAYMENT MODES */}

      <div className="payment-section-title">

        Supported Payment Modes

      </div>

      <div className="payment-grid">

        {paymentModes.map((item, index) => (

          <a
            href={item.link}
            className="payment-card"
            key={index}
          >

            <div className="payment-icon">

              <i className={item.icon}></i>

            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </a>

        ))}

      </div>

      {/* FEATURES */}

      <div className="feature-wrapper">

        <div className="payment-section-title">

          Payment Features

        </div>

        <div className="payment-feature-grid">

          {features.map((item, index) => (

            <div
              className="payment-feature-card"
              key={index}
            >

              <div className="feature-check">

                <i className="ti ti-check"></i>

              </div>

              <span>{item}</span>

            </div>

          ))}

        </div>

      </div>

      {/* PAYMENT SUMMARY */}

      <div className="payment-summary">

        <div className="summary-left">

          <h2>Fast • Secure • Reliable</h2>

          <p>
            Our integrated payment system ensures
            smooth booking experiences with secure
            transaction processing and instant confirmations.
          </p>

          <button className="payment-btn">

            <i className="ti ti-lock"></i>

            Start Secure Payment

          </button>

        </div>

        <div className="summary-right">

          <div className="summary-card">

            <h4>99.9%</h4>

            <span>Payment Success Rate</span>

          </div>

          <div className="summary-card">

            <h4>24/7</h4>

            <span>Transaction Support</span>

          </div>

          <div className="summary-card">

            <h4>100%</h4>

            <span>Secure Encryption</span>

          </div>

        </div>

      </div>

  

    </div>
  );
}