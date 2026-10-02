import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import PartnerSearch from '../components/PartnerSearch';
import PartnerGrid from '../components/PartnerGrid';
import EventSection from '../components/EventSection';
import HowItWorks from '../components/HowItWorks';
import GarbaVibeSelector from '../components/GarbaVibeSelector';
import WhyGarbaMate from '../components/WhyGarbaMate';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import { events, testimonials, vibes } from '../data/homeData';
import api from '../services/api';
const girlImg = 'girl.png';

function Home() {
  const [partners, setPartners] = useState([]);
  const [partnerState, setPartnerState] = useState('loading');

  useEffect(() => {
    const loadPartners = () => api.get('/partners/preview').then(({ data }) => {
      setPartners(data.map((partner) => ({
        ...partner,
        image: partner.photoUrl || girlImg,
        level: partner.garbaStyle || partner.skillLevel,
        event: partner.preferredEvent || 'Navratri celebrations',
        vibe: 90,
      })));
      setPartnerState('ready');
    }).catch(() => setPartnerState('error'));
    loadPartners();
    const refresh = window.setInterval(loadPartners, 30000);
    return () => window.clearInterval(refresh);
  }, []);

  return (
    <div className="gm-home">
      <HeroSection />
      <PartnerSearch />
      <section className="gm-section gm-partners" id="about"><div className="gm-section-heading"><div><span className="gm-section-kicker">A little more magic</span><h2>Meet your Garba circle</h2><p>Find people who match your vibe and are ready to dance.</p></div><a href="/partners" className="gm-text-link">Browse all partners <span>→</span></a></div>{partnerState === 'loading' && <p className="text-slate-500">Finding dancers in the community…</p>}{partnerState === 'error' && <p className="text-magenta">We could not load the latest partner circle right now.</p>}{partnerState === 'ready' && (partners.length ? <PartnerGrid partners={partners} /> : <p className="text-slate-500">No partner profiles are live yet. Be the first to join the circle.</p>)}</section>
      <EventSection events={events} />
      <div id="how-it-works"><HowItWorks /></div>
      <GarbaVibeSelector vibes={vibes} />
      <WhyGarbaMate />
      <Testimonials testimonials={testimonials} />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Home;
