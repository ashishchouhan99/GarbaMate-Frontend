const HEADLINE_WORDS = ["Find", "Your", "Perfect", "Garba", "Partner", "This", "Navratri"];

export default function HeroContent() {
  return (
    <div className="home-hero-content">
      <style>{styles}</style>
      <h1>
        {HEADLINE_WORDS.map((word, index) => (
          <span key={word} className="hma-headline-word" style={{ animationDelay: `${0.12 + index * 0.08}s` }}>
            {word}
          </span>
        ))}
      </h1>
      <p className="hma-subtext">Browse partners near you or list yourself in minutes.</p>
      <div className="hma-cta">
        <button type="button" className="hma-cta-button">Browse Partners</button>
        <button type="button" className="hma-cta-button hma-cta-button--alt">List Yourself</button>
      </div>
    </div>
  );
}

const styles = `
.home-hero-content {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  padding: 150px 1.25rem 2rem;
  color: white;
  text-align: center;
  text-shadow: 0 2px 8px rgb(0 0 0 / 55%);
  pointer-events: none;
}

.home-hero-content h1 {
  max-width: 720px;
  margin: 0 auto 18px;
  color: #ffffff;
  font-size: clamp(1.8rem, 4.5vw, 3.5rem);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-shadow: 0 0 10px rgba(255, 196, 64, 0.5), 0 3px 18px rgba(0, 0, 0, 0.7);
  animation: hma-headline-glow 3.2s ease-in-out 1.1s infinite alternate;
}

.hma-headline-word {
  display: inline-block;
  margin-right: 0.24em;
  opacity: 0;
  animation: hma-word-in 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.hma-headline-word:last-child { margin-right: 0; }

.hma-subtext {
  margin: 0 auto 24px;
  color: #fdf3e7;
  font-size: clamp(0.9rem, 1.4vw, 1.1rem);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: hma-subtext-in 0.8s ease-out 1s forwards;
}

.hma-cta {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  opacity: 0;
  animation: hma-subtext-in 0.8s ease-out 1.3s forwards;
  pointer-events: auto;
}

.hma-cta-button {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 238, 173, 0.7);
  border-radius: 999px;
  padding: 0.8rem 1.35rem;
  color: #321225;
  background: linear-gradient(115deg, #ffd66b, #f2a93b 48%, #c1266e);
  box-shadow: 0 8px 26px rgba(242, 169, 59, 0.35), 0 0 18px rgba(255, 196, 64, 0.28);
  font-weight: 800;
  text-shadow: none;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.hma-cta-button::after {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(105deg, transparent 25%, rgba(255, 255, 255, 0.65) 48%, transparent 70%);
  transform: translateX(-130%);
  animation: hma-button-shimmer 4.8s ease-in-out 2s infinite;
}

.hma-cta-button:hover, .hma-cta-button:focus-visible {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 12px 34px rgba(242, 169, 59, 0.5), 0 0 26px rgba(255, 196, 64, 0.5);
}

.hma-cta-button--alt {
  color: #fff8f0;
  background: linear-gradient(115deg, #c1266e, #7a0c2e);
}

@keyframes hma-word-in {
  0% { opacity: 0; transform: translateY(18px) scale(0.92); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes hma-headline-glow {
  from { text-shadow: 0 0 10px rgba(255, 196, 64, 0.42), 0 3px 18px rgba(0, 0, 0, 0.7); }
  to { text-shadow: 0 0 24px rgba(255, 211, 91, 0.9), 0 3px 18px rgba(0, 0, 0, 0.72); }
}

@keyframes hma-subtext-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes hma-button-shimmer {
  0%, 68% { transform: translateX(-130%); }
  85%, 100% { transform: translateX(130%); }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero-content h1, .hma-headline-word, .hma-subtext, .hma-cta, .hma-cta-button::after {
    animation: none !important;
  }
  .hma-headline-word, .hma-subtext, .hma-cta { opacity: 1; transform: none; }
}

@media (max-width: 640px) {
  .home-hero-content { padding: 108px 1rem 1.5rem; }
  .home-hero-content h1 { font-size: clamp(1.65rem, 8vw, 2.4rem); margin-bottom: 12px; }
  .hma-subtext { margin-bottom: 18px; }
  .hma-cta { gap: 8px; }
  .hma-cta-button { padding: 0.68rem 1rem; font-size: 0.9rem; }
}
`;
