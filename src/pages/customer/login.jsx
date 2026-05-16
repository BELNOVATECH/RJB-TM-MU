import "./Auth.css";

export default function Register() {
  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-left">

        <div className="overlay"></div>

        <div className="auth-content">

          <div className="logo-box">
            <i className="ti ti-building-temple"></i>
          </div>

          <h1>Tourist Registration & Management</h1>

          <p className="subtitle">
            Secure spiritual tourism management platform
          </p>

          <div className="feature-list">

            <div className="feature-card">
              <i className="ti ti-user-plus"></i>
              <span>User Registration/Login</span>
            </div>

            <div className="feature-card">
              <i className="ti ti-device-mobile-message"></i>
              <span>Mobile OTP Verification</span>
            </div>

            <div className="feature-card">
              <i className="ti ti-id"></i>
              <span>Aadhaar/ID Verification</span>
            </div>

            <div className="feature-card">
              <i className="ti ti-users-group"></i>
              <span>Family/Group Registration</span>
            </div>

            <div className="feature-card">
              <i className="ti ti-map-route"></i>
              <span>Travel History Tracking</span>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">

        <div className="auth-card">

          <div className="card-top">

            <h2>Create Account</h2>

            <p>
              Register to access spiritual tourism services
            </p>

          </div>

          <form className="auth-form">

            <div className="input-group">
              <label>Full Name</label>

              <div className="input-box">
                <i className="ti ti-user"></i>
                <input type="text" placeholder="Enter full name" />
              </div>
            </div>

            <div className="input-group">
              <label>Mobile Number</label>

              <div className="input-box">
                <i className="ti ti-phone"></i>
                <input type="text" placeholder="Enter mobile number" />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>

              <div className="input-box">
                <i className="ti ti-mail"></i>
                <input type="email" placeholder="Enter email address" />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="input-box">
                <i className="ti ti-lock"></i>
                <input type="password" placeholder="Enter password" />
              </div>
            </div>

            <button className="auth-btn">
              Create Account
            </button>

          </form>

          <div className="bottom-text">
            Already have an account?
            <span> Login</span>
          </div>

        </div>

      </div>

    </div>
  );
}