import React from "react";
// import "./Landing.css";
import './styles/Landing.css';
import AboutUs from "./About_us";
import TempleDetails from "./TempleDetails";

const Landing = ({ onEnter }) => {
  // Statistics data for the floral stats section
  const [showAboutPage, setShowAboutPage] = React.useState(false);
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showTemplePage, setShowTemplePage] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState(null);
  const [showSevaPopup, setShowSevaPopup] = React.useState(false);
  const [showInfoPopup, setShowInfoPopup] = React.useState(false);
const [popupType, setPopupType] = React.useState("");
const [showDonateSuccess, setShowDonateSuccess] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
  };

   if (showAboutPage) {
    return (
      <AboutUs
        onBack={() => setShowAboutPage(false)}
      />
    );
  }

 if (selectedPage) {
  return (
    <TempleDetails
      type={selectedPage}
      onBack={() => setSelectedPage(null)}
    />
  );
}


 const statItems = [

  {
    label: "Temples",
    value: "6",
    icon: "fas fa-temple",
    flowerEmoji: "🌸",
    page: "temples"
  },

  {
    label: "Ghat",
    value: "4",
    icon: "fas fa-water",
    flowerEmoji: "🌼",
    page: "ghat"
  },

  {
    label: "Charity",
    value: "1",
    icon: "fas fa-hand-holding-heart",
    flowerEmoji: "🌻",
    page: "charity"
  },

  {
    label: "Kund",
    value: "5",
    icon: "fas fa-dharmachakra",
    flowerEmoji: "🌸",
    page: "kund"
  },

  {
    label: "Bhawan",
    value: "2",
    icon: "fas fa-building",
    flowerEmoji: "🌺",
    page: "bhawan"
  },

  {
    label: "Aashram",
    value: "3",
    icon: "fas fa-spa",
    flowerEmoji: "🌸",
    page: "aashram"
  }

];

  // Attractions data with images
  const attractionsData = [
    {
      title: "Ammaji Mandir",
      description: "The famous Ammaji temple - one of 108 Divya desams of Lord Vishnu. This temple hosts Sri Rama avatar...",
      image: "/assets/ammaji-mandir.jpg",
      alt: "Ammaji Mandir Temple"
    },
    {
      title: "Raj Dwar Mandir",
      description: "It is one of the important sites of Ayodhya, located near Hanumangarhi in the Ayodhya region.",
      image: "/assets/raj-dwar.avif",
      alt: "Raj Dwar Mandir"
    },
    {
      title: "Shree Ram Janmabhoomi",
      description: "The Ram Mandir is a partially constructed Hindu temple complex in Ayodhya, Uttar Pradesh, India.",
      image: "/assets/ram-janmbhoomi.jpg",
      alt: "Shree Ram Janmabhoomi"
    }
  ];

  // Special attractions data with images
  const specialAttractions = [
    {
      title: "Saryu Ghat Aarti",
      description: "Witness divine evening aarti with chanting and floating diyas.",
      image: "/assets/sarayu-ghat.jpg",
      alt: "Saryu Ghat Aarti"
    },
    {
      title: "Kanak Bhawan",
      description: "Famous temple known for the beautiful idols of Ram & Sita.",
      image: "/assets/Kanak_Bhawan.jpg",
      alt: "Kanak Bhawan Temple"
    }
  ];

  // Events data
  const eventsData = [
    {
      title: "Ram Navami Ceremony",
      description: '"Surya Tilak emotional moment for me", says PM Modi',
      date: "17/Apr/2024"
    },
    {
      title: "Ramotsav 2024, Ayodhya",
      description: "Grand religious festival, devotional songs, storytelling, discourses by saints.",
      date: "13/Sep/2023"
    }
  ];

  // Services data
