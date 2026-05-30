import { useState } from "react";
import "../styles/AuthLayout.css";
import "../styles/Register.css";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 3,
  duration: 8 + (i % 5) * 2,
  delay: i * 1.3,
  color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#ffd060" : "#ff8c00",
}));

export default function Register({ onBack, onBackToLanding }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirm: "",
  });
  const [alert,   setAlert]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setAlert(null);
  };

  const handleRegister = () => {
    setAlert(null);
    const { firstName, lastName, email, password, confirm } = form;
    if (!firstName || !lastName || !email || !password || !confirm) {
      setAlert({ type: "error", msg: "⚠️  Please fill in all required fields." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setAlert({ type: "error", msg: "⚠️  Please enter a valid email address." });
      return;
    }
    if (password.length < 6) {
      setAlert({ type: "error", msg: "⚠️  Password must be at least 6 characters." });
      return;
    }
    if (password !== confirm) {
      setAlert({ type: "error", msg: "❌  Passwords do not match." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1400);
  };

  const LeftPanel = () => (
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
      </svg>

      <div className="auth-left-vert">Ayodhya Dham · Admin Portal · 2025</div>

      <div className="auth-left-content">
        <div className="auth-eyebrow">New Admin Registration</div>
        <h1 className="auth-left-title">
          Request<br />Admin<br /><em>Access</em>
        </h1>
        <p className="auth-left-desc">
          Submit your details for review. Access is granted only to verified
          government personnel.
        </p>
        <div className="auth-steps">
          {[
            { n: "1", t: "Fill Registration Form",  d: "Enter your official details and credentials" },
            { n: "2", t: "Await Verification",       d: "Super admin reviews and approves your request" },
            { n: "3", t: "Receive Access",           d: "Login credentials sent to your official email" },
          ].map((s) => (
            <div key={s.n} className="auth-step">
              <div className="auth-step-num">{s.n}</div>
              <div>
                <div className="auth-step-title">{s.t}</div>
                <div className="auth-step-desc">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="auth-layout">
      <div className="auth-gold-bar" />

      <LeftPanel />

      {/* ── RIGHT PANEL ── */}
      <div className="auth-right">

        {/* ── BACK TO LANDING ── */}
        <button className="auth-back-btn" onClick={onBackToLanding}>
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

          {done ? (
            <div className="reg-success">
              <div className="reg-success-icon">🙏</div>
              <h2 className="reg-success-title">Request Submitted!</h2>
              <p className="reg-success-msg">
                Your registration request has been sent to the Super Admin.
                You will receive your credentials at <strong>{form.email}</strong> within 24–48 hours.
              </p>
              <div className="reg-success-note">
                <span>jai shri ram 🪔</span>
              </div>
              <button className="auth-btn" style={{ marginTop: 24 }} onClick={onBack}>
                ← Back to Login
              </button>
            </div>
          ) : (
            <>
              <div className="auth-heading">Request Access</div>
              <div className="auth-subheading">Register as an admin — subject to approval</div>

              <div className="auth-tabs">
                <button className="auth-tab" onClick={onBack}>LOGIN</button>
                <button className="auth-tab active">REGISTER</button>
              </div>

              <div className="auth-fields">

                {alert && (
                  <div className={`auth-alert ${alert.type}`}>{alert.msg}</div>
                )}

                <div className="auth-field-row">
                  <div className="auth-field">
                    <div className="auth-field-label">First Name *</div>
                    <div className="auth-field-wrap">
                      <span className="auth-field-icon">👤</span>
                      <input className="auth-field-input" placeholder="Ramesh" value={form.firstName} onChange={update("firstName")} />
                    </div>
                  </div>
                  <div className="auth-field">
                    <div className="auth-field-label">Last Name *</div>
                    <div className="auth-field-wrap">
                      <span className="auth-field-icon">👤</span>
                      <input className="auth-field-input" placeholder="Sharma" value={form.lastName} onChange={update("lastName")} />
                    </div>
                  </div>
                </div>

                <div className="auth-field">
                  <div className="auth-field-label">Official Email *</div>
                  <div className="auth-field-wrap">
                    <span className="auth-field-icon">✉️</span>
                    <input className="auth-field-input" type="email" placeholder="name@ayodhya.gov.in" value={form.email} onChange={update("email")} />
                  </div>
                </div>

                <div className="auth-field">
                  <div className="auth-field-label">Phone Number</div>
                  <div className="auth-field-wrap">
                    <span className="auth-field-icon">📞</span>
                    <input className="auth-field-input" placeholder="+91 98765 43210" value={form.phone} onChange={update("phone")} />
                  </div>
                </div>

                <div className="auth-field-row">
                  <div className="auth-field">
                    <div className="auth-field-label">Password *</div>
                    <div className="auth-field-wrap">
                      <span className="auth-field-icon">🔒</span>
                      <input className="auth-field-input" type="password" placeholder="Create password" value={form.password} onChange={update("password")} />
                    </div>
                  </div>
                  <div className="auth-field">
                    <div className="auth-field-label">Confirm *</div>
                    <div className="auth-field-wrap">
                      <span className="auth-field-icon">🔒</span>
                      <input className="auth-field-input" type="password" placeholder="Repeat password" value={form.confirm} onChange={update("confirm")} />
                    </div>
                  </div>
                </div>

                <button className="auth-btn" onClick={handleRegister} disabled={loading}>
                  {loading
                    ? <><span className="auth-spinner" />Submitting…</>
                    : <>🙏 &nbsp; SUBMIT REQUEST</>
                  }
                </button>

                <div className="auth-note-box">
                  <div className="auth-note-icon">⏳</div>
                  <div className="auth-note-text">
                    <strong>Approval required.</strong> Your request will be reviewed
                    by the Super Admin within 24–48 hours. Credentials will be sent
                    to your official email.
                  </div>
                </div>

              </div>

              <div className="auth-switch">
                Already have access? &nbsp;
                <span onClick={onBack}>Sign in →</span>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}