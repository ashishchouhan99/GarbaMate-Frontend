import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="gm-footer"><div><Link to="/" className="gm-footer-logo">Garba<span>Mate</span> <small>✦</small></Link><p>Bringing people together, one Garba night at a time.</p></div><div className="gm-footer-links"><Link to="/">Home</Link><Link to="/partners">Find partners</Link><a href="#events">Events</a><a href="#how-it-works">How it works</a><a href="#about">About</a></div><div className="gm-socials"><a href="#instagram" aria-label="Instagram"><Instagram size={18} /></a><a href="#facebook" aria-label="Facebook"><Facebook size={18} /></a><a href="#twitter" aria-label="X"><Twitter size={18} /></a></div><div className="gm-footer-bottom"><span>© 2026 GarbaMate</span><span>Privacy · Terms · Safety</span></div></footer>;
}
