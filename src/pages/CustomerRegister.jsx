import { useState } from "react";
import "./styles/AuthLayout.css";
import "./styles/Register.css";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 3,
  duration: 8 + (i % 5) * 2,
  delay: i * 1.3,
  color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#ffd060" : "#ff8c00",
}));

export default function CustomerRegister({
  onBack,
  onBackToLanding,
}) {

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    idNumber: "",
    idType: "",
    familyMembers: "",
    travelPlace: "",
    address: "",
  });

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  /* OTP STATES */
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [sendingMobileOtp, setSendingMobileOtp] = useState(false);
  const [sendingEmailOtp, setSendingEmailOtp] = useState(false);

  const update = (field) => (e) => {

    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setAlert(null);
  };

  /* SEND MOBILE OTP */
  const sendMobileOtp = () => {

    if (!form.mobile) {

      setAlert({
        type: "error",
        msg: "⚠️ Enter mobile number first.",
      });

      return;
    }

    setSendingMobileOtp(true);

    setAlert({
      type: "success",
      msg: "📲 OTP sent successfully.",
    });
  };

  /* VERIFY MOBILE OTP */
  const verifyMobileOtp = () => {

    if (mobileOtp === "1234") {

      setMobileVerified(true);

      setAlert({
        type: "success",
        msg: "✅ Mobile verified successfully.",
      });

    } else {

      setAlert({
        type: "error",
        msg: "❌ Invalid mobile OTP.",
      });

    }
  };

  /* SEND EMAIL OTP */
  const sendEmailOtp = () => {

    if (!form.email) {

      setAlert({
        type: "error",
        msg: "⚠️ Enter email first.",
      });

      return;
    }

    setSendingEmailOtp(true);

    setAlert({
      type: "success",
      msg: "📧 OTP sent successfully.",
    });
  };

  /* VERIFY EMAIL OTP */
  const verifyEmailOtp = () => {

    if (emailOtp === "5678") {

      setEmailVerified(true);

      setAlert({
        type: "success",
        msg: "✅ Email verified successfully.",
      });

    } else {

      setAlert({
        type: "error",
        msg: "❌ Invalid email OTP.",
      });

    }
  };

  /* REGISTER */
  const handleRegister = () => {

    setAlert(null);

    if (!form.fullName || !form.mobile || !form.email) {

      setAlert({
        type: "error",
        msg: "⚠️ Please fill required fields.",
      });

      return;
    }

    if (!mobileVerified) {

      setAlert({
        type: "error",
        msg: "⚠️ Verify mobile OTP first.",
      });

      return;
    }

    if (!emailVerified) {

      setAlert({
        type: "error",
        msg: "⚠️ Verify email OTP first.",
      });

      return;
    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);
      setDone(true);

    }, 1400);
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

        <div className="auth-left-vert">
          Ayodhya Dham · Tourist Registration · 2026
        </div>

        <div className="auth-left-content">

          <div className="auth-eyebrow">
            Pilgrim Registration
          </div>

          <h1 className="auth-left-title">
            Tourist
            <br />
            Pilgrim
            <br />
            <em>Registration</em>
          </h1>

          <p className="auth-left-desc">
            Register for Ayodhya pilgrimage services,
            family travel, tourist support and secure
            temple visit management.
          </p>

          <div className="auth-steps">

            {[
              {
                n: "1",
                t: "Register Tourist",
                d: "Fill pilgrimage and personal details",
              },
              {
                n: "2",
                t: "OTP Verification",
                d: "Secure mobile and email verification",
              },
              {
                n: "3",
                t: "Start Journey",
                d: "Access tourism and temple services",
              },
            ].map((s) => (

              <div key={s.n} className="auth-step">

                <div className="auth-step-num">
                  {s.n}
                </div>

                <div>

                  <div className="auth-step-title">
                    {s.t}
                  </div>

                  <div className="auth-step-desc">
                    {s.d}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <button
          className="auth-back-btn"
          onClick={onBackToLanding}
        >
          ← Home
        </button>

        <div className="auth-form-card">

          {done ? (

            <div className="reg-success">

              <div className="reg-success-icon">
                🙏
              </div>

              <h2 className="reg-success-title">
                Registration Successful!
              </h2>

              <p className="reg-success-msg">
                Your pilgrimage registration has been
                completed successfully.
                Welcome to Ayodhya Dham spiritual tourism services.
              </p>

              <button
                className="auth-btn"
                style={{ marginTop: 24 }}
                onClick={onBack}
              >
                ← Back to Login
              </button>

            </div>

          ) : (

            <>
              <div className="auth-heading">
                Tourist Registration
              </div>

              <div className="auth-subheading">
                Register your pilgrimage journey
                and family visit
              </div>
              <div className="auth-tabs">

  <button
    className="auth-tab"
    onClick={onBack}
  >
    LOGIN
  </button>

  <button className="auth-tab active">
    REGISTER
  </button>

</div>

              <div className="auth-fields">

                {alert && (
                  <div className={`auth-alert ${alert.type}`}>
                    {alert.msg}
                  </div>
                )}

                {/* FULL NAME */}
                <div className="auth-field">

                  <div className="auth-field-label">
                    Full Name *
                  </div>

                  <div className="auth-field-wrap">

                    <span className="auth-field-icon">
                      👤
                    </span>

                    <input
                      className="auth-field-input"
                      placeholder="Enter full name"
                      value={form.fullName}
                      onChange={update("fullName")}
                    />

                  </div>

                </div>

                {/* MOBILE + EMAIL */}
                <div className="auth-field-row">

                  {/* MOBILE */}
                  <div className="auth-field">

                    <div className="auth-field-label">
                      Mobile Number *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        📞
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="+91 98765 43210"
                        value={form.mobile}
                        onChange={update("mobile")}
                      />

                    </div>

                    {/* MOBILE OTP */}
                    <div className="otp-row">

                      {!sendingMobileOtp && !mobileVerified && (
                        <button
                          type="button"
                          className="otp-btn"
                          onClick={sendMobileOtp}
                        >
                          Send OTP
                        </button>
                      )}

                      {sendingMobileOtp && !mobileVerified && (
                        <>
                          <input
                            className="auth-field-input otp-input"
                            placeholder="Enter Mobile OTP"
                            value={mobileOtp}
                            onChange={(e) => setMobileOtp(e.target.value)}
                          />

                          <button
                            type="button"
                            className="otp-btn verify"
                            onClick={verifyMobileOtp}
                          >
                            Verify OTP
                          </button>
                        </>
                      )}

                      {mobileVerified && (
                        <div className="verified-badge">
                          ✅ Verified
                        </div>
                      )}

                    </div>

                  </div>

                  {/* EMAIL */}
                  <div className="auth-field">

                    <div className="auth-field-label">
                      Email Address *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        ✉️
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={update("email")}
                      />

                    </div>

                    {/* EMAIL OTP */}
                    <div className="otp-row">

                      {!sendingEmailOtp && !emailVerified && (
                        <button
                          type="button"
                          className="otp-btn"
                          onClick={sendEmailOtp}
                        >
                          Send OTP
                        </button>
                      )}

                      {sendingEmailOtp && !emailVerified && (
                        <>
                          <input
                            className="auth-field-input otp-input"
                            placeholder="Enter Email OTP"
                            value={emailOtp}
                            onChange={(e) => setEmailOtp(e.target.value)}
                          />

                          <button
                            type="button"
                            className="otp-btn verify"
                            onClick={verifyEmailOtp}
                          >
                            Verify OTP
                          </button>
                        </>
                      )}

                      {emailVerified && (
                        <div className="verified-badge">
                          ✅ Verified
                        </div>
                      )}

                    </div>

                  </div>

                </div>

                {/* ID ROW */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      ID Type
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🪪
                      </span>

                      <select
                        className="auth-field-input"
                        value={form.idType}
                        onChange={update("idType")}
                      >
                        <option value="">
                          Select ID
                        </option>

                        <option value="Aadhaar">
                          Aadhaar
                        </option>

                        <option value="Passport">
                          Passport
                        </option>

                        <option value="Driving License">
                          Driving License
                        </option>

                      </select>

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      {form.idType || "ID"} Number
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🔐
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder={
                          form.idType === "Passport"
                            ? "Enter Passport Number"
                            : form.idType === "Driving License"
                            ? "Enter License Number"
                            : "Enter Aadhaar Number"
                        }
                        value={form.idNumber}
                        onChange={update("idNumber")}
                      />

                    </div>

                  </div>

                </div>

                {/* GROUP */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Family / Group Members
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        👨‍👩‍👧‍👦
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="No. of members"
                        value={form.familyMembers}
                        onChange={update("familyMembers")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Travel Destination
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🛕
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Ayodhya / Temple Visit"
                        value={form.travelPlace}
                        onChange={update("travelPlace")}
                      />

                    </div>

                  </div>

                </div>

                {/* ADDRESS */}
                <div className="auth-field">

                  <div className="auth-field-label">
                    Address
                  </div>

                  <div className="auth-field-wrap">

                    <span className="auth-field-icon">
                      📍
                    </span>

                    <input
                      className="auth-field-input"
                      placeholder="Enter address"
                      value={form.address}
                      onChange={update("address")}
                    />

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  className="auth-btn"
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading
                    ? <><span className="auth-spinner" />Registering…</>
                    : <>🙏 &nbsp; REGISTER PILGRIM</>
                  }
                </button>

              </div>

              <div className="auth-switch">

                Already registered? &nbsp;

                <span onClick={onBack}>
                  Login →
                </span>

              </div>

            </>
          )}

        </div>

      </div>

    </div>
  );
}