import { useState } from "react";
import "./styles/AuthLayout.css";
import "./styles/Customer.css";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 3,
  duration: 8 + (i % 5) * 2,
  delay: i * 1.1,
  color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#ffd060" : "#ff8c00",
}));

export default function Customer({ onBack }) {

  const [isLogin, setIsLogin] = useState(true);

  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    mobileOtp: "",
    aadhar: "",
    aadharOtp: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

        <div className="auth-left-content">

          <div className="auth-eyebrow">
            Ayodhya Pilgrim Services
          </div>

          <h1 className="auth-left-title">
            Pilgrim <br />
            Registration <br />
            <em>Portal</em>
          </h1>

          <p className="auth-left-desc">
            Register and access services for darshan,
            accommodation, transport and spiritual tourism.
          </p>

          <div className="auth-stats">
            <div>
              <div className="auth-stat-num">30k+</div>
              <div className="auth-stat-lbl">Pilgrims</div>
            </div>

            <div>
              <div className="auth-stat-num">140+</div>
              <div className="auth-stat-lbl">Temples</div>
            </div>

            <div>
              <div className="auth-stat-num">24x7</div>
              <div className="auth-stat-lbl">Support</div>
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

        <div className="auth-form-card customer-card">

          <div className="auth-logo-row">
            <div className="auth-logo-icon">🙏</div>

            <div>
              <div className="auth-logo-name">
                Ayodhya Pilgrim Portal
              </div>

              <div className="auth-logo-sub">
                Customer Access
              </div>
            </div>
          </div>

          <div className="auth-heading">
            {isLogin ? "Customer Login" : "Customer Registration"}
          </div>

          <div className="auth-subheading">
            Access your pilgrim services dashboard
          </div>

          <div className="auth-tabs">

            <button
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              LOGIN
            </button>

            <button
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              REGISTER
            </button>

          </div>

          <div className="auth-fields">

            {!isLogin && (
  <>

    {/* FIRST NAME */}
    <div className="auth-field">
      <div className="auth-field-label">
        First Name <span className="required-star">*</span>
      </div>

      <div className="auth-field-wrap">
        <input
          className="auth-field-input"
          type="text"
          name="firstName"
          placeholder="Enter first name"
          value={formData.firstName || ""}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* LAST NAME */}
    <div className="auth-field">
      <div className="auth-field-label">
        Last Name <span className="required-star">*</span>
      </div>

      <div className="auth-field-wrap">
        <input
          className="auth-field-input"
          type="text"
          name="lastName"
          placeholder="Enter last name"
          value={formData.lastName || ""}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* MOBILE */}
    <div className="auth-field">
      <div className="auth-field-label">
        Mobile Number <span className="required-star">*</span>
      </div>

      <div className="otp-row">

        <div className="auth-field-wrap otp-input-wrap">
          <span className="auth-field-icon">📱</span>

          <input
            className="auth-field-input"
            type="text"
            name="mobile"
            placeholder="Enter mobile number"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <button className="otp-btn">
          Send OTP
        </button>

      </div>
    </div>

    {/* MOBILE OTP */}
    <div className="auth-field">
      <div className="auth-field-label">
        Mobile OTP <span className="required-star">*</span>
      </div>

      <div className="auth-field-wrap">
        <span className="auth-field-icon">🔐</span>

        <input
          className="auth-field-input"
          type="text"
          name="mobileOtp"
          placeholder="Enter mobile OTP"
          value={formData.mobileOtp}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* AADHAAR */}
    <div className="auth-field">
      <div className="auth-field-label">
        Aadhaar Number <span className="required-star">*</span>
      </div>

      <div className="otp-row">

        <div className="auth-field-wrap otp-input-wrap">
          <span className="auth-field-icon">🪪</span>

          <input
            className="auth-field-input"
            type="text"
            name="aadhar"
            placeholder="Enter Aadhaar number"
            value={formData.aadhar}
            onChange={handleChange}
          />
        </div>

        <button className="otp-btn">
          Verify
        </button>

      </div>
    </div>

    {/* AADHAAR OTP */}
    <div className="auth-field">
      <div className="auth-field-label">
        Aadhaar OTP <span className="required-star">*</span>
      </div>

      <div className="auth-field-wrap">
        <span className="auth-field-icon">✅</span>

        <input
          className="auth-field-input"
          type="text"
          name="aadharOtp"
          placeholder="Enter Aadhaar OTP"
          value={formData.aadharOtp}
          onChange={handleChange}
        />
      </div>
    </div>

  </>
)}

            <div className="auth-field">

              <div className="auth-field-label">
                Email Address <span className="required-star">*</span>
              </div>

              <div className="auth-field-wrap">

                <input
                  className="auth-field-input"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>
            </div>

            <div className="auth-field">

              <div className="auth-field-label">
                Password <span className="required-star">*</span>
              </div>

              <div className="auth-field-wrap">

                <input
                  className="auth-field-input"
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <span
                  className="auth-eye"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁️"}
                </span>

              </div>
            </div>
            {!isLogin && (
            <div className="auth-field">

        <div className="auth-field-label">
        Confirm Password <span className="required-star">*</span>
        </div>

        <div className="auth-field-wrap">

        <span className="auth-field-icon">🔒</span>

        <input
            className="auth-field-input"
            type={showPass ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword || ""}
            onChange={handleChange}
        />

        <span
            className="auth-eye"
            onClick={() => setShowPass(!showPass)}
        >
            {showPass ? "🙈" : "👁️"}
        </span>

        </div>

            </div>
            )}

        {isLogin && (
        <div className="auth-forgot">
            Forgot password?
        </div>
            )}
            
            <button className="auth-btn">
  {isLogin
    ? <>🙏 &nbsp; LOGIN TO PORTAL</>
    : <>🪔 &nbsp; CREATE ACCOUNT</>
  }
</button>

<div className="auth-divider-or">
  <div className="auth-divider-line" />
  <div className="auth-divider-txt">✦ ॐ ✦</div>
  <div className="auth-divider-line" />
</div>

<div className="auth-note-box">

  <div className="auth-note-icon">
    🛕
  </div>

  <div className="auth-note-text">

    <strong>
      Pilgrim portal access.
    </strong>

    {isLogin
      ? " Access your bookings, darshan schedules, accommodation and spiritual services securely."
      : " Register to book darshan, temple visits, accommodation and tourism services in Ayodhya Dham."
    }

  </div>

</div>

          </div>
        </div>
      </div>
    </div>
  );
}