import { heroImage } from '../../data/homeContent';
import { Link } from 'react-router-dom';
import BrushStroke from './BrushStroke';
import HeroSearchBar from './HeroSearchBar';
import TrustFeatures from './TrustFeatures';

export default function HeroSection({ image = heroImage }) {
  return <section className="gmh-hero" aria-labelledby="gmh-hero-title">
    <BrushStroke className="gmh-hero__background-brush" />
    {/* Decorative wordmark: SVG textLength keeps it edge-to-edge whatever font loads. The real <h1> is below. */}
    <svg className="gmh-hero__wordmark" viewBox="0 0 1000 160" aria-hidden="true" focusable="false"><text x="0" y="150" textLength="1000" lengthAdjust="spacingAndGlyphs">Garbamate</text></svg>
    <div className="gmh-hero__inner">
      <div className="gmh-hero__head">
        <p className="gmh-accent">Dance. Connect. <mark>Celebrate.</mark></p>
        <h1 id="gmh-hero-title">Find Your Perfect <span>Garba Partner</span></h1>
      </div>
      <div className="gmh-hero__art">
        <img src={image.src} alt={image.alt} width="768" height="1152" fetchpriority="high" decoding="async" />
        <p className="gmh-hero__script" aria-hidden="true">Same Vibes Better Together ♡</p>
      </div>
      <div className="gmh-hero__rest">
        <p className="gmh-hero__lede">Rent verified Garba partners for festivals, events, weddings and more. Because Garba is better together.</p>
        <Link to="/signup" className="gmh-hero__register">Register Now <span aria-hidden="true">→</span></Link>
        <HeroSearchBar />
        <TrustFeatures />
      </div>
    </div>
  </section>;
}
