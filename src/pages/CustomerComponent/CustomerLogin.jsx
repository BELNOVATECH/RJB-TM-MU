import { useState } from "react";
import "../styles/AuthLayout.css";
import "../styles/Login.css";

const USER_MOBILE = "9876543210";
const USER_OTP = "1234";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 3,
  duration: 8 + (i % 5) * 2,
  delay: i * 1.1,
  color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#ffd060" : "#ff8c00",
}));

export default function CustomerLogin({
  onSuccess,
  onRegister,
  onAdmin,
  onGuide,
  onVehicle,
  onDriver,
  onBack,
   onAccommodation,
}) {

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {

    setAlert(null);

    if (!mobile || !otp) {
      setAlert({
        type: "error",
        msg: "⚠️ Please enter mobile number and OTP.",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      if (mobile === USER_MOBILE && otp === USER_OTP) {

        setAlert({
          type: "success",
          msg: "🙏 Welcome Pilgrim! Redirecting...",
        });

        setTimeout(() => {
          onSuccess && onSuccess();
        }, 1000);

      } else {

        setAlert({
          type: "error",
          msg: "❌ Invalid OTP verification.",
        });

      }

    }, 1200);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="auth-layout">

      <div className="auth-gold-bar" />

      {/* LEFT PANEL */}
      <div className="auth-left">

        <div className="auth-left-bg" />
        <div className="auth-arch" />
        <div className="auth-om-bg">ॐ</div>

        <div className="auth-sparks">
          {SPARKS.map((s) => (
            <div
              key={s.id}
              className="auth-spark"
              style={{
                left: s.left,
                width: s.size,
                height: s.size,
                background: s.color,
                boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>

        <svg
          className="auth-temple-svg"
          viewBox="0 0 900 280"
          preserveAspectRatio="xMidYMax meet"
        >
          <polygon
            points="450,20 420,80 380,110 360,160 340,200 320,240 280,280 620,280 580,240 560,200 540,160 520,110 480,80"
            fill="rgba(255,140,30,1)"
          />
        </svg>

        <div className="auth-left-vert">
          Ayodhya Dham · Pilgrim Portal · 2026
        </div>

        <div className="auth-left-content">

          <div className="auth-eyebrow">
            Government of Uttar Pradesh
          </div>

          <h1 className="auth-left-title">
            Ayodhya
            <br />
            Pilgrim
            <br />
            <em>Portal</em>
          </h1>

          <p className="auth-left-desc">
            Welcome to the sacred tourist portal of Ayodhya Dham.
            Register your pilgrimage journey, family visit and
            spiritual travel experience.
          </p>

          <div className="auth-stats">

            <div>
              <div className="auth-stat-num">140+</div>
              <div className="auth-stat-lbl">Temples</div>
            </div>

            <div>
              <div className="auth-stat-num">30k+</div>
              <div className="auth-stat-lbl">Daily Visitors</div>
            </div>

            <div>
              <div className="auth-stat-num">8</div>
              <div className="auth-stat-lbl">Sacred Ghats</div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <button className="auth-back-btn" onClick={onBack}>
          ← Home
        </button>

        <div className="auth-mandala" />

        <div className="auth-form-card">

          <div className="auth-logo-row">

            <div className="auth-logo-icon">🛕</div>

            <div>
              <div className="auth-logo-name">
                Ayodhya Dham
              </div>

              <div className="auth-logo-sub">
                Tourist Portal · Pilgrim Services
              </div>
            </div>

          </div>

          <div className="auth-heading">
            Tourist Login
          </div>

          <div className="auth-subheading">
            Login with Mobile OTP Verification
          </div>

          <div className="auth-tabs">

            <button className="auth-tab active">
              LOGIN
            </button>

            <button
              className="auth-tab"
              onClick={onRegister}
            >
              REGISTER
            </button>

          </div>

          <div className="auth-fields">

            {alert && (
              <div className={`auth-alert ${alert.type}`}>
                {alert.msg}
              </div>
            )}

            {/* MOBILE */}
            <div className="auth-field">

              <div className="auth-field-label">
                Mobile Number
              </div>

              <div className="auth-field-wrap">

                <span className="auth-field-icon">
                  📞
                </span>

                <input
                  className="auth-field-input"
                  type="text"
                  placeholder="+91 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  onKeyDown={handleKey}
                />

              </div>
            </div>

            {/* OTP */}
            <div className="auth-field">

              <div className="auth-field-label">
                OTP Verification
              </div>

              <div className="auth-field-wrap">

                <span className="auth-field-icon">
                  🔐
                </span>

                <input
                  className="auth-field-input"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onKeyDown={handleKey}
                />

              </div>
            </div>

            <button
              className="auth-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading
                ? <><span className="auth-spinner" />Verifying…</>
                : <>🙏 &nbsp; ENTER PILGRIM PORTAL</>
              }
            </button>

            <div className="auth-divider-or">

              <div className="auth-divider-line" />

              <div className="auth-divider-txt">
                ✦ ॐ ✦
              </div>

              <div className="auth-divider-line" />

            </div>

            <div className="auth-note-box">

              <div className="auth-note-icon">
                🛡️
              </div>

              <div className="auth-note-text">
                <strong>Tourist Safety.</strong>
                {" "}
                Your mobile verification helps maintain
                secure pilgrimage and travel assistance services.
              </div>

            </div>

          </div>

        <div className="auth-switch">

  <div className="auth-register-line">

    New pilgrim? &nbsp;

    <span onClick={onRegister}>
      Register now →
    </span>

  </div>

  <div className="auth-portal-links">

    <span onClick={onAdmin}>
      Admin Login →
    </span>

    <span onClick={onGuide}>
      Tour Guide →
    </span>

    <span onClick={onVehicle}>
      Vehicle Login →
    </span>

    <span onClick={onDriver}>
      Driver Login →
    </span>
     <span onClick={onAccommodation}>
    Accommodation →
  </span>

  </div>

</div>

    



          </div>

        </div>
      </div>
    
  );
}