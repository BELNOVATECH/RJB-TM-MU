import { useState } from "react";
import "../styles/AuthLayout.css";
import "../styles/Register.css";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 3,
  duration: 8 + (i % 5) * 2,
  delay: i * 1.1,
  color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#ffd060" : "#ff8c00",
}));

export default function DriverManagement({
  onBack,
  onLogin,
}) {
  const PROFILE_KEY = "tourist_driver_profile";

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    aadhaar: "",
    license: "",
    expiry: "",
    vehicle: "",
    experience: "",
    languages: "",
    ratings: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [alert, setAlert] = useState(null);

  const update = (field) => (e) => {

    setForm({
      ...form,
      [field]: e.target.value,
    });

    setAlert(null);
  };

  const handleRegister = () => {

    setAlert(null);

    if (
      !form.name ||
      !form.mobile ||
      !form.license ||
      !form.password
    ) {

      setAlert({
        type: "error",
        msg: "⚠️ Please fill required driver details.",
      });

      return;
    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);
      localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          address: form.address,
          aadhaar: form.aadhaar,
          license: form.license,
          expiry: form.expiry,
          vehicle: form.vehicle,
          experience: form.experience,
          languages: form.languages,
          ratings: form.ratings,
          password: form.password,
          role: "Driver",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
        })
      );
      setDone(true);

    }, 1500);
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
          Ayodhya Driver Registration · 2026
        </div>

        <div className="auth-left-content">

          <div className="auth-eyebrow">
            Driver Transport Services
          </div>

          <h1 className="auth-left-title">
            Driver
            <br />
            <em>Registration</em>
          </h1>

          <p className="auth-left-desc">
            Register tourism and pilgrim drivers
            securely into the Ayodhya transport
            management portal.
          </p>

          <div className="auth-steps">

            {[
              {
                n: "1",
                t: "Driver Registration",
                d: "Enter driver and transport details",
              },
              {
                n: "2",
                t: "Verification",
                d: "Complete driver verification",
              },
              {
                n: "3",
                t: "Start Services",
                d: "Support tourism transportation",
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
          onClick={onBack}
        >
          ← Home
        </button>

        <div className="auth-mandala" />

        <div className="auth-form-card">

          {done ? (

            <div className="reg-success">

              <div className="reg-success-icon">
                🚖
              </div>

              <h2 className="reg-success-title">
                Registration Successful!
              </h2>

              <p className="reg-success-msg">
                Driver registration completed successfully.
                Your transportation services are now
                available in the tourism portal.
              </p>

              <button
                className="auth-btn"
                style={{ marginTop: 24 }}
                onClick={onLogin}
              >
                ← Back to Login
              </button>

            </div>

          ) : (

            <>
              <div className="auth-heading">
                Driver Registration
              </div>

              <div className="auth-subheading">
                Register for tourism transport services
              </div>

              <div className="auth-tabs">

                <button
                  className="auth-tab"
                  onClick={onLogin}
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

                {/* NAME + MOBILE */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Driver Name *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        👤
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Enter driver name"
                        value={form.name}
                        onChange={update("name")}
                      />

                    </div>

                  </div>

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
                        placeholder="Enter mobile number"
                        value={form.mobile}
                        onChange={update("mobile")}
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

                {/* AADHAAR + LICENSE */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Aadhaar / ID Details
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🪪
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Enter Aadhaar number"
                        value={form.aadhaar}
                        onChange={update("aadhaar")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Driving License Number *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🚘
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Enter license number"
                        value={form.license}
                        onChange={update("license")}
                      />

                    </div>

                  </div>

                </div>

                {/* EXPIRY + VEHICLE */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      License Expiry Date
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        📅
                      </span>

                      <input
                        type="date"
                        className="auth-field-input"
                        value={form.expiry}
                        onChange={update("expiry")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Vehicle Assignment Details
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🚐
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Assigned vehicle number"
                        value={form.vehicle}
                        onChange={update("vehicle")}
                      />

                    </div>

                  </div>

                </div>

                {/* EXPERIENCE + LANGUAGES */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Experience
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        📚
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="5 Years"
                        value={form.experience}
                        onChange={update("experience")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Language Skills
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🌐
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Hindi, English"
                        value={form.languages}
                        onChange={update("languages")}
                      />

                    </div>

                  </div>

                </div>

                {/* PASSWORD */}
                <div className="auth-field">

                  <div className="auth-field-label">
                    Password *
                  </div>

                  <div className="auth-field-wrap">

                    <span className="auth-field-icon">
                      🔐
                    </span>

                    <input
                      type="password"
                      className="auth-field-input"
                      placeholder="Create password"
                      value={form.password}
                      onChange={update("password")}
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
                    : <>🚖 &nbsp; REGISTER DRIVER</>
                  }
                </button>

              </div>

              <div className="auth-switch">

                Already registered? &nbsp;

                <span onClick={onLogin}>
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
