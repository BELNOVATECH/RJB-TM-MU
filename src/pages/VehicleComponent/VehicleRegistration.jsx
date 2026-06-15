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

export default function VehicleRegistration({
  onBack,
  onLogin,
}) {
  const PROFILE_KEY = "tourist_vehicle_profile";

  const [form, setForm] = useState({
    vehicleNo: "",
    chassis: "",
    type: "",
    driverName: "",
    model: "",
    capacity: "",
    year: "",
    insurance: "",
    permit: "",
    pollution: "",
    status: "",
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
      !form.vehicleNo ||
      !form.chassis ||
      !form.type ||
      !form.driverName ||
      !form.password
    ) {

      setAlert({
        type: "error",
        msg: "⚠️ Please fill required vehicle details.",
      });

      return;
    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);
          localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify({
          vehicleNo: form.vehicleNo.trim(),
          chassis: form.chassis,
          type: form.type,
          driverName: form.driverName.trim(),
          model: form.model,
          capacity: form.capacity,
          year: form.year,
          insurance: form.insurance,
          permit: form.permit,
          pollution: form.pollution,
          status: form.status,
          password: form.password,
          role: "Vehicle Service",
          image:
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=900",
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
          Ayodhya Transport · Vehicle Registration · 2026
        </div>

        <div className="auth-left-content">

          <div className="auth-eyebrow">
            Transport Department
          </div>

          <h1 className="auth-left-title">
            Vehicle
            <br />
            <em>Registration</em>
          </h1>

          <p className="auth-left-desc">
            Register tourism and pilgrim transport
            vehicles securely into the Ayodhya
            transport management system.
          </p>

          <div className="auth-steps">

            {[
              {
                n: "1",
                t: "Vehicle Details",
                d: "Register transport information",
              },
              {
                n: "2",
                t: "Verification",
                d: "Complete transport verification",
              },
              {
                n: "3",
                t: "Start Services",
                d: "Provide tourism transportation",
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
                🚐
              </div>

              <h2 className="reg-success-title">
                Registration Successful!
              </h2>

              <p className="reg-success-msg">
                Vehicle registration completed successfully.
                Your transport services are now available
                in the Ayodhya tourism portal.
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
                Vehicle Registration
              </div>

              <div className="auth-subheading">
                Register tourism transport services
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

                {/* VEHICLE NO + CHASSIS */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Vehicle Number *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🚘
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="AP09AB1234"
                        value={form.vehicleNo}
                        onChange={update("vehicleNo")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Chassis Number *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🔩
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Enter chassis number"
                        value={form.chassis}
                        onChange={update("chassis")}
                      />

                    </div>

                  </div>

                </div>

                {/* DRIVER NAME */}
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
                      value={form.driverName}
                      onChange={update("driverName")}
                    />

                  </div>

                </div>

                {/* TYPE + MODEL */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Vehicle Type *
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🚍
                      </span>

                      <select
                        className="auth-field-input"
                        value={form.type}
                        onChange={update("type")}
                      >
                        <option value="">
                          Select Type
                        </option>

                        <option>
                          Car
                        </option>

                        <option>
                          Auto
                        </option>

                        <option>
                          Mini Bus
                        </option>

                        <option>
                          Bus
                        </option>

                        <option>
                          EV Vehicle
                        </option>

                        <option>
                          Luxury Vehicle
                        </option>

                      </select>

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Manufacturer & Model
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🏭
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Toyota / Force Traveller"
                        value={form.model}
                        onChange={update("model")}
                      />

                    </div>

                  </div>

                </div>

                {/* CAPACITY + YEAR */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Vehicle Capacity
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        👥
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="40 Seats"
                        value={form.capacity}
                        onChange={update("capacity")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Year of Manufacture
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        📅
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="2024"
                        value={form.year}
                        onChange={update("year")}
                      />

                    </div>

                  </div>

                </div>

                {/* INSURANCE + PERMIT */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Insurance Details
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🛡️
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Insurance Valid Till 2027"
                        value={form.insurance}
                        onChange={update("insurance")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Permit Validity
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        📄
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="Permit Valid Till 2028"
                        value={form.permit}
                        onChange={update("permit")}
                      />

                    </div>

                  </div>

                </div>

                {/* POLLUTION + STATUS */}
                <div className="auth-field-row">

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Pollution Certificate Details
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        🌿
                      </span>

                      <input
                        className="auth-field-input"
                        placeholder="PUC Valid"
                        value={form.pollution}
                        onChange={update("pollution")}
                      />

                    </div>

                  </div>

                  <div className="auth-field">

                    <div className="auth-field-label">
                      Vehicle Availability Status
                    </div>

                    <div className="auth-field-wrap">

                      <span className="auth-field-icon">
                        ✅
                      </span>

                      <select
                        className="auth-field-input"
                        value={form.status}
                        onChange={update("status")}
                      >
                        <option value="">
                          Select Status
                        </option>

                        <option value="Available">
                          Available
                        </option>

                        <option value="Busy">
                          Busy
                        </option>

                        <option value="Maintenance">
                          Maintenance
                        </option>

                      </select>

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
                    : <>🚐 &nbsp; REGISTER VEHICLE</>
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
