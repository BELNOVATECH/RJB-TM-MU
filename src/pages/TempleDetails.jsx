import React from "react";
import "./styles/TempleDetails.css";

const DATA = {

  temples: {
    title: "AYODHYA TEMPLES",
    subtitle: "Sacred Temples of Ayodhya",
    description:
      "Explore the divine temples of Ayodhya Dham.",

    cards: [

      {
        name: "Shri Ram Mandir",
        image: "/assets/temple1.jpg",
        description:
          "The magnificent Shri Ram Mandir in Ayodhya is one of the holiest temples dedicated to Lord Rama.",
      },

      {
        name: "Hanuman Garhi",
        image: "/assets/temple2.jpg",
        description:
          "Hanuman Garhi is a famous temple dedicated to Lord Hanuman and attracts thousands of devotees daily.",
      },

      {
        name: "Kanak Bhawan",
        image: "/assets/temple3.jpg",
        description:
          "Kanak Bhawan is known for its beautiful idols of Lord Rama and Goddess Sita.",
      },

      {
        name: "Nageshwarnath Temple",
        image: "/assets/temple4.jpg",
        description:
          "Ancient temple dedicated to Lord Shiva and an important spiritual site in Ayodhya.",
      },

      {
        name: "Treta Ke Thakur",
        image: "/assets/temple5.jpg",
        description:
          "Historic temple associated with Lord Rama's Ashwamedha Yagna.",
      },

      {
        name: "Sita Ki Rasoi",
        image: "/assets/temple6.jpg",
        description:
          "Sacred place believed to be the kitchen of Goddess Sita.",
      },

    ],
  },


  ghat: {
    title: "HOLY GHATS",
    subtitle: "Sacred Ghats of Ayodhya",
    description:
      "Experience the spiritual ghats of River Saryu.",

    cards: [

      {
        name: "Ram Ki Paidi",
        image: "/assets/ghat1.jpg",
        description:
          "Ram Ki Paidi is the most famous ghat in Ayodhya where devotees take holy dips in River Saryu.",
      },

      {
        name: "Lakshman Ghat",
        image: "/assets/ghat2.jpg",
        description:
          "Ancient ghat associated with Lord Lakshman and spiritual rituals.",
      },

      {
        name: "Guptar Ghat",
        image: "/assets/ghat3.jpg",
        description:
          "Guptar Ghat is believed to be the sacred place where Lord Rama took Jal Samadhi.",
      },

      {
        name: "Janki Ghat",
        image: "/assets/ghat4.jpg",
        description:
          "Beautiful peaceful ghat dedicated to Goddess Sita.",
      },

    ],
  },


  charity: {
    title: "CHARITY SERVICES",
    subtitle: "Ayodhya Charity",
    description:
      "Seva and donation services for devotees.",

    cards: [

      {
        name: "Food Donation",
        image: "/assets/charity1.jpg",
        description:
          "Free food distribution and seva activities for pilgrims and needy people.",
      },

    ],
  },


  kund: {
    title: "SACRED KUNDS",
    subtitle: "Holy Kunds of Ayodhya",
    description:
      "Ancient sacred kunds connected to Ramayana history.",

    cards: [

      {
        name: "Surya Kund",
        image: "/assets/kund1.jpg",
        description:
          "Holy kund dedicated to Sun God and spiritual purification.",
      },

      {
        name: "Brahma Kund",
        image: "/assets/kund2.jpg",
        description:
          "Ancient kund associated with Lord Brahma rituals.",
      },

      {
        name: "Sita Kund",
        image: "/assets/kund3.jpg",
        description:
          "Sacred kund connected with Goddess Sita.",
      },

      {
        name: "Vidya Kund",
        image: "/assets/kund4.jpg",
        description:
          "Peaceful kund surrounded by temples and meditation spots.",
      },

      {
        name: "Dashrath Kund",
        image: "/assets/kund5.jpg",
        description:
          "Historic kund linked to King Dashrath and Ramayana legends.",
      },

    ],
  },


  bhawan: {
    title: "BHAWANS",
    subtitle: "Pilgrim Bhawans",
    description:
      "Accommodation and spiritual stay facilities.",

    cards: [

      {
        name: "Ram Bhawan",
        image: "/assets/bhawan1.jpg",
        description:
          "Comfortable pilgrim stay facility for devotees visiting Ayodhya.",
      },

      {
        name: "Sita Bhawan",
        image: "/assets/bhawan2.jpg",
        description:
          "Spiritual accommodation with peaceful environment and services.",
      },

    ],
  },


  aashram: {
    title: "AASHRAMS",
    subtitle: "Peaceful Aashrams",
    description:
      "Meditation, yoga, and spiritual teaching centers.",

    cards: [

      {
        name: "Ram Aashram",
        image: "/assets/aashram1.jpg",
        description:
          "Spiritual aashram for meditation and devotional learning.",
      },

      {
        name: "Saryu Aashram",
        image: "/assets/aashram2.jpg",
        description:
          "Peaceful yoga and spiritual retreat near River Saryu.",
      },

      {
        name: "Hanuman Aashram",
        image: "/assets/aashram3.jpg",
        description:
          "Sacred aashram dedicated to Hanuman bhakti and seva.",
      },

    ],
  },

};

const TempleDetails = ({ type, onBack }) => {

  const details = DATA[type];

  // SAFETY CHECK
  if (!details) {
    return <h1>Page Not Found</h1>;
  }

  return (
    <div className="temple-page">

      {/* HERO */}
      <div className="temple-hero">

        <img
          src={details.cards[0].image}
          alt={details.title}
          className="temple-hero-img"
        />

        <div className="temple-overlay">

          <h1>{details.title}</h1>

          <p>{details.description}</p>

        </div>
      </div>

      {/* CONTENT */}
      <div className="temple-container">

        <div className="temple-subtitle">
          WELCOME TO AYODHYA DHAM
        </div>

        <h2 className="temple-title">
          {details.subtitle}
        </h2>

        <p className="temple-text">
          {details.description}
        </p>

        {/* GRID */}
        <div className="temple-grid">

          {details.cards.map((card, index) => (

            <div key={index} className="temple-card">

              <img
                src={card.image}
                alt={card.name}
                className="temple-image"
              />

              <div className="temple-card-content">

                <h3>{card.name}</h3>

                <p>{card.description}</p>

              </div>

            </div>

          ))}

        </div>

        {/* BACK BUTTON */}
        <button
          className="temple-btn"
          onClick={onBack}
        >
          ← Back
        </button>

      </div>
    </div>
  );
};

export default TempleDetails;