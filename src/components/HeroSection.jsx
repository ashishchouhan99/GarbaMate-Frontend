import { Link } from 'react-router-dom';
import HeroMatchAnimation from './HeroMatchAnimation.jsx';

export default function HeroSection() {
  return <section className="gm-hero">
    <div className="gm-hero-copy">
      <p className="gm-eyebrow">Your people. Your rhythm. Your Navratri.</p>
      <h1>Find Your Perfect <em>Garba Partner</em></h1>
      <p className="gm-hero-lede">Discover people who share your Garba vibe, find local Navratri events, and make this Navratri unforgettable.</p>
      <div className="gm-actions"><Link to="/partners" className="gm-button gm-button-primary">Find a Garba Partner <span>↗</span></Link><a href="#events" className="gm-button gm-button-secondary">Explore Events</a></div>
      <div className="gm-hero-note"><span>✦</span> A community made for dancing together</div>
    </div>
    <div className="gm-hero-art"><HeroMatchAnimation /></div>
  </section>;
}
