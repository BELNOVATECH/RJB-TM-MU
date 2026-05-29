import { useState } from "react";
import "./styles/AuthLayout.css";
import "./styles/Register.css";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 3,
  duration: 8 + (i % 5) * 2,
  delay: i * 1.1,
  color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#ffd060" : "#ff8c00",
}));

export default function AccommodationRegistration({
  onBack,
  onLogin,
}) {

  const PROFILE_KEY = "tourist_accommodation_profile";

  const [form, setForm] = useState({
    propertyName: "",
    ownerName: "",
    accommodationType: "",
    registrationNo: "",
    totalRooms: "",
    availableRooms: "",
    blockName: "",
    roomType: "",
    roomCapacity: "",
    acType: "",
    roomPrice: "",
    amenities: "",
    address: "",
    city: "",
    contactNumber: "",
    alternateNumber: "",
    email: "",
    website: "",
    checkinTime: "",
    checkoutTime: "",
    parking: "",
    foodFacility: "",
    description: "",
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
      !form.propertyName ||
      !form.ownerName ||
      !form.accommodationType ||
      !form.registrationNo ||
      !form.password
    ) {

      setAlert({
        type: "error",
        msg: "⚠️ Please fill required accommodation details.",
      });

      return;
    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify({
          ...form,
          role: "Accommodation",
        })
      );

      setDone(true);

    }, 1500);
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
          Ayodhya Hospitality · Accommodation Registration · 2026
        </div>

        <div className="auth-left-content">

          <div className="auth-eyebrow">
            Tourism Hospitality Department
          </div>

          <h1 className="auth-left-title">
            Accommodation
            <br />
            <em>Registration</em>
          </h1>

          <p className="auth-left-desc">
            Register hotels, resorts, guest houses
            and pilgrim stay facilities into the
            Ayodhya Tourism Accommodation Network.
          </p>

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

          {done ? (

            <div className="reg-success">

              <div className="reg-success-icon">
                🏨
              </div>

              <h2 className="reg-success-title">
                Registration Successful!
              </h2>

              <p className="reg-success-msg">
                Accommodation registered successfully.
                Your property is now available in the
                Ayodhya Tourism Accommodation Portal.
              </p>

              <button
                className="auth-btn reg-success-btn"
                onClick={onLogin}
              >
                ← Back to Login
              </button>

            </div>

          ) : (

            <>
              <div className="auth-heading">
                Accommodation Registration
              </div>

              <div className="auth-subheading">
                Register hospitality services
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

                {/* PROPERTY + OWNER */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Property Name *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🏨
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Hotel / Resort Name"
                        value={form.propertyName}
                        onChange={update("propertyName")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Owner Name *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        👤
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Owner name"
                        value={form.ownerName}
                        onChange={update("ownerName")}
                      />

                    </div>

                  </div>

                </div>

                {/* TYPE + REG */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Accommodation Type *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🏢
                      </span>

                      <select
                        className="auth-field-input"
                        value={form.accommodationType}
                        onChange={update("accommodationType")}
                      >

                        <option value="">
                          Select Type
                        </option>

                        <option>Hotel</option>
                        <option>Resort</option>
                        <option>Guest House</option>
                        <option>Dharamshala</option>
                        <option>VIP Cottage</option>
                        <option>Homestay</option>

                      </select>

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Registration Number *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        📄
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Tourism registration no"
                        value={form.registrationNo}
                        onChange={update("registrationNo")}
                      />

                    </div>

                  </div>

                </div>

                {/* TOTAL + AVAILABLE */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Total Rooms
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🛏️
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Total rooms"
                        value={form.totalRooms}
                        onChange={update("totalRooms")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Available Rooms
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🚪
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Available rooms"
                        value={form.availableRooms}
                        onChange={update("availableRooms")}
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

                <button
                  className="auth-btn"
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading
                    ? <><span className="auth-spinner" />Registering…</>
                    : <>🏨 &nbsp; REGISTER ACCOMMODATION</>
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