import { useMemo, useState } from "react";
import "../styles/CustomerTouriestSpots.css";

const SPOTS = [
  {
    id: 1,
    name: "Ram Janmabhoomi Temple",
    category: "Temple / Shrine",
    location: "Ayodhya",
    timing: "6:00 AM - 10:00 PM",
    entry: "Free",
    status: "Open Now",
    distance: "2.1 km",
    rating: 4.9,
    nearby: "Hanuman Garhi, Kanak Bhawan",
    history: "Sacred birthplace of Lord Rama and the heart of the devotional journey in Ayodhya.",
    description: "A deeply revered pilgrimage destination with strong spiritual significance and a calm visitor flow.",
    lat: "26.7983",
    lng: "82.1951",
    accent: "#ff8a00",
  },
  {
    id: 2,
    name: "Hanuman Garhi",
    category: "Temple / Shrine",
    location: "Ayodhya",
    timing: "5:00 AM - 9:00 PM",
    entry: "Free",
    status: "Open Now",
    distance: "1.4 km",
    rating: 4.8,
    nearby: "Ram Janmabhoomi Temple, local market",
    history: "A beloved hilltop shrine where pilgrims often begin their Ayodhya circuit.",
    description: "A vital devotional stop with a memorable climb and sweeping city views.",
    lat: "26.7971",
    lng: "82.1948",
    accent: "#7c4dff",
  },
  {
    id: 3,
    name: "Saryu Ghat",
    category: "Ghat",
    location: "Ayodhya",
    timing: "Open 24 hrs",
    entry: "Free",
    status: "Best at Sunset",
    distance: "2.7 km",
    rating: 4.8,
    nearby: "Evening aarti point, riverfront walks",
    history: "A scenic riverfront space known for aarti, reflection, and quiet evening rituals.",
    description: "A serene waterside destination ideal for sunrise visits and spiritual evenings.",
    lat: "26.7921",
    lng: "82.1912",
    accent: "#0ea5e9",
  },
  {
    id: 4,
    name: "Kanak Bhawan",
    category: "Temple / Shrine",
    location: "Ayodhya",
    timing: "8:00 AM - 12:00 PM",
    entry: "Free",
    status: "Open Now",
    distance: "1.9 km",
    rating: 4.7,
    nearby: "Ram Ki Paidi, Sita Rasoi",
    history: "A devotion-rich temple associated with the divine presence of Lord Rama and Sita.",
    description: "A beautifully maintained temple with traditional architecture and peaceful interiors.",
    lat: "26.7954",
    lng: "82.1945",
    accent: "#16a34a",
  },
  {
    id: 5,
    name: "Ram Ki Paidi",
    category: "Historical Site",
    location: "Ayodhya",
    timing: "Open 24 hrs",
    entry: "Free",
    status: "Open Now",
    distance: "3.0 km",
    rating: 4.6,
    nearby: "Saryu Ghat, memorial walkways",
    history: "A historic riverside promenade often included in heritage and devotional trails.",
    description: "A great stop for travelers who want both peaceful waterside views and cultural value.",
    lat: "26.7900",
    lng: "82.1905",
    accent: "#ea580c",
  },
  {
    id: 6,
    name: "Ayodhya Museum",
    category: "Museum",
    location: "Ayodhya",
    timing: "10:00 AM - 5:00 PM",
    entry: "₹ 20",
    status: "Open Now",
    distance: "3.2 km",
    rating: 4.5,
    nearby: "Ram Ki Paidi, city heritage walk",
    history: "A local museum that presents Ayodhya's history, culture, and sacred heritage in one space.",
    description: "A cultural stop for travelers who want to explore the region's devotional history beyond the temples.",
    lat: "26.7872",
    lng: "82.1892",
    accent: "#4f46e5",
  },
  {
    id: 7,
    name: "Heritage Walk Plaza",
    category: "Nearby Attraction",
    location: "Ayodhya",
    timing: "Open 24 hrs",
    entry: "Free",
    status: "Open Now",
    distance: "1.2 km",
    rating: 4.4,
    nearby: "Temple route, food stalls, cultural lane",
    history: "A convenient nearby stop for visitors who want to connect multiple sacred places in one walk.",
    description: "A useful nearby attraction that helps pilgrims plan easy transitions between important spots.",
    lat: "26.7934",
    lng: "82.1931",
    accent: "#059669",
  },
];

