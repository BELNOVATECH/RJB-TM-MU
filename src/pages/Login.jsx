import { useState } from "react";
import "./styles/AuthLayout.css";
import "./styles/Login.css";

// ── Hardcoded admin credential (replace with API call in production) ──
const ADMIN_EMAIL    = "admin@ayodhya.gov.in";
const ADMIN_PASSWORD = "Admin@123";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 3,
  duration: 8 + (i % 5) * 2,
  delay: i * 1.1,
  color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#ffd060" : "#ff8c00",
}));

export default function Login({ onSuccess, onRegister, onBack }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [alert,    setAlert]    = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    setAlert(null);
    if (!email || !password) {
      setAlert({ type: "error", msg: "⚠️  Please enter both email and password." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setAlert({ type: "success", msg: "🙏  Welcome, Admin! Redirecting…" });
        setTimeout(() => onSuccess && onSuccess(), 1000);
      } else {
        setAlert({ type: "error", msg: "❌  Invalid credentials. Access denied." });
      }
    }, 1200);
  };

  const handleKey = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <div className="auth-layout">
      <div className="auth-gold-bar" />

      {/* ── LEFT PANEL ── */}
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-arch" />
        <div className="auth-om-bg">ॐ</div>

        <div className="auth-sparks">
          {SPARKS.map((s) => (
            <div key={s.id} className="auth-spark" style={{
              left: s.left, width: s.size, height: s.size,
              background: s.color, boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
              animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s`,
            }} />
          ))}
        </div>

        <svg className="auth-temple-svg" viewBox="0 0 900 280" preserveAspectRatio="xMidYMax meet">
          <polygon points="450,20 420,80 380,110 360,160 340,200 320,240 280,280 620,280 580,240 560,200 540,160 520,110 480,80" fill="rgba(255,140,30,1)" />
          <polygon points="450,0 440,30 460,30" fill="rgba(255,180,60,1)" />
          <ellipse cx="450" cy="22" rx="12" ry="8" fill="rgba(255,200,80,1)" />
          <polygon points="300,100 285,140 270,170 255,210 240,250 240,280 360,280 360,250 345,210 330,170 315,140" fill="rgba(200,100,20,.8)" />
          <polygon points="600,100 615,140 630,170 645,210 660,250 660,280 540,280 540,250 555,210 570,170 585,140" fill="rgba(200,100,20,.8)" />
          <path d="M400,280 L400,200 Q450,160 500,200 L500,280 Z" fill="rgba(10,4,0,.9)" />
          <rect x="240" y="270" width="420" height="10" fill="rgba(180,80,10,.6)" rx="2" />
          <circle cx="450" cy="80" r="6" fill="rgba(255,200,80,.6)" />
          <line x1="415" y1="95" x2="485" y2="95" stroke="rgba(255,200,80,.3)" strokeWidth="1.5" />
          <line x1="395" y1="120" x2="505" y2="120" stroke="rgba(255,200,80,.25)" strokeWidth="1.5" />
          <line x1="370" y1="150" x2="530" y2="150" stroke="rgba(255,200,80,.2)" strokeWidth="1.5" />
        </svg>

        <div className="auth-left-vert">Ayodhya Dham · Admin Portal · 2025</div>

        <div className="auth-left-content">
          <div className="auth-eyebrow">Government of Uttar Pradesh</div>
          <h1 className="auth-left-title">
            Rama<br />Janma<br /><em>Bhumi</em>
          </h1>
          <p className="auth-left-desc">
            Sacred administration portal for the divine city of Ayodhya.
            Restricted access — authorised personnel only.
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

      {/* ── RIGHT PANEL ── */}
      <div className="auth-right">

        {/* ── BACK TO LANDING ── */}
        <button className="auth-back-btn" onClick={onBack}>
          ← Home
        </button>

        <div className="auth-mandala" />

        <div className="auth-form-card">

          <div className="auth-logo-row">
            <div className="auth-logo-icon">🕉️</div>
            <div>
              <div className="auth-logo-name">Rama Janma Bhumi</div>
              <div className="auth-logo-sub">Admin Portal · Ayodhya Dham</div>
            </div>
          </div>

          <div className="auth-heading">Welcome Back</div>
          <div className="auth-subheading">Sign in to access the admin dashboard</div>

          <div className="auth-tabs">
            <button className="auth-tab active">LOGIN</button>
            <button className="auth-tab" onClick={onRegister}>REGISTER</button>
          </div>

          <div className="auth-fields">

            {alert && (
              <div className={`auth-alert ${alert.type}`}>{alert.msg}</div>
            )}

            <div className="auth-field">
              <div className="auth-field-label">Email Address</div>
              <div className="auth-field-wrap">
                <span className="auth-field-icon">✉️</span>
                <input
                  className="auth-field-input"
                  type="email"
                  placeholder="admin@ayodhya.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKey}
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-field-label">Password</div>
              <div className="auth-field-wrap">
                <span className="auth-field-icon">🔒</span>
                <input
                  className="auth-field-input"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKey}
                />
                <span
                  className="auth-eye"
                  onClick={() => setShowPass(!showPass)}
                  title={showPass ? "Hide" : "Show"}
                >
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <div className="auth-forgot">Forgot password?</div>

            <button className="auth-btn" onClick={handleLogin} disabled={loading}>
              {loading
                ? <><span className="auth-spinner" />Verifying…</>
                : <>🙏 &nbsp; ENTER DASHBOARD</>
              }
            </button>

            <div className="auth-divider-or">
              <div className="auth-divider-line" />
              <div className="auth-divider-txt">✦ ॐ ✦</div>
              <div className="auth-divider-line" />
            </div>

            <div className="auth-note-box">
              <div className="auth-note-icon">🛡️</div>
              <div className="auth-note-text">
                <strong>Admin access only.</strong> Unauthorised login attempts are
                monitored and reported to the system administrator.
              </div>
            </div>

          </div>

          <div className="auth-switch">
            New admin? &nbsp;
            <span onClick={onRegister}>Request access →</span>
          </div>

        </div>
      </div>
    </div>
  );
}