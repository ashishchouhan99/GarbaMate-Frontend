import { Link } from 'react-router-dom';

export default function CTASection() {
  return <section className="gm-cta-section"><div className="gm-cta-mandala">✦</div><span className="gm-section-kicker">The night is waiting</span><h2>Don&apos;t dance alone this Navratri.</h2><p>Find your Garba people. Find your vibe. Make memories.</p><Link to="/partners" className="gm-button gm-button-primary">Find my Garba partner <span>↗</span></Link></section>;
}