const CATEGORIES = ["All", "Temple / Shrine", "Ghat", "Historical Site", "Museum", "Nearby Attraction"];

const FEATURE_POINTS = [
  {
    icon: "ti-map-pin",
    title: "Pilgrimage location listing",
    text: "Browse sacred destinations in a clean, customer-friendly format.",
  },
  {
    icon: "ti-book-2",
    title: "Historical and devotional information",
    text: "See the background and spiritual meaning behind each location.",
  },
  {
    icon: "ti-clock",
    title: "Temple timings and schedules",
    text: "Check opening hours and plan your visits with confidence.",
  },
  {
    icon: "ti-map-2",
    title: "Nearby attractions",
    text: "Discover other temples and heritage points close to each stop.",
  },
  {
    icon: "ti-gps",
    title: "GPS-enabled mapping",
    text: "Use location coordinates for accurate navigation and planning.",
  },
  {
    icon: "ti-route",
    title: "Route navigation assistance",
    text: "Open maps or route guidance directly from each spot card.",
  },
];

export default function CustomerTouriestSpots({ onBack }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const featuredSpot = SPOTS[0];

  const filteredSpots = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SPOTS.filter((spot) => {
      const catOk = category === "All" || spot.category === category;
      const searchOk =
        !q ||
        spot.name.toLowerCase().includes(q) ||
        spot.location.toLowerCase().includes(q) ||
        spot.category.toLowerCase().includes(q) ||
        spot.description.toLowerCase().includes(q) ||
        spot.history.toLowerCase().includes(q) ||
        spot.nearby.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }, [search, category]);

  const activeCount = SPOTS.filter((spot) => spot.status === "Open Now").length;
  const routeReadyCount = SPOTS.filter((spot) => spot.lat && spot.lng).length;
  const templeCount = SPOTS.filter((spot) => spot.category === "Temple / Shrine").length;

  const mapLink = (spot) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.lat},${spot.lng}`)}`;

  const routeLink = (spot) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${spot.lat},${spot.lng}`)}`;

  return (
    <div className="customer-touristspots-page">
      <section className="customer-touristspots-hero card">
        <div className="customer-touristspots-hero-copy">
          <button className="customer-touristspots-back" onClick={onBack}>
            <i className="ti ti-arrow-left" />
            Back
          </button>

          <div className="customer-touristspots-eyebrow">Tourist Spot &amp; Location Management</div>
          <h1>Explore sacred places with a premium journey view</h1>
          <p>
            Discover pilgrimage location listings, historical and devotional information,
            temple timings and schedules, nearby attractions, GPS-enabled mapping,
            and route navigation assistance in one elegant customer portal.
          </p>

          <div className="customer-touristspots-stats">
            <div className="customer-touristspots-stat">
              <strong>{filteredSpots.length}</strong>
              <span>Spots shown</span>
            </div>
            <div className="customer-touristspots-stat">
              <strong>{activeCount}</strong>
              <span>Open now</span>
            </div>
            <div className="customer-touristspots-stat">
              <strong>{routeReadyCount}</strong>
              <span>GPS ready</span>
            </div>
            <div className="customer-touristspots-stat">
              <strong>{templeCount}</strong>
              <span>Temple stops</span>
            </div>
          </div>

          <div className="customer-touristspots-search">
            <i className="ti ti-search" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search temple, ghat, devotional history, or nearby attractions"
            />
          </div>

          <div className="customer-touristspots-chip-row">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                className={`customer-touristspots-chip ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="customer-touristspots-featured">
          <div className="customer-touristspots-featured-top">
            <div className="customer-touristspots-featured-titleblock">
              <span className="badge badge-gold">Featured Pilgrimage Spot</span>
              <h2>{featuredSpot.name}</h2>
            </div>
            <span className="customer-touristspots-rating">
              <i className="ti ti-star-filled" /> {featuredSpot.rating}
            </span>
          </div>

          <div className="customer-touristspots-featured-visual">
            <div className="customer-touristspots-sunrise" />
            <div className="customer-touristspots-mandir">
              <div className="mandir-tower left" />
              <div className="mandir-core">
                <div className="mandir-dome" />
              </div>
              <div className="mandir-tower right" />
            </div>
          </div>

          <div className="customer-touristspots-featured-body">
            <p>{featuredSpot.description}</p>

            <div className="customer-touristspots-featured-grid">
              <div>
                <span>Location</span>
                <strong>{featuredSpot.location}</strong>
              </div>
              <div>
                <span>Timings</span>
                <strong>{featuredSpot.timing}</strong>
              </div>
              <div>
                <span>Entry</span>
                <strong>{featuredSpot.entry}</strong>
              </div>
              <div>
                <span>Distance</span>
                <strong>{featuredSpot.distance}</strong>
              </div>
            </div>

            <div className="customer-touristspots-history">
              <i className="ti ti-book-2" />
              <div>
                <strong>Historical & devotional note</strong>
                <p>{featuredSpot.history}</p>
              </div>
            </div>

            <div className="customer-touristspots-actions">
              <a className="customer-touristspots-action secondary" href={mapLink(featuredSpot)} target="_blank" rel="noreferrer">
                <i className="ti ti-map-search" />
                Open Map
              </a>
              <a className="customer-touristspots-action primary" href={routeLink(featuredSpot)} target="_blank" rel="noreferrer">
                <i className="ti ti-route" />
                Route Navigation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="customer-touristspots-section">
        <div className="customer-touristspots-section-head">
          <div>
            <div className="customer-touristspots-section-title">What you can explore here</div>
            <p>All six customer-facing management fields are built into the experience below.</p>
          </div>
        </div>

        <div className="customer-touristspots-feature-grid">
          {FEATURE_POINTS.map((point) => (
            <article key={point.title} className="customer-touristspots-feature card">
              <div className="customer-touristspots-feature-icon">
                <i className={`ti ${point.icon}`} />
              </div>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="customer-touristspots-section">
        <div className="customer-touristspots-section-head">
          <div>
            <div className="customer-touristspots-section-title">Tourist spot listings</div>
            <p>Search spot cards for timings, devotional history, nearby attractions, GPS, and route help.</p>
          </div>
          <div className="customer-touristspots-count">{filteredSpots.length} places found</div>
        </div>

        <div className="customer-touristspots-card-grid">
          {filteredSpots.map((spot) => (
            <article key={spot.id} className="customer-touristspots-card card">
            <div className="customer-touristspots-card-banner" style={{ background: `linear-gradient(135deg, ${spot.accent}, #ffb347)` }}>
              <div className="customer-touristspots-card-banner-top">
                <span className="customer-touristspots-card-category">{spot.category}</span>
                <span className={`customer-touristspots-card-status ${spot.status === "Open Now" ? "open" : "plan"}`}>
                  {spot.status}
                  </span>
                </div>
                <div className="customer-touristspots-card-banner-bottom">
                  <div className="customer-touristspots-card-icon">
                    <i className="ti ti-map-pin" />
                  </div>
                  <div>
                    <strong>{spot.name}</strong>
                    <span>{spot.location}</span>
                  </div>
                </div>
              </div>

              <div className="customer-touristspots-card-body">
                <div className="customer-touristspots-card-top">
                  <p>{spot.description}</p>
                  <div className="customer-touristspots-card-rating">
                    <i className="ti ti-star-filled" />
                    {spot.rating}
                  </div>
                </div>

                <div className="customer-touristspots-pill-row">
                  <span><i className="ti ti-clock" /> {spot.timing}</span>
                  <span><i className="ti ti-ticket" /> {spot.entry}</span>
                  <span><i className="ti ti-walk" /> {spot.distance} away</span>
                </div>

                <div className="customer-touristspots-history mini">
                  <i className="ti ti-book-2" />
                  <div>
                    <strong>Devotional info</strong>
                    <p>{spot.history}</p>
                  </div>
                </div>

                <div className="customer-touristspots-nearby">
                  <strong>Nearby attractions</strong>
                  <p>{spot.nearby}</p>
                </div>

                <div className="customer-touristspots-gps">
                  <span><i className="ti ti-world" /> GPS {spot.lat}, {spot.lng}</span>
                  <span><i className="ti ti-navigation" /> Mapping enabled</span>
                </div>

                <div className="customer-touristspots-actions">
                  <a href={mapLink(spot)} target="_blank" rel="noreferrer" className="customer-touristspots-link">
                    Map
                  </a>
                  <a href={routeLink(spot)} target="_blank" rel="noreferrer" className="customer-touristspots-link highlight">
                    Route
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
