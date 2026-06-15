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

export default function TourGuideRegistration({
  onBack,
  onLogin,
}) {
  const PROFILE_KEY = "tourist_guide_profile";

  const [form, setForm] = useState({
    guideName: "",
    mobile: "",
    email: "",
    languages: "",
    specialization: "",
    experience: "",
    availability: "",
    ratings: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (field) => (e) => {

    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setAlert(null);
  };

const handleRegister = () => {

  setAlert(null);

  if (
    !form.guideName ||
    !form.mobile ||
    !form.email ||
    !form.password
  ) {

    setAlert({
      type: "error",
      msg: "⚠️ Please fill all required fields.",
    });

    return;
  }

  setLoading(true);

  setTimeout(() => {

    setLoading(false);

    /* =========================
       GET OLD GUIDES
    ========================= */

    const existingGuides =
      JSON.parse(
        localStorage.getItem(
          "tour_guides"
        )
      ) || [];

    /* =========================
       NEW GUIDE OBJECT
    ========================= */

    const newGuide = {

      id: Date.now(),

      status: "Pending",

      statusCls: "badge-amber",

      name: form.guideName,

      role:
        form.specialization ||
        "Spiritual Tour Guide",

      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",

      languages:
        form.languages
          ? form.languages
              .split(",")
              .map((lang) =>
                lang.trim()
              )
          : ["English"],

      people: "1-10 people",

      desc:
        "Registered spiritual tourism guide for Ayodhya pilgrims.",

      exp:
        form.experience ||
        "1 year",

      reviews: "0",

      price: "₹500/hr",

      rating:
        form.ratings || "4.5",

      mobile: form.mobile,

      email: form.email,

      availability:
        form.availability,

      password: form.password,

    };

    /* =========================
       SAVE ALL GUIDES
    ========================= */

    localStorage.setItem(

      "tour_guides",

      JSON.stringify([
        ...existingGuides,
        newGuide,
      ])

    );

    /* OPTIONAL LOGIN PROFILE */

    localStorage.setItem(

      PROFILE_KEY,

      JSON.stringify(newGuide)

    );

    console.log(
      "Saved Guides:",
      [
        ...existingGuides,
        newGuide,
      ]
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
          Ayodhya Tourism · Guide Registration · 2026
        </div>

        <div className="auth-left-content">

          <div className="auth-eyebrow">
            Tourism Department
          </div>

          <h1 className="auth-left-title">
            Tour Guide
            <br />
            <em>Registration</em>
          </h1>

          <p className="auth-left-desc">
            Register multilingual tourist guides,
            temple specialists and tourism support services.
          </p>

          <div className="auth-steps">

            {[
              {
                n: "1",
                t: "Guide Registration",
                d: "Fill tourism and personal details",
              },
              {
                n: "2",
                t: "Verification",
                d: "Complete secure guide onboarding",
              },
              {
                n: "3",
                t: "Start Services",
                d: "Manage tours and pilgrim assistance",
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
                🧭
              </div>

              <h2 className="reg-success-title">
                Registration Successful!
              </h2>

              <p className="reg-success-msg">
                Your guide registration has been
                completed successfully.
                Welcome to Ayodhya tourism services.
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
                Tour Guide Registration
              </div>

              <div className="auth-subheading">
                Register for tourism guide services
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

                {/* GUIDE NAME */}
                <div className="auth-field">

                  <div className="auth-field-label">
                    Guide Name *
                  </div>

                  <div className="auth-field-wrap">

                    <span className="auth-field-icon">
                      👤
                    </span>

                    <input
                      className="auth-field-input"
                      placeholder="Enter guide name"
                      value={form.guideName}
                      onChange={update("guideName")}
                    />

                  </div>

                </div>

                {/* MOBILE + EMAIL */}
                <div className="auth-field-row">

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
                        placeholder="Enter email address"
                        value={form.email}
                        onChange={update("email")}
                      />

                    </div>

                  </div>

                </div>

                {/* LANGUAGES + SPECIALIZATION */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Languages Known
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🌐
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Hindi, English..."
                        value={form.languages}
                        onChange={update("languages")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Specialization
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🛕
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Temple Tours"
                        value={form.specialization}
                        onChange={update("specialization")}
                      />

                    </div>

                  </div>

                </div>

                {/* EXPERIENCE + AVAILABILITY */}
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
                      Availability
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        ⏰
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Full Time"
                        value={form.availability}
                        onChange={update("availability")}
                      />

                    </div>

                  </div>

                </div>

                {/* RATINGS */}
                <div className="auth-field">

                  <div className="auth-field-label">
                    Ratings & Reviews
                  </div>

                  <div className="auth-field-wrap">

                    <span className="auth-field-icon">
                      ⭐
                    </span>

                    <input
                      className="auth-field-input"
                      placeholder="4.8 / 5"
                      value={form.ratings}
                      onChange={update("ratings")}
                    />

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
                    : <>🧭 &nbsp; REGISTER GUIDE</>
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
