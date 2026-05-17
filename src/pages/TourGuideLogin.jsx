import { useState } from "react";
import "./styles/AuthLayout.css";
import "./styles/Login.css";

const GUIDE_MOBILE = "9876543210";
const GUIDE_PASSWORD = "1234";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 3,
  duration: 8 + (i % 5) * 2,
  delay: i * 1.1,
  color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#ffd060" : "#ff8c00",
}));

export default function TourGuideLogin({
  onSuccess,
  onRegister,
  onBack,
}) {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = () => {

    setAlert(null);

    if (!mobile || !password) {

      setAlert({
        type: "error",
        msg: "⚠️ Please enter mobile number and password.",
      });

      return;
    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      if (
        mobile === GUIDE_MOBILE &&
        password === GUIDE_PASSWORD
      ) {

        setAlert({
          type: "success",
          msg: "✅ Welcome Tour Guide!",
        });

        setTimeout(() => {
          onSuccess && onSuccess();
        }, 1000);

      } else {

        setAlert({
          type: "error",
          msg: "❌ Invalid guide credentials.",
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
          Ayodhya Tourism · Guide Services · 2026
        </div>

        <div className="auth-left-content">

          <div className="auth-eyebrow">
            Ayodhya Tourism Department
          </div>

          <h1 className="auth-left-title">
            Tour Guide
            <br />
            <em>Portal</em>
          </h1>

          <p className="auth-left-desc">
            Secure multilingual guide management
            and tourism assistance services portal.
          </p>

          <div className="auth-steps">

            {[
              {
                n: "1",
                t: "Guide Access",
                d: "Login securely with credentials",
              },
              {
                n: "2",
                t: "Tour Management",
                d: "Handle tourist bookings & tours",
              },
              {
                n: "3",
                t: "Pilgrim Support",
                d: "Provide spiritual tourism guidance",
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
              🧭
            </div>

            <div>

              <div className="auth-logo-name">
                Tour Guide Services
              </div>

              <div className="auth-logo-sub">
                Tourism Management Portal
              </div>

            </div>

          </div>

          <div className="auth-heading">
            Tour Guide Login
          </div>

          <div className="auth-subheading">
            Login for guide tourism services
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
                Mobile Number
              </div>

              <div className="auth-field-wrap">

                <span className="auth-field-icon">
                  📞
                </span>

                <input
                  className="auth-field-input"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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
                  className="auth-field-input"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                : <>🧭 &nbsp; ENTER GUIDE PORTAL</>
              }
            </button>

          </div>

          <div className="auth-switch">

            New Guide? &nbsp;

            <span onClick={onRegister}>
              Register now →
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}