import { useState } from "react";
import "../styles/Devotionalprograms.css";
const EVENTS_DATA = [
  {
    id: 1,
    title: "Rama Aarti",
    description: "Experience the divine morning and evening aarti dedicated to Lord Rama with sacred chants and lamp offerings.",
    details: "Join the blessed aarti ceremony at the main temple. Sacred chants and lamp offerings will fill the hall with devotion and peace.",
    date: "Daily",
    time: "6:00 AM & 7:00 PM",
    location: "Main Temple",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
    category: "Daily Ritual",
    status: "Daily",
    bookable: true
  },

  {
    id: 2,
    title: "Ramayana Discourse",
    description: "Deep dive into the teachings of Ramayana and their relevance in modern life.",
    details: "A thoughtful satsang and discussion exploring Ramayana's lessons, virtue, duty, and the power of Rama's story.",
    date: "May 18, 2026",
    time: "4:00 PM - 6:00 PM",
    location: "Satsang Hall",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop",
    category: "Spiritual Talk",
    status: "Upcoming",
    bookable: true
  },

  {
    id: 3,
    title: "Kirtan Sandhya",
    description: "Evening of soul-stirring bhajans and kirtans celebrating Lord Rama's glory.",
    details: "Sing along with devotional artists and feel the temple energy during this uplifting kirtan session.",
    date: "May 20, 2026",
    time: "5:30 PM - 8:00 PM",
    location: "Temple Courtyard",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
    category: "Devotional Music",
    status: "Upcoming",
    bookable: true
  },

  {
    id: 4,
    title: "Meditation & Yoga Session",
    description: "Start your day with guided meditation and yogasanas for physical and spiritual well-being.",
    details: "Follow the guided yoga flow and breathing practice designed for calmness, energy, and inner balance.",
    date: "Daily",
    time: "5:00 AM",
    location: "Yoga Hall",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    category: "Wellness",
    status: "Daily",
    bookable: true
  },

  {
    id: 5,
    title: "Ram Navami Celebration",
    description: "Grand celebration of Lord Rama's birth with special puja, procession, and cultural programs.",
    details: "Join the procession, live bhajans, and cultural performances. Prasad and special blessings will be offered to all devotees.",
    date: "April 6, 2026",
    time: "6:00 AM - 10:00 PM",
    location: "Entire Temple Complex",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200&auto=format&fit=crop",
    category: "Festival",
    status: "Upcoming",
    bookable: true
  }
];
const AUDIO_DATA = [
  {
    id: 1,
    title: "Jai Sri Ram - Telugu Bhajan",
    artist: "S. P. Balasubrahmanyam",
    duration: "5:32",
    plays: "245K",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Rama Rama Guna Rama - Ramadasu",
    artist: "M. Anjaneyalu",
    duration: "6:45",
    plays: "189K",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=200",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Hanuman Chalisa - Telugu Version",
    artist: "Hari Bhajan Group",
    duration: "7:15",
    plays: "156K",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=200",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Govinda Govinda - Bhakti Kirtan",
    artist: "Swami Ananda Bharati",
    duration: "8:20",
    plays: "198K",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=200",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "Anandha Bhairava Alamkaaram",
    artist: "Dr. K. Raghunath",
    duration: "9:50",
    plays: "123K",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    id: 6,
    title: "Sita Ram - Divine Mantra",
    artist: "Spiritual Singers",
    duration: "11:30",
    plays: "267K",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=200",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  }
];
const VIDEOS_DATA = [
  {
    id: 1,
    title: "Rama Keerthana - Devotional Chant",
    category: "Rama Keerthana",
    description: "A heavenly Rama keerthana filled with love and devotion.",
    views: "428K",
    videoUrl: "https://www.youtube.com/watch?v=8zCNp8W2eJI",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop"
  },

  {
    id: 2,
    title: "Hanuman Chalisa - Telugu Version",
    category: "Hanuman Chalisa",
    description: "Soulful Hanuman Chalisa recital in Telugu with temple visuals.",
    views: "373K",
    videoUrl: "https://www.youtube.com/watch?v=9FaY05ww0bc",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop"
  },

  {
    id: 3,
    title: "Sri Rama Bhajan Evening",
    category: "Devotional Music",
    description: "Evening bhajans dedicated to Lord Rama with melodic temple music.",
    views: "291K",
    videoUrl: "https://www.youtube.com/watch?v=BrK5c6xv4mM",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop"
  },

  {
    id: 4,
    title: "Aarti Ceremony at the Temple",
    category: "Aarti",
    description: "Watch the temple aarti ritual and feel the sacred atmosphere.",
    views: "214K",
    videoUrl: "https://www.youtube.com/watch?v=BYiQTksNMcQ",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200&auto=format&fit=crop"
  },

  {
    id: 5,
    title: "Live Darshan Available",
    category: "Live Darshan",
    description: "Watch live temple rituals and ceremonies from anywhere.",
    views: "512K",
    videoUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"
  }
];
export default function DevotionalPrograms({ onBack }) {
  const [activeTab, setActiveTab] = useState("events");
  const [playingAudio, setPlayingAudio] = useState(null);
  const [popupEvent, setPopupEvent] = useState(null);
  const [registerPopupEvent, setRegisterPopupEvent] = useState(null);
  const [registrationData, setRegistrationData] = useState({ name: "", email: "", phone: "" });
  const [registrationNotification, setRegistrationNotification] = useState(null);

  const getCategoryColor = (category) => {
    const colors = {
      "Festival": "#FF6B6B",
      "Daily Ritual": "#4ECDC4",
      "Devotional Music": "#FFA07A",
      "Rama Keerthana": "#FF7043",
      "Hanuman Chalisa": "#F39C12",
      "Aarti": "#4ECDC4",
      "Spiritual Talk": "#45B7D1",
      "Wellness": "#98D8C8"
    };
    return colors[category] || "#FF9800";
  };

  const onSelectEvent = (event) => {
    setPopupEvent(event);
  };

  const onRegisterEvent = (event) => {
    setRegisterPopupEvent(event);
    setRegistrationData({ name: "", email: "", phone: "" });
  };

  const handleRegistrationChange = (field, value) => {
    setRegistrationData((prev) => ({ ...prev, [field]: value }));
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    const title = registerPopupEvent?.title || "the event";
    setRegisterPopupEvent(null);
    setRegistrationData({ name: "", email: "", phone: "" });
    setRegistrationNotification({ message: `You registered successfully for ${title}` });
    setTimeout(() => setRegistrationNotification(null), 3500);
  };

  const closePopup = () => {
    setPopupEvent(null);
  };

  const closeRegisterPopup = () => {
    setRegisterPopupEvent(null);
    setRegistrationNotification(null);
  };

  return (
    <div className="devotional-page">
      {registrationNotification && (
        <div className="registration-toast">{registrationNotification.message}</div>
      )}
      {/* HEADER */}
      <div className="devotional-header">
        <button className="back-btn" onClick={onBack}>
          <i className="ti ti-chevron-left"></i>
        </button>
        <div className="header-content">
          <h1>Devotional Programs</h1>
          <p>Spiritual events & sacred content</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="devotional-search">
        <i className="ti ti-search"></i>
        <input type="text" placeholder="Search programs or events" />
      </div>

      {/* TABS */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          <i className="ti ti-calendar"></i>
          Events
        </button>
        <button
          className={`tab-btn ${activeTab === "audio" ? "active" : ""}`}
          onClick={() => setActiveTab("audio")}
        >
          <i className="ti ti-music"></i>
          Audio
        </button>
        <button
          className={`tab-btn ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          <i className="ti ti-video"></i>
          Videos
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="tab-content">
        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <div className="events-container">
            <div className="other-events">
              {EVENTS_DATA.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-card-image">
                    <img src={event.image} alt={event.title} />
                    <div className="event-category-badge" style={{backgroundColor: getCategoryColor(event.category)}}>
                      {event.category}
                    </div>
                  </div>
                  <div className="event-card-content">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <div className="event-footer">
                      <div className="event-details">
                        <span>
                          <i className="ti ti-calendar"></i>
                          {event.date}
                        </span>
                        <span>
                          <i className="ti ti-clock"></i>
                          {event.time}
                        </span>
                        {event.location && (
                          <span>
                            <i className="ti ti-map-pin"></i>
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="event-card-actions">
                      {event.bookable ? (
                        <button className="action-button book-btn" onClick={() => onRegisterEvent(event)}>
                          Register
                        </button>
                      ) : (
                        <div className="event-card-spacer" />
                      )}
                      <button className="action-button detail-btn" onClick={() => onSelectEvent(event)}>
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {popupEvent && (
              <div className="popup-overlay" onClick={closePopup}>
                <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                  <button className="popup-close" onClick={closePopup}>
                    <i className="ti ti-x"></i>
                  </button>
                  <div className="popup-image">
                    <img src={popupEvent.image} alt={popupEvent.title} />
                  </div>
                  <div className="popup-body">
                    <span className="event-category" style={{ backgroundColor: getCategoryColor(popupEvent.category) }}>
                      {popupEvent.category}
                    </span>
                    <h3>{popupEvent.title}</h3>
                    <p>{popupEvent.details}</p>
                    <div className="event-meta detail-meta">
                      <span>
                        <i className="ti ti-calendar-event"></i>
                        {popupEvent.date}
                      </span>
                      <span>
                        <i className="ti ti-clock"></i>
                        {popupEvent.time}
                      </span>
                      <span>
                        <i className="ti ti-map-pin"></i>
                        {popupEvent.location}
                      </span>
                    </div>
                    <div className="action-row">
                      {popupEvent.bookable && (
                        <button className="book-now-btn">
                          <i className="ti ti-ticket"></i>
                          Book This Event
                        </button>
                      )}
                      <button className="details-only-btn" onClick={closePopup}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {registerPopupEvent && (
              <div className="popup-overlay" onClick={closeRegisterPopup}>
                <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                  <button className="popup-close" onClick={closeRegisterPopup}>
                    <i className="ti ti-x"></i>
                  </button>
                  <div className="popup-body">
                    <span className="event-category" style={{ backgroundColor: getCategoryColor(registerPopupEvent.category) }}>
                      {registerPopupEvent.category}
                    </span>
                    <h3>Register for {registerPopupEvent.title}</h3>
                    <p>Please enter your information to complete registration for this event.</p>
                    <form className="register-form" onSubmit={submitRegistration}>
                      <label>
                        Name
                        <input
                          type="text"
                          value={registrationData.name}
                          onChange={(e) => handleRegistrationChange("name", e.target.value)}
                          required
                        />
                      </label>
                      <label>
                        Email
                        <input
                          type="email"
                          value={registrationData.email}
                          onChange={(e) => handleRegistrationChange("email", e.target.value)}
                          required
                        />
                      </label>
                      <label>
                        Phone
                        <input
                          type="tel"
                          value={registrationData.phone}
                          onChange={(e) => handleRegistrationChange("phone", e.target.value)}
                        />
                      </label>
                      <button type="submit" className="book-now-btn">
                        Submit Registration
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AUDIO TAB */}
        {activeTab === "audio" && (
          <div className="audio-container">
            <h3 className="audio-title">
              <i className="ti ti-music"></i>
              Telugu Devotional Audio Library
            </h3>

            <div className="audio-list">
              {AUDIO_DATA.map((audio) => (
                <div key={audio.id} className="audio-item">
                  <div className="audio-left">
                    <img src={audio.image} alt={audio.title} />
                    <button
                      className="play-btn"
                      onClick={() =>
                        setPlayingAudio(playingAudio === audio.id ? null : audio.id)
                      }
                    >
                      <i
                        className={`ti ${
                          playingAudio === audio.id ? "ti-player-pause" : "ti-player-play"
                        }`}
                      ></i>
                    </button>
                  </div>

                  <div className="audio-middle">
                    <h4>{audio.title}</h4>
                    <p>{audio.artist}</p>
                  </div>

                  <div className="audio-right">
                    <span className="play-count">
                      <i className="ti ti-headphones"></i>
                      {audio.plays}
                    </span>
                    <span className="duration">{audio.duration}</span>
                  </div>

                  {playingAudio === audio.id && (
                    <audio
                      src={audio.url}
                      autoPlay
                      controls
                      className="audio-player"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === "videos" && (
          <div className="videos-container">
            <div className="videos-grid">
              {VIDEOS_DATA.map((video) => (
                <div key={video.id} className="video-card">
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="video-link"
                  >
                    <div
                      className="video-thumbnail"
                      style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
                    >
                      <div className="video-category-tag" style={{backgroundColor: getCategoryColor(video.category)}}>
                        {video.category}
                      </div>
                      <div className="video-play-overlay">
                        <i className="ti ti-player-play"></i>
                      </div>
                    </div>
                  </a>

                  <div className="video-info">
                    <h4>{video.title}</h4>
                    <p>{video.description}</p>
                    <div className="video-meta">
                      <span>
                        <i className="ti ti-eye"></i>
                        {video.views} views
                      </span>
                      <a
                        className="watch-link"
                        href={video.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
