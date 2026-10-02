import { useEffect, useState } from "react";
import CloudinaryImage from './CloudinaryImage';

/**
 * HeroMatchAnimation (v3 — with background image)
 * Same loop as before: guy (left) and girl (right) "search" on their phones,
 * slide toward center, match, then dandiya sticks appear and they head off
 * together. Now rendered on top of a background image.
 *
 * Setup:
 * 1. Put girl.png, boy.png, and hero-bg.jpg in: frontend/src/assets/
 * 2. Put this file in: frontend/src/components/HeroMatchAnimation.jsx
 * 3. Import and use <HeroMatchAnimation /> on your Home page.
 */

const PHASE_DURATION_MS = 6000; // keep in sync with the 6s durations in the CSS below
const FIREWORK_COLORS = ["#FF3D8A", "#4ADE80", "#FFD93D", "#4FC3F7", "#FF8C42", "#C084FC"]; // pink, green, yellow, blue, orange, purple
const BURSTS_PER_LOOP = 4;
const PARTICLES_PER_BURST = 14;
const AMBIENT_STARS = [
  { left: "8%", top: "18%", size: "3px", delay: "0s", duration: "5.5s" },
  { left: "19%", top: "31%", size: "2px", delay: "1.2s", duration: "6.8s" },
  { left: "33%", top: "13%", size: "4px", delay: "2.4s", duration: "7.2s" },
  { left: "48%", top: "24%", size: "2px", delay: "0.8s", duration: "6.2s" },
  { left: "63%", top: "12%", size: "3px", delay: "3.1s", duration: "7.8s" },
  { left: "77%", top: "29%", size: "2px", delay: "1.8s", duration: "5.9s" },
  { left: "91%", top: "17%", size: "3px", delay: "2.9s", duration: "6.6s" },
  { left: "84%", top: "42%", size: "2px", delay: "0.4s", duration: "7.4s" },
];

// Multiple firework bursts in the sky area, each exploding into colored
// particles that shoot outward and fade — timed right around match time.
function generateFireworks() {
  const bursts = [];
  for (let b = 0; b < BURSTS_PER_LOOP; b++) {
    const originX = 15 + Math.random() * 70; // % of stage width, spread across sky
    const originY = 8 + Math.random() * 30; // % of stage height, upper "sky" area
    const baseDelay = 3.5 + b * 0.35 + Math.random() * 0.25; // stagger each burst slightly after match
    const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

    const particles = Array.from({ length: PARTICLES_PER_BURST }, (_, i) => {
      const angle = (360 / PARTICLES_PER_BURST) * i + (Math.random() * 12 - 6);
      const distance = 55 + Math.random() * 45;
      const rad = (angle * Math.PI) / 180;
      return {
        id: `${b}-${i}`,
        dx: Math.cos(rad) * distance,
        dy: Math.sin(rad) * distance,
        size: 5 + Math.random() * 5,
      };
    });

    bursts.push({ id: b, originX, originY, delay: baseDelay, color, particles });
  }
  return bursts;
}

