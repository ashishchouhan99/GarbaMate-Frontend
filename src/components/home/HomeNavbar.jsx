import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { navLinks } from '../../data/homeContent';
import Logo from './Logo';
import { toast } from '../../lib/toast';

function NavItem({ item, onClick }) {
  if (item.to) return <NavLink to={item.to} end onClick={onClick} className={({ isActive }) => `gmh-nav__link ${isActive ? 'is-active' : ''}`}>{item.label}</NavLink>;
  return <a href={item.href} onClick={onClick} className="gmh-nav__link">{item.label}</a>;
}

function AuthActions({ onNavigate }) {
  const { user, logout } = useAuth();
  if (user) return <>
    <Link to="/dashboard" onClick={onNavigate} className="gmh-pill gmh-pill--dark">Dashboard</Link>
    <button type="button" className="gmh-nav__plain" onClick={() => { logout(); toast.success('Signed out successfully.'); onNavigate?.(); }}>Log out</button>
  </>;
  return <span className="gmh-pill gmh-pill--dark gmh-auth"><Link to="/login" onClick={onNavigate}>Login</Link><span aria-hidden="true">/</span><Link to="/signup" onClick={onNavigate}>Sign Up</Link></span>;
}

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return <header className={`gmh-nav ${scrolled || open ? 'is-scrolled' : ''}`}>
    <div className="gmh-nav__bar">
      <Logo onClick={close} />
      <nav className="gmh-nav__links" aria-label="Primary">{navLinks.map((item) => <NavItem key={item.label} item={item} />)}</nav>
      <div className="gmh-nav__actions">
        <Link to="/partners" className="gmh-nav__icon" aria-label="Search partners"><Search size={20} /></Link>
        <div className="gmh-nav__auth"><AuthActions /></div>
        <button type="button" className="gmh-nav__toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="gmh-mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
    </div>
    <div id="gmh-mobile-menu" className={`gmh-nav__mobile ${open ? 'is-open' : ''}`} hidden={!open}>
      <nav aria-label="Mobile">{navLinks.map((item) => <NavItem key={item.label} item={item} onClick={close} />)}<Link to="/partners" onClick={close} className="gmh-nav__link">Search partners</Link></nav>
      <div className="gmh-nav__mobile-auth"><AuthActions onNavigate={close} /></div>
    </div>
  </header>;
}
