import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { toast } from '../lib/toast';

export default function Layout() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === '/';
  const isAuth = pathname === '/login' || pathname === '/signup' || pathname === '/verify-otp';

  const closeMenu = () => setMenuOpen(false);
  const Main = isHome ? 'div' : 'main'; // Home renders its own <main> between its navbar and footer
  return <div className={`min-h-screen ${isHome ? 'home-shell' : ''} ${isAuth ? 'auth-shell' : ''}`}>
    {!isAuth && !isHome && <header className="site-header"><nav className="site-nav mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><Link to="/" onClick={closeMenu} className="font-display text-2xl font-bold text-maroon">Garba<span className="text-magenta">Mate</span><span className="text-marigold"> ✦</span></Link><button type="button" className="nav-menu-button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button><div className={`site-nav-links ${menuOpen ? 'is-open' : ''}`}><NavLink onClick={closeMenu} to="/">Home</NavLink><NavLink onClick={closeMenu} to="/partners">Find partners</NavLink>{isHome && <><a onClick={closeMenu} href="#events">Events</a><a onClick={closeMenu} href="#how-it-works">How it works</a><a onClick={closeMenu} href="#about">About</a></>}{user ? <><NavLink onClick={closeMenu} to="/dashboard">Dashboard</NavLink><NavLink onClick={closeMenu} to="/list-yourself">List yourself</NavLink><button onClick={() => { logout(); toast.success('Signed out successfully.'); closeMenu(); }} className="text-maroon">Log out</button></> : <><NavLink onClick={closeMenu} to="/login">Log in</NavLink><Link onClick={closeMenu} to="/signup" className="rounded-full bg-maroon px-4 py-2 text-white">Join in</Link></>}</div></nav></header>}
    <Main className={`site-main ${isHome ? 'home-main' : 'mx-auto max-w-6xl px-5 py-8'} ${isAuth ? 'auth-main' : ''}`}><Outlet /></Main>
    {!isAuth && !isHome && <footer className="site-footer mt-16 border-t border-maroon/10 py-8 text-center text-sm text-slate-500">Made for the music, movement and magic of Navratri ✨ <Link className="text-maroon font-semibold" to="/terms-and-conditions">Terms &amp; Conditions</Link></footer>}
  </div>;
}
