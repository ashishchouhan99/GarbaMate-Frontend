import { Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerLinks, socialLinks } from '../../data/homeContent';
import Logo from './Logo';

const XIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9.1L1 2h7l4.8 6.4L18.2 2Zm-1.2 18h1.9L7 3.9H5L17 20Z" /></svg>;
const socialIcons = { instagram: <Instagram size={18} />, x: <XIcon />, youtube: <Youtube size={18} /> };

export default function HomeFooter() {
  return <footer id="contact" className="gmh-footer">
    <div className="gmh-wrap gmh-footer__top">
      <div className="gmh-footer__brand"><Logo tone="light" /><p>Dance. Connect. Celebrate.</p></div>
      <ul className="gmh-footer__social" aria-label="Social media">{socialLinks.map((s) => <li key={s.id}><a href={s.href} aria-label={s.label}>{socialIcons[s.id]}</a></li>)}</ul>
    </div>
    <div className="gmh-wrap gmh-footer__bottom">
      <small>© 2026 Garbamate. All rights reserved.</small>
      <nav aria-label="Footer">{footerLinks.map((l) => l.to ? <Link key={l.label} to={l.to}>{l.label}</Link> : <a key={l.label} href={l.href}>{l.label}</a>)}</nav>
    </div>
  </footer>;
}
