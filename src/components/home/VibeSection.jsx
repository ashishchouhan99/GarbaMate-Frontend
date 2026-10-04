import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function VibeSection() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api.get('/partners/preview')
      .then(({ data }) => {
        if (active) setPartners(data.slice(0, 4));
      })
      .catch(() => {
        if (active) setError('Partner profiles are temporarily unavailable.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return <section className="gmh-vibe" aria-labelledby="gmh-vibe-title">
    <div className="gmh-wrap gmh-vibe__grid">
      <Reveal className="gmh-vibe__intro">
        <SectionHeading light kicker="FIND YOUR MATCH" title={<span id="gmh-vibe-title">Find the Right<br />Partner for Your Event</span>} text="Meet real Garba partners who are ready to make your next event memorable." />
        <Link to="/partners" className="gmh-pill gmh-pill--cream">Explore All Partners <ArrowRight size={18} aria-hidden="true" /></Link>
      </Reveal>
      <div className="gmh-vibe__cards" aria-live="polite">
        {loading && <p className="gmh-vibe__message">Finding available partners…</p>}
        {!loading && error && <p className="gmh-vibe__message">{error}</p>}
        {!loading && !error && !partners.length && <p className="gmh-vibe__message">New partner profiles are coming soon.</p>}
        {!loading && !error && partners.map((partner, index) => <Reveal as="article" key={partner.id} delay={index * 90}>
          <Link to={`/partners/${partner.id}`} className="gmh-vibe-card">
            <span className="gmh-vibe-card__media"><img src={partner.photoUrl} alt={`${partner.name}'s profile`} width="280" height="266" loading="lazy" decoding="async" /></span>
            <span className="gmh-vibe-card__body">
              <strong>{partner.name}{partner.age ? `, ${partner.age}` : ''}</strong>
              <span><MapPin size={13} aria-hidden="true" /> {partner.city}</span>
            </span>
          </Link>
        </Reveal>)}
      </div>
    </div>
  </section>;
}
