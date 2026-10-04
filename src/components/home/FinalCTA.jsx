import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ctaImage, USING_PLACEHOLDER_ART } from '../../data/homeContent';
import BrushStroke from './BrushStroke';
import Reveal from './Reveal';

export default function FinalCTA({ image = ctaImage }) {
  const { user } = useAuth();
  return <section className="gmh-cta" aria-labelledby="gmh-cta-title">
    <div className="gmh-wrap gmh-cta__grid">
      <div className="gmh-cta__art">
        <BrushStroke variant="cta" className="gmh-cta__brush" />
        <img className={USING_PLACEHOLDER_ART ? 'is-placeholder' : ''} src={image.src} alt={image.alt} width="560" height="1506" loading="lazy" decoding="async" />
      </div>
      <Reveal className="gmh-cta__copy">
        <h2 id="gmh-cta-title">Ready to<br />Dance Together?</h2>
        <p>Join thousands of Garba lovers already on Garbamate. Your perfect partner is just a click away.</p>
        <Link to={user ? '/partners' : '/signup'} className="gmh-pill gmh-pill--lime">Get Started <ArrowRight size={18} aria-hidden="true" /></Link>
      </Reveal>
    </div>
  </section>;
}