const servicesData = [
  {
    name: "Railway Booking",
    icon: "fas fa-train",
    link: "https://www.irctc.co.in"
  },
  {
    name: "Bus Ticket Booking",
    icon: "fas fa-bus",
    link: "https://www.redbus.in"
  },
  {
    name: "Airways Booking",
    icon: "fas fa-plane",
    link: "https://www.makemytrip.com/flights/"
  },
  {
    name: "Hotel Booking",
    icon: "fas fa-hotel",
    link: "https://www.booking.com"
  },
  {
    name: "Tour Package Booking",
    icon: "fas fa-suitcase",
    link: "https://www.makemytrip.com/holidays-india/"
  },
 {
   name: "Boat Riding Booking",
   icon: "fas fa-ship",
   link: "https://jalsacruise.in"
}
];

  // Helpline data
  const helplineData = [
    { name: "CM Helpline", number: "1076", icon: "fas fa-phone-alt" },
    { name: "Child Helpline", number: "1098", icon: "fas fa-child" },
    { name: "Women Helpline", number: "1090", icon: "fas fa-female" },
    { name: "Ambulance", number: "108", icon: "fas fa-ambulance" },
    { name: "Temple", number: "300+", icon: "fas fa-temple" },
    { name: "Ghat", number: "62+", icon: "fas fa-water" },
    { name: "Hospital", number: "100+", icon: "fas fa-hospital" },
    { name: "Hotel", number: "150+", icon: "fas fa-hotel" },
    { name: "Daily Visitors", number: "30k+", icon: "fas fa-users" }
  ];

  
  return (
    <div className="landing-page">
      {/* Navbar Section */}
      <div className="landing-navbar">
        <div className="landing-container">
          <div className="nav-content">
            <div className="nav-logo">
              <h2>🕉️ Ayodhya Dham</h2>
              <p>Government of Uttar Pradesh</p>
            </div>
            
            <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
              <a href="#home" className="nav-link">Home</a>
              <a href="#attractions" className="nav-link">Attractions</a>
              <a href="#events" className="nav-link">Events</a>
              <a href="#services" className="nav-link">Services</a>
             <button 
  className="dashboard-btn"
  onClick={onEnter}
>
  <i className="fas fa-tachometer-alt"></i> Login/Register
</button>
            </div>
            
            <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="landing-hero">
        <div className="landing-container">
          <div className="hero-content">
            <div className="hero-title">🙏 जय श्री राम 🙏</div>
            <div className="hero-tag">Ayodhya – The birthplace of Lord Rama | Saryu's Grace</div>
            <p className="hero-description">
              Ayodhya counted among the seven most sacred cities of ancient India, on the right bank of river Saryu, 
              once capital of Avadh region. Lord Rama, descendant of Surya Vansh, makes this land divine.
            </p>
          <button
  className="hero-btn"
  onClick={() => setShowAboutPage(true)}
>
  Read More <i className="fas fa-arrow-right"></i>
</button>


          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="landing-container">
        <div className="stats-section">
          <div className="stats-grid">
            {statItems.map((item, idx) => (
            //   <div key={idx} className="stat-card-floral">
            <div
  key={idx}
  className="stat-card-floral"
 onClick={() => {

  if (item.page) {
    setSelectedPage(item.page);
  }

  }}
>
                <div className="stat-value">{item.value}</div>
                <div className="stat-label">
                  <i className={item.icon}></i> {item.label}
                  <span className="stat-flower">{item.flowerEmoji}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaders Section with Images */}
        <div className="section-head">रामराज्य के प्रेरणा स्रोत</div>
        <div className="leaders-row">
          <div className="leader-card">
            <div className="leader-img">
              <img 
                src="/assets/modi-ji.jpg"
                alt="Shri Narendra Modi"
                className="leader-photo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<i class="fas fa-user-tie fa-3x"></i>';
                }}
              />
            </div>
            <h3>Shri Narendra Modi</h3>
            <p>Hon'ble Prime Minister, India</p>
          </div>
          <div className="leader-card">
            <div className="leader-img">
              <img 
                src="/assets/yogi-ji.jpg"
                alt="Shri Yogi Adityanath"
                className="leader-photo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<i class="fas fa-user-tie fa-3x"></i>';
                }}
              />
            </div>
            <h3>Shri Yogi Adityanath</h3>
            <p>Hon'ble Chief Minister, Uttar Pradesh</p>
          </div>
        </div>

        {/* Support Banner */}
        <div className="support-banner">
          <h2>🌸 Support us, we need your help. 🌼</h2>
          <p>May ram bless you! Thank you. Those who (in charity) spend of their goods by night and by day</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '68%' }}></div>
          </div>
          <p><strong>₹1,80,000 raised of ₹5,00,000</strong> 🌸</p>
         <button
  className="support-btn"
  onClick={() => setShowSevaPopup(true)}
>
  Contribute Seva <i className="fas fa-seedling"></i>
