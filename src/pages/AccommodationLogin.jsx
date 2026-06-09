import { useEffect, useState } from "react";
import "./styles/AuthLayout.css";
import "./styles/Login.css";

const PROFILE_KEY = "tourist_accommodation_profile";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 3,
  duration: 8 + (i % 5) * 2,
  delay: i * 1.1,
  color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#ffd060" : "#ff8c00",
}));

export default function AccommodationLogin({
  onSuccess,
  onRegister,
  onBack,
}) {

  const [propertyName, setPropertyName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [savedProfile, setSavedProfile] = useState(null);

  useEffect(() => {

    try {

      const raw = localStorage.getItem(PROFILE_KEY);

      if (raw) {
        setSavedProfile(JSON.parse(raw));
      }

    } catch {

      setSavedProfile(null);

    }

  }, []);

  const handleLogin = () => {

    setAlert(null);

    if (!propertyName || !password) {

      setAlert({
        type: "error",
        msg: "⚠️ Enter property name and password.",
      });

      return;
    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      const profile = savedProfile;

      if (!profile) {

        setAlert({
          type: "error",
          msg: "⚠️ Please register accommodation first.",
        });

        return;
      }

      if (
        propertyName.trim().toLowerCase() ===
          profile.propertyName?.toLowerCase() &&
        password === profile.password
      ) {

        setAlert({
          type: "success",
          msg: "🏨 Accommodation verified successfully.",
        });

        localStorage.setItem(
          "tourist_accommodation_current",
          JSON.stringify(profile)
        );

        setTimeout(() => {



  onSuccess && onSuccess();

}, 1000);

      } else {

        setAlert({
          type: "error",
          msg: "❌ Invalid accommodation credentials.",
        });

      }

    }, 1200);
  };

  return (

    <div className="auth-layout">

      <div className="auth-gold-bar" />

      {/* LEFT */}
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
          Ayodhya Hospitality · Accommodation Services · 2026
        </div>

        <div className="auth-left-content">

          <div className="auth-eyebrow">
            Ayodhya Tourism Department
          </div>

          <h1 className="auth-left-title">
            Accommodation
            <br />
            <em>Portal</em>
          </h1>

          <p className="auth-left-desc">
            Manage hotel bookings, pilgrim stays,
            room availability, pricing and hospitality
            services through the Ayodhya Tourism Portal.
          </p>

          <div className="auth-steps">

            {[
              {
                n: "1",
                t: "Property Login",
                d: "Secure hospitality access",
              },
              {
                n: "2",
                t: "Room Management",
                d: "Manage rooms and bookings",
              },
              {
                n: "3",
                t: "Tourist Services",
                d: "Provide pilgrim stay services",
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

      {/* RIGHT */}
      <div className="auth-right">

        <button
          className="auth-back-btn"
          onClick={onBack}
        >
          ← Home
        </button>

        <div className="auth-mandala" />

        <div className="auth-form-card">

          <div className="auth-logo-row">

            <div className="auth-logo-icon">
              🏨
            </div>

            <div>

              <div className="auth-logo-name">
                Accommodation Services
              </div>

              <div className="auth-logo-sub">
                Pilgrim Hospitality Portal
              </div>

            </div>

          </div>

          <div className="auth-heading">
            Accommodation Login
          </div>

          <div className="auth-subheading">
            Login for hotel and property management
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

            <div className="auth-field">

              <div className="auth-field-label">
                Property Name / Hotel Name
              </div>

              <div className="auth-field-wrap">

                <span className="auth-field-icon">
                  🏨
                </span>

                <input
                  className="auth-field-input"
                  placeholder="Enter property name"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                />

              </div>

            </div>

            <div className="auth-field">

              <div className="auth-field-label">
                Password
              </div>

              <div className="auth-field-wrap">

                <span className="auth-field-icon">
                  🔐
                </span>

                <input
                  type="password"
                  className="auth-field-input"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

            </div>

            <button
  type="button"
  className="auth-btn"
  onClick={handleLogin}
  disabled={loading}
>
              {loading
                ? <><span className="auth-spinner" />Verifying…</>
                : <>🏨 &nbsp; ENTER ACCOMMODATION PORTAL</>
              }
            </button>

          </div>

          <div className="auth-switch">

            New Property? &nbsp;

            <span onClick={onRegister}>
              Register now →
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}