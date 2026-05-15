import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Tourists from "./pages/Tourists";
import Vehicles from "./pages/Vehicles";
import Accommodation from "./pages/Accommodation";
import DevotionalContent from "./pages/DevotionalContent";
import TouristSpots from "./pages/TouristSpots";
import ChargesPricing from "./pages/ChargesPricing";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

// ─── Navigation config ────────────────────────────────────────────────────────
const NAV = [
  {
    section: "Overview",
    items: [
      { key: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard" },
    ],
  },
  {
    section: "Management",
    items: [
      { key: "tourists",      label: "Tourists",       icon: "ti-users"    },
      { key: "vehicles",      label: "Vehicles",       icon: "ti-car"      },
      { key: "accommodation", label: "Accommodation",  icon: "ti-building" },
      { key: "touristSpots",  label: "Tourist Spots",  icon: "ti-map-pin"  },
    ],
  },
  {
    section: "Services",
    items: [
      { key: "devotionalContent", label: "Devotional Content", icon: "ti-music" },
    ],
  },
  {
    section: "System",
    items: [
      { key: "chargesPricing", label: "Charges & Pricing", icon: "ti-cash" },
    ],
  },
];

const SCREEN_MAP = {
  dashboard:         <Dashboard />,
  tourists:          <Tourists />,
  vehicles:          <Vehicles />,
  accommodation:     <Accommodation />,
  devotionalContent: <DevotionalContent />,
  touristSpots:      <TouristSpots />,
  chargesPricing:    <ChargesPricing />,
};

const TITLES = {
  dashboard:         "Dashboard",
  tourists:          "Tourist & Guide Management",
  vehicles:          "Vehicle & Transport Management",
  accommodation:     "Accommodation & Cottage Management",
  touristSpots:      "Tourist Spot Configuration",
  devotionalContent: "Devotional Content Management",
  chargesPricing:    "Charges & Pricing Configuration",
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  // "landing" | "login" | "register" | "app"
  const [screen, setScreen] = useState("landing");
  const [active, setActive] = useState("dashboard");

  // ── Landing ───────────────────────────────────────────────────────────────
  if (screen === "landing") {
    return <Landing onEnter={() => setScreen("login")} />;
  }

  // ── Login ─────────────────────────────────────────────────────────────────
  if (screen === "login") {
    return (
      <Login
        onSuccess={() => setScreen("app")}
        onRegister={() => setScreen("register")}
        onBack={() => setScreen("landing")} 
      />
    );
  }

  // ── Register ──────────────────────────────────────────────────────────────
  if (screen === "register") {
    return (
      <Register
        onBack={() => setScreen("login")}
        onBackToLanding={() => setScreen("landing")} 
      />
    );
  }

  // ── Main App Shell ────────────────────────────────────────────────────────
  const content = SCREEN_MAP[active] || (
    <div style={{ padding: 40, color: "#b5860d", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>🚧</div>
      <div style={{ fontSize: 18, fontWeight: 500 }}>{TITLES[active]}</div>
      <div style={{ color: "#999", marginTop: 8, fontSize: 13 }}>This screen is under construction.</div>
    </div>
  );

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sb-logo">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="sb-logo-icon">
              <i className="ti ti-om" style={{ fontSize: 16, color: "#1a0a00" }} />
            </div>
            <div>
              <div className="sb-logo-title">Rama Janma Bhumi</div>
              <div className="sb-logo-sub">Admin Portal</div>
            </div>
          </div>
        </div>

        <nav className="sb-nav">
          {NAV.map((group) => (
            <div key={group.section} className="sb-group">
              <div className="sb-label">{group.section}</div>
              {group.items.map((item) => (
                <button
                  key={item.key}
                  className={`sb-item ${active === item.key ? "active" : ""}`}
                  onClick={() => setActive(item.key)}
                >
                  <i className={`ti ${item.icon}`} />
                  <span>{item.label}</span>
                  {item.badge && <span className="sb-badge">{item.badge}</span>}
                </button>
              ))}
              <div className="sb-divider" />
            </div>
          ))}
        </nav>

        <div className="sb-footer">
          <div className="sb-avatar" />
          <div>
            <div className="sb-user-name">Admin User</div>
            <div className="sb-user-role">Super Admin</div>
          </div>
          {/* Logout */}
          <button
            title="Logout"
            onClick={() => { setScreen("login"); setActive("dashboard"); }}
            style={{
              marginLeft: "auto", background: "none", border: "none",
              cursor: "pointer", color: "#b5860d", fontSize: 16, padding: 4,
            }}
          >
            <i className="ti ti-logout" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="main-area">
        <header className="topbar">
          <div className="tb-title">{TITLES[active]}</div>
          <div className="tb-search">
            <i className="ti ti-search" style={{ fontSize: 14 }} />
            <span>Search pilgrims, vehicles, guides…</span>
          </div>
          <div style={{ fontSize: 11, color: "#888" }}>Fri, 15 May 2026</div>
          <div className="tb-icon-btn">
            <i className="ti ti-bell" style={{ fontSize: 15, color: "#888" }} />
            <div className="tb-dot" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="tb-user-avatar" />
            <div style={{ fontSize: 11, fontWeight: 500, color: "#1a0a00" }}>Super Admin</div>
          </div>
        </header>

        <div className="page-content">{content}</div>
      </div>
    </div>
  );
}