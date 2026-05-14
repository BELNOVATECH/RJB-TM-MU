import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Lato:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --saffron: #FF6B00;
    --gold: #D4A017;
    --gold-light: #F5C842;
    --crimson: #8B0000;
    --cream: #FDF6E3;
    --sand: #F0E4C8;
    --deep: #1A0A00;
    --brown: #4A2000;
    --muted: #7A5C3A;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Lato', sans-serif;
    background: var(--cream);
    color: var(--deep);
    overflow-x: hidden;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--deep); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
    height: 72px;
    background: rgba(26,10,0,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(212,160,23,0.25);
    transition: background 0.3s;
  }
  .nav-logo {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.3rem; font-weight: 700;
    color: var(--gold-light);
    letter-spacing: 0.05em;
  }
  .nav-logo span { color: var(--saffron); }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a {
    font-family: 'Cinzel', serif; font-size: 0.75rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(253,246,227,0.75);
    text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--gold-light); }
  .nav-cta {
    font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 0.12em;
    text-transform: uppercase; padding: 10px 22px;
    background: var(--saffron); color: #fff; border: none;
    cursor: pointer; transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--gold); }

  /* ── HERO ── */
  .hero {
    position: relative; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    background: linear-gradient(160deg, #1A0A00 0%, #3A1500 50%, #1A0A00 100%);
  }
  .hero-mandala {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    opacity: 0.07; pointer-events: none;
  }
  .hero-mandala svg { width: min(700px,90vw); height: min(700px,90vw); animation: rotateSlow 80s linear infinite; }
  @keyframes rotateSlow { to { transform: rotate(360deg); } }

  .hero-glow {
    position: absolute;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%);
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    pointer-events: none;
  }
  .hero-particles {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
  }
  .particle {
    position: absolute; width: 2px; height: 2px; border-radius: 50%;
    background: var(--gold-light); opacity: 0;
    animation: floatUp var(--dur, 6s) var(--delay, 0s) infinite;
  }
  @keyframes floatUp {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    10%  { opacity: 0.8; }
    90%  { opacity: 0.4; }
    100% { transform: translateY(-80vh) translateX(var(--dx, 20px)); opacity: 0; }
  }

  .hero-content {
    position: relative; z-index: 2; text-align: center; padding: 0 24px;
    animation: fadeUp 1.2s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hero-label {
    font-family: 'Cinzel', serif; font-size: 0.7rem; letter-spacing: 0.35em;
    text-transform: uppercase; color: var(--saffron);
    margin-bottom: 20px; display: block;
  }
  .hero-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(2.8rem, 7vw, 6rem); font-weight: 900;
    color: var(--cream); line-height: 1.05; margin-bottom: 12px;
  }
  .hero-title span { color: var(--gold-light); display: block; }
  .hero-subtitle {
    font-family: 'Cinzel', serif; font-size: clamp(1rem, 2.5vw, 1.5rem);
    color: var(--gold); letter-spacing: 0.2em; margin-bottom: 36px;
  }
  .hero-desc {
    font-size: 1rem; color: rgba(253,246,227,0.65); max-width: 540px;
    margin: 0 auto 48px; line-height: 1.8; font-weight: 300;
  }
  .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    font-family: 'Cinzel', serif; font-size: 0.75rem; letter-spacing: 0.18em;
    text-transform: uppercase; padding: 16px 38px;
    background: var(--saffron); color: #fff; border: none; cursor: pointer;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: background 0.2s, transform 0.2s;
  }
  .btn-primary:hover { background: var(--gold); transform: translateY(-2px); }
  .btn-outline {
    font-family: 'Cinzel', serif; font-size: 0.75rem; letter-spacing: 0.18em;
    text-transform: uppercase; padding: 14px 36px;
    background: transparent; color: var(--gold-light);
    border: 1px solid var(--gold); cursor: pointer;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: background 0.2s, color 0.2s;
  }
  .btn-outline:hover { background: rgba(212,160,23,0.12); }

  .hero-scroll {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: rgba(253,246,227,0.4); font-family: 'Cinzel', serif;
    font-size: 0.62rem; letter-spacing: 0.25em;
    animation: bounce 2s ease-in-out infinite;
  }
  .hero-scroll svg { opacity: 0.5; }
  @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }

  /* ── DIVIDER ── */
  .divider {
    height: 3px; background: linear-gradient(90deg, transparent, var(--gold), var(--saffron), var(--gold), transparent);
  }

  /* ── SECTION COMMONS ── */
  .section { padding: 96px 48px; }
  .section-tag {
    font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.35em;
    text-transform: uppercase; color: var(--saffron);
    display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
  }
  .section-tag::before, .section-tag::after {
    content: ''; flex: 1; height: 1px; background: var(--gold); opacity: 0.4;
  }
  .section-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700;
    color: var(--deep); text-align: center; margin-bottom: 12px;
    line-height: 1.2;
  }
  .section-title.light { color: var(--cream); }
  .section-lead {
    text-align: center; color: var(--muted); max-width: 600px; margin: 0 auto 64px;
    line-height: 1.8; font-size: 1rem;
  }
  .section-lead.light { color: rgba(253,246,227,0.6); }

  /* ── STATS BAR ── */
  .stats-bar {
    background: var(--deep); padding: 48px;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 2px;
  }
  .stat-item {
    display: flex; flex-direction: column; align-items: center;
    padding: 28px 16px; border-right: 1px solid rgba(212,160,23,0.15);
    text-align: center;
  }
  .stat-item:last-child { border-right: none; }
  .stat-number {
    font-family: 'Cinzel Decorative', serif;
    font-size: 2.8rem; font-weight: 900; color: var(--gold-light);
    line-height: 1;
  }
  .stat-label {
    font-family: 'Cinzel', serif; font-size: 0.7rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: rgba(253,246,227,0.5); margin-top: 8px;
  }

  /* ── ABOUT ── */
  .about-section { background: var(--sand); }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center;
    max-width: 1100px; margin: 0 auto;
  }
  .about-visual {
    position: relative;
  }
  .about-img-frame {
    width: 100%; padding-top: 110%; position: relative; overflow: hidden;
    border: 2px solid var(--gold);
    background: linear-gradient(135deg, #3A1500, #1A0A00);
    display: flex; align-items: center; justify-content: center;
  }
  .about-temple-art {
    width: 80%; position: absolute;
  }
  .about-badge {
    position: absolute; bottom: -20px; right: -20px;
    width: 120px; height: 120px; border-radius: 50%;
    background: var(--saffron);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; border: 4px solid var(--cream);
  }
  .about-badge span:first-child {
    font-family: 'Cinzel Decorative', serif; font-size: 1.4rem; font-weight: 900;
    color: #fff; line-height: 1;
  }
  .about-badge span:last-child {
    font-family: 'Cinzel', serif; font-size: 0.55rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(255,255,255,0.8);
  }
  .about-text .section-tag { justify-content: flex-start; }
  .about-text .section-tag::after { display: none; }
  .about-text .section-title { text-align: left; }
  .about-body { color: var(--muted); line-height: 1.9; font-size: 0.95rem; margin-bottom: 32px; }
  .about-features { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 36px; }
  .about-feat {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 0.05em; color: var(--brown);
  }
  .feat-dot { width: 6px; height: 6px; background: var(--saffron); flex-shrink: 0; }

  /* ── YATRAS ── */
  .yatra-section { background: var(--deep); }
  .yatra-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; max-width: 1100px; margin: 0 auto;
  }
  .yatra-card {
    background: rgba(255,255,255,0.03);
    padding: 48px 36px; border: 1px solid rgba(212,160,23,0.1);
    transition: border-color 0.3s, transform 0.3s;
    cursor: pointer; position: relative; overflow: hidden;
  }
  .yatra-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--saffron), var(--gold));
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s;
  }
  .yatra-card:hover { border-color: rgba(212,160,23,0.4); transform: translateY(-4px); }
  .yatra-card:hover::before { transform: scaleX(1); }
  .yatra-num {
    font-family: 'Cinzel Decorative', serif; font-size: 3.5rem; font-weight: 900;
    color: rgba(212,160,23,0.12); line-height: 1; margin-bottom: 16px;
  }
  .yatra-title {
    font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 700;
    color: var(--gold-light); margin-bottom: 12px; letter-spacing: 0.05em;
  }
  .yatra-dist {
    font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--saffron); margin-bottom: 16px;
  }
  .yatra-desc { font-size: 0.88rem; color: rgba(253,246,227,0.45); line-height: 1.8; }

  /* ── ATTRACTIONS ── */
  .attractions-section { background: var(--cream); }
  .attractions-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 28px; max-width: 1100px; margin: 0 auto;
  }
  .attr-card {
    background: #fff;
    border: 1px solid rgba(212,160,23,0.2);
    overflow: hidden; transition: box-shadow 0.3s, transform 0.3s;
  }
  .attr-card:hover { box-shadow: 0 16px 48px rgba(255,107,0,0.1); transform: translateY(-4px); }
  .attr-img {
    height: 180px; background: linear-gradient(135deg, var(--brown), var(--deep));
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    position: relative;
  }
  .attr-img svg { opacity: 0.25; }
  .attr-img-label {
    position: absolute; font-family: 'Cinzel Decorative', serif;
    font-size: 0.85rem; color: var(--gold-light); text-align: center; padding: 16px;
  }
  .attr-body { padding: 24px; }
  .attr-tag {
    font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--saffron); margin-bottom: 8px;
  }
  .attr-name {
    font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700;
    color: var(--deep); margin-bottom: 10px;
  }
  .attr-desc { font-size: 0.83rem; color: var(--muted); line-height: 1.7; }

  /* ── FESTIVALS ── */
  .festivals-section { background: var(--brown); }
  .festivals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; max-width: 1000px; margin: 0 auto; }
  .fest-card {
    display: flex; gap: 24px; align-items: flex-start;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(212,160,23,0.15);
    padding: 28px; transition: border-color 0.3s;
  }
  .fest-card:hover { border-color: rgba(212,160,23,0.5); }
  .fest-date {
    flex-shrink: 0; width: 64px; text-align: center;
    background: var(--saffron); padding: 12px 8px;
  }
  .fest-date-day {
    font-family: 'Cinzel Decorative', serif; font-size: 1.6rem; font-weight: 900;
    color: #fff; line-height: 1;
  }
  .fest-date-mon {
    font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.18em;
    text-transform: uppercase; color: rgba(255,255,255,0.8);
  }
  .fest-info {}
  .fest-name {
    font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700;
    color: var(--gold-light); margin-bottom: 8px;
  }
  .fest-desc { font-size: 0.82rem; color: rgba(253,246,227,0.5); line-height: 1.7; }

  /* ── SERVICES ── */
  .services-section { background: var(--sand); }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; max-width: 1100px; margin: 0 auto; border: 1px solid rgba(74,32,0,0.15); }
  .service-item {
    padding: 36px 28px; border-right: 1px solid rgba(74,32,0,0.12);
    border-bottom: 1px solid rgba(74,32,0,0.12);
    transition: background 0.2s;
  }
  .service-item:hover { background: rgba(255,107,0,0.04); }
  .service-icon {
    width: 44px; height: 44px; background: var(--saffron);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }
  .service-icon svg { color: #fff; }
  .service-name {
    font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700;
    color: var(--deep); margin-bottom: 8px;
  }
  .service-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.7; }

  /* ── HELPLINE ── */
  .helpline-section {
    background: var(--deep);
    padding: 72px 48px;
    text-align: center;
  }
  .helpline-grid { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; margin-top: 48px; }
  .helpline-item { text-align: center; }
  .helpline-num {
    font-family: 'Cinzel Decorative', serif; font-size: 2.2rem; font-weight: 900;
    color: var(--gold-light);
  }
  .helpline-lbl {
    font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: rgba(253,246,227,0.4); margin-top: 4px;
  }

  /* ── VISITOR PASS MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(26,10,0,0.85);
    z-index: 200; display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px); padding: 24px;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--cream); max-width: 500px; width: 100%;
    border-top: 4px solid var(--saffron); padding: 48px;
    position: relative; animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-close {
    position: absolute; top: 16px; right: 16px; background: none; border: none;
    font-size: 1.4rem; cursor: pointer; color: var(--muted);
  }
  .modal-title {
    font-family: 'Cinzel Decorative', serif; font-size: 1.4rem; font-weight: 700;
    color: var(--deep); margin-bottom: 8px;
  }
  .modal-sub { font-size: 0.85rem; color: var(--muted); margin-bottom: 32px; }
  .form-field { margin-bottom: 20px; }
  .form-label {
    display: block; font-family: 'Cinzel', serif; font-size: 0.65rem;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--brown);
    margin-bottom: 6px;
  }
  .form-input {
    width: 100%; padding: 12px 16px; border: 1px solid rgba(74,32,0,0.25);
    background: #fff; font-family: 'Lato', sans-serif; font-size: 0.9rem;
    color: var(--deep); outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--saffron); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* ── FOOTER ── */
  .footer { background: #0F0500; padding: 64px 48px 32px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; max-width: 1100px; margin-left: auto; margin-right: auto; }
  .footer-brand {}
  .footer-logo {
    font-family: 'Cinzel Decorative', serif; font-size: 1.1rem;
    color: var(--gold-light); margin-bottom: 16px; display: block;
  }
  .footer-tagline { font-size: 0.82rem; color: rgba(253,246,227,0.35); line-height: 1.8; margin-bottom: 24px; }
  .footer-social { display: flex; gap: 12px; }
  .social-btn {
    width: 36px; height: 36px; border: 1px solid rgba(212,160,23,0.25);
    display: flex; align-items: center; justify-content: center;
    color: rgba(253,246,227,0.4); transition: border-color 0.2s, color 0.2s; cursor: pointer;
    background: none;
  }
  .social-btn:hover { border-color: var(--gold); color: var(--gold); }
  .footer-col-title {
    font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 20px;
    padding-bottom: 10px; border-bottom: 1px solid rgba(212,160,23,0.2);
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a {
    font-size: 0.82rem; color: rgba(253,246,227,0.4); text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--gold-light); }
  .footer-bottom {
    border-top: 1px solid rgba(212,160,23,0.1);
    padding-top: 28px; text-align: center;
    font-size: 0.75rem; color: rgba(253,246,227,0.25);
    font-family: 'Cinzel', serif; letter-spacing: 0.08em;
    max-width: 1100px; margin: 0 auto;
  }
  .footer-bottom span { color: var(--saffron); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .nav { padding: 0 24px; }
    .nav-links { display: none; }
    .section { padding: 72px 24px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .yatra-grid { grid-template-columns: 1fr; }
    .festivals-grid { grid-template-columns: 1fr; }
    .services-grid { grid-template-columns: 1fr 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .stats-bar { padding: 32px 24px; }
    .helpline-section { padding: 48px 24px; }
  }
  @media (max-width: 600px) {
    .services-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .hero-btns { flex-direction: column; align-items: center; }
    .helpline-grid { gap: 28px; }
  }
`;

const MandalaPattern = () => (
  <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#D4A017" strokeWidth="0.8">
    {[...Array(12)].map((_, i) => (
      <g key={i} transform={`rotate(${i * 30} 250 250)`}>
        <ellipse cx="250" cy="130" rx="12" ry="35" />
        <line x1="250" y1="60" x2="250" y2="440" />
        <circle cx="250" cy="90" r="8" />
      </g>
    ))}
    {[60, 100, 140, 180, 220].map(r => (
      <circle key={r} cx="250" cy="250" r={r} />
    ))}
    <circle cx="250" cy="250" r="18" fill="#D4A017" opacity="0.3" />
  </svg>
);

const TempleArt = () => (
  <svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#D4A017" strokeWidth="1.2">
    <polygon points="150,20 180,70 120,70" fill="rgba(212,160,23,0.15)" />
    <rect x="120" y="70" width="60" height="20" fill="rgba(212,160,23,0.1)" />
    <polygon points="150,30 170,60 130,60" stroke="#FF6B00" fill="rgba(255,107,0,0.1)" />
    <rect x="100" y="90" width="100" height="15" fill="rgba(212,160,23,0.12)" />
    <rect x="80" y="105" width="140" height="15" fill="rgba(212,160,23,0.1)" />
    <rect x="90" y="120" width="120" height="120" fill="rgba(212,160,23,0.06)" />
    <rect x="130" y="160" width="40" height="80" fill="rgba(255,107,0,0.08)" />
    <line x1="90" y1="120" x2="210" y2="120" />
    <circle cx="150" cy="145" r="15" stroke="#FF6B00" fill="rgba(255,107,0,0.1)" />
    {[...Array(5)].map((_, i) => (
      <line key={i} x1={100 + i * 25} y1="120" x2={100 + i * 25} y2="240" strokeOpacity="0.3" />
    ))}
    <rect x="80" y="240" width="140" height="12" fill="rgba(212,160,23,0.15)" />
    <rect x="60" y="252" width="180" height="8" fill="rgba(212,160,23,0.1)" />
    <rect x="40" y="260" width="220" height="10" fill="rgba(212,160,23,0.15)" />
  </svg>
);

const attractions = [
  { tag: "Famous Temple", name: "Ram Mandir", desc: "The sacred birthplace of Lord Rama — a triumph of faith, devotion, and centuries of longing realised in stone and gold." },
  { tag: "Sacred Ghat", name: "Saryu Ghat", desc: "The ghats of river Saryu where pilgrims perform sacred rituals at dawn, bathed in the golden light of the rising sun." },
  { tag: "Holy Kund", name: "Dant Dhawan Kund", desc: "Ancient holy tank a few steps from Hanumangarhi, believed to be blessed with purifying spiritual powers." },
  { tag: "Aashram", name: "Bamdev Ashram", desc: "Tucked in Kumarganj, this revered ashram is a seat of ancient wisdom and spiritual retreat for saints and pilgrims alike." },
  { tag: "Bhawan", name: "Asharfi Bhawan", desc: "One of the major Siddha Peethas of Ramnagari, dedicated to Lord Lakshmi Narayan with an aura of mystical energy." },
  { tag: "Heritage", name: "Raj Dwar Mandir", desc: "Standing near Hanumangarhi, this magnificent temple is one of Ayodhya's most architecturally significant landmarks." },
];

const services = [
  { icon: "🛕", name: "Famous Temples", desc: "Explore 140+ temples including Ram Mandir, Hanumangarhi, and Kanak Bhawan." },
  { icon: "🌊", name: "Sacred Ghats", desc: "Participate in the evening Saryu Aarti at the river's holy ghats." },
  { icon: "🗺", name: "Tourist Guide", desc: "Interactive maps and guides to historical, religious and cultural sites." },
  { icon: "🎟", name: "Online Booking", desc: "Book your Visitor Pass, accommodations, and tour packages online." },
  { icon: "📷", name: "360° Gallery", desc: "Immersive virtual tour of Ayodhya's landmarks and temple interiors." },
  { icon: "🚂", name: "Railway & Transport", desc: "Plan your journey with railway, bus, and local transport information." },
];

export default function AyodhyaDham() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", aadhaar: "", date: "", address: "" });
  const [activeService, setActiveService] = useState(0);

  const particles = Array.from({ length: 22 }, (_, i) => ({
    left: `${5 + Math.random() * 90}%`,
    bottom: `${Math.random() * 20}%`,
    "--dur": `${5 + Math.random() * 8}s`,
    "--delay": `${Math.random() * 6}s`,
    "--dx": `${(Math.random() - 0.5) * 60}px`,
  }));

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Ayodhya <span>Dham</span></div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#yatra">Yatra</a></li>
          <li><a href="#attractions">Attractions</a></li>
          <li><a href="#festivals">Festivals</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Visitor Pass</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-mandala"><MandalaPattern /></div>
        <div className="hero-glow" />
        <div className="hero-particles">
          {particles.map((p, i) => (
            <div key={i} className="particle" style={p} />
          ))}
        </div>
        <div className="hero-content">
          <span className="hero-label">॥ जय श्री राम ॥ — Government of Uttar Pradesh</span>
          <h1 className="hero-title">
            Ayodhya
            <span>Dham</span>
          </h1>
          <p className="hero-subtitle">A Pilgrimage to the Sacred City</p>
          <p className="hero-desc">
            Counted among the seven most sacred cities of ancient India — the birthplace of Lord Rama, 
            situated on the banks of the holy Saryu river, the eternal capital of Avadh.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => setShowModal(true)}>Get Visitor Pass</button>
            <button className="btn-outline" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>Explore Dham</button>
          </div>
        </div>
        <div className="hero-scroll">
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="7" r="2.5" fill="currentColor" />
          </svg>
          SCROLL
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[["140+", "Temples"], ["62+", "Ghats"], ["9", "Sacred Kunds"], ["5", "Ashrams"], ["12K+", "Daily Visitors"], ["7", "Sacred Cities"]].map(([n, l]) => (
          <div className="stat-item" key={l}>
            <div className="stat-number">{n}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>

      <div className="divider" />

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-img-frame">
              <TempleArt />
              <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, textAlign: 'center' }}>
                <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1rem', color: 'rgba(212,160,23,0.7)' }}>
                  श्री राम मंदिर
                </span>
              </div>
            </div>
            <div className="about-badge">
              <span>2024</span>
              <span>Ram Mandir Inauguration</span>
            </div>
          </div>
          <div className="about-text">
            <div className="section-tag">About Ayodhya Dham</div>
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>The Eternal<br />Holy City</h2>
            <p className="about-body">
              Ayodhya, counted among the seven most sacred cities of ancient India, is situated on the 
              right bank of the river Saryu. Once the proud capital of the Avadh region, it holds a place 
              of immense pride among devotees of Lord Rama — a descendant of the Surya Vansh, believed to 
              have been founded by Manu, the lawgiver of the Hindus.
            </p>
            <p className="about-body" style={{ marginTop: '-16px' }}>
              From the grand Ram Mandir to the tranquil ghats of the Saryu, every stone of Ayodhya 
              breathes devotion, history, and the living legacy of Sanatan Dharma.
            </p>
            <div className="about-features">
              {["Ram Mandir", "Saryu Aarti", "Parikrama Yatras", "Ancient Temples", "Sacred Kunds", "Heritage Bhawans"].map(f => (
                <div className="about-feat" key={f}>
                  <div className="feat-dot" />
                  {f}
                </div>
              ))}
            </div>
            <button className="btn-primary">Discover More</button>
          </div>
        </div>
      </section>

      {/* YATRA */}
      <section className="section yatra-section" id="yatra">
        <div className="section-tag" style={{ color: 'var(--saffron)', justifyContent: 'center' }}>Sacred Journeys</div>
        <h2 className="section-title light">Yatra in Ayodhya</h2>
        <p className="section-lead light">Three sacred circumambulatory paths around the holy city, each a profound act of devotion and surrender.</p>
        <div className="yatra-grid">
          {[
            { num: "5", name: "5 Kosi Parikrama", dist: "~10 KM CIRCUIT", desc: "The innermost and most frequently undertaken parikrama, covering the core sacred geography of Ayodhya through ancient lanes and holy shrines." },
            { num: "14", name: "14 Kosi Parikrama", dist: "~28 KM CIRCUIT", desc: "A sacred circuit encompassing the broader holy land of Ayodhya, undertaken by hundreds of thousands of devotees during auspicious occasions." },
            { num: "84", name: "84 Kosi Parikrama", dist: "~168 KM CIRCUIT", desc: "The grand circumambulation of the entire Avadh region, a rare and immense journey of faith that takes devotees through dozens of sacred villages and sites." },
          ].map(y => (
            <div className="yatra-card" key={y.num}>
              <div className="yatra-num">{y.num}</div>
              <div className="yatra-title">{y.name}</div>
              <div className="yatra-dist">{y.dist}</div>
              <p className="yatra-desc">{y.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ATTRACTIONS */}
      <section className="section attractions-section" id="attractions">
        <div className="section-tag" style={{ justifyContent: 'center' }}>Divine Places</div>
        <h2 className="section-title">Our Attractions</h2>
        <p className="section-lead">Sacred temples, holy ghats, mystical ashrams — each site a chapter in the living story of Ayodhya.</p>
        <div className="attractions-grid">
          {attractions.map(a => (
            <div className="attr-card" key={a.name}>
              <div className="attr-img">
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(74,32,0,0.9), rgba(26,10,0,0.95))' }} />
                <div className="attr-img-label">{a.name}</div>
              </div>
              <div className="attr-body">
                <div className="attr-tag">{a.tag}</div>
                <div className="attr-name">{a.name}</div>
                <p className="attr-desc">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FESTIVALS */}
      <section className="section festivals-section" id="festivals">
        <div className="section-tag" style={{ color: 'var(--gold-light)', justifyContent: 'center' }}>Sacred Calendar</div>
        <h2 className="section-title light">Festivals & Events</h2>
        <p className="section-lead light">Ayodhya comes alive through the year with grand celebrations rooted in devotion and ancient tradition.</p>
        <div className="festivals-grid">
          {[
            { day: "17", mon: "Apr", name: "Ram Navami Ceremony", desc: "Surya Tilak graces the idol of Ramlala as millions of devotees converge on Ayodhya to celebrate the birthday of Lord Rama." },
            { day: "22", mon: "Jan", name: "Ram Mandir Prana Pratishtha", desc: "The historic consecration ceremony of the Ram Mandir, witnessed by the nation — a moment millennia in the making." },
            { day: "Oct", mon: "Nov", name: "Deepotsav", desc: "Ayodhya is illuminated by lakhs of earthen lamps on the banks of Saryu, creating the world's largest Diwali celebration." },
            { day: "Sep", mon: "Oct", name: "Ramotsav 2024", desc: "A grand cultural and religious festival celebrating the ideals of Lord Rama through music, storytelling, and sacred discourse." },
          ].map(f => (
            <div className="fest-card" key={f.name}>
              <div className="fest-date">
                <div className="fest-date-day">{f.day}</div>
                <div className="fest-date-mon">{f.mon}</div>
              </div>
              <div className="fest-info">
                <div className="fest-name">{f.name}</div>
                <p className="fest-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-section" id="services">
        <div className="section-tag" style={{ justifyContent: 'center' }}>For Pilgrims</div>
        <h2 className="section-title">Find Services</h2>
        <p className="section-lead">Everything you need for a seamless and spiritually enriching journey to Ayodhya Dham.</p>
        <div className="services-grid">
          {services.map(s => (
            <div className="service-item" key={s.name}>
              <div className="service-icon" style={{ fontSize: '1.3rem', background: 'var(--saffron)', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
              <div className="service-name">{s.name}</div>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HELPLINE */}
      <div className="helpline-section">
        <div className="section-tag" style={{ color: 'var(--saffron)', justifyContent: 'center' }}>Emergency & Support</div>
        <h2 className="section-title light" style={{ fontSize: '2rem' }}>Helpline Numbers</h2>
        <div className="helpline-grid">
          {[["1076", "CM Helpline"], ["1098", "Child Helpline"], ["1090", "Women Helpline"], ["108", "Ambulance"], ["100", "Police"]].map(([n, l]) => (
            <div className="helpline-item" key={l}>
              <div className="helpline-num">{n}</div>
              <div className="helpline-lbl">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-logo">Ayodhya Dham</span>
            <p className="footer-tagline">
              The birthplace of Lord Rama — one of the seven sacred cities of ancient India, 
              on the banks of the holy Saryu river. A pilgrimage for the soul.
            </p>
            <div className="footer-social">
              {["f", "t", "in", "yt"].map(s => (
                <button className="social-btn" key={s}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">About Us</div>
            <ul className="footer-links">
              {["About Ayodhya", "Key Facts", "UPSTDC Portal", "Press & Media"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              {["Emergency Services", "FAQs", "DOs & Don'ts", "Map", "Online Booking"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Policies</div>
            <ul className="footer-links">
              {["Terms & Conditions", "Privacy Policy", "Copyright Policy", "Feedback"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 Department of Tourism, Ayodhya, Uttar Pradesh, India | All rights reserved.
          <br />Government of <span>Uttar Pradesh</span>
        </div>
      </footer>

      {/* VISITOR PASS MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <h3 className="modal-title">Visitor Pass</h3>
            <p className="modal-sub">Register to obtain your free Ayodhya Dham visitor pass</p>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Full Name</label>
                <input className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">Mobile</label>
                <input className="form-input" placeholder="10-digit number" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Aadhaar No.</label>
                <input className="form-input" placeholder="XXXX XXXX XXXX" value={form.aadhaar} onChange={e => setForm({ ...form, aadhaar: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">Visit Date</label>
                <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Address</label>
              <input className="form-input" placeholder="Your full address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: 8 }}>
              Generate Pass
            </button>
          </div>
        </div>
      )}
    </>
  );
}