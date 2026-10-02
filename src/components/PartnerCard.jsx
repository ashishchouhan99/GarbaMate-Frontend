import { Heart, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CloudinaryImage from './CloudinaryImage';

export default function PartnerCard({ partner }) {
  return <article className="gm-partner-card">
    <div className="gm-partner-image">{partner.image?.startsWith('http') ? <img src={partner.image} alt={`${partner.name} in traditional dress`} /> : <CloudinaryImage publicId={partner.image || 'girl.png'} alt={`${partner.name} in traditional dress`} width={480} height={600} />}<button className="gm-icon-button" aria-label={`Save ${partner.name}`}><Heart size={18} /></button><span className="gm-vibe-badge"><Sparkles size={13} /> {partner.vibe}% vibe</span></div>
    <div className="gm-partner-body"><div className="gm-partner-name"><div><h3>{partner.name}{partner.age ? `, ${partner.age}` : ''}</h3><p><MapPin size={14} /> {partner.city}</p></div><span className="gm-status-dot" title="Active recently" /></div><p className="gm-partner-level">{partner.level}</p><p className="gm-partner-event">Attending: <strong>{partner.event}</strong></p><Link to={partner.id ? `/partners/${partner.id}` : '/partners'} className="gm-text-link">View profile <span>→</span></Link></div>
  </article>;
}