export default function HeroMatchAnimation() {
  const [replayKey, setReplayKey] = useState(0);
  const [fireworks, setFireworks] = useState(generateFireworks);

  useEffect(() => {
    const id = setInterval(() => {
      setReplayKey((k) => k + 1);
      setFireworks(generateFireworks());
    }, PHASE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="hma-stage"
      key={replayKey}
    >
      <style>{styles}</style>

      {/* Layered overlay adds contrast and a soft vignette around the hero edges. */}
      <div className="hma-overlay" />

      <div className="hma-stars" aria-hidden="true">
        {AMBIENT_STARS.map((star, index) => (
          <span
            key={index}
            className="hma-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* Colorful firework bursts in the sky, timed with the match */}
      <div className="hma-fireworks-layer">
        {fireworks.map((burst) => (
          <div
            key={burst.id}
            className="hma-firework-origin"
            style={{
              left: `${burst.originX}%`,
              top: `${burst.originY}%`,
              animationDelay: `${burst.delay}s`,
            }}
          >
            {burst.particles.map((p) => (
              <span
                key={p.id}
                className="hma-firework-particle"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: burst.color,
                  boxShadow: `0 0 6px 2px ${burst.color}`,
                  "--dx": `${p.dx}px`,
                  "--dy": `${p.dy}px`,
                  animationDelay: `${burst.delay}s`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="hma-ground" />

      {/* Guy - left side, searching */}
      <div className="hma-person hma-person--guy">
        <CloudinaryImage publicId="boy.png" alt="Guy searching for a Garba partner" width={400} height={600} priority className="hma-person-img" />
        <PhoneBubble side="left" />
      </div>

      {/* Girl - right side, searching */}
      <div className="hma-person hma-person--girl">
        <CloudinaryImage publicId="girl.png" alt="Girl searching for a Garba partner" width={400} height={600} priority className="hma-person-img" />
        <PhoneBubble side="right" />
      </div>

      {/* Match burst */}
      <div className="hma-match-burst">
        <span>✨ Matched! ✨</span>
      </div>

      {/* Dandiya sticks that appear once matched */}
      <div className="hma-sticks hma-sticks--left">🥢</div>
      <div className="hma-sticks hma-sticks--right">🥢</div>
    </div>
  );
}

function PhoneBubble({ side }) {
  return (
    <div className={`hma-phone hma-phone--${side}`}>
      <div className="hma-phone-screen">
        <div className="hma-phone-line" />
        <div className="hma-phone-line hma-phone-line--short" />
      </div>
    </div>
  );
}

const styles = `
.hma-stage {
  position: relative;
  container-type: inline-size;
  width: 100%;
  height: 90vh;
  min-height: 320px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0; /* full-width sections usually look better without rounded corners; add back a px value if you want them */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hma-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(ellipse at 50% 43%, rgba(18, 10, 44, 0) 0%, rgba(8, 5, 20, 0.12) 62%, rgba(3, 2, 12, 0.48) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.22));
  pointer-events: none;
}

.hma-stage::before {
  position: absolute;
  inset: 34% 12% 0;
  z-index: 2;
  content: "";
  background: radial-gradient(ellipse at 50% 80%, rgba(255, 184, 67, 0.24), transparent 64%);
  pointer-events: none;
}

.hma-stars {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.hma-star {
  position: absolute;
  border-radius: 50%;
  background: #ffe9a8;
  box-shadow: 0 0 8px 2px rgba(255, 210, 93, 0.7);
  opacity: 0.28;
  animation: hma-star-twinkle ease-in-out infinite alternate;
}

@keyframes hma-star-twinkle {
  from { opacity: 0.18; transform: translateY(0) scale(0.8); }
  to { opacity: 0.75; transform: translateY(-8px) scale(1.25); }
}

/* Colorful firework bursts in the sky, timed with the match */
.hma-fireworks-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
}

.hma-firework-origin {
  position: absolute;
  width: 0;
  height: 0;
}

.hma-firework-particle {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  opacity: 0;
  animation-name: hma-firework-explode;
  animation-duration: 1.1s;
  animation-timing-function: cubic-bezier(0.15, 0.6, 0.4, 1);
  animation-fill-mode: forwards;
}

@keyframes hma-firework-explode {
  0%   { opacity: 0; transform: translate(0, 0) scale(0.4); }
  10%  { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.3); }
}

.hma-ground {
  position: absolute;
  bottom: 20px;
  left: 5%;
  right: 5%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  z-index: 3;
  opacity: 0.85;
  box-shadow: 0 0 18px 4px rgba(242, 169, 59, 0.28);
}

.hma-person {
  position: absolute;
  bottom: 20px;
  width: 130px;
  z-index: 3;
  animation-duration: 6s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.hma-person-img {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 6px 10px rgba(0,0,0,0.45)) drop-shadow(0 0 12px rgba(255, 191, 72, 0.22));
}

.hma-person--guy {
  left: -160px;
  animation-name: hma-guy-move;
}

.hma-person--girl {
  right: -160px;
  animation-name: hma-girl-move;
}

@keyframes hma-guy-move {
  0%   { transform: translateX(0); }
  35%  { transform: translateX(calc(50cqw + 10px)); }
  55%  { transform: translateX(calc(50cqw + 10px)); }
  70%  { transform: translateX(calc(50cqw + 95px)); opacity: 1; }
  85%  { transform: translateX(calc(50cqw + 115px)); }
  100% { transform: translateX(calc(110cqw + 160px)); opacity: 0; }
}

@keyframes hma-girl-move {
  0%   { transform: translateX(0); }
  35%  { transform: translateX(calc(-50cqw - 10px)); }
  55%  { transform: translateX(calc(-50cqw - 10px)); }
  70%  { transform: translateX(calc(-50cqw - 95px)); opacity: 1; }
  85%  { transform: translateX(calc(-50cqw - 115px)); }
  100% { transform: translateX(calc(-110cqw - 160px)); opacity: 0; }
}

/* Floating phone bubble near each character while "searching" (0%-55%), fades before the match */
.hma-phone {
  position: absolute;
  top: 10px;
  width: 40px;
  height: 56px;
  background: #1a1a1a;
  border-radius: 7px;
  border: 2px solid #444;
  opacity: 0;
  animation: hma-phone-visibility 6s ease-in-out forwards;
}

.hma-phone--left { right: -10px; }
.hma-phone--right { left: -10px; }

@keyframes hma-phone-visibility {
  0%   { opacity: 0; transform: translateY(4px); }
  8%   { opacity: 1; transform: translateY(0); }
  55%  { opacity: 1; transform: translateY(0); }
  63%  { opacity: 0; transform: translateY(-6px); }
  100% { opacity: 0; }
}

.hma-phone-screen {
  margin: 4px;
  height: calc(100% - 8px);
  background: #fff8f0;
  border-radius: 3px;
  padding: 4px;
}

.hma-phone-line {
  height: 3px;
  background: #F2A93B;
  border-radius: 2px;
  margin-bottom: 3px;
  animation: hma-phone-scroll 1.1s ease-in-out infinite;
}

.hma-phone-line--short { width: 60%; }

@keyframes hma-phone-scroll {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.hma-match-burst {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  white-space: nowrap;
  z-index: 5;
  opacity: 0;
  animation: hma-burst 6s ease-in-out forwards;
}

@keyframes hma-burst {
  0%, 58% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
  63% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
  70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  85% { opacity: 1; transform: translate(-50%, -80%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -80%) scale(1); }
}

.hma-sticks {
  position: absolute;
  bottom: 140px;
  font-size: 1.6rem;
  z-index: 4;
  opacity: 0;
  animation-duration: 6s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.hma-sticks--left {
  left: calc(50% - 75px);
  animation-name: hma-stick-left;
}

.hma-sticks--right {
  left: calc(50% + 45px);
  animation-name: hma-stick-right;
}

@keyframes hma-stick-left {
  0%, 68% { opacity: 0; transform: translateX(0); }
  75% { opacity: 1; transform: translateX(15px); }
  85% { opacity: 1; transform: translateX(40px); }
  100% { opacity: 0; transform: translateX(calc(55cqw + 75px)); }
}

@keyframes hma-stick-right {
  0%, 68% { opacity: 0; transform: translateX(0); }
  75% { opacity: 1; transform: translateX(-15px); }
  85% { opacity: 1; transform: translateX(-35px); }
  100% { opacity: 0; transform: translateX(calc(65cqw - 45px)); }
}

@media (prefers-reduced-motion: reduce) {
  .hma-person, .hma-phone, .hma-phone-line, .hma-match-burst, .hma-sticks, .hma-firework-particle, .hma-star {
    animation: none !important;
  }
  .hma-person--guy { left: calc(50% - 140px); }
  .hma-person--girl { right: calc(50% - 140px); }
  .hma-star { opacity: 0.35; }
  .hma-firework-particle { display: none; }
}

@media (max-width: 640px) {
  .hma-stage { height: 45vh; min-height: 260px; }
  .hma-person { width: 85px; }
  .hma-match-burst { font-size: 1rem; }
}
`;
