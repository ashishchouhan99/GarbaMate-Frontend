import { Link } from 'react-router-dom';
import { USING_PLACEHOLDER_ART } from '../../data/homeContent';

export default function VibeCard({ title, text, image, to }) {
  return <Link to={to} className="gmh-vibe-card">
    <span className="gmh-vibe-card__media"><img className={USING_PLACEHOLDER_ART ? 'is-placeholder' : ''} src={image} alt="" width="280" height="266" loading="lazy" decoding="async" /></span>
    <span className="gmh-vibe-card__body"><strong>{title}</strong><span>{text}</span></span>
  </Link>;
}