</button>
        </div>
        {showSevaPopup && (
  <div
    className="seva-overlay"
    onClick={() => setShowSevaPopup(false)}
  >
    <div
      className="seva-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="close-btn"
        onClick={() => setShowSevaPopup(false)}
      >
        ✕
      </button>

      <div className="seva-header">
        <h2>🙏 Contribute Seva</h2>
        <p>
          Support Ayodhya Dham services and help pilgrims through
          your valuable contribution.
        </p>
      </div>

      <div className="seva-options">

        <div className="seva-card">
          <span>🍛</span>
          <h3>Annadanam</h3>
          <p>Support free meals for devotees</p>
          <h4>₹501</h4>
         <button
  onClick={() => {
    setShowDonateSuccess(true);

    setTimeout(() => {
      setShowDonateSuccess(false);
    }, 2500);
  }}
>
  Donate
</button>
        </div>

        <div className="seva-card">
          <span>🪔</span>
          <h3>Temple Seva</h3>
          <p>Temple rituals and maintenance</p>
          <h4>₹1001</h4>
        <button
  onClick={() => {
    setShowDonateSuccess(true);

    setTimeout(() => {
      setShowDonateSuccess(false);
    }, 2500);
  }}
>
  Donate
</button>
        </div>

        <div className="seva-card">
          <span>📚</span>
          <h3>Education</h3>
          <p>Support children's education</p>
          <h4>₹2001</h4>
         <button
  onClick={() => {
    setShowDonateSuccess(true);

    setTimeout(() => {
      setShowDonateSuccess(false);
    }, 2500);
  }}
>
  Donate
</button>
        </div>

        <div className="seva-card">
          <span>🏥</span>
          <h3>Health Seva</h3>
          <p>Support healthcare camps</p>
          <h4>₹5001</h4>
          <button>Donate</button>
        </div>

      </div>

    </div>
  </div>
)}
{showDonateSuccess && (
  <div className="donation-success-overlay">
    <div className="donation-success-box">
      <div className="success-icon">🙏</div>

      <h2>Donation Successful</h2>

      <p>
        Thank you for your valuable contribution.
        <br />
        May Lord Shri Ram bless you 🌸
      </p>
    </div>
  </div>
)}
        {/* Attractions with Images - FIXED */}
        <div className="section-head">🌸 What We Offer | Our Attraction 🌸</div>
        <div className="attractions-grid">
          {attractionsData.map((item, idx) => (
            <div key={idx} className="attraction-card">
              <div className="attraction-image">
                <img 
                  src={item.image} 
                  alt={item.alt}
                  className="attraction-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(125deg, #ffbd7a, #ff974c)';
                    e.target.parentElement.style.display = 'flex';
                    e.target.parentElement.style.alignItems = 'center';
                    e.target.parentElement.style.justifyContent = 'center';
                    e.target.parentElement.innerHTML = '<i class="fas fa-temple fa-4x" style="color: #4f2400;"></i>';
                  }}
                />
              </div>
              <div className="attraction-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* News Row */}
        <div className="news-row">

  <div
    className="chip-item"
    onClick={() => {
      setPopupType("news");
      setShowInfoPopup(true);
    }}
  >
    <i className="fas fa-newspaper"></i>
    News & Announcements
  </div>

  <div
    className="chip-item"
    onClick={() => {
      setPopupType("notification");
      setShowInfoPopup(true);
    }}
  >
    <i className="fas fa-bell"></i>
    Notification
  </div>

  <div
    className="chip-item"
    onClick={() => {
      setPopupType("document");
      setShowInfoPopup(true);
    }}
  >
    <i className="fas fa-folder-open"></i>
    Documents / Guidelines
  </div>

</div>
{showInfoPopup && (

<div
className="info-popup-overlay"
onClick={() => setShowInfoPopup(false)}
>

<div
className="info-popup-modal"
onClick={(e)=>e.stopPropagation()}
>

<button
className="popup-close"
onClick={() => setShowInfoPopup(false)}
>
✕
</button>

{popupType==="news" && (
<>
<h2>📰 News & Announcements</h2>

<div className="popup-content-grid">

<div className="popup-card">
<h4>Ram Mandir Expansion</h4>
<p>New facilities for pilgrims under development.</p>
<span>16 May 2026</span>
</div>

<div className="popup-card">
<h4>Saryu Aarti Update</h4>
<p>Evening Aarti starts at 6:45 PM.</p>
<span>14 May 2026</span>
</div>

</div>
</>
)}

{popupType==="notification" && (
<>
<h2>🔔 Notifications</h2>

<div className="popup-content-grid">

<div className="popup-card">
<h4>Temple Timing Update</h4>
<p>Temple open from 5 AM - 10 PM</p>
</div>

<div className="popup-card">
<h4>Festival Alert</h4>
<p>Heavy crowd expected during Ram Navami.</p>
</div>

</div>
</>
)}

{popupType==="document" && (
<>
<h2>📂 Documents & Guidelines</h2>

<div className="popup-content-grid">

<div className="popup-card">
<h4>Visitor Guidelines</h4>
<button>Download PDF</button>
</div>

<div className="popup-card">
<h4>Travel Guide</h4>
<button>Download PDF</button>
</div>

</div>
</>
)}

</div>

</div>

)}

        {/* Special Attractions with Images - FIXED */}
        <div className="section-head">🌟 Special Attraction (Tourism)</div>
        <div className="attractions-grid">
          {specialAttractions.map((item, idx) => (
            <div key={idx} className="attraction-card">
              <div className="attraction-image">
                <img 
                  src={item.image} 
                  alt={item.alt}
                  className="attraction-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(125deg, #ffbd7a, #ff974c)';
                    e.target.parentElement.style.display = 'flex';
                    e.target.parentElement.style.alignItems = 'center';
                    e.target.parentElement.style.justifyContent = 'center';
                    e.target.parentElement.innerHTML = '<i class="fas fa-temple fa-4x" style="color: #4f2400;"></i>';
                  }}
                />
              </div>
              <div className="attraction-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Events */}
        <div className="section-head">📅 Upcoming Festival and Events</div>
        <div className="events-list">
          {eventsData.map((event, idx) => (
            <div key={idx} className="event-card">
              <div>
                <strong>{event.title}</strong>
                <br />
                {event.description}
              </div>
              <div className="event-date">{event.date}</div>
            </div>
          ))}
        </div>

        {/* Services */}
       <div className="services-grid">
  {servicesData.map((service, idx) => (
    <div
      key={idx}
      className="service-chip"
      onClick={() => window.open(service.link, "_blank")}
    >
      <i className={service.icon}></i>
      {service.name}
    </div>
  ))}
</div>

        {/* Helpline */}
        <div className="section-head">📞 Important Information</div>
        <div className="helpline-grid">
          {helplineData.map((item, idx) => (
            <div key={idx} className="helpline-card">
              <i className={item.icon}></i> {item.name}<br />
              <strong>{item.number}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <p>🌸 Ayodhya Dham – A Pilgrimage to Eternal Peace & Devotion 🌸</p>
        <p>Government of Uttar Pradesh | © 2025 | All Rights Reserved</p>
        <p><i className="fas fa-heart" style={{ color: '#ffa55c' }}></i> May Ram bless you! Thank you. <i className="fas fa-lotus"></i></p>
      </footer>
    </div>
  );
};

export default Landing;





// import React from "react";
// import "./styles/Landing.css";

// const Landing = ({ onEnter }) => {
//   const statItems = [
//     { label: "Temple", value: "140" },
//     { label: "Ghat", value: "8" },
//     { label: "Charity", value: "1" },
//     { label: "Kund", value: "9" },
//     { label: "Bhawan", value: "2" },
//     { label: "Aashram", value: "5" },
//   ];

//   return (
//     <div className="landing-page">

//       {/* TOP HEADER */}
//       <div className="top-header">

//         <div className="top-left">
//           Government of Uttar Pradesh
//         </div>

//         <div className="top-right">
//           <input
//             type="text"
//             placeholder="Search"
//             className="search-box"
//           />

//           <button className="lang-btn">
//             English
//           </button>

//           <button className="visitor-btn">
//             Visitor Pass
//           </button>
//         </div>

//       </div>

//       {/* NAVBAR */}
//       <div className="main-navbar">

//         <div className="nav-logo">

//           <img
//             src="/assets/logo.png"
//             alt="logo"
//             className="logo-img"
//           />

//         </div>

//         <div className="nav-icons">

//           <button>A-</button>
//           <button className="active-font">A</button>
//           <button>A+</button>

//         </div>

//       </div>

//       {/* HERO */}
//       <section className="landing-hero">

//         <div className="hero-overlay"></div>

//         <div className="hero-content">

//           <div className="hero-left">

//             <div className="youtube-icon">
//               ▶
//             </div>

//             <div className="hero-small-title">
//               श्रीराम मंदिर, अयोध्या
//             </div>

//             <div className="hero-main-title">
//               SHRI RAM MANDIR,
//               <br />
//               AYODHYA
//             </div>

//             <button className="live-btn">
//               लाइव दर्शन | Live Darshan
//             </button>

//             <h1 className="welcome-title">
//               WELCOME TO
//               <br />
//               AYODHYA DHAM
//             </h1>

//             <button
//               className="hero-btn"
//               onClick={onEnter}
//             >
//               Visitor Registration
//             </button>

//           </div>

//           <div className="hero-right">

//             <img
//               src="/assets/banner1.jpg"
//               alt="ram"
//               className="hero-image"
//             />

//           </div>

//         </div>

//       </section>

    
//       {/* <div className="design-strip">

//         <img
//           src="/assets/design-strip.jpg"
//           alt="design"
//           className="design-strip-img"
//         />

//       </div> */}

//       {/* CONTENT */}
//       <div className="landing-container">

//         {/* ABOUT */}
//         <div className="about-section">

//           <div className="section-icon">
//             🪷
//           </div>

//           <div className="about-title">
//             ABOUT US
//           </div>

//           <h2 className="section-head">
//             OVERVIEW OF AYODHYA DHAM
//           </h2>

//           <div className="overview-grid">

//             <div className="overview-text">

//               Ayodhya counted among the seven most sacred
//               cities of ancient India, is situated on the
//               right bank of the river Saryu, once the capital
//               of Avadh region.

//               Ayodhya holds a place of pride among the
//               devotees of Lord Rama, who was a descendant
//               of the Surya Vansh which is believed to have
//               been founded by Manu, the lawgiver of the
//               Hindus.....

//             </div>

//             <div className="leaders-column">

//               <div className="leader-card">

//                 <img
//                   src="/assets/modi-ji.jpg"
//                   alt="modi"
//                   className="leader-img"
//                 />

//                 <div>

//                   <h4>
//                     SHRI NARENDRA
//                     MODI
//                   </h4>

//                   <p>
//                     Hon'ble Prime Minister,
//                     India
//                   </p>

//                 </div>

//               </div>

//               <div className="leader-card">

//                 <img
//                   src="/assets/yogi-ji.jpg"
//                   alt="yogi"
//                   className="leader-img"
//                 />

//                 <div>

//                   <h4>
//                     SHRI YOGI
//                     ADITYANATH
//                   </h4>

//                   <p>
//                     Hon'ble Chief Minister,
//                     Uttar Pradesh
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//           <button className="read-btn">
//             Read More
//           </button>

//         </div>

//         {/* VIDEO */}
//         <div className="video-card">

//           <img
//             src="/assets/ram-mandir.jpg"
//             alt="ram mandir"
//             className="video-image"
//           />

//           <div className="play-btn">
//             ▶
//           </div>

//         </div>

//         {/* STATS */}
//         <div className="stats-section">

//           <div className="small-title">
//             AVAILABILITY
//           </div>

//           <h2 className="section-head left-head">
//             IN AYODHYA
//           </h2>

//           <div className="stats-grid">

//             {statItems.map((item, index) => (

//               <div
//                 className="stat-card"
//                 key={index}
//               >

//                 <div className="lotus-icon">
//                   🪷
//                 </div>

//                 <div className="stat-value">
//                   {item.value}
//                 </div>

//                 <div className="stat-label">
//                   {item.label}
//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//         {/* SUPPORT */}
//         <div className="support-banner">

//           <h2>
//             SUPPORT US, WE NEED YOUR HELP.
//           </h2>

//           <p>
//             Help us develop Ayodhya Dham services and
//             facilities for pilgrims.
//           </p>

//           <div className="progress-bar">

//             <div className="progress-fill"></div>

//           </div>

//           <button className="support-btn">
//             Go To Donation Page
//           </button>

//         </div>

//         {/* OUR ATTRACTION */}
//         <div className="attraction-section">

//           <div className="section-icon">
//             🐘
//           </div>

//           <div className="about-title">
//             OUR SERVICES
//           </div>

//           <h2 className="section-head">
//             OUR ATTRACTION
//           </h2>

//           <div className="main-attraction-card">

//             <img
//               src="/assets/our_attraction.jpg"
//               alt="ram family"
//               className="main-attraction-image"
//             />

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Landing;